import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { Heading } from "@chakra-ui/react"

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

import DealPopUp from "../components/deals/dealPopup"

import { createNewDeal, getDealsByOrg, deleteDeal } from "../models/Deal"

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

import { AiFillEdit } from "react-icons/ai"

const DealsPage = ({ user, setUser, org, setOrg }) => {
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
  const [dealList, setDealList] = React.useState([])
  const [value, setValue] = React.useState("")

  React.useEffect(() => {
    var promise = Promise.resolve(getDealsByOrg(org))
    promise.then(function (val) {
      setDealList(val)
    })
  }, [])

  const handlePopUp = value => {
    setValue(value)
    onOpen()
  }

  const currTime = new Date().toLocaleString()
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
          title={`Deals for ${org.name} (${currTime})`}
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
          data={dealList}
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
              title: "Deal Name",
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
              title: "Deal Size",
              field: "dealSize",
              type: "string",
              width: "18%",
            },
            {
              title: "Stage",
              field: "stage",
              type: "string",
              width: "18%",
              align: "left",
            },
            {
              title: "Close Date",
              field: "closeDate",
              type: "string",
              width: "18%",
            },

            { title: "ID", field: "id", type: "string", hidden: true },
            {
              title: "Recorded By",
              field: "recordedBy",
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
                  const dealID = createNewDeal(
                    org,
                    newData.name,
                    newData.dealSize,
                    newData.stage,
                    newData.recordedBy,
                    newData.closeDate,
                    newData.company
                  )

                  if (dealID) {
                    setDealList([...dealList, newData])
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
