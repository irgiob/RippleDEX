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
  VStack,
  HStack,
  Box,
  useMediaQuery,
  useToast,
  Textarea,
  Select,
  Spacer,
} from "@chakra-ui/react"

import { deleteTask, updateTask } from "../../models/Task"

import { HiOutlineTrash } from "react-icons/hi"

/**
 *
 * @property {bool} isOpen checks if pop up will be opened using useDisclosure
 * @property {function} onClose close the pop up using useDisclosure
 * @property {Object} value initial value passed to the pop up, Interaction document
 * @property {function} afterUpdate function to run after update is complete
 * @returns {JSX}
 */
const TaskPopUp = ({ isOpen, onClose, value, setValue, afterUpdate, org }) => {
  const [isLargeSize] = useMediaQuery("(min-width: 42em)")

  const [name, setName] = useState("")
  const [deal, setDeal] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [company, setCompany] = useState([])
  const [interactions, setInteractions] = useState([])
  const [assignedUsers, setAssignedUsers] = useState([])
  const [lanes, setLanes] = useState([])
  const toast = useToast()

  useEffect(() => {
    if (value && org?.kanbanLanes) {
      setName(value.name)
      setDeal(value.deal)
      setDescription(value.description)
      setStatus(value.status)
      setCompany(value.company)
      setInteractions(value.interactions)
      setAssignedUsers(value.assignedUsers)
      setLanes(org.kanbanLanes)
    }
  }, [value])

  const handleClick = async () => {
    const options = {
      deal: deal,
      name: name,
      description: description,
      status: status,
      company: company,
      interactions: interactions,
      assignedUsers: assignedUsers,
    }

    await updateTask(value.id, options)

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

  const handleDelete = async () => {
    try {
      await deleteTask(value.id)
      onClose()
    } catch (err) {
      console.error("Fail to delete")
    }
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent isCentered maxW="700px" borderRadius="15px">
        <ModalCloseButton m="20px" />
        <ModalBody m="20px">
          <Text
            pb="20px"
            fontSize="25px"
            fontFamily="Raleway-Bold"
            color="ripple.200"
          >
            Edit Task
          </Text>
          <VStack align="start" spacing="10px">
            <HStack w="100%">
              <Text width="12vw">Name :</Text>
              <Box w="60%">
                <Input
                  placeholder="Task name"
                  value={name}
                  onChange={event => {
                    setName(event?.target.value)
                  }}
                />
              </Box>
            </HStack>
            <HStack w="100%" align="start">
              <Text width="12vw">Description :</Text>
              <Box w="60%">
                <Textarea
                  resize="none"
                  placeholder="Task description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </Box>
            </HStack>
            <HStack w="100%">
              <Text width="12vw">Deal :</Text>
              <Box w="60%">
                <Input
                  placeholder="Deal"
                  value={deal}
                  onChange={event => {
                    setDeal(event?.target.value)
                  }}
                />
              </Box>
            </HStack>
            <HStack w="60%">
              <Text width="12vw">Status :</Text>
              <Box w="40%">
                <Select
                  value={status}
                  onChange={event => setStatus(event?.target.value)}
                >
                  {
                    // Interate options from kanban lanes
                    lanes.map(lane => (
                      <option value={lane}>{lane}</option>
                    ))
                  }
                </Select>
              </Box>
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Box align="left">
              <Button
                mb="20px"
                bgColor="red"
                color="white"
                fontFamily="Raleway-Bold"
                variant="solid"
                borderRadius="30px"
                _hover={{
                  transform: "scale(1.05)",
                }}
                padding="20px"
                leftIcon={<HiOutlineTrash />}
                onClick={handleDelete}
              >
                Delete task
              </Button>
            </Box>
            <Spacer />
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
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default TaskPopUp
