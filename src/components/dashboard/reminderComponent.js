import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"

import {
  Box,
  Text,
  Button,
  Grid,
  GridItem,
  VStack,
  HStack,
  Center,
  Spacer,
} from "@chakra-ui/react"

import {
  AiOutlineExclamationCircle,
  AiTwotoneCalendar,
  AiFillPlusCircle,
} from "react-icons/ai"

import { getInteractionsForDashboard } from "../../models/Interaction"
import { getContact } from "../../models/Contact"

/**
 *
 * @property {Object} user User object
 * @property {Object} org Organization object
 * @returns
 */

const ReminderComponent = ({ user, org, deals }) => {
  const [allEvents, setAllEvents] = useState([])

  useEffect(() => {
    // Load the events for this user from firestore
    const loadEvents = async () => {
      var interList = await getInteractionsForDashboard(user.id, org.id)
      // Sort Event List by time referenced from https://www.codegrepper.com/code-examples/javascript/how+to+sort+array+of+objects+according+to+epoch+time
      for (const inter of interList) {
        if (inter.forDeal)
          inter.forDeal = deals.filter(deal => deal.id === inter.forDeal)[0]
        if (inter.contact) inter.contact = await getContact(inter.contact)
      }
      interList = interList.sort((a, b) => a.meetingStart - b.meetingStart)
      setAllEvents(interList)
    }
    loadEvents()
  }, [user, org, deals])

  const ReminderItem = ({ event, key }) => {
    const startTime = event.meetingStart
      .toDate()
      .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    const endTime = event.meetingEnd
      ? event.meetingEnd
          .toDate()
          .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : ""
    const duration = event.meetingEnd
      ? (
          (event.meetingEnd.toDate() - event.meetingStart.toDate()) /
          60000
        ).toString() + "m"
      : "All Day"
    return (
      <HStack mt="0.75em" h="125px" maxW="350px">
        <VStack color="grey">
          <Text color={event?.meetingEnd ? "grey" : "white"}>{startTime}</Text>
          {event?.meetingEnd && <Text>|</Text>}
          <Text>{endTime}</Text>
        </VStack>
        <Grid
          h="125px"
          w="350px"
          p="10px"
          bg="green.300"
          color="white"
          borderRadius="15px"
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={2}
          overflow="hidden"
          _hover={{ bg: "green.200" }}
          cursor="pointer"
          onClick={() =>
            navigate("/interactions/", {
              state: { selectedInteraction: event?.id },
            })
          }
        >
          <GridItem
            rowSpan={1}
            colSpan={4}
            style={{ borderBottom: "1px solid white" }}
          >
            <HStack w="100%">
              {event?.remindMe && <AiOutlineExclamationCircle color="red" />}
              <Box w="60%">
                <Text isTruncated>{event?.name || "Untitled Event"}</Text>
              </Box>
              <Spacer />
              <Text textAlign="right" w="60px">
                {duration}
              </Text>
            </HStack>
          </GridItem>
          <GridItem fontSize="12px" h="20px" rowSpan={1} colSpan={4}>
            <Text>
              {event.forDeal
                ? "Deal: " + event.forDeal.name
                : "No Deal Assigned"}
            </Text>
          </GridItem>
          <GridItem fontSize="12px" h="20px" rowSpan={1} colSpan={4}>
            <Text>
              {event.contact ? "Contact: " + event.contact.name : "No Contact"}
            </Text>
          </GridItem>
          <GridItem fontSize="12px" h="20px" rowSpan={1} colSpan={4}>
            <Text>
              <Text>
                {event.meetingType ? "Meeting Type: " + event.meetingType : ""}
              </Text>
            </Text>
          </GridItem>
        </Grid>
      </HStack>
    )
  }

  return (
    <VStack align="left" h="100%" overflowY="auto">
      <Button
        w="15em"
        p="1em"
        ml="5em"
        bg="Grey"
        color="white"
        _hover={{
          bg: "ripple.200",
          transform: "scale(1.03)",
        }}
        onClick={() => navigate("/calendar")}
        leftIcon={<AiTwotoneCalendar />}
      >
        {new Date().toLocaleDateString()}
      </Button>
      {allEvents.map((event, i) => (
        <Box>
          <ReminderItem event={event} key={i} />
        </Box>
      ))}
      <Button
        pl="5em"
        bgColor="transparent"
        color="ripple.200"
        borderRadius="15px"
        w="100%"
        _hover={{
          color: "ripple.100",
          transform: "scale(1.03)",
        }}
        onClick={() => navigate("/calendar")}
        leftIcon={<AiFillPlusCircle />}
      >
        Add event to calendar
      </Button>
      {allEvents.length === 0 && (
        <Box pl="5em" w="100%" h="100%">
          <Center w="100%" h="100%">
            <Text>No events today</Text>
          </Center>
        </Box>
      )}
    </VStack>
  )
}

export default ReminderComponent
