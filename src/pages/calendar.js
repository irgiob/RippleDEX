import * as React from "react"

import Layout from "../components/layout"

import { Box } from "@chakra-ui/react"
import CalendarComponent from "../components/calendar/calendarComponent"

const CalendarPage = ({ user, setUser, org, setOrg }) => {
  return (
    <Box width="98%" height="95%" pl="10px" pt="10px">
      <CalendarComponent user={user} org={org} />
    </Box>
  )
}

const Calendar = props => (
  <Layout location={props.location}>
    <CalendarPage />
  </Layout>
)

export default Calendar
