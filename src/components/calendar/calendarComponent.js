import React, { useState, useRef, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

import EventDetails from "./eventDetails"
import { Box } from '@chakra-ui/layout'
import CreateEventButton from './createEventButton'

import {createNewInteraction, getInteractionsByOrg, } from "../../models/Interaction"

// Only for sample data
let todayStr = new Date().toISOString().replace(/T.*$/, '')
let count = 4;

const CalendarComponent = ({user,org}) => {

  console.log(user,org)
  useEffect(()=>{loadEvents()},[])

  const [currentEvents, setCurrentEvents] = useState([])
  const [detailsRequested, setDetailsRequested] = useState("TEST")
  const [children, setChildren] = useState(()=>{ return(<h1>{detailsRequested}</h1>) })
  const [tooltip, setTooltip] = useState(null)
  const calendarRef = useRef(null); 

  const sampleEvents = [
      {
        id: "001",
        title: 'All-day event',
        start: todayStr
      },
      {
        id: "003",
        title: 'All-day event2',
        start: todayStr
      },
      {
        id: "002",
        title: 'Timed event',
        start: todayStr + 'T12:00:00'
      },
      {
        id: "004",
        title: 'Timed event 2',
        start: todayStr + 'T12:00:00'
      }
    ]

  // Load the events of this user, currently sample events
  const loadEvents = async () => {

    // createNewInteraction("test", [user.id], user.id, org.id, "test", "test", "1632648933", "1632652529", "test", "test", true)

    const interactions = await getInteractionsByOrg(org.id)
    console.log(interactions)

    const events = interactions.filter((doc) => {
      // Remove non assigned  and non remindMe interactions
      return doc.participants.includes(user.id) && doc.remindMe
    })

    events.forEach((doc) => {
      // Create new event object in API
      let calendarAPI =  calendarRef.current.getApi()
      calendarAPI.addEvent({
        id : doc.id,
        title: doc.forDeal,
        start : new Date(0).setUTCSeconds(parseInt(doc.meetingStart)),
        end : new Date(0).setUTCSeconds(parseInt(doc.meetingEnd)),
        // allDay: isAllDay
      })
    })


    console.log(events)
    
    
  }

  // Handle when a date is selected, in this case we want to add an event
  const handleDateSelected = (selectInfo) => {
    // const title = prompt("enter:")
    console.log(selectInfo)
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection

  }

  // Handle when date is selected, which creates a new evemt
  const createNewEventDate = (title, startDate, startTime, endTime, isAllDay, id) => {

    // Parse time into date
    let date = new Date(startDate)
    const startTimeFormat = startTime.split(":").map(x=>parseInt(x))
    const endTimeFormat = endTime.split(":").map(x=>parseInt(x))
    const start = date.setHours(startTimeFormat[0], startTimeFormat[1])  
    const end = date.setHours(endTimeFormat[0], endTimeFormat[1])

    // Create new event object in API
    let calendarAPI =  calendarRef.current.getApi()
    calendarAPI.addEvent({
      id : id,
      title: title,
      start : start,
      end : end,
      allDay: isAllDay
    })

    // Create new firebase doc
    //...
  }

  // Modifies the content of the event component
  const renderEventContent = (eventInfo) => {
    return (
      <>
        <EventDetails
          eventInfo={eventInfo}
          deleteEvent={()=>{eventInfo.event.remove() }} // Also delete in database
          editEvent={()=>{}} // Edit the event details
        />
      </>
    )
  }

  // Update the event changes in database
  // Note: event is automatically updated in the calendar API
  const updateEvent = (changeInfo) => {
    // console.log(changeInfo.event)
  }

  return (
    <>
      <Box
        pt="10px"
        borderBottom="10px"
      >
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView = "dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
          }}
          selectable={true}
          editable={true}
          select={handleDateSelected}
          initialEvents={sampleEvents}
          aspectRatio={2.5}
          eventContent = {renderEventContent}
          eventChange={updateEvent}
          eventColor="rgba(0,0,0,0)"
          eventTextColor = "white"
          
        />
      </Box>
      <CreateEventButton createEventObject={createNewEventDate}/>
    </>
  )
}

export default CalendarComponent