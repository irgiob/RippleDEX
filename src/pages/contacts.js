import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { Heading } from "@chakra-ui/react"

const ContactsPage = ({user, setUser, org, setOrg}) => {
  return (<>
      <Heading>Contacts for {org.name}</Heading>
  </>)
}

const Contacts = (props) => (
  <Layout location={props.location}>
    <Seo title="Contacts" />
    <ContactsPage/>
  </Layout>
)

export default Contacts
