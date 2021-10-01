import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Board, { Lane } from "react-trello"

import {
  Box,
  Button,
  Text,
  Image,
  HStack,
  VStack,
  Spacer,
  Icon,
  Input,
  Tooltip,
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

import { HiOutlineTrash, HiCheck, HiOutlineX, HiEdit } from "react-icons/hi"
import { MdEdit } from "react-icons/md"
import { AiOutlineMore } from "react-icons/ai"

import {
  createNewTask,
  deleteTask,
  getTask,
  getTasksByOrg,
  updateTask,
} from "../models/Task"
import { getDeal } from "../models/Deal"
import { updateOrganization, DEFAULT_STATUS } from "../models/Organisation"
import TaskPopUp from "../components/tasks/taskPopup"

/**
 * Renders the page content
 */
const TasksPage = ({ user, setUser, org, setOrg }) => {
  const [eventBus, setEventBus] = React.useState(undefined)
  const [lanes, setLanes] = React.useState([])
  const [laneCards, setLaneCards] = React.useState({})
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editDoc, setEditDoc] = React.useState({})

  React.useEffect(() => {
    initLanes()
    loadData()
    setLanes(org.kanbanLanes)
  }, [eventBus, isOpen])

  // Initialize lanes
  const initLanes = () => {
    let lanesArr = []
    lanes.forEach(lane => {
      lanesArr.push({
        title: lane,
        id: lane.toLowerCase(),
        cards: [],
      })
    })
    return { lanes: lanesArr }
  }

  // Load the kanban cards from firestore
  const loadData = async () => {
    if (eventBus) {
      // Create an object that has lane as key and cards id as element in array
      let laneCardsObj = {}
      lanes.forEach(lane => (laneCardsObj[lane.toLowerCase()] = []))
      // Retrieve data from database
      try {
        const docs = await getTasksByOrg(org.id)
        docs.forEach(async doc => {
          const deal = await getDeal(doc.deal)

          const laneId = org.kanbanLanes
            .map(lane => lane.toLowerCase())
            .includes(doc.status.toLowerCase())
            ? doc.status.toLowerCase()
            : DEFAULT_STATUS.toLowerCase()
          // Add cards to kanban board
          eventBus.publish({
            type: "ADD_CARD",
            laneId: laneId,
            card: {
              id: doc.id,
              title: doc.name,
              dealName: deal?.name ? deal.name : "Does not exist",
              dealSize: deal?.dealSize ? deal.dealSize : 0,
              description: doc.description,
            },
          })

          // Update lane card
          laneCardsObj[laneId].push(doc.id)
        })
        setLaneCards(laneCardsObj)
      } catch (err) {
        console.log(err)
      }
    }
  }

  // Update the associated card document when it is moved to the database
  const updateCardMoveAcrossLanes = async (id, origin, destination) => {
    try {
      await updateTask(id, { status: destination })
    } catch (err) {
      console.error("Error in updating card into firestore")
    }
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
    try {
      await updateOrganization(org.id, {
        kanbanLanes: tempLanes,
      })
    } catch (error) {
      console.error("Fail to update lane swap in firestore")
    }
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
    console.log(props)
    const { onCancel, t } = props
    const [LaneName, setLaneName] = React.useState("")

    const handleAdd = async () => {
      props.onAdd({ id: LaneName.toLowerCase(), title: LaneName })
      org.kanbanLanes.push(LaneName)
      try {
        await updateOrganization(org.id, { kanbanLanes: org.kanbanLanes })
        toast({
          title: "Success",
          description: "New lane successfully added",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      } catch (err) {}
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
            onClick={onCancel}
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
    const [name, setName] = React.useState("")
    const [description, setDescription] = React.useState("")
    // const [dealName, setDealName] = React.useState("")
    // const [dealSize, setDealSize] = React.useState("")
    const [dealId, setDealId] = React.useState("")

    const handleAdd = async () => {
      const deal = await getDeal(dealId)
      props.onAdd({
        title: name,
        description: description,
        dealName: deal?.name ? deal.name : "Does not exist",
        dealSize: deal?.dealSize ? deal.dealSize : 0,
      })
      console.log(props.laneId)
      try {
        await createNewTask(dealId, description, name, org.id, props.laneId)
        toast({
          title: "Success",
          description: "New task successfully added",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Fail",
          description: "Fail to add task",
          status: "fail",
          duration: 5000,
          isClosable: true,
        })
      }
    }

    return (
      <VStack pt="10px">
        <Input
          placeholder="Title"
          size="sm"
          onChange={event => setName(event.target.value)}
        />
        <Input
          placeholder="Description"
          size="sm"
          onChange={event => setDescription(event.target.value)}
        />
        <Input
          placeholder="Deal ID" // In this case ID, will be replaced with search bar
          size="sm"
          onChange={event => setDealId(event.target.value)}
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
    const handleMoreInfoClick = async () => {
      try {
        const doc = await getTask(props.id)
        setEditDoc(doc)
        onOpen()
      } catch (err) {
        console.log(err)
      }
    }

    return (
      <Box
        m="5px"
        pb="10px"
        pl="12px"
        pr="11px"
        borderRadius="10px"
        bgColor={props.bgColor == null ? "white" : props.bgColor}
        boxShadow="rgba(17, 17, 26, 0.1) 0px 1px 0px"
      >
        <HStack spacing="10px">
          {/* {props.img != null && <Image pt="10px" h="40px" src={props.img} />} */}
          <VStack align="initial" w="100%" spacing={0}>
            <HStack spacing={0}>
              <Text
                pt="10px"
                maxW="160px"
                isTruncated
                fontFamily="Nunito-Bold"
                fontSize="15px"
              >
                {props.title}
              </Text>
              <Spacer />
              <Box onClick={handleMoreInfoClick}>
                <Icon height="24px" as={AiOutlineMore} />
              </Box>
            </HStack>
            <HStack spacing="2px">
              <Text maxW="160px" isTruncated fontSize="13px">
                {props.description}
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Text maxW="120px" isTruncated fontSize="11px">
                {props.dealName}
              </Text>
              <Spacer />
              <Text maxW="50px" isTruncated color="green" fontSize="11px">
                ${props.dealSize}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    )
  }

  const CustomLaneHeader = ({
    updateTitle,
    canAddLanes,
    onDelete,
    onDoubleClick,
    editLaneTitle,
    label,
    title,
    titleStyle,
    labelStyle,
    t,
    laneDraggable,
  }) => {
    const message = "Are you sure you want to delete the lane?"
    const warningMessage = "DELETING THIS WILL DELETE ALL TASK CARDS"
    const ref = React.useRef()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [editing, setEditing] = React.useState(false)
    const [editTitle, setEditTitle] = React.useState(title)

    const cancelClick = () => {
      onClose()
      console.log(laneCards[title.toLowerCase()])
    }
    const confirmClick = async () => {
      onClose()

      // Update to firestore on lanes
      let tempLanes = lanes
      const removeIndex = tempLanes.indexOf(title)
      tempLanes.splice(removeIndex, 1)
      setLanes(tempLanes)
      try {
        await updateOrganization(org.id, {
          kanbanLanes: tempLanes,
        })
      } catch (error) {
        console.error("Fail to update lane swap in firestore")
      }

      // Deleted associated cards in firestore
      laneCards[title.toLowerCase()].forEach(async id => {
        await deleteTask(id)
      })

      onDelete()
    }

    const confirmEdit = async () => {
      try {
        // Update array and laneCards, replacing title with the appropriate one
        let editLane = lanes
        const index = editLane.indexOf(title)
        if (index !== -1) {
          editLane[index] = editTitle
        }
        setLanes(editLane)

        let editLaneCardsObj = laneCards
        editLaneCardsObj[editTitle] = editLaneCardsObj[title]
        delete editLaneCardsObj[title]
        setLaneCards(editLaneCardsObj)
        updateTitle(editTitle)

        setEditing(false)

        // Update lane names for organization in firestore
        await updateOrganization(org.id, { kanbanLanes: lanes })

        // Update lane names for tasks in firestore
        laneCards[title].forEach(async id => {
          await updateTask(id, { status: editTitle })
        })

        toast({
          title: "Success",
          description: "Lane successfuly renamed",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      } catch (err) {
        console.log(err)
        console.error("Fail to update lane name")
      }
    }

    return (
      <>
        <Box paddingLeft="10px" paddingRight="10px">
          <HStack>
            <Box p="12px">
              <>
                {editing ? (
                  <>
                    <HStack>
                      <Input
                        placeholder="Event title"
                        value={editTitle}
                        onChange={event => {
                          setEditTitle(event?.target.value)
                        }}
                        width="10vw"
                        height="2.5vh"
                      />

                      <Icon
                        as={HiCheck}
                        _hover={{ transform: "scale(1.08)" }}
                        onClick={confirmEdit}
                      />
                      <Icon
                        as={HiOutlineX}
                        _hover={{ transform: "scale(1.08)" }}
                        onClick={() => {
                          setEditing(false)
                        }}
                      />
                    </HStack>
                  </>
                ) : (
                  <Text width="10vw" height="2.5vh">
                    {title}
                  </Text>
                )}
              </>
            </Box>
            <Spacer />
            <Popover initialFocusRef={ref} isOpen={isOpen} closeOnBlur={true}>
              <PopoverTrigger>
                <Box>
                  {!editing && title !== DEFAULT_STATUS ? (
                    <>
                      <HStack>
                        <Icon
                          height="24px"
                          as={MdEdit}
                          onClick={() => {
                            setEditing(true)
                          }}
                          border="10px"
                        />
                        <Spacer />
                        <Icon
                          border="10px"
                          height="24px"
                          color="red"
                          as={HiOutlineTrash}
                          onClick={onOpen}
                        />
                      </HStack>
                    </>
                  ) : (
                    <></>
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
                    {warningMessage ? (
                      <Text color="red">WARNING : {warningMessage}</Text>
                    ) : (
                      <></>
                    )}
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
                          onClick={cancelClick}
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
                          onClick={confirmClick}
                        />
                      </HStack>
                    </Box>
                  </PopoverFooter>
                </PopoverContent>
              </Portal>
            </Popover>
          </HStack>
        </Box>
      </>
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
        eventBusHandle={setEventBus}
        editable
        draggable
        data={initLanes()}
        handleDragEnd={updateCardMoveAcrossLanes}
        handleLaneDragEnd={updateLaneWhenDragged}
        onLaneDelete={() => {
          console.log("HELLo")
        }}
      />
      <TaskPopUp
        isOpen={isOpen}
        onClose={onClose}
        value={editDoc}
        setValue={setEditDoc}
        afterUpdate={() => {}}
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
