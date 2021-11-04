import React, { useState, useEffect } from "react"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
  HStack,
  Box,
  Text,
  useToast,
  Textarea,
  Select,
  Spacer,
} from "@chakra-ui/react"

import { CustomAutoComplete, AutoCompleteListItem } from "../CustomAutoComplete"

import { deleteTask, updateTask } from "../../models/Task"

import { HiOutlineTrash } from "react-icons/hi"

/**
 * @property {Object} selected the currently selected task that opens the popup
 * @property {function} setSelected functon to change currently selected task
 * @property {function} afterUpdate function to run after update is complete
 * @property {Object} org organization data to updated task
 * @returns {JSX}
 */
const TaskPopUp = ({
  selected,
  setSelected,
  deals,
  members,
  afterUpdate,
  org,
}) => {
  const [name, setName] = useState("")
  const [deal, setDeal] = useState()
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [assignedUser, setAssignedUser] = useState()
  const [lanes, setLanes] = useState([])
  const toast = useToast()

  useEffect(() => {
    if (selected && org?.kanbanLanes) {
      setLanes(org.kanbanLanes)
      setName(selected.name)
      setDescription(selected.description)
      setStatus(selected.status)
      setDeal(selected.deal)
      setAssignedUser(selected.assignedUser)
    }
  }, [selected, org])

  const handleClick = async () => {
    const options = {
      deal: deal?.id || null,
      name: name || null,
      description: description || null,
      status: status.toLowerCase(),
      assignedUser: assignedUser?.id || null,
    }
    await updateTask(selected.id, options)
    toast({
      title: "Success",
      description: "Your task details have been updated",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    afterUpdate({
      ...selected,
      ...options,
      deal: deal,
      assignedUser: assignedUser,
    })
    setSelected(null)
  }

  const handleDelete = async () => {
    await deleteTask(selected.id)
    afterUpdate({ id: selected.id, deleted: true })
    toast({
      title: "Success",
      description: "The task has been deleted",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    setSelected(null)
  }

  return (
    <Modal isCentered isOpen={selected} onClose={() => setSelected(null)}>
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
                  data-testid="taskName"
                  onChange={event => setName(event?.target.value)}
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
                <CustomAutoComplete
                  placeholder="Deal"
                  items={deals}
                  itemRenderer={deal => (
                    <AutoCompleteListItem name={deal.name} showImage={false} />
                  )}
                  disableCreateItem={true}
                  onCreateItem={() => null}
                  value={deal ? deal : undefined}
                  onChange={setDeal}
                  valueInputAttribute="name"
                  size="md"
                  variant="outline"
                  showImage={false}
                />
              </Box>
            </HStack>
            <HStack w="100%">
              <Text width="12vw">Assigned to :</Text>
              <Box w="60%">
                <CustomAutoComplete
                  placeholder="Member"
                  items={members}
                  itemRenderer={member => (
                    <AutoCompleteListItem
                      name={member.label}
                      profilePicture={member.profilePicture}
                    />
                  )}
                  disableCreateItem={true}
                  onCreateItem={() => null}
                  value={assignedUser ? assignedUser : undefined}
                  onChange={setAssignedUser}
                  valueInputAttribute="label"
                  size="md"
                  variant="outline"
                />
              </Box>
            </HStack>
            <HStack w="60%">
              <Text width="12vw">Status :</Text>
              <Box w="40%">
                <Select
                  value={status}
                  onChange={event =>
                    setStatus(event?.target.selectedOptions[0].value)
                  }
                >
                  {lanes.map(lane => (
                    <option key={lane} value={lane.toLowerCase()}>
                      {lane}
                    </option>
                  ))}
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
                _hover={{ transform: "scale(1.05)" }}
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
                _hover={{ transform: "scale(1.05)" }}
                padding="20px"
                data-testid="addButton"
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
