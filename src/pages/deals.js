import React, { useState, forwardRef, useEffect, createRef } from "react"
import { navigate } from "gatsby-link"

import Layout from "../components/layout"
import Seo from "../components/seo"
import DealPopUp from "../components/deals/dealPopup"

import { dateToFirebaseTimestamp } from "../utils/DateTimeHelperFunctions"

import {
  Box,
  Text,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  useDisclosure,
  useToast,
  Badge,
} from "@chakra-ui/react"

import { getUser } from "../models/User"
import { createNewDeal, getDealsByOrg, deleteDeal } from "../models/Deal"
import { getCompanyByOrg, getCompany } from "../models/Company"

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core"

import MaterialTable from "material-table"
import DatePicker from "react-datepicker"
import {
  CustomAutoComplete,
  AutoCompleteListItem,
} from "../components/CustomAutoComplete"

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

const DealsPage = ({ user, setUser, org, setOrg }) => {
  const stageOptions = {
    Prospect: "gray",
    Lead: "red",
    Pitch: "yellow",
    Qualified: "orange",
    "Proposal Sent": "purple",
    Negotiation: "blue",
    Closed: "green",
  }

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
      ".react-datepicker-popper": {
        zIndex: 11,
      },
    },
  })

  const toast = useToast()

  // Modal or Popup triggers
  const { isOpen, onOpen, onClose } = useDisclosure()
  const tableRef = createRef()
  const [dealList, setDealList] = useState([])
  const [members, setMembers] = useState([])
  const [companies, setCompanies] = useState([])
  const [value, setValue] = useState("")

  useEffect(() => {
    const fetchDeals = async orgID => {
      const deals = await getDealsByOrg(orgID)
      for await (const deal of deals) {
        if (deal.recordedBy) {
          const recordedBy = await getUser(deal.recordedBy)
          if (recordedBy)
            recordedBy.label = recordedBy.firstName + " " + recordedBy.lastName
          deal.recordedBy = recordedBy
        }
        if (deal.company) {
          const company = await getCompany(deal.company)
          if (company) company.label = company.name
          deal.company = company
        }
      }
      setDealList(deals)
    }

    const fetchMembers = async members => {
      const memberList = []
      for await (const member of members) {
        const memberData = await getUser(member.userID)
        memberData.label = memberData.firstName + " " + memberData.lastName
        memberList.push(memberData)
      }
      setMembers(memberList)
    }

    const fetchCompanies = async orgID => {
      const companyList = await getCompanyByOrg(orgID)
      for (const company of companyList) company.label = company.name
      setCompanies(companyList)
    }

    fetchDeals(org.id)
    fetchMembers(org.members)
    fetchCompanies(org.id)
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
        Deals
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
          data={dealList}
          style={{ boxShadow: "none" }}
          tableRef={tableRef}
          icons={tableIcons}
          columns={[
            {
              title: "Deal Name",
              field: "name",
              type: "string",
              editComponent: props => {
                return (
                  <Input
                    value={props.value}
                    placeholder="Enter deal name"
                    onChange={e => props.onChange(e.target.value)}
                    size="sm"
                    variant="flushed"
                    focusBorderColor="ripple.200"
                  />
                )
              },
            },
            {
              title: "Company",
              field: "company",
              customFilterAndSearch: (term, rowData) =>
                rowData.company?.name
                  .toLowerCase()
                  .includes(term.toLowerCase()),
              editComponent: props => {
                const companyItem = company => {
                  return (
                    <AutoCompleteListItem
                      name={company.name}
                      profilePicture={company.profilePicture}
                    />
                  )
                }
                return (
                  <Box mt="-1.5em !important">
                    <CustomAutoComplete
                      placeholder="Select company"
                      items={companies}
                      itemRenderer={companyItem}
                      disableCreateItem={false}
                      onCreateItem={() => navigate("/companies")}
                      value={props.value}
                      onChange={props.onChange}
                      valueInputAttribute="name"
                      size="sm"
                      variant="flushed"
                      focusBorderColor="ripple.200"
                    />
                  </Box>
                )
              },
              render: rowData => {
                return rowData.company ? (
                  <AutoCompleteListItem
                    name={rowData.company.name}
                    profilePicture={rowData.company.profilePicture}
                  />
                ) : (
                  <Text>Unassigned</Text>
                )
              },
            },
            {
              title: "Deal Size",
              field: "dealSize",
              editComponent: props => {
                const format = val =>
                  `$` + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                const parse = val => val.replace(/^\$/, "")
                return (
                  <NumberInput
                    precision={2}
                    min={0}
                    value={props.value ? format(props.value) : format("")}
                    onChange={e => props.onChange(parse(e))}
                    size="sm"
                    variant="flushed"
                    focusBorderColor="ripple.200"
                  >
                    <NumberInputField />
                  </NumberInput>
                )
              },
              render: rowData => {
                return (
                  <Text>
                    $
                    {parseFloat(rowData.dealSize)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
                )
              },
            },
            {
              title: "Stage",
              field: "stage",
              editComponent: props => {
                return (
                  <Select
                    size="sm"
                    variant="flushed"
                    focusBorderColor="ripple.200"
                    onChange={e =>
                      props.onChange(e.target.selectedOptions[0].value)
                    }
                  >
                    {Object.keys(stageOptions).map((stage, i) => (
                      <option key={"stage_" + i} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </Select>
                )
              },
              render: rowData => {
                return (
                  <Badge
                    variant="outline"
                    colorScheme={stageOptions[rowData.stage]}
                  >
                    {rowData.stage}
                  </Badge>
                )
              },
            },
            {
              title: "Close Date",
              field: "closeDate",
              editComponent: props => {
                const DateCustomInput = forwardRef(
                  ({ value, onClick }, ref) => (
                    <Input
                      className="datepicker-custom-input"
                      ref={ref}
                      onClick={onClick}
                      value={value || "Not Closed"}
                      size="sm"
                      variant="flushed"
                      focusBorderColor="ripple.200"
                      isReadOnly
                    />
                  )
                )
                return (
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={Date.parse(props.value)}
                    onChange={date => props.onChange(date)}
                    customInput={<DateCustomInput />}
                    portalId="root-portal"
                  />
                )
              },
              render: rowData => {
                return rowData.closeDate ? (
                  <Text>{rowData.closeDate.toDate().toLocaleDateString()}</Text>
                ) : (
                  <Text>Not Closed</Text>
                )
              },
            },
            {
              title: "ID",
              field: "id",
              type: "string",
              hidden: true,
            },
            {
              title: "Recorded By",
              field: "recordedBy",
              customFilterAndSearch: (term, rowData) =>
                rowData.recordedBy?.label
                  .toLowerCase()
                  .includes(term.toLowerCase()),
              editComponent: props => {
                const memberItem = member => {
                  return (
                    <AutoCompleteListItem
                      name={member.firstName + " " + member.lastName}
                      profilePicture={member.profilePicture}
                    />
                  )
                }
                return (
                  <Box mt="-1.5em !important">
                    <CustomAutoComplete
                      placeholder="Select member"
                      items={members}
                      itemRenderer={memberItem}
                      disableCreateItem={true}
                      onCreateItem={() => null}
                      value={props.value}
                      onChange={props.onChange}
                      valueInputAttribute="label"
                      size="sm"
                      variant="flushed"
                      focusBorderColor="ripple.200"
                    />
                  </Box>
                )
              },
              render: rowData => {
                if (rowData.recordedBy) {
                  const name =
                    rowData.recordedBy.firstName +
                    " " +
                    rowData.recordedBy.lastName
                  return (
                    <AutoCompleteListItem
                      name={name}
                      profilePicture={rowData.recordedBy.profilePicture}
                    />
                  )
                } else {
                  return <Text>Unassigned</Text>
                }
              },
            },
          ]}
          actions={[
            {
              icon: () => <AiFillEdit />,
              tooltip: "Edit Contact",
              onClick: (event, rowData) => handlePopUp(rowData),
              position: "row",
            },
          ]}
          editable={{
            onRowAdd: newData => {
              const promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                  newData.stage = newData.stage
                    ? newData.stage
                    : Object.keys(stageOptions)[0]
                  newData.closeDate = newData.closeDate
                    ? dateToFirebaseTimestamp(newData.closeDate)
                    : null
                  createNewDeal(
                    org.id,
                    newData.name || null,
                    parseFloat(newData.dealSize),
                    newData.stage,
                    newData.recordedBy?.id || null,
                    newData.closeDate,
                    newData.company?.id || null
                  ).then(dealID => {
                    if (dealID) {
                      setDealList([...dealList, { ...newData, id: dealID }])
                      resolve()
                    } else {
                      reject()
                    }
                  })
                }, 1000)
              })
              promise.then(
                toast({
                  title: "New Contact Added",
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
                  const dataDelete = [...dealList]
                  const index = oldData.tableData.id
                  dataDelete.splice(index, 1)
                  setDealList([...dataDelete])
                  deleteDeal(oldData.id)
                  resolve()
                }, 1000)
              })
              promise.then(
                toast({
                  title: "Deal Successfully Deleted",
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
      <DealPopUp
        value={value}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  )
}

const Deals = props => (
  <Layout location={props.location}>
    <Seo title="Deals" />
    <DealsPage />
  </Layout>
)

export default Deals
