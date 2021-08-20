import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "./index.css"

import { Box, Heading, Text, HStack, VStack } from "@chakra-ui/react"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />

    <Box bgColor="ripple.100" h="90vh" w="100vw">
      <HStack pl="120px" h={["50%", "70%"]}>
        <VStack alignItems="left">
          <Heading fontSize="50px" color="ripple.200">
            RippleDEX
          </Heading>
          <Text fontSize="20px" color="white">
            Manage clients and close deals with our state of the art CRM
          </Text>
        </VStack>
      </HStack>
    </Box>

    <div class="custom-shape-divider-bottom">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>

    <Box h="100vh"></Box>
  </Layout>
)

export default IndexPage
