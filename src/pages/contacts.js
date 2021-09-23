import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import {
  Button,
  Box,
  Text,
  IconButton,
  Input,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"

import ContactPopUp from "../components/contacts/contactPopup"

import {
  createNewContact,
  getContactsByOrg,
  deleteContact,
} from "../models/Contact"

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core"
import Pic from "../images/RippleDex.png"

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

import { FaExpandAlt } from "react-icons/fa"

/**
 * Renders the page content
 */
const ContactsPage = ({ user, setUser, org, setOrg }) => {
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
  })

  const toast = useToast()

  // Modal or Popup triggers
  const { isOpen, onOpen, onClose } = useDisclosure()

  const tableRef = React.createRef()
  const [contactList, setContactList] = React.useState([])

  React.useEffect(() => {
    var promise = Promise.resolve(getContactsByOrg(org))
    promise.then(function (val) {
      setContactList(val)
    })
  }, [])

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
          title="Contacts"
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
          data={contactList}
          style={{ boxShadow: "none" }}
          tableRef={tableRef}
          icons={tableIcons}
          columns={[
            {
              render: rowData => (
                <img src={Pic} style={{ width: 50, borderRadius: "50%" }} />
              ),
              width: "10%",
            },
            {
              title: "Contact Name",
              field: "name",
              type: "string",
              width: "18%",
            },
            {
              title: "Company",
              field: "company",
              type: "string",
              width: "18%",
            },
            {
              title: "Position",
              field: "position",
              type: "string",
              width: "18%",
            },
            { title: "ID", field: "id", type: "string", hidden: true },
            { title: "Email", field: "email", type: "string", width: "18%" },
            {
              title: "Phone Number",
              field: "phoneNumber",
              type: "string",
              width: "18%",
              align: "left",
            },
            {
              render: rowData => (
                <Tooltip hasArrow label="View Contact">
                  <IconButton
                    pt="10px"
                    pb="10px"
                    color="ripple.200"
                    variant="link"
                    icon={<FaExpandAlt />}
                    onClick={onOpen}
                  />
                </Tooltip>
              ),
              width: "0%",
            },
          ]}
          editable={{
            onRowAdd: newData => {
              const contactID = createNewContact(
                org,
                newData.name,
                newData.company,
                newData.email,
                newData.phoneNumber,
                newData.position
              )

              window.location.reload()
              if (contactID) {
                toast({
                  title: "New Contact Added",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                })
              } else {
                toast({
                  title: "Failed to create Contact",
                  description: "Please try again",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                })
              }
            },
            onRowDelete: oldData => {
              deleteContact(oldData.id)

              window.location.reload()
              toast({
                title: "Contact Successfully Deleted",
                status: "success",
                duration: 5000,
                isClosable: true,
              })
            },
          }}
        />
      </MuiThemeProvider>
      <ContactPopUp onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

/**
 * Renders the page content wrapped in Layout
 */
const Contacts = props => {
  return (
    <Layout location={props.location}>
      <Seo title="Contacts" />
      <ContactsPage />
    </Layout>
  )
}

export default Contacts
