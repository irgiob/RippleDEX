import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { Box, Heading } from "@chakra-ui/react"

import CalendarComponent from "../components/calendar/calendarComponent"
import { transform } from "typescript"

// const CalendarPage = ({user, setUser, org, setOrg}) => {
//   return (<>
//     <Heading>Calendar for {org.name}</Heading>
//   </>)
// }

const Calendar = (props) => (
  <Layout location={props.location}>
    <Seo title="Calendar" />
      <Box
        width = "98%"
        height = "95%"
        pl = "10px"
        pt = "10px"
      >
        <CalendarComponent/>
      </Box>
  </Layout>
)

export default Calendar
