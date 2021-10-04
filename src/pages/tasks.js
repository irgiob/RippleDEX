import React, { useState, useEffect } from "react"

import Board from "react-trello"

import Layout from "../components/layout"
import Seo from "../components/seo"
import TaskPopUp from "../components/tasks/taskPopup"
import {
  CustomAutoComplete,
  AutoCompleteListItem,
} from "../components/CustomAutoComplete"

import {
  Box,
  Button,
  Text,
  Icon,
  HStack,
  VStack,
  Spacer,
  Input,
  useDisclosure,
  useToast,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
} from "@chakra-ui/react"

import { HiOutlineTrash, HiCheck, HiOutlineX, HiPencil } from "react-icons/hi"
import { AiOutlineMore } from "react-icons/ai"

import {
  createNewTask,
  deleteTask,
  getTasksByOrg,
  updateTask,
} from "../models/Task"
import { getUser } from "../models/User"
import { getDealsByOrg } from "../models/Deal"
import { updateOrganization } from "../models/Organisation"

/**
 * Renders the page content
 */
const TasksPage = ({ user, setUser, org, setOrg }) => {
  const [tasks, setTasks] = useState([])
  const [lanes, setLanes] = useState([])
  const [deals, setDeals] = useState()
  const [members, setMembers] = useState()
  const [selected, setSelected] = useState()
  const toast = useToast()

  useEffect(() => {
    const fetchData = async org => {
      // set the lanes of the kanban board
      setLanes(org.kanbanLanes)

      // get deals for org
      const dealList = await getDealsByOrg(org.id)
      setDeals(dealList)

      // get members of org
      const memberList = []
      for await (const member of org.members) {
        const memberData = await getUser(member.userID)
        memberData.label = memberData.firstName + " " + memberData.lastName
        memberList.push(memberData)
      }
      setMembers(memberList)

      // get tasks of org
      const tasks = await getTasksByOrg(org.id)
      for await (const task of tasks) {
        if (task.deal)
          task.deal = dealList.filter(deal => deal.id === task.deal)[0]
        if (task.assignedUser)
          task.assignedUser = memberList.filter(
            member => member.id === task.assignedUser
          )[0]
      }
      setTasks(tasks)
    }
    fetchData(org)
  }, [org])

  // generate data object accepted by board component using tasks & lanes
  const generateBoardData = (tasks, lanes) => {
    const data = { lanes: [] }
    for (var lane of lanes) {
      data.lanes.push({
        id: lane,
        title: lane,
        cards: [],
      })
    }
    for (var task of tasks) {
      task.status = task.status.toLowerCase()
      if (lanes.map(lane => lane.toLowerCase()).includes(task.status))
        data.lanes
          .filter(lane => lane.id.toLowerCase() === task.status)[0]
          .cards.push(task)
    }
    return data
  }

  // Update the associated card document when it is moved to the database
  const updateCardMoveAcrossLanes = async (id, origin, destination) => {
    await updateTask(id, { status: destination.toLowerCase() })
    setTasks([
      ...tasks.filter(task => task.id !== id),
      { ...tasks.filter(task => task.id === id)[0], status: destination },
    ])
  }

  // Update the associated lane when it is moved to the database
  const updateLaneWhenDragged = async (fromIndex, toIndex, payload) => {
    // Editing array based on movement
    let tempLanes = lanes
    const moved = tempLanes[fromIndex]
    tempLanes.splice(fromIndex, 1)
    tempLanes.splice(toIndex, 0, moved)
    setLanes(tempLanes)

    // Update to firestore
    await updateOrganization(org.id, { kanbanLanes: tempLanes })
  }

  const NewLaneSection = ({ t, onClick }) => (
    <Box p="10px">
      <Button
        bgColor="ripple.200"
        color="white"
        _hover={{
          bgColor: "transparent",
          color: "ripple.200",
        }}
        onClick={onClick}
      >
        {t("Add another lane")}
      </Button>
    </Box>
  )

  const NewLaneForm = props => {
    const [laneName, setLaneName] = useState("")

    const handleAdd = async () => {
      await updateOrganization(org.id, { kanbanLanes: [...lanes, laneName] })
      toast({
        title: "Success",
        description: "New lane successfully added",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      setLanes([...lanes, laneName])
    }

    return (
      <VStack p="10px">
        <Input
          placeholder="Lane Title"
          onChange={event => setLaneName(event.target.value)}
        />
        <HStack>
          <Button
            bgColor="ripple.200"
            color="white"
            _hover={{
              bgColor: "transparent",
              color: "ripple.200",
            }}
            onClick={props.onCancel}
          >
            Cancel
          </Button>
          <Button
            bgColor="ripple.200"
            color="white"
            _hover={{
              bgColor: "transparent",
              color: "ripple.200",
            }}
            onClick={handleAdd}
          >
            Add new lane
          </Button>
        </HStack>
      </VStack>
    )
  }

  const NewCardForm = props => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [deal, setDeal] = useState()
    const [assignedUser, setAssignedUser] = useState()
    const toast = useToast()

    const handleAdd = async () => {
      const taskID = await createNewTask(
        deal?.id || null,
        description || null,
        name || null,
        org.id,
        props.laneId.toLowerCase(),
        assignedUser?.id || null
      )
      setTasks([
        ...tasks,
        {
          id: taskID,
          name: name || null,
          description: description || null,
          forOrganization: org.id,
          status: props.laneId,
          deal: deal || null,
          assignedUser: assignedUser || null,
        },
      ])
      toast({
        title: "Success",
        description: "New task successfully added",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }

    return (
      <VStack pt="10px">
        <Input
          w="14em"
          placeholder="Title"
          size="md"
          onChange={event => setName(event.target.value)}
        />
        <Input
          w="14em"
          placeholder="Description"
          size="md"
          onChange={event => setDescription(event.target.value)}
        />
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
        <HStack pt="5px" pb="10px">
          <Button
            size="sm"
            bgColor="ripple.200"
            color="white"
            _hover={{
              bgColor: "transparent",
              color: "ripple.200",
            }}
            onClick={props.onCancel}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            bgColor="ripple.200"
            color="white"
            _hover={{
              bgColor: "transparent",
              color: "ripple.200",
            }}
            onClick={handleAdd}
          >
            Add Card
          </Button>
        </HStack>
      </VStack>
    )
  }

  const CustomCard = props => {
    // attribute from https://stackoverflow.com/questions/10599933/convert-long-number-into-abbreviated-string-in-javascript-with-a-special-shortn
    const intToString = v => {
      var s = ["", "K", "M", "B", "T"]
      var n = Math.floor(("" + v).length / 3)
      var sv = parseFloat((n !== 0 ? v / Math.pow(1000, n) : v).toPrecision(2))
      if (sv % 1 !== 0) sv = sv.toFixed(1)
      return sv + s[n]
    }

    return (
      <Box
        m="0.25em"
        p="0.75em"
        borderRadius="0.75em"
        bgColor={props.bgColor == null ? "white" : props.bgColor}
        boxShadow="rgba(17, 17, 26, 0.1) 0px 1px 0px"
      >
        <VStack align="initial" w="100%" spacing={0}>
          <HStack spacing={0}>
            <Text
              maxW="160px"
              isTruncated
              fontFamily="Nunito-Bold"
              fontSize="15px"
            >
              {props.name || ""}
            </Text>
            <Spacer />
            <Box onClick={() => setSelected(props)}>
              <Icon cursor="pointer" height="24px" as={AiOutlineMore} />
            </Box>
          </HStack>
          <Text maxW="160px" isTruncated fontSize="13px">
            {props.description || ""}
          </Text>
          {props.deal && (
            <HStack spacing={1}>
              <Text maxW="120px" isTruncated fontSize="11px">
                {props.deal.name}
              </Text>
              <Spacer />
              <Text maxW="50px" isTruncated color="green" fontSize="11px">
                ${intToString(parseFloat(props.deal.dealSize))}
              </Text>
            </HStack>
          )}
        </VStack>
      </Box>
    )
  }

  // Custom lane header for the kanban board
  const CustomLaneHeader = ({ updateTitle, title }) => {
    const message = "Are you sure you want to delete the lane?"
    const warningMessage = "DELETING THIS WILL DELETE ALL TASK CARDS"
    const ref = React.useRef()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [editing, setEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(title)

    const deleteLane = async () => {
      // Update to firestore on lanes
      let tempLanes = lanes
      const removeIndex = tempLanes.indexOf(title)
      tempLanes.splice(removeIndex, 1)
      setLanes(tempLanes)
      await updateOrganization(org.id, { kanbanLanes: tempLanes })

      // Deleted associated cards in firestore
      const deleted = tasks.filter(task => task.status === title.toLowerCase())
      for (const task of deleted) await deleteTask(task.id)
      setTasks(tasks.filter(task => !deleted.includes(task)))

      onClose()
      toast({
        title: "Success",
        description: "Lane successfuly deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }

    const updateLaneTitle = async () => {
      // Update lane names for organization locally
      let editLane = lanes
      const index = editLane.indexOf(title)
      if (index !== -1) editLane[index] = editTitle
      setLanes(editLane)

      // Update lane names for organization in firestore
      await updateOrganization(org.id, { kanbanLanes: lanes })

      // Update lane names for tasks in firestore
      tasks
        .filter(task => task.status === title.toLowerCase())
        .forEach(
          async task =>
            await updateTask(task.id, { status: editTitle.toLowerCase() })
        )

      // disable edit mode and give user confirmation
      updateTitle(editTitle)
      setEditing(false)
      toast({
        title: "Success",
        description: "Lane successfuly renamed",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }

    return (
      <Box pl="10px" pr="10px">
        <HStack>
          {editing ? (
            <Box>
              <Input
                placeholder="Event title"
                value={editTitle}
                onChange={event => setEditTitle(event?.target.value)}
                size="sm"
              />
            </Box>
          ) : (
            <Text width="10vw" height="2.5vh">
              {title}
            </Text>
          )}
          <Spacer />
          <Popover initialFocusRef={ref} isOpen={isOpen} closeOnBlur={true}>
            <PopoverTrigger>
              <Box>
                {!editing ? (
                  <>
                    {/* Remove edit and delete buttons when editing or the lane is from a default table  */}
                    <HStack>
                      <Icon
                        height="24px"
                        as={HiPencil}
                        onClick={() => {
                          setEditing(true)
                        }}
                      />
                      <Icon
                        height="24px"
                        color="red"
                        as={HiOutlineTrash}
                        onClick={onOpen}
                      />
                    </HStack>
                  </>
                ) : (
                  <HStack>
                    <Icon
                      size="24px"
                      as={HiCheck}
                      _hover={{ transform: "scale(1.08)" }}
                      onClick={updateLaneTitle}
                    />
                    <Icon
                      size="24px"
                      as={HiOutlineX}
                      _hover={{ transform: "scale(1.08)" }}
                      onClick={() => setEditing(false)}
                    />
                  </HStack>
                )}
              </Box>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>
                  <Text fontSize="24px">Confirmation</Text>
                </PopoverHeader>
                <PopoverCloseButton onClick={onClose} />
                <PopoverBody>
                  <Text>{message}</Text>
                  <Text color="red">WARNING : {warningMessage}</Text>
                </PopoverBody>
                <PopoverFooter>
                  <Box align="center">
                    <HStack>
                      <Icon
                        w={8}
                        h={8}
                        borderRadius="5px"
                        border="10px"
                        color="white"
                        backgroundColor="red"
                        as={HiOutlineX}
                        _hover={{ transform: "scale(1.08)" }}
                        onClick={() => onClose()}
                      />
                      <Spacer />
                      <Icon
                        w={8}
                        h={8}
                        borderRadius="5px"
                        color="white"
                        border="10px"
                        backgroundColor="green"
                        as={HiCheck}
                        _hover={{ transform: "scale(1.08)" }}
                        onClick={deleteLane}
                      />
                    </HStack>
                  </Box>
                </PopoverFooter>
              </PopoverContent>
            </Portal>
          </Popover>
        </HStack>
      </Box>
    )
  }

  return (
    <>
      <Box pt="25px" pl="25px">
        <Text fontFamily="Raleway-Bold" fontSize="28px" color="ripple.200">
          Tasks
        </Text>
        <Text></Text>
      </Box>
      <Board
        style={{
          height: "80vh",
          backgroundColor: "transparent",
          padding: "20px",
        }}
        laneStyle={{
          borderRadius: "20px",
          backgroundColor: "#f7f7f7",
          paddingTop: "15px",
        }}
        tagStyle={{
          paddingTop: "5px",
          paddingBottom: "5px",
          paddingLeft: "10px",
          paddingRight: "10px",
          borderRadius: "20px",
        }}
        canAddLanes
        components={{
          NewCardForm: NewCardForm,
          Card: CustomCard,
          NewLaneSection: NewLaneSection,
          NewLaneForm: NewLaneForm,
          LaneHeader: CustomLaneHeader,
        }}
        editable
        draggable
        data={generateBoardData(tasks, lanes)}
        handleDragEnd={updateCardMoveAcrossLanes}
        handleLaneDragEnd={updateLaneWhenDragged}
      />
      <TaskPopUp
        selected={selected}
        setSelected={setSelected}
        deals={deals}
        members={members}
        afterUpdate={updatedTask => {
          setTasks([
            ...tasks.filter(task => task.id !== updatedTask.id),
            ...(updatedTask.deleted ? [] : [updatedTask]),
          ])
        }}
        org={org}
      />
    </>
  )
}

const Tasks = props => {
  return (
    <Layout location={props.location}>
      <Seo title="Tasks" />
      <TasksPage />
    </Layout>
  )
}

export default Tasks
