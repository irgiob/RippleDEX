import React, { useState, forwardRef, useEffect } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Input,
  Switch,
  HStack,
  VStack,
  Spacer,
  Box,
  Grid,
  GridItem,
  useMediaQuery,
  useToast,
  Textarea,
} from "@chakra-ui/react"

import {
  RiArrowLeftSLine,
  RiMailAddFill,
  RiCalendarEventFill,
} from "react-icons/ri"

import DatePicker from "react-datepicker"
import TimePicker from "react-time-picker"
import "react-datepicker/dist/react-datepicker.css"

import { getTimeFromDate } from "../../utils/DateTimeHelperFunctions"
import { updateInteraction } from "../../models/Interaction"

/**
 *
 * @property {bool} isOpen checks if pop up will be opened using useDisclosure
 * @property {function} onClose close the pop up using useDisclosure
 * @property {Object} value initial value passed to the pop up, Interaction document
 * @property {function} afterUpdate function to run after update is complete
 * @returns {JSX}
 */
const InteractionPopUp = ({
  isOpen,
  onClose,
  value,
  setValue,
  afterUpdate,
}) => {
  const [isLargeSize] = useMediaQuery("(min-width: 42em)")

  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date())
  const [startTime, setStartTime] = useState("10:00")
  const [endTime, setEndTime] = useState("11:00")
  const [isAllDay, setAllDay] = useState(false)
  const [contactID, setContactID] = useState("")
  const [forTask, setForTask] = useState("")
  const [forOrganization, setForOrganization] = useState("")
  const [forDeal, setForDeal] = useState("")
  const [notes, setNotes] = useState("")
  const [remindMe, setRemindMe] = useState(false)
  const [type, setType] = useState("")
  const toast = useToast()

  useEffect(() => {
    if (value) {
      setTitle(value.name)
      setDate(value.meetingStart.toDate())
      setStartTime(getTimeFromDate(value.meetingStart.toDate()))
      setEndTime(
        value.meetingEnd ? getTimeFromDate(value.meetingEnd.toDate()) : "00:00"
      )
      setAllDay(value.meetingEnd ? false : true)
      setRemindMe(value.remindMe)
      setContactID(value.contact)
      setForDeal(value.forDeal)
      setForTask(value.forTask)
      setNotes(value.notes)
      setType(value.meetingType)
    }
  }, [value])

  const DatePickerInput = forwardRef(({ value, onClick }, ref) => (
    // Custom input for styling
    <Button onClick={onClick} ref={ref}>
      {value}
    </Button>
  ))

  const switchChangeHandler = () => {
    isAllDay ? setAllDay(false) : setAllDay(true)
  }

  const remindSwitchChangeHandler = () => {
    remindMe ? setRemindMe(false) : setRemindMe(true)
  }

  const handleClick = async () => {
    // Parse time into date
    let start = new Date(date)
    const startTimeFormat = startTime.split(":").map(x => parseInt(x))
    start.setHours(startTimeFormat[0], startTimeFormat[1], 0, 0)

    // Process end if it exists
    let end = null
    if (!isAllDay) {
      end = new Date(date)
      const endTimeFormat = endTime.split(":").map(x => parseInt(x))
      end.setHours(endTimeFormat[0], endTimeFormat[1], 0, 0)
    }

    const options = {
      contact: contactID,
      forDeal: forDeal,
      forTask: forTask,
      meetingStart: start,
      meetingEnd: end,
      meetingType: type,
      notes: notes, // Or create structure so people can add comments?
      name: title,
      remindMe: remindMe,
    }

    await updateInteraction(value.id, options)

    toast({
      title: "Success",
      description: "Your The Interaction Detail Have Been Updated",
      status: "success",
      duration: 5000,
      isClosable: true,
    })

    afterUpdate()
    onClose()
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent
        h="70vh"
        maxW="60vw"
        borderRadius="15px"
        overflowY="scroll"
        value="inside"
      >
        <ModalHeader m="10px" mb="0px" fontSize="36px">
          <Button
            leftIcon={<RiArrowLeftSLine size={40} />}
            fontSize="25px"
            color="ripple.200"
            fontFamily="Raleway-Bold"
            bg="none"
            _hover={{
              transform: "scale(1.05)",
            }}
            onClick={onClose}
          >
            Close Interaction
          </Button>
        </ModalHeader>
        <ModalCloseButton m="20px" />
        <ModalBody m="20px" mt="1vh">
          <Grid
            h="55vh"
            alignContent="left"
            templateRows="repeat(7, 1fr)"
            templateColumns="repeat(6, 1fr)"
            gap={5}
          >
            <GridItem rowSpan={1} colSpan={4}>
              <HStack>
                <Text ml="1vh" w="6vw" color="ripple.200">
                  Meeting Name :
                </Text>
                <Input
                  placeholder="Event title"
                  value={title}
                  onChange={event => {
                    setTitle(event?.target.value)
                  }}
                />
              </HStack>
            </GridItem>
            <GridItem
              rowSpan={7}
              colSpan={2}
              style={{ borderLeft: "1px solid lightGray" }}
            >
              <VStack Align="left" justifyContent="space-between">
                <HStack>
                  <Text w="6vw" ml="1vw">
                    Meeting Type :
                  </Text>
                  <Input
                    placeholder="Meeting type"
                    value={type}
                    onChange={event => {
                      setType(event.target.value)
                    }}
                  />
                </HStack>
                <HStack pt="5vh" pl="2vw">
                  <Text>Date of Interaction:</Text>
                  <DatePicker
                    selected={date}
                    onChange={date => {
                      setDate(date)
                    }}
                    customInput={<DatePickerInput />}
                  />
                </HStack>
                <Box>
                  <HStack  pt="3vh">
                    <Text>Start Time:</Text>
                    <TimePicker
                      onChange={setStartTime}
                      value={startTime}
                      disableClock={true}
                    />
                  </HStack>
                  <Text pl="2vw">|</Text>
                  <HStack>
                    <Text>End Time: </Text>
                    <Box/>
                    <TimePicker
                      onChange={setEndTime}
                      value={endTime}
                      disabled={isAllDay}
                      disableClock={true}
                    />
                  </HStack>
                </Box>
                <Box pt="4vh">
                  <HStack>
                    <Text w="8vw">All day:</Text>
                    <Switch
                      onChange={switchChangeHandler}
                      isChecked={isAllDay}
                    />
                  </HStack>
                  <HStack pt="1vh">
                    <Text w="8vw">Remind me:</Text>
                    <Switch
                      onChange={remindSwitchChangeHandler}
                      isChecked={remindMe}
                    />
                  </HStack>
                </Box>
                <ModalFooter>
                  <Box align="right">
                    <Button
                      mt="7vh"
                      bgColor="ripple.200"
                      color="white"
                      fontFamily="Raleway-Bold"
                      variant="solid"
                      borderRadius="30px"
                      _hover={{
                        transform: "scale(1.05)",
                      }}
                      padding="20px"
                      onClick={handleClick}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </ModalFooter>
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={4}>
              <HStack>
                <Box>
                  <Text m="10px" w="6vw" color="ripple.200">
                    Contact
                  </Text>
                  <Input
                    placeholder="Contact"
                    value={contactID}
                    onChange={event => {
                      setContactID(event.target.value)
                    }}
                  />
                </Box>
                <Box>
                  <Text m="10px" w="6vw" color="ripple.200">
                    Company
                  </Text>
                  <Input
                    placeholder="Company"
                    value={forOrganization}
                    onChange={event => {
                      setForOrganization(event.target.value)
                    }}
                  />
                </Box>
                <Box>
                  <Text m="10px" w="6vw" color="ripple.200">
                    Deal
                  </Text>
                  <Input
                    placeholder="Deal"
                    value={forDeal}
                    onChange={event => {
                      setForDeal(event?.target.value)
                    }}
                  />
                </Box>
              </HStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={4}>
              <Text m="10px" w="12vw" color="ripple.200">
                Activity
              </Text>
              <Input
                placeholder="Activity"
                value={forTask}
                onChange={event => {
                  setForTask(event.target.value)
                }}
              />
            </GridItem>

            <GridItem rowSpan={4} colSpan={4}>
              <Text m="10px" w="12vw" color="ripple.200">
                Interaction Description{" "}
              </Text>
              <Textarea
                resize="none"
                h="20vh"
                placeholder="Notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default InteractionPopUp
