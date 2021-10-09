import * as React from "react"

import Layout from "../components/layout"

import LogoDark from "../images/RippleDEXDark.svg"

import CreateOrgPopup from "../components/orgPopups/createOrg"
import JoinOrgPopup from "../components/orgPopups/joinOrg"

import { sendVerificationEmail } from "../utils/AuthFunctions"

import {
  Box,
  Image,
  Text,
  VStack,
  Button,
  Center,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"

const WelcomePage = ({ user, setUser, org, setOrg }) => {
  const toast = useToast()

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
        {user.isVerified ? (
          <>
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
                userEmail={user?.email}
                onOpen={onJoinOpen}
                isOpen={isJoinOpen}
                onClose={onJoinClose}
              />
            </Box>
          </>
        ) : (
          <>
            <Box width="30em">
              <Text
                fontSize="2rem"
                color="darkgray"
                align="center"
                fontFamily="Nunito-Bold"
                variant="solid"
              >
                Your account hasn't been verified
              </Text>
            </Box>
            <VStack align="center">
              <Text
                fontSize="1.25rem"
                color="darkgray"
                align="center"
                fontFamily="Nunito-Bold"
                variant="solid"
              >
                You can't use our services until you verify your email
              </Text>
              <Text
                fontSize="1.25rem"
                color="darkgray"
                align="center"
                fontFamily="Nunito-Bold"
                variant="solid"
              >
                Check your inbox for the verification email we sent you
              </Text>
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
                onClick={async () => {
                  await sendVerificationEmail()
                  toast({
                    title: "Verification email has been resent",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })
                }}
              >
                Resend Verification Email
              </Button>
            </VStack>
          </>
        )}
      </VStack>
    </Center>
  )
}

const Welcome = props => {
  return (
    <Layout location={props.location}>
      <WelcomePage />
    </Layout>
  )
}

export default Welcome
