import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { Heading } from "@chakra-ui/react"

const CalendarPage = ({user, setUser, org, setOrg}) => {
  return (<>
    <Heading>Calendar for {org.name}</Heading>
  </>)
}

const Calendar = (props) => (
  <Layout location={props.location}>
    <Seo title="Calendar" />
    <CalendarPage/>
  </Layout>
)

export default Calendar
