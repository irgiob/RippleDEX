import React, { useState, useEffect, createRef, forwardRef } from "react"
import { navigate } from "gatsby-link"

import Layout from "../components/layout"

import { Box, Text, Input, useToast } from "@chakra-ui/react"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core"

import {
  createNewInteraction,
  getInteractionsByOrg,
  deleteInteraction,
} from "../models/Interaction"
import { getUser } from "../models/User"
import { getContactsByOrg } from "../models/Contact"
import { getCompanyByOrg } from "../models/Company"
import { getDealsByOrg } from "../models/Deal"
import { getTasksByOrg } from "../models/Task"

import MaterialTable from "material-table"

import {
  AutoCompleteListItem,
  CustomAutoComplete,
} from "../components/CustomAutoComplete"
import InteractionPopUp from "../components/interactions/interactionPopup"
import CustomDatePicker from "../components/CustomDatePicker"

import { dateToFirebaseTimestamp } from "../utils/DateTimeHelperFunctions"

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

const InteractionsPage = ({ user, setUser, org, setOrg, interID, filter }) => {
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
    overrides: {
      MuiPaper: {
        root: {
          "& > div[class^='Component']": {
            overflowX: "visible !important",
          },
        },
      },
    },
  })

  const tableRef = createRef()
  const [selected, setSelected] = useState()
  const [interactionList, setInteractionList] = useState([])
  const [contacts, setContacts] = useState([])
  const [deals, setDeals] = useState([])
  const [tasks, setTasks] = useState([])
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [members, setMembers] = useState([])
  const [selectedDeal, setSelectedDeal] = useState()
  const toast = useToast()

  useEffect(() => {
    // Fetch all data for the table
    const fetchData = async org => {
      // fetch contacts
      const contactList = await getContactsByOrg(org.id)
      for (const contact of contactList) contact.label = contact.name
      setContacts(contactList)

      // fetch companies
      const companyList = await getCompanyByOrg(org.id)
      for (const company of companyList) company.label = company.name
      setCompanies(companyList)

      // fetch deals
      const dealList = await getDealsByOrg(org.id)
      for (const deal of dealList) deal.label = deal.name
      setDeals(dealList)

      // fetch tasks
      const taskList = await getTasksByOrg(org.id)
      for (const task of taskList) task.label = task.name
      setTasks(taskList)

      // fetch members
      const memberList = []
      for await (const mem of org.members) {
        const member = await getUser(mem.userID)
        member.label = member.firstName + " " + member.lastName
        memberList.push(member)
      }
      setMembers(memberList)

      // fetch interactions
      const interactions = await getInteractionsByOrg(org.id)
      // replace fields with document ids with actual objects of those documents
      for await (const interaction of interactions) {
        interaction.dates = [interaction.meetingStart, interaction.meetingEnd]
        if (interaction.contact)
          interaction.contact = contactList.filter(
            contact => contact.id === interaction.contact
          )[0]
        if (interaction.forDeal)
          interaction.forDeal = dealList.filter(
            deal => deal.id === interaction.forDeal
          )[0]
        if (interaction.forTask)
          interaction.forTask = taskList.filter(
            task => task.id === interaction.forTask
          )[0]
        if (interaction.addedBy)
          interaction.addedBy = memberList.filter(
            member => member.id === interaction.addedBy
          )[0]
      }
      setInteractionList(interactions)
    }

    fetchData(org).then(() => setLoading(false))
  }, [org])

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
            padding: "dense",
            filtering: true,
            exportButton: true,
            tableLayout: "auto",
            toolbarButtonAlignment: "left",
            actionsColumnIndex: 6,
          }}
          data={interactionList}
          style={{ boxShadow: "none" }}
          tableRef={tableRef}
          icons={tableIcons}
          isLoading={loading}
          columns={[
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
                    value={props.value || selectedDeal}
                    onChange={deal => {
                      props.onChange(deal)
                      setSelectedDeal(deal)
                    }}
                    valueInputAttribute="name"
                    size="sm"
                    variant="flushed"
                    focusBorderColor="ripple.200"
                    showImage={false}
                  />
                )
              },
              render: rowData => {
                return rowData.forDeal ? (
                  <Box
                    cursor="pointer"
                    onClick={() =>
                      navigate("/deals/", {
                        state: { selectedDeal: rowData.forDeal.id },
                      })
                    }
                  >
                    <AutoCompleteListItem
                      name={rowData.forDeal.name}
                      showImage={false}
                    />
                  </Box>
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
                    items={
                      selectedDeal
                        ? tasks.filter(task => task.deal === selectedDeal.id)
                        : tasks
                    }
                    itemRenderer={taskItem}
                    disableCreateItem={false}
                    onCreateItem={() => navigate("/tasks")}
                    value={
                      selectedDeal && props.value
                        ? selectedDeal.id === props.value.deal
                          ? props.value
                          : undefined
                        : props.value
                    }
                    onChange={task => {
                      props.onChange(task)
                      if (!selectedDeal && task)
                        setSelectedDeal(
                          deals.filter(deal => deal.id === task.deal)[0]
                        )
                    }}
                    valueInputAttribute="name"
                    size="sm"
                    variant="flushed"
                    focusBorderColor="ripple.200"
                    showImage={false}
                  />
                )
              },
              render: rowData => {
                return rowData.forTask ? (
                  <Box
                    cursor="pointer"
                    onClick={() =>
                      navigate("/tasks/", {
                        state: { selectedTask: rowData.forTask.id },
                      })
                    }
                  >
                    <AutoCompleteListItem
                      name={rowData.forTask.name}
                      showImage={false}
                    />
                  </Box>
                ) : (
                  <Text>Unassigned</Text>
                )
              },
            },
            {
              title: "Contact",
              field: "contact",
              ...(filter && { defaultFilter: filter }),
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
                    items={
                      selectedDeal
                        ? contacts.filter(contact => {
                            const company = companies.filter(
                              company => company.id === selectedDeal.company
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
                      selectedDeal && props.value
                        ? companies.filter(
                            company =>
                              company.id === selectedDeal?.company &&
                              company.id === props.value?.company
                          ).length > 0
                          ? props.value
                          : undefined
                        : props.value
                    }
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
                  <Box
                    cursor="pointer"
                    onClick={() =>
                      navigate("/contacts/", {
                        state: { selectedContact: rowData.contact.id },
                      })
                    }
                  >
                    <AutoCompleteListItem
                      name={rowData.contact.name}
                      profilePicture={rowData.contact.profilePicture}
                    />
                  </Box>
                ) : (
                  <Text>Unassigned</Text>
                )
              },
            },
            {
              title: "Interacted With",
              field: "addedBy",
              customFilterAndSearch: (term, rowData) =>
                rowData.addedBy?.label
                  .toLowerCase()
                  .includes(term.toLowerCase()),
              editComponent: props => {
                const memberItem = member => {
                  return (
                    <AutoCompleteListItem
                      name={member.label}
                      profilePicture={member.profilePicture}
                    />
                  )
                }
                return (
                  <CustomAutoComplete
                    placeholder="Select member"
                    items={members}
                    itemRenderer={memberItem}
                    disableCreateItem={true}
                    onCreateItem={() => null}
                    value={props.value || undefined}
                    onChange={props.onChange}
                    valueInputAttribute="label"
                    size="sm"
                    variant="flushed"
                    focusBorderColor="ripple.200"
                  />
                )
              },
              render: rowData => {
                return rowData.addedBy ? (
                  <AutoCompleteListItem
                    name={rowData.addedBy.label}
                    profilePicture={rowData.addedBy.profilePicture}
                  />
                ) : (
                  <Text>Unassigned</Text>
                )
              },
            },
            {
              title: "Meeting Date",
              field: "dates",
              customFilterAndSearch: (term, rowData) => {
                const ops = {
                  "=": (x, y) => x === y,
                  "!=": (x, y) => x !== y,
                  ">": (x, y) => x > y,
                  "<": (x, y) => x < y,
                }
                if (rowData.meetingStart) {
                  var match = ""
                  var re = true
                  const date = rowData.meetingStart.toDate()
                  if ((match = term.matchAll(/(^|,?)(D|d)(=|>|<)(\d*)($|,?)/g)))
                    for (const m of match)
                      re = re && ops[m[3]](date.getDate(), parseInt(m[4]))
                  if ((match = term.matchAll(/(^|,?)(M|m)(=|>|<)(\d*)($|,?)/g)))
                    for (const m of match)
                      re = re && ops[m[3]](date.getMonth() + 1, parseInt(m[4]))
                  if ((match = term.matchAll(/(^|,?)(Y|y)(=|>|<)(\d*)($|,?)/g)))
                    for (const m of match)
                      re = re && ops[m[3]](date.getFullYear(), parseInt(m[4]))
                  return re
                } else {
                  return false
                }
              },
              editComponent: props => {
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
                  <CustomDatePicker
                    times={props.value}
                    setTimes={props.onChange}
                  >
                    <Input
                      placeholder="Select meeting time"
                      value={props.value ? displayDates(props.value) : null}
                      size="sm"
                      variant="flushed"
                      focusBorderColor="ripple.200"
                      isReadOnly
                    />
                  </CustomDatePicker>
                )
              },
              render: rowData => {
                return rowData.meetingStart ? (
                  <>
                    <Text>
                      {rowData.meetingStart.toDate().toLocaleDateString()}
                    </Text>
                    {rowData.meetingEnd ? (
                      <Text color="gray" fontSize="sm">
                        {rowData.meetingStart.toDate().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }) +
                          "-" +
                          rowData.meetingEnd.toDate().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </Text>
                    ) : (
                      <Text color="gray" fontSize="sm">
                        ALL DAY
                      </Text>
                    )}
                  </>
                ) : (
                  <Text>Not set</Text>
                )
              },
            },
            {
              title: "Meeting Type",
              field: "meetingType",
              editComponent: props => {
                return (
                  <Input
                    value={props.value}
                    placeholder="Enter meeting type"
                    onChange={e => props.onChange(e.target.value)}
                    size="sm"
                    variant="flushed"
                    focusBorderColor="ripple.200"
                  />
                )
              },
            },
            { title: "ID", field: "id", type: "string", hidden: true },
            { title: "Notes", field: "notes", type: "string", hidden: true },
          ]}
          actions={[
            {
              icon: () => <AiFillEdit />,
              tooltip: "Edit Interaction",
              onClick: (event, rowData) => setSelected(rowData),
              position: "row",
            },
          ]}
          editable={{
            onRowAdd: newData => {
              const promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (newData.dates) {
                    newData.meetingStart = newData.dates[0]
                      ? dateToFirebaseTimestamp(newData.dates[0])
                      : null
                    newData.meetingEnd = newData.dates[1]
                      ? dateToFirebaseTimestamp(newData.dates[1])
                      : null
                  }
                  newData.name = "Meeting"
                  if (newData.meetingStart)
                    newData.name =
                      newData.meetingStart
                        .toDate()
                        .toLocaleDateString("en-GB") +
                      " " +
                      newData.name
                  if (newData.contact)
                    newData.name += " with " + newData.contact.name
                  createNewInteraction(
                    org.id,
                    newData.contact?.id || null,
                    newData.addedBy?.id || null,
                    newData.forDeal?.id || null,
                    newData.meetingStart,
                    newData.meetingType || null,
                    newData.notes || null,
                    newData.forTask?.id || null,
                    true,
                    newData.name,
                    newData.meetingEnd
                  ).then(interactionID => {
                    if (interactionID) {
                      setInteractionList([
                        ...interactionList,
                        { ...newData, id: interactionID },
                      ])
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
                }),
                setSelectedDeal(null)
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
        selected={selected}
        setSelected={setSelected}
        contacts={contacts}
        deals={deals}
        tasks={tasks}
        companies={companies}
        members={members}
        afterUpdate={updatedInteraction => {
          setInteractionList([
            ...interactionList.filter(
              interaction => interaction.id !== updatedInteraction.id
            ),
            updatedInteraction,
          ])
        }}
      />
    </Box>
  )
}

const Interactions = ({ location }) => (
  <Layout location={location}>
    <InteractionsPage
      interID={location.state?.selectedInteraction}
      filter={location.state?.selectedFilter}
    />
  </Layout>
)

export default Interactions
