import React, { forwardRef, createRef, useState, useEffect } from "react"
import { navigate } from "gatsby-link"

import Layout from "../components/layout"

import { Box, Text, Input, useToast, Avatar } from "@chakra-ui/react"

import CompanyPopUp from "../components/companies/companyPopup"
import ContactPopUp from "../components/contacts/contactPopup"
import UploadImageButton from "../components/uploadImageButton"
import {
  CustomAutoComplete,
  AutoCompleteListItem,
} from "../components/CustomAutoComplete"

import {
  createNewContact,
  getContactsByOrg,
  deleteContact,
} from "../models/Contact"

import {
  createNewCompany,
  updateCompany,
  getCompany,
  getCompanyByOrg,
} from "../models/Company"

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core"

import MaterialTable from "material-table"
import { CsvBuilder } from "filefy"

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

import { AiFillEdit, AiOutlineFileAdd, AiOutlineCheck } from "react-icons/ai"

/**
 * Renders the page content
 */
const ContactsPage = ({ user, setUser, org, setOrg, contactID, filter }) => {
  // Initialize table icons used
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
          "& div:nth-child(2)": {
            overflowX: "visible !important",
          },
        },
      },
    },
  })

  const toast = useToast()

  const tableRef = createRef()
  const [contactList, setContactList] = useState([])
  const [companies, setCompanies] = useState([])
  const [selected, setSelected] = useState()
  const [newCompany, setNewCompany] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContacts = async orgID => {
      const contacts = await getContactsByOrg(orgID)
      for await (const contact of contacts) {
        if (contact.company) {
          const company = await getCompany(contact.company)
          contact.company = company
        }
      }
      setContactList(contacts)

      // if contact passed from previous page, set as selected
      if (contactID) {
        const selectedContact = contacts.filter(
          contact => contact.id === contactID
        )[0]
        setSelected(selectedContact)
      }
    }
    const fetchCompanies = async orgID => {
      const companyList = await getCompanyByOrg(orgID)
      for (const company of companyList) company.label = company.name
      setCompanies(companyList)
    }

    Promise.all([fetchContacts(org.id), fetchCompanies(org.id)]).then(() =>
      setLoading(false)
    )
  }, [org, contactID])

  const currTime = new Date().toLocaleDateString("en-GB")
  const tableTitle = currTime + " - Contacts for " + org.name

  return (
    <Box p="25px">
      <Text
        pb="10px"
        fontFamily="Raleway-Bold"
        fontSize="28px"
        color="ripple.200"
      >
        Contacts
      </Text>

      <MuiThemeProvider theme={theme}>
        <MaterialTable
          title={tableTitle}
          options={{
            showTitle: false,
            selection: true,
            searchFieldAlignment: "right",
            pageSize: 10,
            padding: "dense",
            filtering: true,
            exportButton: { csv: true, pdf: false },
            exportCsv: (col, data) => {
              col = col.filter(c => c.export !== false)
              data = data.map(row => ({ ...row, company: row.company?.name }))
              return new CsvBuilder(tableTitle + ".csv")
                .setColumns(col.map(colDef => colDef.title))
                .addRows(data.map(row => col.map(c => row[c.field])))
                .exportFile()
            },
            tableLayout: "auto",
            toolbarButtonAlignment: "left",
            actionsColumnIndex: 6,
          }}
          data={contactList}
          style={{ boxShadow: "none" }}
          tableRef={tableRef}
          icons={tableIcons}
          isLoading={loading}
          columns={[
            {
              filtering: false,
              export: false,
              width: "5%",
              field: "profilePicture",
              editComponent: props => {
                return (
                  <UploadImageButton
                    fontFamily="Raleway-Bold"
                    borderRadius="full"
                    size="sm"
                    _hover={{ transform: "scale(1.08)" }}
                    buttonMessage={
                      props.value ? (
                        <AiOutlineCheck size="1rem" />
                      ) : (
                        <AiOutlineFileAdd size="1rem" />
                      )
                    }
                    color={props.value ? "green" : "black"}
                    changeUrl={url => props.onChange(url)}
                  />
                )
              },
              render: rowData => (
                <Avatar
                  src={rowData.profilePicture}
                  size="sm"
                  name={rowData.name}
                />
              ),
            },
            {
              title: "Contact Name",
              field: "name",
              editComponent: props => {
                return (
                  <Input
                    value={props.value}
                    placeholder="Enter contact name"
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
              ...(filter && { defaultFilter: filter }),
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
                      onCreateItem={newCompanyName =>
                        setNewCompany({
                          id: null,
                          address: null,
                          annualRevenue: null,
                          description: null,
                          industry: null,
                          name: newCompanyName.value,
                          personnel: null,
                          primaryContact: { name: "Your New Contact" },
                          profilePicture: null,
                          registeredBy: org.id,
                          relationship: null,
                          website: null,
                        })
                      }
                      value={props.value}
                      onChange={props.onChange}
                      valueInputAttribute="name"
                      size="sm"
                      variant="flushed"
                      focusBorderColor="ripple.200"
                    />
                    <CompanyPopUp
                      selected={newCompany}
                      setSelected={setNewCompany}
                      companies={companies}
                      onUpdate={newUpdatedCompany =>
                        props.onChange(newUpdatedCompany)
                      }
                      orgID={org.id}
                    />
                  </Box>
                )
              },
              render: rowData => {
                if (rowData.company) {
                  return (
                    <Box
                      cursor="pointer"
                      onClick={() =>
                        navigate("/companies/", {
                          state: { selectedCompany: rowData.company.id },
                        })
                      }
                    >
                      <AutoCompleteListItem
                        name={rowData.company.name}
                        profilePicture={rowData.company.profilePicture}
                      />
                    </Box>
                  )
                } else {
                  return <Text>Unassigned</Text>
                }
              },
            },
            {
              title: "Position",
              field: "position",
              editComponent: props => {
                return (
                  <Input
                    value={props.value}
                    placeholder="Enter contact position"
                    onChange={e => props.onChange(e.target.value)}
                    size="sm"
                    variant="flushed"
                    focusBorderColor="ripple.200"
                  />
                )
              },
            },
            { title: "ID", field: "id", hidden: true, export: false },
            {
              title: "Email",
              field: "email",
              editComponent: props => {
                return (
                  <Input
                    value={props.value}
                    placeholder="Enter contact email"
                    onChange={e => props.onChange(e.target.value)}
                    size="sm"
                    variant="flushed"
                    focusBorderColor="ripple.200"
                  />
                )
              },
            },
            {
              title: "Phone Number",
              field: "phoneNumber",
              editComponent: props => {
                return (
                  <Input
                    value={props.value}
                    placeholder="Enter contact number"
                    onChange={e => {
                      if (
                        e.target.value.match(
                          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g
                        )
                      )
                        props.onChange(e.target.value)
                    }}
                    size="sm"
                    variant="flushed"
                    focusBorderColor="ripple.200"
                  />
                )
              },
            },
            {
              title: "Notes",
              field: "notes",
              type: "string",
              hidden: true,
            },
          ]}
          actions={[
            {
              icon: () => <AiFillEdit />,
              tooltip: "Edit Contact",
              onClick: (event, rowData) => setSelected(rowData),
              position: "row",
            },
          ]}
          editable={{
            onRowAdd: newData => {
              const promise = new Promise((resolve, reject) => {
                setTimeout(async () => {
                  var newCompany = false
                  if (newData.company && newData.company.id === null) {
                    const companyID = await createNewCompany(
                      org.id,
                      newData.company.name,
                      null,
                      newData.company.annualRevenue,
                      newData.company.industry,
                      newData.company.website,
                      newData.company.profilePicture
                    )
                    if (companyID) newData.company.id = companyID
                    newCompany = true
                  }
                  const contactID = await createNewContact(
                    org.id,
                    newData.name || null,
                    newData.company?.id || null,
                    newData.email || null,
                    newData.phoneNumber || null,
                    newData.position || null,
                    newData.profilePicture || null
                  )
                  if (contactID) {
                    if (newCompany)
                      updateCompany(newData.company.id, {
                        primaryContact: contactID,
                      })
                    setContactList([
                      ...contactList,
                      { ...newData, id: contactID },
                    ])
                    resolve()
                  } else {
                    reject()
                  }
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
                  const dataDelete = [...contactList]
                  const index = oldData.tableData.id
                  dataDelete.splice(index, 1)
                  setContactList([...dataDelete])
                  deleteContact(oldData.id)
                  resolve()
                }, 1000)
              })
              promise.then(
                toast({
                  title: "Contact Successfully Deleted",
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
      <ContactPopUp
        selected={selected}
        setSelected={setSelected}
        companies={companies}
        onUpdate={updatedContact => {
          setContactList([
            ...contactList.filter(contact => contact.id !== updatedContact.id),
            updatedContact,
          ])
        }}
      />
    </Box>
  )
}

/**
 * Renders the page content wrapped in Layout
 */
const Contacts = ({ location }) => {
  return (
    <Layout location={location}>
      <ContactsPage
        contactID={location.state?.selectedContact}
        filter={location.state?.selectedFilter}
      />
    </Layout>
  )
}

export default Contacts
