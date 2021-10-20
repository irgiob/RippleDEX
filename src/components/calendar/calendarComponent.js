import React, { useState, useRef, useEffect } from "react"

import { Box, Spinner } from "@chakra-ui/react"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"

import InteractionPopUp from "../interactions/interactionPopup"
import { dateToFirebaseTimestamp } from "../../utils/DateTimeHelperFunctions"

import { getInteractionsByOrg } from "../../models/Interaction"
import { getContactsByOrg } from "../../models/Contact"
import { getCompanyByOrg } from "../../models/Company"
import { getTasksByOrg } from "../../models/Task"
import { getDealsByOrg } from "../../models/Deal"
import { getUser } from "../../models/User"

/**
 *
 * @property {Object} user User object
 * @property {Object} org Organization object
 * @returns
 */
const CalendarComponent = ({ user, org }) => {
  const calendarRef = useRef(null)
  const [date, setDate] = useState()
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState()
  const [contacts, setContacts] = useState([])
  const [deals, setDeals] = useState([])
  const [tasks, setTasks] = useState([])
  const [companies, setCompanies] = useState([])
  const [members, setMembers] = useState([])
  const [interactions, setInteractions] = useState([])

  useEffect(() => {
    // Fetch all data for the table
    const fetchData = async org => {
      // fetch contacts
      const contactList = await getContactsByOrg(org.id)
      for (const contact of contactList) contact.label = contact.name
      setContacts(contactList)

      // fetch companies
      const companyList = await getCompanyByOrg(org.id)
      for (const company of companyList) company.label = company.name
      setCompanies(companyList)

      // fetch deals
      const dealList = await getDealsByOrg(org.id)
      for (const deal of dealList) deal.label = deal.name
      setDeals(dealList)

      // fetch tasks
      const taskList = await getTasksByOrg(org.id)
      for (const task of taskList) task.label = task.name
      setTasks(taskList)

      // fetch members
      const memberList = []
      for await (const mem of org.members) {
        const member = await getUser(mem.userID)
        member.label = member.firstName + " " + member.lastName
        memberList.push(member)
      }
      setMembers(memberList)

      // fetch interactions
      const interactionList = await getInteractionsByOrg(org.id)
      // replace fields with document ids with actual objects of those documents
      for await (const interaction of interactionList) {
        if (interaction.contact)
          interaction.contact = contactList.filter(
            contact => contact.id === interaction.contact
          )[0]
        if (interaction.forDeal)
          interaction.forDeal = dealList.filter(
            deal => deal.id === interaction.forDeal
          )[0]
        if (interaction.forTask)
          interaction.forTask = taskList.filter(
            task => task.id === interaction.forTask
          )[0]
        if (interaction.addedBy)
          interaction.addedBy = memberList.filter(
            member => member.id === interaction.addedBy
          )[0]
      }
      setInteractions(interactionList)
    }
    fetchData(org).then(() => setLoading(false))
  }, [org])

  useEffect(() => setDate(null), [selected])

  const generateEventData = interactions => {
    const events = []
    for (const interaction of interactions) {
      if (interaction.meetingStart)
        events.push({
          id: interaction.id,
          title: interaction.name
            ? interaction.name
            : interaction.contact && interaction.contact.name
            ? "Meeting with " + interaction.contact.name
            : interaction.meetingStart.toDate().toLocaleDateString("en-GB") +
              " Meeting",
          start: interaction.meetingStart.toDate(),
          ...(interaction.meetingEnd
            ? { end: interaction.meetingEnd.toDate(), allDay: false }
            : { end: null, allDay: true }),
        })
    }
    return events
  }

  return (
    <Box>
      {loading && (
        <Box
          bgColor="rgba(128, 128, 128, 0.4)"
          w="95%"
          h="93%"
          ml="-10px"
          mt="-10px"
          pos="absolute"
          zIndex="100"
        >
          <Spinner
            pos="absolute"
            top="45%"
            left="45%"
            size="xl"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="ripple.200"
          />
        </Box>
      )}
      <FullCalendar
        height="calc(100vh - 100px)"
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        eventDidMount={info => {
          console.log(info)
          info.el.ondblclick = function () {
            console.log(info.event)
          }
        }}
        events={generateEventData(interactions)}
        eventColor="#168aa8"
        editable={true}
        selectable={true}
        eventClick={info =>
          setSelected(
            interactions.filter(
              interaction => interaction.id === info.event.id
            )[0]
          )
        }
        dateClick={info => {
          if (date && date.getTime() === info.date.getTime()) {
            const now = new Date()
            const start = new Date(date)
            start.setHours(now.getHours() + 1)
            const end = new Date(date)
            end.setHours(now.getHours() + 2)
            setSelected({
              id: null,
              forOrganization: org.id,
              name: "New Event",
              addedBy: members.filter(member => member.id === user.id)[0],
              contact: null,
              forDeal: null,
              forTask: null,
              meetingStart: dateToFirebaseTimestamp(start),
              meetingEnd: dateToFirebaseTimestamp(end),
              meetingType: null,
              notes: null,
              remindMe: true,
            })
          } else setDate(info.date)
        }}
      />
      <InteractionPopUp
        selected={selected}
        setSelected={setSelected}
        contacts={contacts}
        deals={deals}
        tasks={tasks}
        companies={companies}
        members={members}
        afterUpdate={updatedInteraction => {
          setInteractions([
            ...interactions.filter(
              interaction => interaction.id !== updatedInteraction.id
            ),
            updatedInteraction,
          ])
        }}
      />
    </Box>
  )
}

export default CalendarComponent
