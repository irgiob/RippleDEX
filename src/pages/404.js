import * as React from "react"

import Layout from "../components/layout"
import NotFoundImg from "../images/404/404_1.png"

import { Text, Heading, Image, Box } from "@chakra-ui/react"

const NotFoundPage = () => (
  <Box h="100%" w="100%">
    <Box pos="absolute" top="25%" left="25%" textAlign="center">
      <Heading color="ripple.200" fontSize="10rem" mb="0.1em">
        404
      </Heading>
      <Text fontSize="1.5rem">
        The page you're looking for doesn't exist...
      </Text>
    </Box>
    <Image src={NotFoundImg} w="60vw" pos="absolute" bottom="0" right="0" />
  </Box>
)

const NotFound = props => (
  <Layout location={props.location}>
    <NotFoundPage />
  </Layout>
)

export default NotFound
