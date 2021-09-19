import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { Heading } from "@chakra-ui/react"

const AnalyticsPage = ({user, setUser, org, setOrg}) => {
    return (<>
        <Heading>Analytics for {org.name}</Heading>
    </>)
}

const Analytics = (props) => (
  <Layout location={props.location}>
    <Seo title="Analytics" />
    <AnalyticsPage/>
  </Layout>
)

export default Analytics
