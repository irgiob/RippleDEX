import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

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
  useDisclosure,
} from "@chakra-ui/react"

const WelcomePage = ({ user, setUser, org, setOrg }) => {
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()

  const {
    isOpen: isJoinOpen,
    onOpen: onJoinOpen,
    onClose: onJoinClose,
  } = useDisclosure()

  return (
    <Center h="90vh">
      <VStack spacing={10} align="center">
        <Box h="2em">
          <Image
            style={{ opacity: "0.5", filter: "grayscale(100%)" }}
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
            p="1em"
            bgColor="ripple.200"
            color="white"
            fontFamily="Raleway-Bold"
            borderRadius="40px"
            variant="solid"
            fontSize="1.5rem"
            w="15em"
            _hover={{ transform: "scale(1.05)" }}
            onClick={onCreateOpen}
          >
            Create a workspace
          </Button>
          <CreateOrgPopup
            userID={user.id}
            isOpen={isCreateOpen}
            onClose={onCreateClose}
          />
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
            p="1em"
            bgColor="ripple.200"
            color="white"
            fontFamily="Raleway-Bold"
            borderRadius="40px"
            variant="solid"
            fontSize="1.5rem"
            w="15em"
            _hover={{ transform: "scale(1.05)" }}
            onClick={onJoinOpen}
          >
            Join a workspace
          </Button>
          <JoinOrgPopup
            userID={user.id}
            isOpen={isJoinOpen}
            onClose={onJoinClose}
          />
        </Box>
      </VStack>
    </Center>
  )
}

const Welcome = props => {
  return (
    <Layout location={props.location}>
      <Seo title="Welcome" />
      <WelcomePage />
    </Layout>
  )
}

export default Welcome
