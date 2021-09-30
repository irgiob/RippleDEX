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
  Select,
  Spacer,
} from "@chakra-ui/react"

import { updateInteraction } from "../../models/Interaction"
import { deleteTask } from "../../models/Task"

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

      <ModalContent
        h="60vh"
        maxW="60vw"
        borderRadius="15px"
        overflowY="scroll"
        value="inside"
      >
        <ModalHeader m="10px" fontSize="36px">
          Edit Task
        </ModalHeader>
        <ModalCloseButton m="20px" />
        <ModalBody m="20px">
          <HStack margin="10px">
            <Text width="12vw">Name :</Text>
            <Box>
              <Input
                placeholder="Task name"
                value={name}
                onChange={event => {
                  setName(event?.target.value)
                }}
                width="20vw"
              />
            </Box>
          </HStack>
          <HStack margin="10px">
            <Text width="12vw">Description :</Text>
            <Box>
              <Textarea
                resize="none"
                h="10vh"
                placeholder="Task description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Box>
          </HStack>
          <HStack margin="10px">
            <Text width="12vw">Deal :</Text>
            <Box>
              <Input
                placeholder="Deal"
                value={deal}
                onChange={event => {
                  setDeal(event?.target.value)
                }}
              />
            </Box>
          </HStack>
          <HStack margin="10px">
            <Text width="12vw">Status :</Text>
            <Box>
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
