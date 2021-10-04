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
  navigate,
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

import { getTimeFromDate } from "../../utils/DateTimeHelperFunctions"
import { updateInteraction } from "../../models/Interaction"
import { getCompany } from "../../models/Company"

import { CustomAutoComplete, AutoCompleteListItem } from "../CustomAutoComplete"
import { getContact } from "../../models/Contact"

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
  contacts,
  tasks,
  deals,
}) => {
  const [isLargeSize] = useMediaQuery("(min-width: 42em)")

  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date())
  const [startTime, setStartTime] = useState("10:00")
  const [endTime, setEndTime] = useState("11:00")
  const [isAllDay, setAllDay] = useState(false)
  const [contact, setContact] = useState("")
  const [forTask, setForTask] = useState("")
  const [forOrganization, setForOrganization] = useState("")
  const [forDeal, setForDeal] = useState("")
  const [notes, setNotes] = useState("")
  const [remindMe, setRemindMe] = useState(false)
  const [type, setType] = useState("")
  const [company, setCompany] = useState("")
  const toast = useToast()

  useEffect(async () => {
    console.log(value)
    if (value) {
      console.log(contacts, tasks, deals)
      setTitle(value.name)
      setDate(value.meetingStart.toDate())
      setStartTime(getTimeFromDate(value.meetingStart.toDate()))
      setEndTime(
        value.meetingEnd ? getTimeFromDate(value.meetingEnd.toDate()) : "00:00"
      )
      setAllDay(value.meetingEnd ? false : true)
      setRemindMe(value.remindMe)
      setContact(value.contact)
      setForDeal(value.forDeal)
      setForTask(value.forTask)
      setNotes(value.notes)
      setType(value.meetingType)

      console.log(value.contact.company)
      if (value.contact) {
        const company = await getCompany(value.contact.company)
        setCompany(company.name)
      }
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
      contact: contact,
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

  const dealItem = deal => {
    return <AutoCompleteListItem name={deal.name} showImage={false} />
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
    return <AutoCompleteListItem name={task.name} showImage={false} />
  }

  const handleContactSet = async contactID => {
    setContact(contactID)
    if (contactID) {
      const contactDoc = await getContact(contactID)
      const company = await getCompany(contactDoc.company)
      setCompany(company.name)
    }
  }

  return (
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
                <SimpleGrid pt="5px" textAlign="left" columns={2} spacing="5px">
                  <Text fontSize="15px" color="ripple.200" pb="10px">
                    All Day
                  </Text>
                  <Switch onChange={switchChangeHandler} isChecked={isAllDay} />
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
                        placeholder="Select contact"
                        items={contacts}
                        itemRenderer={contactItem}
                        disableCreateItem={false}
                        onCreateItem={() => navigate("/contacts")}
                        value={contact}
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
                        value={forDeal}
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
                        value={forTask}
                        valueInputAttribute="name"
                        onChange={setForTask}
                        showImage={false}
                      />
                    </Box>
                  </Box>
                </SimpleGrid>
                <Box w="100%">
                  <Text pt="10px" fontSize="15px" color="ripple.200" pb="10px">
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
                Save Changes
              </Button>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default InteractionPopUp
