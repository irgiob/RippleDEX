import React, { useState, useEffect } from "react"

import Layout from "../components/layout"

import ReminderComponent from "../components/dashboard/reminderComponent"
import DoughnutChart from "../components/dashboard/doughnutChart"
import SalesFunnel from "../components/dashboard/salesFunnel"

import {
  Grid,
  GridItem,
  Box,
  Text,
  Divider,
  VStack,
  HStack,
} from "@chakra-ui/react"

import { getDealsByOrg } from "../models/Deal"
import { getInteractionsByOrg } from "../models/Interaction"

const DashboardPage = ({ user, setUser, org, setOrg }) => {
  const [deals, setDeals] = useState([])
  const [interactions, setInteractions] = useState([])
  useEffect(() => {
    // Fetch deals and interactions for analytics
    const fetchData = async orgID => {
      const dealsList = await getDealsByOrg(orgID)
      if (dealsList) setDeals(dealsList)
      const interactionsList = await getInteractionsByOrg(orgID)
      if (interactionsList) setInteractions(interactionsList)
    }
    fetchData(org.id)
  }, [org])

  return (
    <>
      {/* <Heading>Dashboard for {org != null ? org.name : ""}</Heading> */}
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
        <GridItem rowSpan={5} colSpan={2}>
          <VStack gridGap={6}>
            <Box
              backgroundColor={"rgba(120, 207, 236, 0.1)"}
              borderRadius="10px"
              width="25vw"
            >
              <Text align={"left"} fontFamily="Raleway-Bold" padding="10px">
                Deals breakdown
              </Text>
              <Divider orientation="horizontal" />
              <Box border="10px">
                <DoughnutChart deals={deals} />
              </Box>
            </Box>
            <HStack>
              <Box
                backgroundColor={"rgba(120, 207, 236, 0.1)"}
                borderRadius="10px"
                width="12vw"
              >
                <Text align={"left"} fontFamily="Raleway-Bold" padding="10px">
                  Deals in pipeline
                </Text>
                <Divider orientation="horizontal" />
                <Box>
                  <Text fontSize="64px" align="center">
                    {deals.length}
                  </Text>
                </Box>
              </Box>

              <Box
                backgroundColor={"rgba(120, 207, 236, 0.1)"}
                borderRadius="10px"
                width="12vw"
              >
                <Text align={"left"} fontFamily="Raleway-Bold" padding="10px">
                  Interactions
                </Text>
                <Divider orientation="horizontal" />
                <Box>
                  <Text fontSize="64px" align="center">
                    {interactions.length}
                  </Text>
                </Box>
              </Box>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem rowSpan={5} colSpan={3}>
          <Box backgroundColor={"rgba(120, 207, 236, 0.1)"} borderRadius="10px">
            <Text align={"left"} fontFamily="Raleway-Bold" padding="10px">
              Deals size in each stage ($)
            </Text>
            <Divider orientation="horizontal" size="3px" />
            <Box border="10px" padding="20px">
              <SalesFunnel deals={deals} />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </>
  )
}

const Dashboard = props => (
  <Layout location={props.location}>
    <DashboardPage />
  </Layout>
)

export default Dashboard
