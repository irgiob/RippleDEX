import React, { useState, useEffect } from "react"
import {
  getInvitesByEmail,
  addUserToOrganization,
  getOrganization,
} from "../../models/Organisation"
import { navigate } from "gatsby-link"

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

const JoinOrgPopup = props => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [orgName, setOrgName] = useState("")
  const [orgDesc, setOrgDesc] = useState("")
  const [invites, setInvites] = useState(["there are no invites"])
  const [orgArray, setOrgArray] = useState([])
  const [invitationDetail, setInvitationDetail] = useState([])
  const [focusedInvitation, setFocusedInvitation] = useState(false)

  const gettingInvites = async userEmail => {
    const currentInvite = await getInvitesByEmail(userEmail)
    console.log(currentInvite)
    console.log("current visibility is "  + focusedInvitation)
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



  
  useEffect(() => {
    gettingInvites(props.userEmail)
  }, [])

  const inviteList = invites.map((invites, i) => {
    const handleClick = async () => {
      setInvitationDetail(orgArray[i])
      setFocusedInvitation(true)
      console.log("the invitation detail for " + invitationDetail?.name)
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
      <ModalContent
        pos="absolute"
        h="900px"
        minHeight="90%"
        maxW="80%"
        borderRadius="15px"
        value="inside"
      >
        <ModalCloseButton size="50px" m="15px" />
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
          color="ripple.100" >there are currently {inviteList.length} Invites</Text>
        <Box pt="5px" pb="5px" w="100%">
          <hr />
          <ol style={{ listStyleType: "none" }}>{inviteList}</ol>
        </Box>
      </ModalContent>
    </Modal>
  )
}


export default JoinOrgPopup
