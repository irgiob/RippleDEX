import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

import {EventDetails} from "./eventDetails"
import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'

let todayStr = new Date().toISOString().replace(/T.*$/, '')
let count = 4;

const CalendarComponent = () => {


  const [currentEvents, setCurrentEvents] = useState([])
  const [detailsRequested, setDetailsRequested] = useState("TEST")
  const [children, setChildren] = useState(()=>{ return(<h1>{detailsRequested}</h1>) })
  const [tooltip, setTooltip] = useState(null)

  // Load the events of this user
  const loadEvents = () => {
    return [
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
  }

  // Handle when a date is selected, in this case we want to add an event
  const handleDateSelected = (selectInfo) => {
    const title = prompt("enter:")
    console.log(selectInfo)
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: String(count++),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  // Handle when date is selected, which creates a new evemt
  const createNewEventDate = (dateInfo) => {
    return (
      <>
        <Box w="100%" backgroundColor="red"><h1>TEST</h1></Box>
      </>
    )
  }

  // Modifies the content of the event component
  const renderEventContent = (eventInfo) => {
    console.log(eventInfo)
    return (
      <>
        <EventDetails
          eventInfo={eventInfo}
          deleteEvent={()=>{eventInfo.event.remove() }}
          editEvent={()=>{}}
        />
      </>
    )
  }

  // Update the event changes in database
  const updateEvent = () => {
  }

  return (
    <>
      <FullCalendar
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
        // dayCellContent={createNewEventDate}
        initialEvents={loadEvents()}
        aspectRatio={2.5}
        eventContent = {renderEventContent}
        eventsSet={updateEvent}
      />
    </>
  )
}

export default CalendarComponent