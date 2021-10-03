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
  VStack,
} from "@chakra-ui/react"

import DatePicker from "react-datepicker"
import TimePicker from "react-time-picker"
import "react-datepicker/dist/react-datepicker.css"
/**
 *
 * @property {function} createEventObject function to create event object on parent
 * @property {function} onOpen function to open up another popover or trigger
 * @property {bool} isOpen checks if the modal is open
 * @property {function} onClose function to run when popover is to be closed
 * @property {Date} date date object for creating new interaction
 * @property {funciton} setDate function to modify the date property
 * @returns {JSX}
 */
const CreateEventPopUp = ({
  createEventObject,
  onOpen,
  isOpen,
  onClose,
  date,
  setDate,
}) => {
  const [title, setTitle] = useState("")
  const [isAllDay, setAllDay] = useState(false)
  const [startTime, setStartTime] = useState("10:00")
  const [endTime, setEndTime] = useState("11:00")

  const DatePickerInput = forwardRef(({ value, onClick }, ref) => (
    // Custom input for styling
    <Button onClick={onClick} ref={ref}>
      {value}
    </Button>
  ))

  const switchChangeHandler = () => {
    isAllDay ? setAllDay(false) : setAllDay(true)
  }

  // Create the event object on database
  const createEvent = () => {
    const end = isAllDay ? null : endTime
    createEventObject(title, date, startTime, end, isAllDay)
  }

  const closeModal = () => {
    onClose()
    setTitle("")
    // setStartDate(new Date())
    setAllDay(false)
    setStartTime("10:00")
    setEndTime("11:00")
  }

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p="25px" pr="30px" pl="30px">
            <VStack spacing="20px" align="inherit">
              <Text
                fontFamily="Raleway-Bold"
                color="ripple.200"
                fontSize="23px"
              >
                Create New Event
              </Text>
              {/* Create form for creating new event*/}
              <Input
                placeholder="Event title"
                value={title}
                onChange={event => {
                  setTitle(event.target.value)
                }}
              />
              <HStack>
                <Text width="100px">Event Date:</Text>
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
              <HStack>
                <Text width="100px">Start Time:</Text>
                <TimePicker
                  onChange={setStartTime}
                  value={startTime}
                  disableClock={true}
                />
              </HStack>
              <HStack>
                <Text width="100px">End Time:</Text>
                <TimePicker
                  onChange={setEndTime}
                  value={endTime}
                  disabled={isAllDay}
                  disableClock={true}
                />
              </HStack>
              <HStack>
                <Text width="100px">All day</Text>
                <Switch onChange={switchChangeHandler} />
              </HStack>
              <Box align="end">
                <Button
                  bgColor="ripple.200"
                  color="white"
                  fontFamily="Raleway-Bold"
                  borderRadius="30px"
                  variant="solid"
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                  onClick={() => {
                    closeModal()
                    createEvent()
                  }}
                >
                  Create Event
                </Button>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateEventPopUp
