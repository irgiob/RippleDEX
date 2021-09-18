import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { Heading } from "@chakra-ui/react"

const DealsPage = ({user, setUser, org, setOrg}) => {
  return (<>
      <Heading>Deals for {org.name}</Heading>
  </>)
}

const Deals = (props) => (
  <Layout location={props.location}>
    <Seo title="Deals" />
    <DealsPage/>
  </Layout>
)

export default Deals
