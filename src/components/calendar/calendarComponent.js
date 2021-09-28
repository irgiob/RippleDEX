import React, { useState, useRef, useEffect } from "react"
import FullCalendar from "@fullcalendar/react"

import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"

import EventDetails from "./eventDetails"
import { Box, useToast, useDisclosure } from "@chakra-ui/react"
import CreateEventPopUp from "./createEventPopUp"
import CreateEventButton from "./createEventButton"

import {
  createNewInteraction,
  getInteractionsByOrg,
  updateInteraction,
} from "../../models/Interaction"
import {
  dateToEpoch,
  epochToDate,
  msToEpoch,
  msToSeconds,
} from "../../utils/DateTimeHelperFunctions"

const CalendarComponent = ({ user, org }) => {
  const calendarRef = useRef(null)
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [createInfo, setCreateInfo] = useState({})
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    clearEvents()
    loadEvents()
  }, [])

  // Load the events for this user
  const loadEvents = async () => {
    // Fetch all data from firestore
    const interactions = await getInteractionsByOrg(org.id)

    const events = interactions.filter(doc => {
      // Remove non assigned  and non remindMe interactions
      return doc.participants.includes(user.id) && doc.remindMe
    })

    // Add every interactions meeting into calendar
    events.forEach(async doc => {
      let calendarApi = calendarRef.current.getApi()
      calendarApi.addEvent({
        id: doc.id,
        title: doc.name,
        start: epochToDate(doc.meetingStart),
        end: doc.meetingEnd == null ? null : epochToDate(doc.meetingEnd),
        allDay: doc.meetingEnd == null ? true : false,
      })
    })
  }

  // Clear all events currently rendered in the calendar
  const clearEvents = () => {
    let calendarApi = calendarRef.current.getApi()
    calendarApi.getEvents().forEach(event => {
      event.remove()
    })
  }

  // Handle when a date is selected, in this case we want to add an event
  const handleDateSelected = selectInfo => {
    setDate(selectInfo.date)
    onOpen()
  }

  // Handle when date is selected, which creates a new event
  const createNewEventDate = (
    title,
    startDate,
    startTime,
    endTime,
    isAllDay,
    contactID = "",
    dealID = "",
    type = ""
  ) => {
    // Parse time into date
    let date = new Date(startDate)
    const startTimeFormat = startTime.split(":").map(x => parseInt(x))
    const start = date.setHours(startTimeFormat[0], startTimeFormat[1], 0, 0)

    let end = null
    // Process end if it exists
    if (endTime && !isAllDay) {
      const endTimeFormat = endTime.split(":").map(x => parseInt(x))
      end = date.setHours(endTimeFormat[0], endTimeFormat[1], 0, 0)
    }

    // Add interaction document to database
    createNewInteraction(
      org.id,
      contactID,
      user.id,
      dealID,
      msToEpoch(start),
      type,
      "",
      true,
      title,
      msToEpoch(end),
      [user.id]
    ).then(docID => {
      // Create new event object in API
      let calendarApi = calendarRef.current.getApi()
      calendarApi.addEvent({
        id: docID,
        title: title,
        start: start,
        end: end,
        allDay: isAllDay,
      })
      toast({
        title: "Interaction Successfully Added",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    })
  }

  // Modifies the content of the event component
  const renderEventContent = eventInfo => {
    return (
      <>
        <EventDetails
          eventInfo={eventInfo}
          deleteEvent={() => {
            eventInfo.event.remove()
            updateInteraction(eventInfo.event.id, { remindMe: false })
          }}
          // editEvent={()=>{}} // Edit the event details
        />
      </>
    )
  }

  // Update the event changes in database
  const updateEvent = async changeInfo => {
    await updateInteraction(changeInfo.event.id, {
      meetingStart: dateToEpoch(changeInfo.event.start),
      meetingEnd: dateToEpoch(changeInfo.event.end),
    })
  }

  // H

  return (
    <>
      <Box pt="10px" borderBottom="10px">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
          }}
          dateClick={handleDateSelected}
          // selectable={true}
          // select={handleDateSelected}
          editable={true}
          aspectRatio={2.5}
          eventContent={renderEventContent}
          eventChange={updateEvent}
          eventColor="rgba(0,0,0,0)"
          eventTextColor="white"
        />
      </Box>
      <CreateEventPopUp
        createEventObject={createNewEventDate}
        createInfo={createInfo}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        date={date}
        setDate={setDate}
      />

      <CreateEventButton onOpen={onOpen} />
    </>
  )
}

export default CalendarComponent
