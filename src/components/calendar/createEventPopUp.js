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
  navigate,
  useMediaQuery,
  useToast,
  Textarea,
  SimpleGrid,
} from "@chakra-ui/react"

import {
  RiArrowLeftSLine,
  RiMailAddFill,
  RiCalendarEventFill,
} from "react-icons/ri"

import DatePicker from "react-datepicker"
import TimePicker from "react-time-picker"
import "react-datepicker/dist/react-datepicker.css"

import { getCompany } from "../../models/Company"

import { CustomAutoComplete, AutoCompleteListItem } from "../CustomAutoComplete"
import { getContact } from "../../models/Contact"

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

  const [contact, setContact] = useState("")
  const [forTask, setForTask] = useState("")
  const [forOrganization, setForOrganization] = useState("")
  const [forDeal, setForDeal] = useState("")
  const [notes, setNotes] = useState("")
  const [remindMe, setRemindMe] = useState(true)
  const [type, setType] = useState("")
  const [company, setCompany] = useState("")

  const dealItem = deal => {
    return (
      <AutoCompleteListItem
        name={deal.name}
        profilePicture={deal.profilePicture}
        showImage={false}
      />
    )
  }

  const contactItem = contact => {
    return (
      <AutoCompleteListItem
        name={contact.name}
        profilePicture={contact.profilePicture}
      />
    )
  }

  const taskItem = task => {
    return (
      <AutoCompleteListItem
        name={task.name}
        profilePicture={task.profilePicture}
        showImage={false}
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

  const remindSwitchChangeHandler = () => {
    remindMe ? setRemindMe(false) : setRemindMe(true)
  }

  const handleContactSet = async contactDoc => {
    setContact(contactDoc)
    if (contactDoc) {
      const company = await getCompany(contactDoc.company)
      setCompany(company.name)
    }
  }

  // Create the event object on database
  const handleClick = () => {
    const end = isAllDay ? null : endTime
    createEventObject(
      title,
      date,
      startTime,
      end,
      isAllDay,
      contact.id,
      forDeal.id,
      forTask.id,
      type,
      notes
    )
    onClose()
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
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent maxW="1000px">
          <ModalBody p="20px" pr="25px" pl="25px">
            <VStack align="initial">
              <Box align="start">
                <Button
                  pl="0px"
                  mb="10px"
                  bg="none"
                  leftIcon={<RiArrowLeftSLine size="40px" />}
                  fontSize="25px"
                  color="ripple.200"
                  fontFamily="Raleway-Bold"
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                  onClick={onClose}
                >
                  {title ? title : "Interaction"}
                </Button>
              </Box>
              <HStack pl="10px" spacing="20px" align="start">
                <SimpleGrid columns={2} spacing="20px">
                  <Box>
                    <Text fontSize="15px" color="ripple.200" pb="10px">
                      Meeting Name
                    </Text>
                    <Input
                      placeholder="Event title"
                      value={title}
                      onChange={event => {
                        setTitle(event?.target.value)
                      }}
                    />
                  </Box>
                  <Box>
                    <Text fontSize="15px" color="ripple.200" pb="10px">
                      Meeting Type
                    </Text>
                    <Input
                      placeholder="Meeting type"
                      value={type}
                      onChange={event => {
                        setType(event.target.value)
                      }}
                    />
                  </Box>
                  <Box>
                    <Text fontSize="15px" color="ripple.200" pb="10px">
                      Date of Interaction
                    </Text>
                    <DatePicker
                      selected={date}
                      onChange={date => {
                        setDate(date)
                      }}
                      customInput={<DatePickerInput />}
                    />
                  </Box>
                  <SimpleGrid
                    pt="5px"
                    textAlign="left"
                    columns={2}
                    spacing="5px"
                  >
                    <Text fontSize="15px" color="ripple.200" pb="10px">
                      All Day
                    </Text>
                    <Switch
                      onChange={switchChangeHandler}
                      isChecked={isAllDay}
                    />
                    <Text fontSize="15px" color="ripple.200" pb="10px">
                      Remind Me
                    </Text>
                    <Switch
                      onChange={remindSwitchChangeHandler}
                      isChecked={remindMe}
                    />
                  </SimpleGrid>
                  <Box>
                    <Text fontSize="15px" color="ripple.200" pb="10px">
                      Start Time
                    </Text>
                    <TimePicker
                      onChange={setStartTime}
                      value={startTime}
                      disableClock={true}
                    />
                  </Box>
                  <Box>
                    <Text fontSize="15px" color="ripple.200" pb="10px">
                      End Time
                    </Text>
                    <TimePicker
                      onChange={setEndTime}
                      value={endTime}
                      disabled={isAllDay}
                      disableClock={true}
                    />
                  </Box>
                </SimpleGrid>
                <VStack>
                  <SimpleGrid spacing="20px" columns={2}>
                    <Box>
                      <Text
                        pos="absolute"
                        fontSize="15px"
                        color="ripple.200"
                        pb="10px"
                      >
                        Contact
                      </Text>
                      <Box pt="20px">
                        <CustomAutoComplete
                          variant="outline"
                          size="md"
                          placeholder="Select task"
                          items={contacts}
                          itemRenderer={contactItem}
                          disableCreateItem={false}
                          onCreateItem={() => navigate("/contacts")}
                          value={contact ? contact : undefined}
                          valueInputAttribute="name"
                          onChange={handleContactSet}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <Text fontSize="15px" color="ripple.200" pb="10px">
                        Company
                      </Text>
                      <Text>{company}</Text>
                    </Box>
                    <Box>
                      <Text
                        pos="absolute"
                        fontSize="15px"
                        color="ripple.200"
                        pb="10px"
                      >
                        Deal
                      </Text>
                      <Box pt="20px">
                        <CustomAutoComplete
                          variant="outline"
                          size="md"
                          placeholder="Select deal"
                          items={deals}
                          itemRenderer={dealItem}
                          disableCreateItem={false}
                          onCreateItem={() => navigate("/deals")}
                          value={forDeal ? forDeal : undefined}
                          valueInputAttribute="name"
                          onChange={setForDeal}
                          showImage={false}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <Text
                        pos="absolute"
                        fontSize="15px"
                        color="ripple.200"
                        pb="10px"
                      >
                        Activity
                      </Text>
                      <Box pt="20px">
                        <CustomAutoComplete
                          variant="outline"
                          size="md"
                          placeholder="Select task"
                          items={tasks}
                          itemRenderer={taskItem}
                          disableCreateItem={false}
                          onCreateItem={() => navigate("/tasks")}
                          value={forTask ? forTask : undefined}
                          valueInputAttribute="name"
                          onChange={setForTask}
                          showImage={false}
                        />
                      </Box>
                    </Box>
                  </SimpleGrid>
                  <Box w="100%">
                    <Text
                      pt="10px"
                      fontSize="15px"
                      color="ripple.200"
                      pb="10px"
                    >
                      Interaction Description
                    </Text>
                    <Textarea
                      resize="none"
                      h="20vh"
                      placeholder="Notes"
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                    />
                  </Box>
                </VStack>
              </HStack>
              <Box pt="10px" align="end">
                <Button
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
                  Create Interaction
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
