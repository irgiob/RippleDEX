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
} from "@chakra-ui/react"

import { HiOfficeBuilding, HiOutlineTrash } from "react-icons/hi"

/**
 * Renders the page content
 */
const TasksPage = ({ user, setUser, org, setOrg }) => {
  const data = {
    lanes: [
      {
        id: "lane1",
        title: "Backlog",
        cards: [
          {
            id: "Card1",
            img: "https://avatars.dicebear.com/v2/female/ce46c0eff797ed7ebbc372c013c24923.svg",
            name: "Arlene Wilson",
            dealName: "January Advertisement",
            dealSize: "3,546",
            company: "Johnson & Johnson",
          },
          {
            id: "Card2",
            name: "Evan Flores",
            dealName: "July Advertisement",
            dealSize: "984",
            company: "Louis Vuitton",
            tags: [{ title: "High", color: "white", bgcolor: "#EB5A46" }],
            bgColor: "#FFDFD3",
          },
        ],
      },
      {
        id: "lane2",
        title: "Selected",
        cards: [],
      },
      {
        id: "lane3",
        title: "In Progress",
        cards: [],
      },
      {
        id: "lane4",
        title: "Finished",
        cards: [],
      },
    ],
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

    const handleAdd = () => props.onAdd({ title: LaneName })

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
    const [company, setCompany] = React.useState("")
    const [dealName, setDealName] = React.useState("")
    const [dealSize, setDealSize] = React.useState("")

    const handleAdd = () =>
      props.onAdd({
        name: name,
        company: company,
        dealName: dealName,
        dealSize: dealSize,
      })

    return (
      <VStack pt="10px">
        <Input
          placeholder="Contact Name"
          size="sm"
          onChange={event => setName(event.target.value)}
        />
        <Input
          placeholder="Company"
          size="sm"
          onChange={event => setCompany(event.target.value)}
        />
        <Input
          placeholder="Deal Name"
          size="sm"
          onChange={event => setDealName(event.target.value)}
        />
        <Input
          placeholder="Deal Size ($)"
          size="sm"
          onChange={event => setDealSize(event.target.value)}
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
    const clickDelete = e => {
      props.onDelete()
      e.stopPropagation()
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
          {props.img != null && <Image pt="10px" h="40px" src={props.img} />}
          <VStack align="initial" w="100%" spacing={0}>
            <HStack spacing={0}>
              <Text
                pt="10px"
                maxW="160px"
                isTruncated
                fontFamily="Nunito-Bold"
                fontSize="15px"
              >
                {props.name}
              </Text>
              <Spacer />
              <Box onClick={clickDelete}>
                <Icon color="red" height="13px" as={HiOutlineTrash} />
              </Box>
            </HStack>
            <HStack spacing="2px">
              <Icon paddingBottom="2px" height="15px" as={HiOfficeBuilding} />
              <Text maxW="160px" isTruncated fontSize="13px">
                {props.company}
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
        editable
        draggable
        data={data}
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
