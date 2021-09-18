import React, { useState, useEffect } from "react"
import { onAuthLoad } from "../utils/AuthFunctions"
import { navigate } from "gatsby-link"
import Layout from "../components/layout"

import LogoDark from "../images/RippleDEXDark.svg" 

import CreateOrgPopup from "../components/orgPopups/createOrg"
import JoinOrgPopup from "../components/orgPopups/joinOrg"

import {
  Box,
  Image,
  Text,
  VStack,
  Button,
  Center,
  useDisclosure
} from "@chakra-ui/react"

const Workspace = (props) => {
  const [userID, setUserID] = useState(null)
  const { 
    isOpen: isCreateOpen, 
    onOpen: onCreateOpen, 
    onClose: onCreateClose 
  } = useDisclosure()
  const { 
    isOpen: isJoinOpen, 
    onOpen: onJoinOpen, 
    onClose: onJoinClose 
  } = useDisclosure()

  useEffect(() => {
    onAuthLoad(
      loggedUser => setUserID(loggedUser.uid),
      () => navigate("/")
    )
  }, [])

  if (!userID) {
    return (<Layout location={props.location}><h1>Loading...</h1></Layout>)
  }

  return( 
    <Layout location={props.location}>
      <Center h="90vh" >
        <VStack spacing={10} align="center" >
          <Box h="2em">
            <Image
              style={{opacity: "0.5" ,  filter: "grayscale(100%)" }}
              w="8em"
              src={LogoDark}
            />
          </Box>
          <Box width="30em">
            <Text 
              fontSize="2rem"
              color="darkgray" 
              align="center" 
              fontFamily="Nunito-Bold" 
              variant="solid"
            > 
                You don’t have an active workspace at the moment
            </Text>
          </Box>
          <Box>
            <Button
              p = "1em"
              bgColor="ripple.200"
              color="white"
              fontFamily="Raleway-Bold"
              borderRadius="40px"
              variant="solid"
              fontSize="1.5rem"
              w="15em"
              _hover={{transform: "scale(1.05)"}}
              onClick={onCreateOpen}
            >
              Create a workspace
            </Button>
            <CreateOrgPopup userID={userID} isOpen={isCreateOpen} onClose={onCreateClose}/>
            <Text 
              m="0.25em"
              fontSize="1.5rem"
              color="darkgray" 
              align="center" 
              fontFamily="Nunito-Bold" 
              variant="solid"
            > 
                or
            </Text>
            <Button
              p = "1em"
              bgColor="ripple.200"
              color="white"
              fontFamily="Raleway-Bold"
              borderRadius="40px"
              variant="solid"
              fontSize="1.5rem"
              w="15em"
              _hover={{transform: "scale(1.05)"}}
              onClick={onJoinOpen}
            >
              Join a workspace
            </Button>
            <JoinOrgPopup userID={userID} isOpen={isJoinOpen} onClose={onJoinClose}/>
          </Box>
        </VStack>
      </Center>
    </Layout>
  )
}

export default Workspace