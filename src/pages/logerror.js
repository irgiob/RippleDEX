import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { Center, Text, Image, VStack } from "@chakra-ui/react"

import AuthFail from "../images/Auth/AuthFail.svg"

const LoginFailure = () => (
  <Layout>
    <Seo title="Failure" />
    <Center h="80vh">
      <VStack textAlign="center">
        <Image h="400px" src={AuthFail} />
        <Text
          fontFamily="Raleway-Extra"
          fontSize="30px"
          maxW="70vh"
          color="ripple.200"
        >
          Failed to Log In
        </Text>
        <Text fontSize="20px" maxW="60vh" color="gray.500">
          Please make sure to enter the right email address and password
        </Text>
      </VStack>
    </Center>
  </Layout>
)

export default LoginFailure
