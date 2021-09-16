import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { Box, Text } from "@chakra-ui/react"

import MaterialTable from "material-table"

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core"
import Pic from "../images/RippleDex.png"

import { forwardRef } from "react"

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

const Contacts = props => {
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

  return (
    <Layout location={props.location}>
      <Seo title="Contacts" />
      <Box p="25px">
        <Text
          pb="20px"
          fontFamily="Raleway-Bold"
          fontSize="28px"
          color="ripple.200"
        >
          Contacts
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
            }}
            title="Contacts"
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
              { title: "Email", field: "email", type: "string", width: "18%" },
              {
                title: "Phone Number",
                field: "phone",
                type: "numeric",
                width: "18%",
                align: "left",
              },
            ]}
            data={[
              {
                name: "Evan Flores",
                company: "Louis Vuitton",
                position: "Project Manager",
                email: "evanflores@gmail.com",
                phone: "+61 449 234 035",
              },
              { name: "Arlene Wilson" },
            ]}
          />
        </MuiThemeProvider>
      </Box>
    </Layout>
  )
}

export default Contacts
