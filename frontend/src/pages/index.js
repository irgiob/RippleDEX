import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { Heading } from "@chakra-ui/react"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Heading bgColor={["ripple.100", "ripple.200"]}>Hello Friends!</Heading>
  </Layout>
)

export default IndexPage
