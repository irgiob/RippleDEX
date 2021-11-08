import React, { useState, useEffect } from "react"
import { navigate } from "gatsby-link"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Text,
  Input,
  Switch,
  HStack,
  VStack,
  Box,
  useToast,
  Textarea,
} from "@chakra-ui/react"

import { RiArrowLeftSLine } from "react-icons/ri"

import { CustomAutoComplete, AutoCompleteListItem } from "../CustomAutoComplete"
import CustomDatePicker from "../CustomDatePicker"
import { dateToFirebaseTimestamp } from "../../utils/DateTimeHelperFunctions"
import {
  createNewInteraction,
  updateInteraction,
} from "../../models/Interaction"

/**
 *
 * @property {Object}   selected initial value passed to the pop up, Interaction document
 * @property {function} setSelected change currently selected interaction
 * @property {function} afterUpdate function to run after update is complete
 * @returns {JSX}
 */
const InteractionPopUp = ({
  selected,
  setSelected,
  afterUpdate,
  contacts,
  tasks,
  deals,
  companies,
  members,
}) => {
  const [title, setTitle] = useState()
  const [times, setTimes] = useState()
  const [contact, setContact] = useState()
  const [forTask, setForTask] = useState()
  const [forDeal, setForDeal] = useState()
  const [member, setMember] = useState()
  const [notes, setNotes] = useState()
  const [remindMe, setRemindMe] = useState(false)
  const [type, setType] = useState()
  const [company, setCompany] = useState()
  const toast = useToast()

  useEffect(() => {
    if (selected) {
      setTitle(selected.name)
      const s = selected.meetingStart ? selected.meetingStart.toDate() : null
      const e = selected.meetingEnd ? selected.meetingEnd.toDate() : null
      selected.meetingStart ? setTimes([s, e]) : setTimes(null)
      setRemindMe(selected.remindMe)
      setContact(selected.contact)
      setForDeal(selected.forDeal)
      setForTask(selected.forTask)
      setNotes(selected.notes)
      setType(selected.meetingType)
      setMember(selected.addedBy)
      if (selected.contact) {
        const company = companies.filter(
          company => company.id === selected.contact.company
        )[0]
        setCompany(company.name)
      }
    }
  }, [selected, companies])

  const handleClick = async () => {
    // Parse time into date
    const start = times && times[0] ? dateToFirebaseTimestamp(times[0]) : null
    const end = times && times[1] ? dateToFirebaseTimestamp(times[1]) : null

    const options = {
      contact: contact?.id || null,
      forDeal: forDeal?.id || null,
      forTask: forTask?.id || null,
      addedBy: member?.id || null,
      meetingType: type || null,
      notes: notes || null,
      name: title || null,
      meetingStart: start,
      meetingEnd: end,
      remindMe: remindMe,
    }

    var toastString = ""
    if (selected.id) {
      await updateInteraction(selected.id, options)
      toastString = "Your The Interaction Detail Have Been Updated"
    } else {
      if (!options.name) {
        options.name = "Meeting"
        if (options.meetingStart)
          options.name =
            options.meetingStart.toDate().toLocaleDateString("en-GB") +
            " " +
            options.name
        if (contact) options.name += " with " + contact.name
      }
      const interactionID = await createNewInteraction(
        selected.forOrganization,
        options.contact,
        options.addedBy,
        options.forDeal,
        options.meetingStart,
        options.meetingType,
        options.notes,
        options.forTask,
        options.remindMe,
        options.name,
        options.meetingEnd
      )
      selected.id = interactionID
      toastString = "New interaction has been added"
    }

    toast({
      title: "Success",
      description: toastString,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    afterUpdate({
      ...selected,
      ...options,
      contact: contact,
      forDeal: forDeal,
      forTask: forTask,
      addedBy: member,
    })
  }

  const dealItem = deal => {
    return <AutoCompleteListItem name={deal.name} showImage={false} />
  }

  const taskItem = task => {
    return <AutoCompleteListItem name={task.name} showImage={false} />
  }

  const contactItem = contact => {
    return (
      <AutoCompleteListItem
        name={contact.name}
        profilePicture={contact.profilePicture}
      />
    )
  }

  const memberItem = member => {
    return (
      <AutoCompleteListItem
        name={member.label}
        profilePicture={member.profilePicture}
      />
    )
  }

  const handleContactSet = async contact => {
    setContact(contact)
    if (contact) {
      const con = contacts.filter(con => con.id === contact.id)[0]
      const com = companies.filter(com => com.id === con.company)[0]
      setCompany(com?.name)
    }
  }

  const displayDates = dates => {
    var date = dates[0].toLocaleDateString("en-GB")
    if (dates[1]) {
      date +=
        " " +
        dates[0].toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      date +=
        " - " +
        dates[1].toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
    }
    return date
  }

  return (
    <Modal isCentered isOpen={selected} onClose={() => setSelected(null)}>
      <ModalOverlay />
      <ModalContent maxW="850px">
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
                _hover={{ transform: "scale(1.05)" }}
                data-testid="interactionOpenButton"
                onClick={() => setSelected(null)}
              >
                {title ? title : "Interaction"}
              </Button>
            </Box>
            <VStack>
              <HStack w="100%" spacing="1em">
                <Box w="45%">
                  <Text fontSize="15px" color="ripple.200" pb="10px">
                    Meeting Name
                  </Text>
                  <Input
                    placeholder="Event title"
                    value={title}
                    data-testid="Name"
                    onChange={event => setTitle(event.target.value)}
                  />
                </Box>
                <Box w="30%">
                  <Text fontSize="15px" color="ripple.200" pb="10px">
                    Meeting Type
                  </Text>
                  <Input
                    placeholder="Meeting type"
                    value={type}
                    data-testid="type"
                    onChange={event => setType(event.target.value)}
                  />
                </Box>
                <Box w="25%">
                  <Text fontSize="15px" color="ripple.200">
                    Interacted With
                  </Text>
                  <CustomAutoComplete
                    variant="outline"
                    size="md"
                    placeholder="Select member"
                    items={members}
                    itemRenderer={memberItem}
                    disableCreateItem={true}
                    onCreateItem={() => null}
                    value={member || undefined}
                    valueInputAttribute="label"
                    onChange={setMember}
                  />
                </Box>
              </HStack>
              <HStack w="100%" spacing="2em" align="start">
                <VStack w="60%" pt="10px">
                  <HStack w="100%">
                    <Box w="70%">
                      <Text fontSize="15px" color="ripple.200" pb="10px">
                        Date of Interaction
                      </Text>
                      <CustomDatePicker times={times} setTimes={setTimes}>
                        <Input
                          placeholder="Select meeting time"
                          data-testid="time"
                          value={times ? displayDates(times) : null}
                          isReadOnly
                        />
                      </CustomDatePicker>
                    </Box>
                    <Box w="20%">
                      <Text fontSize="15px" color="white" pb="10px">
                        {"_"}
                      </Text>
                      <HStack align="center" w="10em">
                        <Text fontSize="15px" color="ripple.200">
                          Remind Me
                        </Text>
                        <Switch
                          onChange={() => setRemindMe(!remindMe)}
                          isChecked={remindMe}
                        />
                      </HStack>
                    </Box>
                  </HStack>
                  <HStack w="100%" spacing="1em">
                    <Box w="50%">
                      <Text fontSize="15px" color="ripple.200">
                        Deal
                      </Text>
                      <CustomAutoComplete
                        variant="outline"
                        size="md"
                        placeholder="Select deal"
                        items={deals}
                        itemRenderer={dealItem}
                        disableCreateItem={false}
                        onCreateItem={() => navigate("/deals")}
                        value={forDeal || undefined}
                        valueInputAttribute="name"
                        onChange={setForDeal}
                        showImage={false}
                      />
                    </Box>
                    <Box w="50%">
                      <Text fontSize="15px" color="ripple.200">
                        Task
                      </Text>
                      <CustomAutoComplete
                        variant="outline"
                        size="md"
                        placeholder="Select task"
                        items={
                          forDeal
                            ? tasks.filter(task => task.deal === forDeal.id)
                            : tasks
                        }
                        itemRenderer={taskItem}
                        disableCreateItem={false}
                        onCreateItem={() => navigate("/tasks")}
                        value={
                          forDeal && forTask
                            ? forDeal.id === forTask.deal
                              ? forTask
                              : undefined
                            : forTask || undefined
                        }
                        valueInputAttribute="name"
                        onChange={task => {
                          setForTask(task)
                          if (!forDeal && task)
                            setForDeal(
                              deals.filter(deal => deal.id === task.deal)[0]
                            )
                        }}
                        showImage={false}
                      />
                    </Box>
                  </HStack>
                  <HStack w="100%" spacing="1em">
                    <Box w="50%">
                      <Text fontSize="15px" color="ripple.200">
                        Contact
                      </Text>
                      <CustomAutoComplete
                        variant="outline"
                        size="md"
                        placeholder="Select contact"
                        items={
                          forDeal
                            ? contacts.filter(contact => {
                                const company = companies.filter(
                                  company => company.id === forDeal.company
                                )[0]
                                return company
                                  ? company.id === contact.company
                                  : false
                              })
                            : contacts
                        }
                        itemRenderer={contactItem}
                        disableCreateItem={false}
                        onCreateItem={() => navigate("/contacts")}
                        value={
                          forDeal && contact
                            ? companies.filter(
                                company =>
                                  company.id === forDeal?.company &&
                                  company.id === contact?.company
                              ).length > 0
                              ? contact
                              : undefined
                            : contact || undefined
                        }
                        valueInputAttribute="name"
                        onChange={handleContactSet}
                      />
                    </Box>
                    <Box w="50%">
                      <Text fontSize="15px" color="ripple.200" pb="10px">
                        Company
                      </Text>
                      <Text>{contact ? company : "No Contact Selected"}</Text>
                    </Box>
                  </HStack>
                </VStack>
                <VStack w="40%">
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
                      h="10em"
                      placeholder="Notes"
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                    />
                  </Box>
                  <Box w="100%" pt="10px" align="end">
                    <Button
                      bgColor="ripple.200"
                      color="white"
                      fontFamily="Raleway-Bold"
                      variant="solid"
                      borderRadius="30px"
                      _hover={{ transform: "scale(1.05)" }}
                      padding="20px"
                      data-testid="addButton"
                      onClick={handleClick}
                    >
                      {selected?.id ? "Save Changes" : "Add Meeting"}
                    </Button>
                  </Box>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default InteractionPopUp
