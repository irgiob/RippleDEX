import React, { useState, useEffect } from "react"
import { updateUser } from "../../models/User"
import { getOrganization } from "../../models/Organisation"
import { navigate } from "gatsby-link"

import {
  Box,
  VStack,
  Flex,
  Avatar,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Text,
  useToast,
} from "@chakra-ui/react"

import ProfilePicture from "../../images/RippleDex.png"
import { BiSearch } from "react-icons/bi"

const SwitchOrgPopup = props => {
  const toast = useToast()
  const [search, setSearch] = useState("")
  const [orgs, setOrgs] = useState([props.org])

  useEffect(() => {
    const getOrgs = async orgIDs => {
      const orgList = []
      for await (const orgID of orgIDs) {
        if (orgID !== props.org.id) {
          const org = await getOrganization(orgID)
          orgList.push(org)
        }
      }
      setOrgs([props.org, ...orgList])
    }
    getOrgs(props.user.organizations)
  }, [props])

  return (
    <Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent
        pos="absolute"
        minH="50%"
        maxH="80%"
        maxW="25%"
        borderRadius="15px"
        value="inside"
        scrollBehavior="inside"
      >
        <ModalCloseButton m="15px" />
        <Box textAlign="left" w="100%" h="100%" p="2em" pb="0">
          <Text
            mb="0.5em"
            fontFamily="Nunito-Bold"
            fontSize="23px"
            color="ripple.200"
          >
            Switch Organizations
          </Text>
          <InputGroup mb="1em">
            <InputLeftElement
              pointerEvents="none"
              children={<BiSearch style={{ color: "#a2b1c0" }} />}
            />
            <Input
              type="text"
              placeholder="Search"
              onChange={e => setSearch(e.target.value.toLowerCase())}
            />
          </InputGroup>
        </Box>
        <VStack
          overflowY="auto"
          align="left"
          spacing="1em"
          w="100%"
          p="2em"
          pt="0"
        >
          {orgs
            .filter(org => org.name.toLowerCase().includes(search))
            .map((org, i) => (
              <OrgListItem
                key={i}
                org={org}
                isCurrentOrg={org.id === props.org?.id}
                onClick={() => {
                  updateUser(props.user?.id, {
                    lastOpenedOrganization: org.id,
                  }).then(
                    toast({
                      title: "Success",
                      description: "Organization has been changed",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    }),
                    navigate("/")
                  )
                }}
              />
            ))}
        </VStack>
      </ModalContent>
    </Modal>
  )
}

const OrgListItem = ({ onClick, org, isCurrentOrg }) => {
  var transformScale = "scale(1.05)"
  var cursor = "pointer"

  if (isCurrentOrg) {
    onClick = () => {}
    transformScale = "scale(1)"
    cursor = "default"
  }

  return (
    <Flex
      _hover={{ transform: transformScale }}
      onClick={onClick}
      cursor={cursor}
    >
      <Avatar src={org.profilePicture || ProfilePicture} />
      <Box ml="3">
        <Text fontWeight="bold">
          {org.name}
          {isCurrentOrg && (
            <Badge ml="1" colorScheme="green">
              Current
            </Badge>
          )}
        </Text>
        <Text maxW="100%" fontSize="sm">
          {org.description}
        </Text>
      </Box>
    </Flex>
  )
}

export default SwitchOrgPopup
