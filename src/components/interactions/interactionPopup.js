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
  Box,
  useMediaQuery,
  useToast,
  Textarea,
} from "@chakra-ui/react"

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
        h="90vh"
        maxW="60vw"
        borderRadius="15px"
        overflowY="scroll"
        value="inside"
      >
        <ModalHeader m="10px" fontSize="36px">
          Edit Interaction
        </ModalHeader>
        <ModalCloseButton m="20px" />
        <ModalBody m="20px">
          <HStack margin="10px">
            <Text width="8vw">Name :</Text>
            <Box>
              <Input
                placeholder="Event title"
                value={title}
                onChange={event => {
                  setTitle(event?.target.value)
                }}
                width="20vw"
              />
            </Box>
          </HStack>
          <HStack margin="10px">
            <Text width="8vw">Deal :</Text>
            <Box>
              <Input
                placeholder="Deal"
                value={forDeal}
                onChange={event => {
                  setForDeal(event?.target.value)
                }}
              />
            </Box>
          </HStack>
          <HStack margin="10px">
            <Text width="8vw">Meeting Type :</Text>
            <Box>
              <Input
                placeholder="Meeting type"
                value={type}
                onChange={event => {
                  setType(event.target.value)
                }}
              />
            </Box>
          </HStack>
          <HStack margin="10px">
            <Text width="8vw">Contact :</Text>
            <Box>
              <Input
                placeholder="Contact"
                value={contactID}
                onChange={event => {
                  setContactID(event.target.value)
                }}
              />
            </Box>
          </HStack>

          <HStack margin="10px">
            <Text width="8vw">Event Date:</Text>
            <Box>
              <DatePicker
                selected={date}
                onChange={date => {
                  setDate(date)
                }}
                customInput={<DatePickerInput />}
              />
            </Box>
          </HStack>
          <HStack margin="10px">
            <Text width="8vw">Start Time:</Text>
            <TimePicker
              onChange={setStartTime}
              value={startTime}
              disableClock={true}
            />
          </HStack>
          <HStack margin="10px">
            <Text width="8vw">End Time:</Text>
            <TimePicker
              onChange={setEndTime}
              value={endTime}
              disabled={isAllDay}
              disableClock={true}
            />
          </HStack>
          <HStack margin="10px">
            <Text width="8vw">All day:</Text>
            <Switch onChange={switchChangeHandler} isChecked={isAllDay} />
          </HStack>
          <HStack margin="10px">
            <Text width="8vw">Remind me:</Text>
            <Switch onChange={remindSwitchChangeHandler} isChecked={remindMe} />
          </HStack>
          <Text margin="10px" width="8vw">
            Notes:{" "}
          </Text>
          <Textarea
            resize="none"
            h="20vh"
            placeholder="Notes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Box align="right">
            <Button
              mb="20px"
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
      </ModalContent>
    </Modal>
  )
}

export default InteractionPopUp
