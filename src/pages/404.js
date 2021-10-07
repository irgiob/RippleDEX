import * as React from "react"

import theme from "../components/theme"
import NotFound from "../images/404/404_1.png"

import { Text, Heading, Image, Box, ChakraProvider } from "@chakra-ui/react"

const NotFoundPage = () => (
  <ChakraProvider theme={theme}>
    <Box h="100vh" w="100vw" bgColor="ripple.100">
      <Box pos="absolute" top="25%" left="25%" textAlign="center">
        <Heading color="ripple.200" fontSize="10rem" mb="0.1em">
          404
        </Heading>
        <Text color="white" fontSize="1.5rem">
          The page you're looking for doesn't exist...
        </Text>
      </Box>
      <Image src={NotFound} w="60vw" pos="absolute" bottom="0" right="0" />
    </Box>
  </ChakraProvider>
)

export default NotFoundPage
