import React, { useState, useRef, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

import EventDetails from "./eventDetails"
import { Box } from '@chakra-ui/layout'
import CreateEventButton from './createEventButton'

import {createNewInteraction, getInteractionsByOrg, updateInteraction } from "../../models/Interaction"
import {createNewDeal, getDeal} from "../../models/Deal"

const CalendarComponent = ({user,org}) => {

  const calendarRef = useRef(null); 

  useEffect(()=>{loadEvents();},[])

  // Load the events of this user
  const loadEvents = async () => {

    // Fetch all data from firestore
    const interactions = await getInteractionsByOrg(org.id)
    console.log(interactions)

    const events = interactions.filter((doc) => {
      // Remove non assigned  and non remindMe interactions
      return doc.participants.includes(user.id) && doc.remindMe
    })

    // Add every interactions meeting into calendar
    events.forEach(async (doc) => {
      const deal = await getDeal(doc.forDeal)
      let calendarAPI =  calendarRef.current.getApi()
      calendarAPI.addEvent({
        id : doc.id,
        title: deal.name,
        start : new Date(0).setUTCSeconds(parseInt(doc.meetingStart)),
        end : new Date(0).setUTCSeconds(parseInt(doc.meetingEnd)),
      })
    })
    
  }

  // Handle when a date is selected, in this case we want to add an event
  const handleDateSelected = (selectInfo) => {
    console.log(selectInfo)
  }

  // Handle when date is selected, which creates a new event
  // Currently not in use
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

  }

  // Modifies the content of the event component
  const renderEventContent = (eventInfo) => {
    return (
      <>
        <EventDetails
          eventInfo={eventInfo}
          deleteEvent={()=>{
            eventInfo.event.remove() 
            updateInteraction(eventInfo.event.id, {remindMe:false})
          }} 
          // editEvent={()=>{}} // Edit the event details
        />
      </>
    )
  }

  // Convert date object to epoch time
  const dateToEpoch = (date) => {return Math.floor(date.getTime()/1000.0);}

  // Update the event changes in database
  const updateEvent = async (changeInfo) => {
    await updateInteraction(changeInfo.event.id, {
      meetingStart: dateToEpoch(changeInfo.event.start),
      meetingEnd: dateToEpoch(changeInfo.event.end)
    })
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
          // selectable={true}
          // select={handleDateSelected}
          editable={true}
          aspectRatio={2.5}
          eventContent = {renderEventContent}
          eventChange={updateEvent}
          eventColor="rgba(0,0,0,0)"
          eventTextColor = "white"
          
        />
      </Box>
      {/* <CreateEventButton createEventObject={createNewEventDate}/> */}
    </>
  )
}

export default CalendarComponent