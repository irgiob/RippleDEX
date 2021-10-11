import React, { useState, useEffect } from "react"
import {
  getInvitesByEmail,
  addUserToOrganization,
  getOrganization,
  deleteInvite,
} from "../../models/Organisation"
import { navigate } from "gatsby-link"

import { ImArrowLeft } from "react-icons/im"

import {
  Box,
  Image,
  Text,
  HStack,
  VStack,
  Flex,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Avatar,
  Spacer,
  useToast,
} from "@chakra-ui/react"

import LogoWhite from "../../images/RippleDEXWhite.svg"
import LogoDark from "../../images/RippleDEXDark.svg"
import AcceptInvite from "../../images/PopUps/AcceptInvitation.jpg"

const JoinOrgPopup = props => {
  const toast = useToast()
  const [invites, setInvites] = useState([])
  const [focusedInvitation, setFocusedInvitation] = useState(false)

  const handleBack = () => {
    setFocusedInvitation(false)
  }

  useEffect(() => {
    const getInvites = async userEmail => {
      const currentInvites = await getInvitesByEmail(userEmail)
      if (currentInvites) {
        for (const invite of currentInvites) {
          const org = await getOrganization(invite.organizationID)
          invite.organization = org
        }
        setInvites(currentInvites)
      }
    }
    getInvites(props.userEmail)
  }, [props.userEmail])

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        maxW="900px"
        maxH="500px"
        borderRadius="15px"
        value="inside"
      >
        <Box w="900px" h="500px">
          <Image
            position="absolute"
            src={AcceptInvite}
            zIndex="-1"
            borderRadius="15px"
          />
          <HStack p="30px">
            <Image w="80px" mt="5px" mr="15px" src={LogoWhite} />
            <Text fontFamily="Raleway-Bold" fontSize="30px" color="white">
              RippleDEX
            </Text>
            <Spacer />
            {focusedInvitation !== false && (
              <Button bg="ripple.100" color="white" onClick={handleBack}>
                <ImArrowLeft size="35px" />
              </Button>
            )}
          </HStack>

          <Center>
            <Box
              bg="white"
              h="350px"
              w="500px"
              borderRadius="50px"
              value="inside"
            >
              {focusedInvitation === false && (
                <>
                  <ModalCloseButton size="50px" m="15px" />
                  <Box p="2em" h="100%">
                    <ModalHeader
                      fontFamily="Raleway-Bold"
                      fontSize="2rem"
                      color="ripple.200"
                    >
                      Invitations
                    </ModalHeader>
                    {invites.length === 0 && (
                      <Center w="100%">
                        <Text
                          fontFamily="Raleway-Bold"
                          fontSize="1rem"
                          color="ripple.100"
                        >
                          You do not have any invitations at the moment
                        </Text>
                      </Center>
                    )}

                    {invites.length !== 0 && (
                      <Center overflowY="scroll" w="100%">
                        <VStack spacing="1em" align="left" w="100%" pl="1em">
                          {invites.map((invite, i) => (
                            <InviteListItem
                              key={"invite_" + i}
                              invite={invite}
                              setFocusedInvitation={setFocusedInvitation}
                            />
                          ))}
                        </VStack>
                      </Center>
                    )}
                  </Box>
                </>
              )}
              {focusedInvitation !== false && (
                <>
                  <ModalHeader
                    pt="35px"
                    pl="40px"
                    pb="20px"
                    fontFamily="Raleway-Bold"
                    fontSize="30px"
                    color="ripple.200"
                  >
                    Accept Invitation
                  </ModalHeader>
                  <Text fontSize="20px" color="gray" pl="40px">
                    You are invited to join
                  </Text>
                  <HStack pt="20px">
                    <Spacer />
                    <Image
                      boxSize="100px"
                      borderRadius="30px"
                      objectFit="contain"
                      src={
                        focusedInvitation?.organization.profilePicture ||
                        LogoDark
                      }
                      alt="Workspace Image"
                    />
                    <Box w="50%" maxH="50%">
                      <Text
                        fontFamily="Raleway-Bold"
                        fontSize="25px"
                        color="black"
                        pl="40px"
                      >
                        {focusedInvitation?.organization.name} <br />
                      </Text>

                      <Text
                        fontSize="15px"
                        color="gray"
                        pl="40px"
                        maxH="100px"
                        overflowY="Scroll"
                      >
                        {focusedInvitation?.organization.description} <br />
                      </Text>
                    </Box>
                    <Spacer />
                  </HStack>
                  <Box>
                    <HStack pt="10px" m="20px" justifyContent="space-between">
                      <Spacer />
                      <Button
                        w="40%"
                        bgColor="red.400"
                        color="white"
                        fontFamily="Raleway-Bold"
                        borderRadius="30px"
                        variant="solid"
                        size="lg"
                        _hover={{ transform: "scale(1.05)" }}
                        onClick={() => {
                          deleteInvite(focusedInvitation?.id).then(() => {
                            toast({
                              title: "Success",
                              description: "Invite has been declined",
                              status: "success",
                              duration: 5000,
                              isClosable: true,
                            })
                            const newInvites = invites.slice()
                            const index = newInvites.indexOf(focusedInvitation)
                            if (index > -1) newInvites.splice(index, 1)
                            setInvites(newInvites)
                            setFocusedInvitation(false)
                          })
                        }}
                      >
                        Decline
                      </Button>
                      <Button
                        w="40%"
                        bgColor="ripple.200"
                        color="white"
                        fontFamily="Raleway-Bold"
                        borderRadius="30px"
                        variant="solid"
                        size="lg"
                        _hover={{ transform: "scale(1.05)" }}
                        onClick={() => {
                          addUserToOrganization(
                            focusedInvitation?.organizationID,
                            props.userID,
                            focusedInvitation?.position
                          ).then(
                            deleteInvite(focusedInvitation?.id),
                            toast({
                              title: "Success",
                              description: "Organization has been added",
                              status: "success",
                              duration: 5000,
                              isClosable: true,
                            }),
                            navigate("/")
                          )
                        }}
                      >
                        Accept
                      </Button>
                      <Spacer />
                    </HStack>
                  </Box>
                </>
              )}
            </Box>
          </Center>
        </Box>
      </ModalContent>
    </Modal>
  )
}

const InviteListItem = ({ invite, setFocusedInvitation }) => {
  return (
    <Flex
      _hover={{ color: "ripple.200", transform: "scale(1.05)" }}
      onClick={() => setFocusedInvitation(invite)}
      cursor="pointer"
    >
      <Avatar
        src={invite?.organization.profilePicture || LogoWhite}
        size="lg"
      />
      <Box ml="3">
        <Text fontWeight="bold" fontSize="xl">
          Workspace: {invite?.organization.name}
        </Text>
        <Text maxW="100%" fontSize="lg" color="gray">
          Position: {invite?.position}
        </Text>
      </Box>
    </Flex>
  )
}

export default JoinOrgPopup
