import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ReminderComponent from "../components/dashboard/reminderComponent"

import { Heading } from "@chakra-ui/react"

const DashboardPage = ({user, setUser, org, setOrg}) => {
  return (<>
      <Heading>Dashboard for {org != null ? org.name : ""}</Heading>
      <ReminderComponent user={user} org={org}/>
  </>)
}

const Dashboard = (props) => (
  <Layout location={props.location}>
    <Seo title="Dashboard" />
    <DashboardPage/>
  </Layout>
)

export default Dashboard
