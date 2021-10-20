import React, { useEffect, useState } from "react"

import {
  updateOrganization,
  removeUserFromOrganization,
} from "../../models/Organisation"
import { getUser } from "../../models/User"

import {
  Box,
  Button,
  Center,
  Circle,
  Divider,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Spacer,
  SkeletonCircle,
  Skeleton,
  Text,
  VStack,
  useToast,
  Avatar,
  Badge,
  AvatarBadge,
  Tooltip,
} from "@chakra-ui/react"

import ProfilePicture from "../../images/RippleDEXWhite.svg"

import { BiTrash, BiUserMinus, BiSearch } from "react-icons/bi"

import UploadImageButton from "../uploadImageButton"
import InviteOrgPopup from "../orgPopups/inviteOrg"

const OrganizationSettings = props => {
  const [orgName, setOrgName] = useState(props.org.name)
  const [orgDesc, setOrgDesc] = useState(props.org.description)
  const [photoUrl, setPhotoUrl] = useState(props.org.profilePicture)
  const [members, setMembers] = useState([props.user, props.user, props.user])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    const fetchMembers = async membersList => {
      const orgMembers = []
      for await (const memberObj of membersList) {
        const member = await getUser(memberObj.userID)
        orgMembers.push(member)
      }
      setMembers(orgMembers)
      setLoading(false)
    }
    fetchMembers(props.org.members)
  }, [props.org.members])

  const handleClick = async () => {
    const options = {
      name: orgName,
      description: orgDesc,
      profilePicture: photoUrl,
    }
    await updateOrganization(props.org.id, options)
    props.setOrg({ ...props.org, ...options })
    toast({
      title: "Success",
      description: "Organization details have been updated",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }

  const removeUser = async userID => {
    await removeUserFromOrganization(props.org.id, userID)
    setMembers(members.filter(member => member.id !== userID))
    toast({
      title: "Success",
      description: "Removed user from " + props.org?.name,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Modal size="2xl" isCentered isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent
        pos="absolute"
        h="500px"
        borderRadius="20px"
        pt="10px"
        pb="10px"
      >
        <ModalCloseButton m="15px" />
        <ModalBody>
          <Box pb="10px" pl="10px" textAlign="left">
            <Text
              pt="8px"
              pb="10px"
              fontFamily="Nunito-Bold"
              fontSize="23px"
              color="ripple.200"
            >
              Organization Settings
            </Text>
            <Divider />
          </Box>
          <VStack h="25em">
            <HStack align="start" spacing={4} h="100%">
              <VStack textAlign="left" spacing={5} h="100%">
                <Box textAlign="left" w="300px">
                  <Text color="ripple.200" pb="5px" fontSize="12px">
                    Workspace Name
                  </Text>
                  <Input
                    variant="outline"
                    placeholder="Organization Name"
                    type="text"
                    value={orgName}
                    onChange={e => setOrgName(e.target.value)}
                  />
                </Box>
                <Box textAlign="left" w="300px">
                  <Text color="ripple.200" pb="5px" fontSize="12px">
                    Workspace Description
                  </Text>
                  <Input
                    variant="outline"
                    placeholder="Organization Description"
                    type="text"
                    value={orgDesc}
                    onChange={e => setOrgDesc(e.target.value)}
                  />
                </Box>
                <Box textAlign="left" w="300px">
                  <HStack>
                    <Text color="ripple.200" pb="5px" fontSize="12px">
                      Manage Members
                    </Text>
                    <Spacer />
                    <InviteOrgPopup orgID={props.org.id} placement="bottom">
                      <Text
                        color="green.400"
                        pb="5px"
                        fontSize="12px"
                        _hover={{ transform: "scale(1.1)" }}
                      >
                        Invite People +
                      </Text>
                    </InviteOrgPopup>
                  </HStack>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<BiSearch style={{ color: "#a2b1c0" }} />}
                    />
                    <Input
                      type="text"
                      placeholder="Search"
                      onChange={e => setSearch(e.target.value)}
                    />
                  </InputGroup>
                </Box>
                <Box w="100%" h="100%" overflow="scroll">
                  <VStack spacing={1} align="start">
                    {members
                      .filter(member => {
                        // filter displayed members based on search box
                        return (member?.firstName + " " + member?.lastName)
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      })
                      .map((member, i) => (
                        <MemberTag
                          key={"member_" + i}
                          member={member}
                          adminID={props.user?.id}
                          loading={loading}
                          removeUser={removeUser}
                        />
                      ))}
                  </VStack>
                </Box>
              </VStack>
              <Spacer />
              <VStack spacing={0}>
                <Center h="200px" w="200px" bgColor="ripple.100">
                  <Image
                    objectFit="cover"
                    h="100%"
                    w="100%"
                    src={
                      photoUrl || props.org?.profilePicture || ProfilePicture
                    }
                  />
                </Center>
                <Box h="10px" />
                <HStack spacing={1}>
                  <UploadImageButton
                    color="ripple.200"
                    fontFamily="Raleway-Bold"
                    borderRadius="20px"
                    variant="ghost"
                    size="sm"
                    _hover={{
                      transform: "scale(1.08)",
                    }}
                    buttonMessage="Change Workspace Icon"
                    changeUrl={setPhotoUrl}
                  />
                  <Circle
                    _hover={{ transform: "scale(1.2)" }}
                    onClick={async () => {
                      await updateOrganization(props.org?.id, {
                        profilePicture: null,
                      })
                      props.setOrg({ ...props.org, profilePicture: null })
                    }}
                  >
                    <BiTrash style={{ color: "red" }} />
                  </Circle>
                </HStack>
                <Box h="50px" />
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
                  Save Changes
                </Button>
              </VStack>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const MemberTag = ({ member, adminID, loading, removeUser }) => {
  return (
    <HStack p="0.5em" spacing={3} w="100%">
      <SkeletonCircle isLoaded={!loading} size="12">
        <Avatar
          size="md"
          name={member?.firstName + " " + member?.lastName}
          src={member?.profilePicture}
          _hover={{ transform: "scale(1.01)" }}
        >
          <AvatarBadge
            boxSize="20px"
            borderColor="white"
            bg={
              member?.isInvisible ||
              Date.now() / 1000 - member?.lastOnline.seconds > 300
                ? "gray.300"
                : "green.300"
            }
          />
        </Avatar>
      </SkeletonCircle>
      <Center h="100%" w="100%">
        <Box textAlign="left" ml w="100%">
          <Skeleton isLoaded={!loading}>
            <Text fontWeight="bold">
              {member?.firstName + " " + member?.lastName}
              {member?.id === adminID && (
                <Badge ml="1" colorScheme="green">
                  You
                </Badge>
              )}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <Text color="gray" fontSize="sm">
              {member?.email}
            </Text>
          </Skeleton>
        </Box>
      </Center>
      {member?.id !== adminID && (
        <Tooltip label="Remove user" hasArrow bg="red.600">
          <Circle
            _hover={{ transform: "scale(1.2)" }}
            onClick={() => removeUser(member?.id)}
          >
            <BiUserMinus style={{ color: "red" }} />
          </Circle>
        </Tooltip>
      )}
    </HStack>
  )
}

export default OrganizationSettings
