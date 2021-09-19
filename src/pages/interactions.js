import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { Heading } from "@chakra-ui/react"

const InteractionsPage = ({user, setUser, org, setOrg}) => {
  return (<>
      <Heading>Interactions for {org.name}</Heading>
  </>)
}

const Interactions = (props) => (
  <Layout location={props.location}>
    <Seo title="Interactions" />
    <InteractionsPage/>
  </Layout>
)

export default Interactions
