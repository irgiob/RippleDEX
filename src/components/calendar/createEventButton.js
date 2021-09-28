import React, { useState, forwardRef } from "react"
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
} from "@chakra-ui/react"

import { RiAddFill } from "react-icons/ri"

import DatePicker from "react-datepicker"
import TimePicker from "react-time-picker"
import "react-datepicker/dist/react-datepicker.css"
/**
 *
 * @property {function} createEventObject function to create event object on parent
 * @returns JSX component
 */
const CreateEventButton = props => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [isAllDay, setAllDay] = useState(false)
  const [startTime, setStartTime] = useState("10:00")
  const [endTime, setEndTime] = useState("11:00")

  const DatePickerInput = forwardRef(({ value, onClick }, ref) => (
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
    props.createEventObject(title, startDate, startTime, end, isAllDay)
  }

  const closeModal = () => {
    onClose()
    setTitle("")
    setStartDate(new Date())
    setAllDay(false)
    setStartTime("10:00")
    setEndTime("11:00")
  }

  return (
    <>
      <Button
        leftIcon={<RiAddFill size={20} />}
        backgroundColor="ripple.100"
        border="10px"
        margin="10px"
        float="right"
        size="lg"
        onClick={onOpen}
      >
        {" "}
        Add event{" "}
      </Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Create form for creating new event*/}
            <Input
              placeholder="Event title"
              value={title}
              onChange={event => {
                setTitle(event.target.value)
              }}
            />
            <HStack margin="10px">
              <Text width="100px">Event Date:</Text>
              <Box>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  customInput={<DatePickerInput />}
                />
              </Box>
            </HStack>
            <HStack margin="10px">
              <Text width="100px">Start Time:</Text>
              <TimePicker
                onChange={setStartTime}
                value={startTime}
                disableClock={true}
              />
            </HStack>
            <HStack margin="10px">
              <Text width="100px">End Time:</Text>
              <TimePicker
                onChange={setEndTime}
                value={endTime}
                disabled={isAllDay}
                disableClock={true}
              />
            </HStack>
            <HStack margin="10px">
              <Text width="100px">All day</Text>
              <Switch onChange={switchChangeHandler} />
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button
              backgroundColor="ripple.100"
              border="10px"
              margin="10px"
              float="right"
              size="lg"
              onClick={() => {
                closeModal()
                createEvent()
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateEventButton
