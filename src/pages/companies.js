import React, { forwardRef, createRef, useState, useEffect } from "react"
import { navigate } from "gatsby-link"

import Layout from "../components/layout"

import {
  Avatar,
  Box,
  Text,
  Input,
  NumberInput,
  NumberInputField,
  Link,
  Flex,
  useToast,
} from "@chakra-ui/react"

import CompanyPopUp from "../components/companies/companyPopup"
import ContactPopUp from "../components/contacts/contactPopup"
import UploadImageButton from "../components/uploadImageButton"

import {
  createNewCompany,
  getCompanyByOrg,
  deleteCompany,
} from "../models/Company"
import { createNewContact, updateContact, getContact } from "../models/Contact"

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core"

import MaterialTable from "material-table"
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

import { AiFillEdit, AiOutlineFileAdd, AiOutlineCheck } from "react-icons/ai"
import { RiExternalLinkLine } from "react-icons/ri"

const CompaniesPage = ({ user, setUser, org, setOrg, companyID }) => {
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
          "& > div[class^='Component']": {
            overflowX: "visible !important",
          },
        },
      },
    },
  })

  const toast = useToast()

  const tableRef = createRef()
  const [companyList, setCompanyList] = useState([])
  const [selected, setSelected] = useState("")
  const [newContact, setNewContact] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompanies = async orgID => {
      const companies = await getCompanyByOrg(orgID)
      for await (const company of companies) {
        if (company.primaryContact) {
          const contact = await getContact(company.primaryContact)
          company.primaryContact = contact
        }
      }
      setCompanyList(companies)

      // if company passed from previous page, set as selected
      if (companyID) {
        const selectedCompany = companies.filter(
          company => company.id === companyID
        )[0]
        setSelected(selectedCompany)
      }

      setLoading(false)
    }
    fetchCompanies(org.id)
  }, [org, companyID])

  const currTime = new Date().toLocaleString()

  return (
    <Box p="25px">
      <Text
        pb="10px"
        fontFamily="Raleway-Bold"
        fontSize="28px"
        color="ripple.200"
      >
        Companies
      </Text>

      <MuiThemeProvider theme={theme}>
        <MaterialTable
          title={`Companies for ${org.name} (${currTime})`}
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
            actionsColumnIndex: 6,
          }}
          data={companyList}
          style={{ boxShadow: "none" }}
          tableRef={tableRef}
          icons={tableIcons}
          isLoading={loading}
          columns={[
            {
              filtering: false,
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
              title: "Company Name",
              field: "name",
              type: "string",
              editComponent: props => {
                return (
                  <Input
                    value={props.value}
                    placeholder="Enter company name"
                    onChange={e => props.onChange(e.target.value)}
                    size="sm"
                    variant="flushed"
                    focusBorderColor="ripple.200"
                  />
                )
              },
            },
            {
              title: "Primary Contact",
              field: "primaryContact",
              customFilterAndSearch: (term, rowData) =>
                rowData.primaryContact?.name
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
                  <>
                    <CustomAutoComplete
                      pplaceholder="Select contact"
                      items={[]}
                      itemRenderer={contactItem}
                      disableCreateItem={false}
                      onCreateItem={newContactName =>
                        setNewContact({
                          id: null,
                          company: { name: "Your New Company" },
                          email: null,
                          name: newContactName.value,
                          notes: null,
                          phoneNumber: null,
                          position: null,
                          profilePicture: null,
                          registeredBy: org.id,
                        })
                      }
                      value={props.value}
                      onChange={props.onChange}
                      valueInputAttribute="name"
                      size="sm"
                      variant="flushed"
                      focusBorderColor="ripple.200"
                    />
                    <ContactPopUp
                      selected={newContact}
                      setSelected={setNewContact}
                      companies={companyList}
                      onUpdate={newUpdatedContact =>
                        props.onChange(newUpdatedContact)
                      }
                    />
                  </>
                )
              },
              render: rowData => {
                if (rowData.primaryContact) {
                  return (
                    <Box
                      cursor="pointer"
                      onClick={() =>
                        navigate("/contacts/", {
                          state: { selectedContact: rowData.primaryContact.id },
                        })
                      }
                    >
                      <AutoCompleteListItem
                        name={rowData.primaryContact.name}
                        profilePicture={rowData.primaryContact.profilePicture}
                      />
                    </Box>
                  )
                } else {
                  return <Text>Unassigned</Text>
                }
              },
            },
            {
              title: "Annual Revenue",
              field: "annualRevenue",
              customFilterAndSearch: (term, rowData) => {
                var match = ""
                var re = true
                if ((match = term.match(/(^|,)=(\d*)($|,)/)))
                  re =
                    re && rowData.annualRevenue.toString().startsWith(match[2])
                if ((match = term.match(/(^|,)!=(\d*)($|,)/)))
                  re =
                    re && !rowData.annualRevenue.toString().startsWith(match[2])
                if ((match = term.match(/(^|,)>(\d+)($|,)/)))
                  re = re && rowData.annualRevenue > parseInt(match[2])
                if ((match = term.match(/(^|,)<(\d+)($|,)/)))
                  re = re && rowData.annualRevenue < parseInt(match[2])
                return re
              },
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
                    {parseFloat(rowData.annualRevenue)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
                )
              },
            },
            {
              title: "Industry",
              field: "industry",
              type: "string",
              editComponent: props => {
                return (
                  <Input
                    value={props.value}
                    placeholder="Enter company industry"
                    onChange={e => props.onChange(e.target.value)}
                    size="sm"
                    variant="flushed"
                    focusBorderColor="ripple.200"
                  />
                )
              },
            },
            { title: "ID", field: "id", type: "string", hidden: true },
            {
              title: "Company Website",
              field: "website",
              type: "string",
              editComponent: props => {
                return (
                  <Input
                    value={props.value}
                    placeholder="Enter company website"
                    onChange={e => props.onChange(e.target.value)}
                    size="sm"
                    variant="flushed"
                    focusBorderColor="ripple.200"
                  />
                )
              },
              render: rowData => {
                if (rowData.website) {
                  var prefix = "https://"
                  const url =
                    rowData.website.substr(0, prefix.length) !== prefix
                      ? prefix + rowData.website
                      : rowData.website
                  return (
                    <Link href={url} isExternal>
                      <Flex alignItems="center">
                        <Text mr="0.25em">{rowData.website}</Text>
                        <RiExternalLinkLine />
                      </Flex>
                    </Link>
                  )
                } else {
                  return null
                }
              },
            },
          ]}
          actions={[
            {
              icon: () => <AiFillEdit />,
              tooltip: "Edit Company",
              onClick: (event, rowData) => setSelected(rowData),
              position: "row",
            },
          ]}
          editable={{
            onRowAdd: newData => {
              const promise = new Promise((resolve, reject) => {
                setTimeout(async () => {
                  if (
                    newData.primaryContact &&
                    newData.primaryContact.id === null
                  ) {
                    const contactID = await createNewContact(
                      org.id,
                      newData.primaryContact.name || null,
                      null,
                      newData.primaryContact.email || null,
                      newData.primaryContact.phoneNumber || null,
                      newData.primaryContact.position || null,
                      newData.primaryContact.profilePicture || null
                    )
                    if (contactID) newData.primaryContact.id = contactID
                  }
                  const companyID = await createNewCompany(
                    org.id,
                    newData.name || null,
                    newData.primaryContact?.id || null,
                    parseFloat(newData.annualRevenue),
                    newData.industry || null,
                    newData.website || null,
                    newData.profilePicture || null
                  )
                  if (companyID) {
                    updateContact(newData.primaryContact.id, {
                      company: companyID,
                    })
                    setCompanyList([
                      ...companyList,
                      { ...newData, id: companyID },
                    ])
                    resolve()
                  } else {
                    reject()
                  }
                }, 1000)
              })
              promise.then(
                toast({
                  title: "New Company Added",
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
                  const dataDelete = [...companyList]
                  const index = oldData.tableData.id
                  dataDelete.splice(index, 1)
                  setCompanyList([...dataDelete])
                  deleteCompany(oldData.id)
                  resolve()
                }, 1000)
              })
              promise.then(
                toast({
                  title: "Company Successfully Deleted",
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
      <CompanyPopUp
        selected={selected}
        setSelected={setSelected}
        companies={companyList}
        onUpdate={updatedCompany => {
          setCompanyList([
            ...companyList.filter(company => company.id !== updatedCompany.id),
            updatedCompany,
          ])
        }}
        orgID={org.id}
      />
    </Box>
  )
}

const Companies = ({ location }) => (
  <Layout location={location}>
    <CompaniesPage companyID={location.state?.selectedCompany} />
  </Layout>
)

export default Companies
