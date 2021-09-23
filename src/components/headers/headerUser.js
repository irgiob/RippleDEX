import React, { useState } from "react"
import { logout } from "../../utils/AuthFunctions"
import { updateUser } from "../../models/User"
import { removeUserFromOrganization } from "../../models/Organisation"
import { Link } from "gatsby"
import { navigate } from "gatsby-link"

import {
  Box,
  Image,
  Circle,
  Divider,
  HStack,
  Spacer,
  useDisclosure,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  AvatarBadge,
  Avatar,
  Heading,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react"

import {
  RiArrowDropDownLine,
  RiArrowLeftRightLine,
  RiLogoutBoxLine,
} from "react-icons/ri"

import Logo from "../../images/RippleDEXWhite.svg"
import ProfilePicture from "../../images/RippleDEXWhite.svg"

import ProfileSettings from "../settings/profileSettings"

const HeaderUser = props => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tab, setTab] = useState(0)
  const { user, setUser, org, setOrg } = props
  const toast = useToast()

  const clickHandler = () => {
    logout()
    navigate("/")
  }

  const handleOpen = val => {
    setTab(val)
    onOpen()
  }

  const leaveWorkspace = async () => {
    await removeUserFromOrganization(org?.id, user?.id)
    toast({
      title: "Success",
      description: "You have left " + org?.name,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    navigate("/dashboard")
  }

  return (
    <Box zIndex={999} position="fixed" w="100vw" h="60px" bgColor="ripple.200">
      <HStack h="100%" textAlign="center" mr="20px">
        <a href="/dashboard">
          <Box pt="7px">
            <Image
              top="23px"
              left="12px"
              zIndex={999}
              pos="absolute"
              w="60px"
              src={Logo}
            />
            <Circle
              left="2px"
              top="-5px"
              pos="absolute"
              bgColor="ripple.200"
              size="78px"
            ></Circle>
          </Box>
        </a>
        <Box pl="6.5em">
          {org?.name && (
            <Popover placement="bottom-start">
              <PopoverTrigger>
                <Button
                  w="fit"
                  h="50px"
                  color="white"
                  bgColor="ripple.200"
                  fontFamily="Raleway-Bold"
                  fontSize="28px"
                  _hover={{ transform: "scale(1.01)" }}
                  _active={{ bg: "ripple.200", transform: "scale(1.01)" }}
                >
                  {org?.name || "loading..."}
                  {<RiArrowDropDownLine size="50px" />}
                </Button>
              </PopoverTrigger>
              <PopoverContent w="350px">
                <PopoverBody>
                  <VStack spacing={5} align="start" p="8px">
                    <HStack p="15px" spacing={5}>
                      <Avatar size="md" src={org?.profilePicture || Logo} />
                      <Box textAlign="left" ml>
                        <Heading as="h3" size="md">
                          {org?.name || "loading..."}
                        </Heading>
                        <Text color="gray">
                          {org?.description || "loading..."}
                        </Text>
                      </Box>
                    </HStack>
                    {org?.admin === user?.id && (
                      <>
                        <Divider />
                        <Button
                          bgColor="white"
                          _hover={{
                            transform: "scale(1.08)",
                          }}
                        >
                          <Link to="/Invite">
                            {" "}
                            Invite people to {org?.name || "loading..."}
                          </Link>
                        </Button>
                        <Button
                          bgColor="white"
                          _hover={{
                            transform: "scale(1.08)",
                          }}
                          onClick={() => {
                            handleOpen(3)
                          }}
                        >
                          Settings & Administration
                        </Button>
                      </>
                    )}
                    <Divider />
                    <Button
                      bgColor="white"
                      _hover={{
                        transform: "scale(1.08)",
                      }}
                      leftIcon={<RiArrowLeftRightLine />}
                    >
                      Switch Workspace
                    </Button>
                    {org?.admin !== user?.id && (
                      <Button
                        bgColor="white"
                        color="red.600"
                        _hover={{
                          transform: "scale(1.08)",
                        }}
                        onClick={leaveWorkspace}
                        leftIcon={<RiLogoutBoxLine />}
                      >
                        Leave Workspace
                      </Button>
                    )}
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
          {!user?.lastOpenedOrganization && (
            <Text
              w="fit"
              h="50px"
              color="white"
              bgColor="ripple.200"
              fontFamily="Raleway-Bold"
              fontSize="30px"
            >
              {" "}
              No Workspace
            </Text>
          )}
        </Box>
        <Spacer />
        {/* Header Profile Right Side */}
        <Box pr="15px">
          <ProfileSettings
            isOpen={isOpen}
            onClose={onClose}
            tab={tab}
            user={user}
            setUser={setUser}
            org={org}
            setOrg={setOrg}
          />
          <Popover>
            <PopoverTrigger>
              <Avatar
                size="md"
                name={user?.firstName + " " + user?.lastName || "loading..."}
                src={user?.profilePicture || ProfilePicture}
                _hover={{
                  transform: "scale(1.01)",
                }}
              >
                <AvatarBadge
                  boxSize="20px"
                  bg={user?.isInvisible ? "gray.300" : "green.300"}
                  borderColor="ripple.200"
                />
                {/* bg is online or offline, change based on boolean later */}
              </Avatar>
            </PopoverTrigger>
            <PopoverContent w="350px">
              <PopoverBody>
                <VStack spacing={5} align="start" p="8px">
                  <HStack p="15px" spacing={5}>
                    <Avatar
                      size="md"
                      name={
                        user?.firstName + " " + user?.lastName?.lastName ||
                        "loading..."
                      }
                      src={user?.profilePicture || ProfilePicture}
                      _hover={{
                        transform: "scale(1.01)",
                      }}
                    >
                      <AvatarBadge
                        boxSize="20px"
                        borderColor="black"
                        bg={user?.isInvisible ? "gray.300" : "green.300"}
                      />
                      {/* bg is online or offline, change based on boolean later */}
                    </Avatar>
                    <Box textAlign="left" ml>
                      <Heading as="h3" size="md">
                        {user?.firstName + " " + user?.lastName || "loading..."}
                      </Heading>
                      <Text color="gray">{user?.email || "loading..."}</Text>
                    </Box>
                  </HStack>

                  <Divider />
                  <Button
                    bgColor="white"
                    _hover={{ transform: "scale(1.08)" }}
                    onClick={() => {
                      updateUser(user?.id, {
                        isInvisible: !user?.isInvisible,
                      }).then(updatedUser => setUser(updatedUser))
                    }}
                  >
                    Set as {user?.isInvisible ? "Visible" : "Invisible"}
                  </Button>
                  {/* should be a button*/}
                  <Button
                    bgColor="white"
                    _hover={{ transform: "scale(1.08)" }}
                    onClick={() => handleOpen(1)}
                  >
                    Notifications
                  </Button>
                  <Divider />
                  <Button
                    bgColor="white"
                    _hover={{ transform: "scale(1.08)" }}
                    onClick={() => handleOpen(0)}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    bgColor="white"
                    _hover={{ transform: "scale(1.08)" }}
                    onClick={() => {
                      handleOpen(0)
                    }}
                  >
                    View Profile
                  </Button>
                  <Divider />
                  <Button
                    color="red"
                    bgColor="white"
                    onClick={clickHandler}
                    _hover={{ transform: "scale(1.08)" }}
                    leftIcon={<RiLogoutBoxLine />}
                  >
                    Sign out of RippleDEX
                  </Button>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </HStack>
    </Box>
  )
}

export default HeaderUser
