import React, { useState, useEffect } from "react"
import {
  getInvitesByEmail,
  addUserToOrganization,
  getOrganization,
} from "../../models/Organisation"
import { navigate } from "gatsby-link"

import { ImArrowLeft } from "react-icons/im"

import {
  Box,
  Image,
  Text,
  HStack,
  VStack,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Heading,
  Input,
  Avatar,
  SimpleGrid,
  Spacer,
  useToast,
} from "@chakra-ui/react"

import ProfilePicture from "../../images/RippleDEXDark.svg"
import LogoWhite from "../../images/RippleDEXWhite.svg"
import LogoDark from "../../images/RippleDEXDark.svg"
import joinImg from "../../images/Popups/Accept Invitation.jpg"

const JoinOrgPopup = props => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [orgName, setOrgName] = useState("")
  const [orgDesc, setOrgDesc] = useState("")
  const [invites, setInvites] = useState(["there are no invites"])
  const [orgArray, setOrgArray] = useState([])
  const [invitationDetail, setInvitationDetail] = useState([])
  const [invitationPosition, setInvitationPosition] = useState([])
  const [focusedInvitation, setFocusedInvitation] = useState(false)

  const gettingInvites = async userEmail => {
    const currentInvite = await getInvitesByEmail(userEmail)
    console.log(currentInvite)
    console.log("current visibility is " + focusedInvitation)
    if (currentInvite) {
      setInvites(currentInvite)
      console.log(currentInvite)
      const totalOrg = await currentInvite.length
      console.log("number of organizations is " + totalOrg)
      for (let i = 0; i < totalOrg; i++) {
        console.log(currentInvite[i]?.organizationID)
        const organization = await getOrganization(
          currentInvite[i]?.organizationID
        )
        setOrgArray(oldArray => [...oldArray, organization])
        console.log("this is the " + orgArray[i]?.name)
      }
    } else {
      console.log("Current Invite No Invite Set")
    }
  }

  const handleBack = () => {
    setFocusedInvitation(false)
  }

  useEffect(() => {
    gettingInvites(props.userEmail)
  }, [])

  const inviteList = invites.map((invites, i) => {
    const handleClick = async () => {
      setInvitationDetail(orgArray[i])
      setInvitationPosition(invites)
      setFocusedInvitation(true)
      console.log("the invitation detail for " + invitationDetail?.name)
      console.log("The invitation position " + invitationPosition?.position)
      console.log("The Visibility " + focusedInvitation)
    }

    return (
      <li w="100%" mt="10%" key={i}>
        <Box
          m="25px"
          maxW="100%"
          bgColor="white"
          h="80px"
          _hover={{
            color: "ripple.200",
          }}
        >
          <HStack pl="25px" pr="25px">
            <Image
              src={orgArray[i]?.profilePicture || ProfilePicture}
              boxSize="100px"
              p="5px"
            />
            <Spacer />
            <Box textAlign="left" ml>
              <Heading as="h3" size="md">
                Invited to Join:
              </Heading>
              <Text color="gray">{orgArray[i]?.name}</Text>
            </Box>
            <Spacer />
            <Box textAlign="left" ml>
              <Heading as="h3" size="md">
                Organization Position:
              </Heading>
              <Text color="gray">{invites?.position}</Text>
            </Box>
            <Spacer />
            <Button
              bgColor="ripple.200"
              color="white"
              fontFamily="Raleway-Bold"
              borderRadius="30px"
              variant="solid"
              size="lg"
              _hover={{
                transform: "scale(1.05)",
              }}
              onClick={handleClick}
            >
              View invitation
            </Button>
          </HStack>
          <hr />
        </Box>
      </li>
    )
  })

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      {focusedInvitation == false && (
        <ModalContent
          pos="absolute"
          h="900px"
          minHeight="90%"
          maxW="80%"
          borderRadius="15px"
          value="inside"
        >
          <ModalCloseButton size="50px" m="15px" />
          <Box>
            <ModalHeader
              pl="60px"
              pb="10px"
              fontFamily="Raleway-Bold"
              fontSize="40px"
              color="ripple.200"
            >
              Organization Invitations
            </ModalHeader>
            <hr />
            <Text
              align="left"
              pl="60px"
              fontFamily="Raleway-Bold"
              fontSize="20px"
              color="ripple.100"
            >
              there are currently {inviteList.length} Invites
            </Text>
            <Box pt="5px" pb="5px" w="100%">
              <hr />
              <ol style={{ listStyleType: "none" }}>{inviteList}</ol>
            </Box>
          </Box>
        </ModalContent>
      )}
      {focusedInvitation == true && (
        <ModalContent
          bg="linear-gradient(0deg, rgba(119,207,235,1) 0%, rgba(119,207,235,1) 85%);"
          pos="absolute"
          h="700px"
          minHeight="90%"
          maxW="80%"
          borderRadius="15px"
          value="inside"
          overflow="hidden"
        >
          <ModalCloseButton size="50px" m="30px" />
          <HStack p="30px">
            <Image w="80px" mt="5px" mr="15px" src={LogoWhite} />
            <Text fontFamily="Raleway-Bold" fontSize="30px" color="white">
              RippleDEX
            </Text>
            <Spacer />
            <Button bg="ripple.100" color="white" onClick={handleBack}>
              {" "}
              <ImArrowLeft size="35px" />
            </Button>
          </HStack>

          <Center>
            <Box
              mt="4%"
              bg="white"
              p="20px"
              h="500px"
              maxW="60%"
              w="650px"
              borderRadius="50px"
              value="inside"
            >
              <ModalHeader
                pt="35px"
                pl="40px"
                pb="20px"
                fontFamily="Raleway-Bold"
                fontSize="30px"
                color="ripple.200"
              >
                Current Invitation
              </ModalHeader>
              <Text fontSize="20px" color="gray" pl="40px">
                You are invited to join as {invitationPosition?.position}
              </Text>

              <HStack pt="40px">
                <Spacer />
                <Image
                  boxSize="100px"
                  borderRadius="30px"
                  objectFit="contain"
                  src={invitationDetail?.profilePicture || LogoDark}
                  alt="Workspace Image"
                />
                <Box w="50%" maxH="50%">
                  <Text
                    fontFamily="Raleway-Bold"
                    fontSize="25px"
                    color="black"
                    pl="40px"
                  >
                    {invitationDetail?.name} <br /> <hr />
                  </Text>

                  <Text
                    fontSize="15px"
                    color="gray"
                    pl="40px"
                    maxH="100px"
                    overflowY="Scroll"
                  >
                    {invitationDetail?.description} <br /> <hr />
                  </Text>
                </Box>
                <Spacer />
              </HStack>
              <Box>
                <HStack pt="40px" m="20px" justifyContent="space-between">
                  <Spacer />
                  <Button
                    w="40%"
                    bgColor="red.400"
                    color="white"
                    fontFamily="Raleway-Bold"
                    borderRadius="30px"
                    variant="solid"
                    size="lg"
                    _hover={{
                      transform: "scale(1.05)",
                    }}
                  >
                    Decline
                  </Button>
                  <Box w="20px" />
                  <Button
                    w="40%"
                    bgColor="ripple.200"
                    color="white"
                    fontFamily="Raleway-Bold"
                    borderRadius="30px"
                    variant="solid"
                    size="lg"
                    _hover={{
                      transform: "scale(1.05)",
                    }}
                    onClick={() => {
                      addUserToOrganization(
                        invitationPosition?.organizationID,
                        props.userID,
                        invitationPosition?.position
                      ).then(
                        toast({
                          title: "Success",
                          description: "Organization has been added",
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                        }),
                        navigate("/dashboard")
                      )
                    }}
                  >
                    Accept
                  </Button>
                  <Spacer />
                </HStack>
              </Box>
            </Box>
          </Center>
        </ModalContent>
      )}
    </Modal>
  )
}

export default JoinOrgPopup
