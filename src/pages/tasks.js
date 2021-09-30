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
} from "@chakra-ui/react"

import { HiOfficeBuilding, HiOutlineTrash } from "react-icons/hi"
import { AiOutlineMore } from "react-icons/ai"

import {
  createNewTask,
  getTask,
  getTasksByOrg,
  updateTask,
} from "../models/Task"
import { getDeal } from "../models/Deal"
import { updateOrganization } from "../models/Organisation"
import TaskPopUp from "../components/tasks/taskPopup"

/**
 * Renders the page content
 */
const TasksPage = ({ user, setUser, org, setOrg }) => {
  const [eventBus, setEventBus] = React.useState(undefined)
  const [lanes, setLane] = React.useState([])
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editDoc, setEditDoc] = React.useState({})

  React.useEffect(() => {
    loadData()
  }, [eventBus, isOpen])

  // Initialize lanes
  const initLanes = () => {
    let lanesArr = []
    org.kanbanLanes.forEach(lane => {
      lanesArr.push({
        title: lane,
        id: lane.toLowerCase(),
        cards: [],
      })
    })
    return { lanes: lanesArr }
  }

  const loadData = async () => {
    if (eventBus) {
      // await createNewTask(
      //   "Deal ID 2",
      //   "This is another task",
      //   "Sample task 2",
      //   org.id
      // )
      try {
        const docs = await getTasksByOrg(org.id)
        console.log(docs)
        docs.forEach(async doc => {
          const deal = await getDeal(doc.deal)
          console.log(doc)
          eventBus.publish({
            type: "ADD_CARD",
            laneId: org.kanbanLanes
              .map(lane => lane.toLowerCase())
              .includes(doc.status.toLowerCase())
              ? doc.status
              : "backlog",
            card: {
              id: doc.id,
              title: doc.name,
              dealName: deal?.name ? deal.name : "Does not exist",
              dealSize: deal?.dealSize ? deal.dealSize : 0,
              description: doc.description,
            },
          })
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  const updateCardMoveAcrossLanes = async (id, origin, destination) => {
    try {
      await updateTask(id, { status: destination })
    } catch (err) {
      console.error("Error in updating card into firestore")
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
        }}
        eventBusHandle={setEventBus}
        editable
        draggable
        data={initLanes()}
        handleDragEnd={updateCardMoveAcrossLanes}
        onCardClick={() => {
          console.log("I am clicked")
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
