import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { Heading } from "@chakra-ui/react"

const CompaniesPage = ({user, setUser, org, setOrg}) => {
  return (<>
      <Heading>Companies for {org.name}</Heading>
  </>)
}

const Companies = (props) => (
  <Layout location={props.location}>
    <Seo title="Companies" />
    <CompaniesPage/>
  </Layout>
)

export default Companies
