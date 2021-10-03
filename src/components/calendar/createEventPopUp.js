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
  Textarea,
  navigate,
} from "@chakra-ui/react"

import DatePicker from "react-datepicker"
import TimePicker from "react-time-picker"
import "react-datepicker/dist/react-datepicker.css"

import { CustomAutoComplete, AutoCompleteListItem } from "../CustomAutoComplete"

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
  contacts,
  deals,
  tasks,
}) => {
  const [title, setTitle] = useState("")
  const [isAllDay, setAllDay] = useState(false)
  const [startTime, setStartTime] = useState("10:00")
  const [endTime, setEndTime] = useState("11:00")

  const [contactID, setContactID] = useState("")
  const [forTask, setForTask] = useState("")
  const [forOrganization, setForOrganization] = useState("")
  const [forDeal, setForDeal] = useState("")
  const [notes, setNotes] = useState("")
  const [remindMe, setRemindMe] = useState(false)
  const [type, setType] = useState("")
  const [company, setCompany] = useState("")

  const dealItem = deal => {
    return (
      <AutoCompleteListItem
        name={deal.name}
        profilePicture={deal.profilePicture}
      />
    )
  }

  const contactItem = contact => {
    return <AutoCompleteListItem name={contact.name} />
  }

  const taskItem = task => {
    return (
      <AutoCompleteListItem
        name={task.name}
        profilePicture={task.profilePicture}
      />
    )
  }

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
    createEventObject(
      title,
      date,
      startTime,
      end,
      isAllDay,
      contactID,
      forDeal,
      forTask,
      type,
      notes
    )
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
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={closeModal}
        h="70vh"
        maxW="60vw"
        borderRadius="15px"
        overflowY="scroll"
        value="inside"
      >
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
              <HStack>
                <Box>
                  <Text m="10px" w="6vw" color="ripple.200">
                    Contact
                  </Text>
                  <CustomAutoComplete
                    variant="outline"
                    size="md"
                    placeholder="Select task"
                    items={contacts}
                    itemRenderer={contactItem}
                    disableCreateItem={false}
                    onCreateItem={() => navigate("/contacts")}
                    value={contactID}
                    valueInputAttribute="name"
                    onChange={setContactID}
                  />
                </Box>
                <Box>
                  <Text m="10px" w="6vw" color="ripple.200">
                    Deal
                  </Text>
                  <Box>
                    <CustomAutoComplete
                      variant="outline"
                      size="md"
                      placeholder="Select deal"
                      items={deals}
                      itemRenderer={dealItem}
                      disableCreateItem={false}
                      onCreateItem={() => navigate("/deals")}
                      value={forDeal}
                      valueInputAttribute="name"
                      onChange={setForDeal}
                      showImage={false}
                    />
                  </Box>
                </Box>
              </HStack>
              <Box>
                <Text m="10px" w="12vw" color="ripple.200">
                  Activity
                </Text>
                <Box>
                  <CustomAutoComplete
                    variant="outline"
                    size="md"
                    placeholder="Select task"
                    items={tasks}
                    itemRenderer={taskItem}
                    disableCreateItem={false}
                    onCreateItem={() => navigate("/tasks")}
                    value={forTask}
                    valueInputAttribute="name"
                    onChange={setForTask}
                    showImage={false}
                  />
                </Box>
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
                <HStack>
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
                </HStack>
              </Box>
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
