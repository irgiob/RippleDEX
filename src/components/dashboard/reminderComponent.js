import React, { useState, useRef, useEffect } from "react"

import { getInteractionsByAddedBy } from "../../models/Interaction"

import { navigate } from "gatsby"

import {
  Box,
  Text,
  Button,
  Grid,
  GridItem,
  VStack,
  HStack,
} from "@chakra-ui/react"

import { AiOutlineExclamationCircle, AiTwotoneCalendar } from "react-icons/ai"

/**
 *
 * @property {Object} user User object
 * @property {Object} org Organization object
 * @returns
 */

const ReminderComponent = ({ user, org }) => {
  const [date, setDate] = useState(new Date().toLocaleDateString())
  const [allEvents, setAllEvents] = useState([])

  useEffect(() => {
    loadEvents()
    console.log("this is the " + allEvents)
  }, [])

  // Load the events for this user
  const loadEvents = async () => {
    // Fetch all data from firestore
    const interactions = await getInteractionsByAddedBy(user.id).then(
      interactions =>
        setAllEvents(
          // Sort Event List by time referenced from https://www.codegrepper.com/code-examples/javascript/how+to+sort+array+of+objects+according+to+epoch+time
          interactions.sort(function (a, b) {
            var dateA = a.meetingStart,
              dateB = b.meetingStart
            return dateA - dateB
          })
        )

      // setAllEvents(interactions)
    )
    console.log("this is the " + interactions)
  }

  const handleClick = () => {
    navigate("/calendar")
  }

  // Ensure that the time is in 00:00 format
  const addZero = i => {
    if (i < 10) {
      i = "0" + i
    }
    return i
  }

  // get The Event Times in hh:mm format
  const getHourMinute = time => {
    var h = addZero(time.toDate().getHours())
    var m = addZero(time.toDate().getMinutes())
    var eventTime = h + ":" + m
    return eventTime
  }
  // get The duration of the event from start and Finish
  const getMinuteDiff = (start, end) => {
    var m1 = addZero(start.toDate())
    var m2 = addZero(end.toDate())
    var diff = (m1.getTime() - m2.getTime()) / 1000
    diff /= 60
    var minDiff = Math.abs(Math.round(diff))
    var durationHour = Math.floor(minDiff / 60)
    var durationMinute = minDiff % 60
    if (durationHour === 0) {
      return durationMinute + " min"
    } else if (durationMinute === 0) {
      return durationHour + " h"
    } else {
      return durationHour + "h " + durationMinute + "min"
    }
  }

  // Only show events that are relevant in the day
  const todaysEvent = start => {
    const currentDate = new Date()
    var thisDate =
      currentDate.getDate() + currentDate.getMonth() + currentDate.getFullYear()
    var eventDate = start.getDate() + start.getMonth() + start.getFullYear()
    //days between event and today
    var dayDiff = thisDate - eventDate
    return dayDiff
  }

  // Get List of Scheduled Items for the day
  const eventItems = allEvents.map((event, i) => {
    if (event?.forOrganization === org.id) {
      const startTime = getHourMinute(event?.meetingStart)
      var endTime = " "
      var duration = "All Day"
      var times = todaysEvent(event?.meetingStart.toDate())
      if (event?.meetingEnd) {
        endTime = getHourMinute(event?.meetingEnd)
        duration = getMinuteDiff(event?.meetingStart, event?.meetingEnd)
      }
      if (times === 0) {
        return (
          <li key={i}>
            <HStack mt="2vh" h="125px" maxW="350px">
              <VStack color="grey">
                <Text>{startTime}</Text>
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
              >
                <GridItem
                  rowSpan={1}
                  colSpan={4}
                  style={{ borderBottom: "1px solid white" }}
                >
                  <HStack justifyContent="space-between">
                    <HStack>
                      <Text>
                        {event?.remindMe && (
                          <AiOutlineExclamationCircle color="red" />
                        )}
                      </Text>
                      <Text>{event?.name || "Untitled Event"}</Text>
                    </HStack>
                    <Text alignContent="right">{duration}</Text>
                  </HStack>
                </GridItem>
                <GridItem fontSize="12px" h="20px" rowSpan={2} colSpan={4}>
                  <Text>{event?.forTask || "No Task Description"}</Text>
                </GridItem>
                <GridItem rowSpan={1} colSpan={4}>
                  <Text>
                    <Text>{event?.meetingType || ""}</Text>
                  </Text>
                </GridItem>
              </Grid>
            </HStack>
          </li>
        )
      }
    }
  })

  return (
    <Box>
      <VStack align="left" pl="1em" pr="2em" h="85vh" overflowY="auto">
        <Button
          w="200px"
          p="20px"
          ml="100px"
          bg="Grey"
          color="white"
          _hover={{
            transform: "scale(1.03)",
          }}
          onClick={handleClick}
          leftIcon={<AiTwotoneCalendar />}
        >
          {date}
        </Button>
        <ul style={{ listStyleType: "none" }}>{eventItems}</ul>
      </VStack>
    </Box>
  )
}

export default ReminderComponent
