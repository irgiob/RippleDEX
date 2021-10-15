import React, { useState, useEffect } from "react"

import Layout from "../components/layout"

import ReminderComponent from "../components/dashboard/reminderComponent"
import DoughnutChart from "../components/dashboard/doughnutChart"
import SalesFunnel from "../components/dashboard/salesFunnel"

import {
  Box,
  Text,
  Divider,
  VStack,
  HStack,
  Center,
  Tooltip,
} from "@chakra-ui/react"

import { getDealsByOrg } from "../models/Deal"

// attribute from https://stackoverflow.com/questions/10599933/convert-long-number-into-abbreviated-string-in-javascript-with-a-special-shortn
const intToString = v => {
  var s = ["", "K", "M", "B", "T"]
  var n = Math.floor(("" + v).length / 3)
  var sv = parseFloat((n !== 0 ? v / Math.pow(1000, n) : v).toPrecision(2))
  if (sv % 1 !== 0) sv = sv.toFixed(1)
  return sv + s[n]
}

const DashboardPage = ({ user, setUser, org, setOrg }) => {
  const [deals, setDeals] = useState([])
  const today = new Date()
  useEffect(() => {
    // Fetch deals and interactions for analytics
    const fetchData = async orgID => setDeals(await getDealsByOrg(orgID))
    fetchData(org.id)
  }, [org])

  return (
    <Box h="calc(100vh - 60px)" w="100%" p="1.5em" overflowY="hidden">
      <HStack align="start" spacing="1.5em" h="100%">
        <Box h="110%">
          <ReminderComponent user={user} org={org} deals={deals} />
        </Box>
        <VStack spacing="1.5em" h="100%" width="25vw">
          <Box
            backgroundColor={"rgba(120, 207, 236, 0.1)"}
            borderRadius="10px"
            width="25vw"
          >
            <Text align={"left"} fontFamily="Raleway-Bold" padding="10px">
              Deals breakdown
            </Text>
            <Divider orientation="horizontal" />
            <Box border="10px" m="1em">
              <DoughnutChart deals={deals} />
            </Box>
          </Box>
          <HStack spacing="1.5em" w="100%">
            <Box
              backgroundColor={"rgba(120, 207, 236, 0.1)"}
              borderRadius="10px"
              width="100%"
              p="0.5em"
            >
              <Text align={"left"} fontFamily="Raleway-Bold" padding="10px">
                Total Potential Sales Revenue
              </Text>
              <Divider orientation="horizontal" />
              <Box>
                <Text fontSize="48px" align="center">
                  $
                  {intToString(
                    deals.reduce((a, b) => a + (b["dealSize"] || 0), 0)
                  )}
                </Text>
                <Text align="center">
                  $
                  {intToString(
                    deals
                      .filter(deal => deal.stage.toLowerCase() === "closed")
                      .reduce((a, b) => a + (b["dealSize"] || 0), 0)
                  )}{" "}
                  {" Aquired"}
                </Text>
              </Box>
            </Box>
            <Box
              backgroundColor={"rgba(120, 207, 236, 0.1)"}
              borderRadius="10px"
              width="100%"
              p="0.5em"
            >
              <Text align={"left"} fontFamily="Raleway-Bold" padding="10px">
                Conversion Rate
              </Text>
              <Divider orientation="horizontal" />
              <Box>
                <Text fontSize="64px" align="center">
                  {Math.round(
                    (deals.filter(deal => deal.stage.toLowerCase() === "closed")
                      .length /
                      (deals.length || 1)) *
                      100
                  ).toString() + "%"}
                </Text>
                <Text align="center">
                  {deals.filter(
                    deal =>
                      deal.stage.toLowerCase() === "closed" &&
                      deal.closeDate &&
                      deal.closeDate.toDate().getMonth() === today.getMonth()
                  ).length + " this month"}
                </Text>
              </Box>
            </Box>
          </HStack>
        </VStack>
        <Box
          backgroundColor={"rgba(120, 207, 236, 0.1)"}
          borderRadius="10px"
          h="100%"
          w="40vw"
        >
          <Tooltip
            label="Displays the total deal size on each stage"
            placement="left"
            hasArrow
          >
            <Text align={"bottom"} fontFamily="Raleway-Bold" padding="10px">
              Sales Funnel
            </Text>
          </Tooltip>

          <Divider orientation="horizontal" size="3px" />
          <Box border="10px" padding="20px" h="100%">
            {deals.length !== 0 ? (
              <SalesFunnel deals={deals} />
            ) : (
              <Center h="100%" w="100%">
                No deal data available
              </Center>
            )}
          </Box>
        </Box>
      </HStack>
    </Box>
  )
}

const Dashboard = props => (
  <Layout location={props.location}>
    <DashboardPage />
  </Layout>
)

export default Dashboard
