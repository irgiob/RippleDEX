import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import {
  Box,
  Text,
  IconButton,
  Input,
  Tooltip,
  useDisclosure,
  useToast,
  navigate,
} from "@chakra-ui/react"

import InteractionPopUp from "../components/interactions/interactionPopup"

import { dateToFirebaseTimestamp } from "../utils/DateTimeHelperFunctions"

import { getUser } from "../models/User"

import {
  createNewInteraction,
  getInteractionsByOrg,
  deleteInteraction,
} from "../models/Interaction"

import { getContact, getContactsByOrg } from "../models/Contact"

import { getDeal } from "../models/Deal"

import { getTask, getTasksByOrg } from "../models/Task"

import DatePicker from "react-datepicker"

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core"

import { forwardRef } from "react"

import MaterialTable from "material-table"

import AddBox from "@material-ui/icons/AddBox"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import Check from "@material-ui/icons/Check"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import Clear from "@material-ui/icons/Clear"
import DeleteOutline from "@material-ui/icons/DeleteOutline"
import Edit from "@material-ui/icons/Edit"
import FilterList from "@material-ui/icons/FilterList"
import FirstPage from "@material-ui/icons/FirstPage"
import LastPage from "@material-ui/icons/LastPage"
import Remove from "@material-ui/icons/Remove"
import SaveAlt from "@material-ui/icons/SaveAlt"
import Search from "@material-ui/icons/Search"
import ViewColumn from "@material-ui/icons/ViewColumn"

import { AiFillEdit } from "react-icons/ai"

import {
  AutoCompleteListItem,
  CustomAutoComplete,
} from "../components/CustomAutoComplete"
import { getDealsByOrg } from "../models/Deal"

const InteractionsPage = ({ user, setUser, org, setOrg }) => {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  }

  // Create Material UI theme to style the table
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#168aa8",
      },
      secondary: {
        main: "#168aa8",
      },
    },
  })

  const toast = useToast()

  // Modal or Popup triggers
  const { isOpen, onOpen, onClose } = useDisclosure()

  const tableRef = React.createRef()
  const [interactionList, setInteractionList] = React.useState([])
  const [value, setValue] = React.useState("")
  const [contacts, setContacts] = React.useState([])
  const [deals, setDeals] = React.useState([])
  const [tasks, setTasks] = React.useState([])
  const [companies, setCompanies] = React.useState([])

  React.useEffect(() => {
    // Fetch interactions for the table
    const fetchInteractions = async orgID => {
      const interactions = await getInteractionsByOrg(orgID)
      for await (const interaction of interactions) {
        // Fetch data on fields with associated documents
        if (interaction.contact) {
          const contact = await getContact(interaction.contact)
          if (contact) {
            contact.label = contact.name
          }
          interaction.contact = contact
        }

        if (interaction.addedBy) {
          const addedBy = await getUser(interaction.addedBy)
          if (addedBy) {
            addedBy.label = addedBy.firstName + " " + addedBy.lastName
          }
          interaction.addedBy = addedBy
        }

        if (interaction.forDeal) {
          const deal = await getDeal(interaction.forDeal)
          if (deal) {
            deal.label = deal.name
          }
          interaction.forDeal = deal
        }

        if (interaction.forTask) {
          const task = await getTask(interaction.forTask)
          if (task) {
            task.label = task.name
          }
          interaction.forTask = task
        }
      }
      setInteractionList(interactions)
    }

    // Fetch contacts for autocomplete
    const fetchContacts = async orgID => {
      const contactList = await getContactsByOrg(orgID)
      for (const contact of contactList) contact.label = contact.name
      setContacts(contactList)
    }
    // Fetch deals to autocomplete
    const fetchDeals = async orgID => {
      const dealList = await getDealsByOrg(orgID)
      for (const deal of dealList) deal.label = deal.name
      setDeals(dealList)
    }

    // Fetch tasks to autocomplete
    const fetchTasks = async orgID => {
      const taskList = await getTasksByOrg(orgID)
      for (const task of taskList) task.label = task.name
      setTasks(taskList)
    }

    fetchInteractions(org.id)
    fetchContacts(org.id)
    fetchDeals(org.id)
    fetchTasks(org.id)
  }, [org])

  const handlePopUp = value => {
    setValue(value)
    onOpen()
  }

  return (
    <Box p="25px">
      <Text
        pb="10px"
        fontFamily="Raleway-Bold"
        fontSize="28px"
        color="ripple.200"
      >
        Interactions
      </Text>

      <MuiThemeProvider theme={theme}>
        <MaterialTable
          options={{
            showTitle: false,
            selection: true,
            searchFieldAlignment: "right",
            maxBodyHeight: "80vh",
            padding: "dense",
            filtering: true,
            exportButton: true,
            tableLayout: "auto",
            toolbarButtonAlignment: "left",
            actionsColumnIndex: 7,
          }}
          data={interactionList}
          style={{ boxShadow: "none" }}
          tableRef={tableRef}
          icons={tableIcons}
          columns={[
            {
              title: "Contact",
              field: "contact",
              customFilterAndSearch: (term, rowData) =>
                rowData.contact?.label
                  .toLowerCase()
                  .includes(term.toLowerCase()),
              editComponent: props => {
                const contactItem = contact => {
                  return (
                    <AutoCompleteListItem
                      name={contact.name}
                      profilePicture={contact.profilePicture}
                    />
                  )
                }
                return (
                  <CustomAutoComplete
                    placeholder="Select contact"
                    items={contacts}
                    itemRenderer={contactItem}
                    disableCreateItem={false}
                    onCreateItem={() => navigate("/contacts")}
                    value={props.value}
                    onChange={props.onChange}
                    valueInputAttribute="name"
                    size="sm"
                    variant="flushed"
                    focusBorderColor="ripple.200"
                  />
                )
              },
              render: rowData => {
                return rowData.contact ? (
                  <AutoCompleteListItem name={rowData.contact.name} />
                ) : (
                  <Text>Unassigned</Text>
                )
              },
            },
            {
              title: "Deal",
              field: "forDeal",
              customFilterAndSearch: (term, rowData) =>
                rowData.forDeal?.label
                  .toLowerCase()
                  .includes(term.toLowerCase()),
              editComponent: props => {
                const dealItem = deal => {
                  return (
                    <AutoCompleteListItem name={deal.name} showImage={false} />
                  )
                }
                return (
                  <CustomAutoComplete
                    placeholder="Select deal"
                    items={deals}
                    itemRenderer={dealItem}
                    disableCreateItem={false}
                    onCreateItem={() => navigate("/deals")}
                    value={props.value}
                    onChange={props.onChange}
                    valueInputAttribute="name"
                    size="sm"
                    variant="flushed"
                    focusBorderColor="ripple.200"
                  />
                )
              },
              render: rowData => {
                return rowData.forDeal ? (
                  <AutoCompleteListItem
                    name={rowData.forDeal.name}
                    showImage={false}
                  />
                ) : (
                  <Text>Unassigned</Text>
                )
              },
            },
            {
              title: "Task",
              field: "forTask",
              customFilterAndSearch: (term, rowData) =>
                rowData.forTask?.label
                  .toLowerCase()
                  .includes(term.toLowerCase()),
              editComponent: props => {
                const taskItem = forTask => {
                  return (
                    <AutoCompleteListItem
                      name={forTask.name}
                      showImage={false}
                    />
                  )
                }
                return (
                  <CustomAutoComplete
                    placeholder="Select task"
                    items={tasks}
                    itemRenderer={taskItem}
                    disableCreateItem={false}
                    onCreateItem={() => navigate("/tasks")}
                    value={props.value}
                    onChange={props.onChange}
                    valueInputAttribute="name"
                    size="sm"
                    variant="flushed"
                    focusBorderColor="ripple.200"
                  />
                )
              },
              render: rowData => {
                return rowData.forTask ? (
                  <AutoCompleteListItem
                    name={rowData.forTask.name}
                    showImage={false}
                  />
                ) : (
                  <Text>Unassigned</Text>
                )
              },
            },
            {
              title: "Meeting Date",
              field: "meetingStart",
              editComponent: props => {
                const DateCustomInput = forwardRef(
                  ({ value, onClick }, ref) => (
                    <Input
                      className="datepicker-custom-input"
                      ref={ref}
                      onClick={onClick}
                      value={value || new Date()}
                      size="sm"
                      variant="flushed"
                      focusBorderColor="ripple.200"
                      isReadOnly
                    />
                  )
                )
                return (
                  <DatePicker
                    dateFormat="dd/MM/yyyy hh:mm"
                    showTimeSelect
                    selected={Date.parse(props.value)}
                    onChange={date => props.onChange(date)}
                    customInput={<DateCustomInput />}
                    portalId="root-portal"
                  />
                )
              },
              render: rowData => {
                return rowData.meetingStart ? (
                  <Text>
                    {rowData.meetingStart.toDate().toLocaleDateString()}
                  </Text>
                ) : (
                  <Text>{"Not set"}</Text>
                )
              },
            },
            {
              title: "Meeting Type",
              field: "meetingType",
              type: "string",
              width: "18%",
            },

            { title: "ID", field: "id", type: "string", hidden: true },
            {
              title: "Notes",
              field: "notes",
              type: "string",
              width: "18%",
            },
            {
              render: rowData => (
                <Tooltip hasArrow label="Edit Contact">
                  <IconButton
                    pt="11px"
                    pb="10px"
                    color="black"
                    variant="link"
                    size="lg"
                    icon={<AiFillEdit />}
                    onClick={() => handlePopUp(rowData)}
                  />
                </Tooltip>
              ),
              width: "0%",
            },
          ]}
          editable={{
            onRowAdd: newData => {
              const promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                  newData.meetingStart = newData.meetingStart
                    ? dateToFirebaseTimestamp(newData.meetingStart)
                    : null
                  createNewInteraction(
                    org.id,
                    newData.contact?.id,
                    user.id,
                    newData.forDeal?.id,
                    newData.meetingStart,
                    newData.meetingType,
                    newData.notes,
                    newData.forTask?.id
                  ).then(interactionID => {
                    if (interactionID) {
                      setInteractionList([...interactionList, newData])
                      resolve()
                    } else {
                      reject()
                    }
                  })
                }, 1000)
              })
              promise.then(
                toast({
                  title: "New Interaction Added",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                })
              )
              return promise
            },
            onRowDelete: oldData => {
              const promise = new Promise(resolve => {
                setTimeout(() => {
                  const dataDelete = [...interactionList]
                  const index = oldData.tableData.id
                  dataDelete.splice(index, 1)
                  setInteractionList([...dataDelete])
                  deleteInteraction(oldData.id)
                  resolve()
                }, 1000)
              })
              promise.then(
                toast({
                  title: "Interaction Successfully Deleted",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                })
              )
              return promise
            },
          }}
        />
      </MuiThemeProvider>
      <InteractionPopUp
        value={value}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        contacts={contacts}
        deals={deals}
        tasks={tasks}
        afterUpdate={() => {}}
      />
    </Box>
  )
}

const Interactions = props => (
  <Layout location={props.location}>
    <Seo title="Interactions" />
    <InteractionsPage />
  </Layout>
)

export default Interactions
