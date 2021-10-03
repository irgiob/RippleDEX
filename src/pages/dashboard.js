import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ReminderComponent from "../components/dashboard/reminderComponent"

import { Heading, Grid, GridItem } from "@chakra-ui/react"
import DoughnutChart from "../analytics/doughnutChart"

const DashboardPage = ({ user, setUser, org, setOrg }) => {
  return (
    <>
      <Heading>Dashboard for {org != null ? org.name : ""}</Heading>
      <Grid
        h="90vh"
        maxW="100vw"
        p="10px"
        alignContent="left"
        templateRows="repeat(5, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={6}
      >
        <GridItem rowSpan={5} colSpan={1}>
          <ReminderComponent user={user} org={org} />
        </GridItem>
        {/* <GridItem bg="red" rowSpan={2} colSpan={2}>
          <DoughnutChart org={org} />
        </GridItem> */}
      </Grid>
    </>
  )
}

const Dashboard = props => (
  <Layout location={props.location}>
    <Seo title="Dashboard" />
    <DashboardPage />
  </Layout>
)

export default Dashboard
