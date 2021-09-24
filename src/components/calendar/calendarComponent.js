import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

import tippy from "tippy.js"
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import './tooltipStyle.css';

import {eventAsHTMLContent} from "./eventDetails"

let todayStr = new Date().toISOString().replace(/T.*$/, '')

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
        id: "002",
        title: 'Timed event',
        start: todayStr + 'T12:00:00'
      }
    ]
  }

  // Handles when an event is clicked by user
  const handleEventHover = (info)=>{
      const onRightHalf = info.jsEvent.screenX > (info.jsEvent.clientX/2)
      // Create a popover when the event is clicked
      setTooltip( new tippy(info.el, {
        theme:"ripple",
        arrow:true,
        allowHTML: true,
        content: eventAsHTMLContent(info.event),
        placement: onRightHalf ? 'left' : 'right',
        animation:'scale',
        trigger:'click',
    }));


  }

  // Handle when a date is selected, in this case we want to add an event
  const handleDateSelected = (selectInfo) => {
    console.log(selectInfo)
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView = "dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        selectable={true}
        select={handleDateSelected}
        initialEvents={loadEvents()}
        aspectRatio={2}
        eventMouseEnter={handleEventHover}
      />
    </>
  )
}

export default CalendarComponent