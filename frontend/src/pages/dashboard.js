import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { Heading } from "@chakra-ui/react"

const Dashboard = () => (
  <Layout>
    <Seo title="Dashboard" />
    <Heading>Welcome to your Dashboard</Heading>
  </Layout>
)

export default Dashboard