import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { onAuthLoad, logout } from "../utils/AuthFunctions"
import { getUser } from "../models/User"
import PopUp from "./popup"
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
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  AvatarBadge,
  Avatar,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react"

import {
  RiArrowDropDownLine,
  RiArrowLeftRightLine,
  RiLogoutBoxLine,
} from "react-icons/ri"

import Logo from "../images/RippleDEXWhite.svg"
import ProfilePicture from "../images/RippleDEXWhite.svg"

import ProfileSettings from "./settings/profileSettings"

const HeaderUser = ({ siteTitle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [type, setType] = useState("SignUp")
  const [user, setUser] = useState(null)
  const [tab, setTab] = useState(0)

  useEffect(() => {
    onAuthLoad(
      loggedUser => {
        console.log(loggedUser.uid)
        getUser(loggedUser.uid).then(userData => setUser(userData))
      },
      () => navigate("/")
    )
  }, [])

  // Organization Here Static data
  let organization = "loading..."
  let org_Id = "loading..."
  let userName = "loading..."
  let Email = "loading..."
  if (user) {
    organization = user.organization
    org_Id = user.orgID
    userName = user.name
    Email = user.email
  }

  const clickHandler = () => {
    logout()
    navigate("/login")
  }

  const handleOpen = val => {
    setTab(val)
    onOpen()
  }

  return (
    <Box zIndex={999} position="fixed" w="100vw" h="60px" bgColor="ripple.200">
      <HStack h="100%" textAlign="center" mr="20px">
        <a href="/">
          <Box pt="7px">
            <Image
              top="20px"
              left="21px"
              zIndex={999}
              pos="absolute"
              w="80px"
              src={Logo}
            />
            <Circle
              left="20px"
              top="-5px"
              pos="absolute"
              bgColor="ripple.200"
              size="80px"
            ></Circle>
          </Box>
        </a>
        <Box pl="170px">
          <Popover>
            <PopoverTrigger>
              <Button
                w="fit"
                h="50px"
                color="white"
                bgColor="ripple.200"
                fontFamily="Raleway-Bold"
                fontSize="30px"
                _hover={{ transform: "scale(1.01)" }}
                _active={{ bg: "ripple.200", transform: "scale(1.01)" }}
              >
                {organization}
                {<RiArrowDropDownLine size="50px" />}
              </Button>
            </PopoverTrigger>
            <PopoverContent w="350px">
              <PopoverBody>
                <VStack spacing={5} align="start" p="8px">
                  <HStack p="15px" spacing={5}>
                    <Avatar size="md" src={Logo} />
                    <Box textAlign="left" ml>
                      <Heading as="h3" size="md">
                        {organization}
                      </Heading>
                      <Text color="gray">{org_Id}</Text>
                    </Box>
                  </HStack>

                  <Divider />
                  <Box pl="15px" pr="15px">
                    <Link to="/Invite"> Invite people to {organization}</Link>
                  </Box>

                  <Box pl="15px" pr="15px">
                    <Link to="/Settings"> Settings &amp; Administration</Link>
                  </Box>
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
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
        <Spacer />
        {/* Header Profile Right Side */}
        <Box pr="15px">
          <ProfileSettings isOpen={isOpen} onClose={onClose} tab={tab} />
          <Popover>
            <PopoverTrigger>
              <Avatar
                size="md"
                name={userName}
                src={ProfilePicture}
                _hover={{
                  transform: "scale(1.01)",
                }}
              >
                <AvatarBadge
                  boxSize="20px"
                  bg="green.300"
                  borderColor="ripple.200"
                />{" "}
                {/* bg is online or offline, change based on boolean later */}
              </Avatar>
            </PopoverTrigger>
            <PopoverContent w="350px">
              <PopoverBody>
                <VStack spacing={5} align="start" p="8px">
                  <HStack p="15px" spacing={5}>
                    <Avatar
                      size="md"
                      name={userName}
                      src={ProfilePicture}
                      _hover={{
                        transform: "scale(1.01)",
                      }}
                    >
                      <AvatarBadge
                        boxSize="20px"
                        borderColor="black"
                        bg="green.300"
                      />
                      {/* bg is online or offline, change based on boolean later */}
                    </Avatar>
                    <Box textAlign="left" ml>
                      <Heading as="h3" size="md">
                        {userName}
                      </Heading>
                      <Text color="gray">{Email}</Text>
                    </Box>
                  </HStack>

                  <Divider />
                  <Box pl="15px" pr="15px">
                    <Link to="/visibility"> Set as Invisible</Link>
                  </Box>
                  {/* should be a button*/}
                  <Text
                    pl="15px"
                    pr="15px"
                    onClick={() => {
                      handleOpen(1)
                    }}
                  >
                    {" "}
                    Notifications
                  </Text>
                  <Divider />
                  <Text
                    pl="15px"
                    pr="15px"
                    onClick={() => {
                      handleOpen(0)
                    }}
                  >
                    {" "}
                    Edit Profile
                  </Text>
                  <Text
                    pl="15px"
                    pr="15px"
                    onClick={() => {
                      handleOpen(0)
                    }}
                  >
                    {" "}
                    View Profile
                  </Text>
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
        {/* <Spacer />
                    <Button
                      onClick={() => handleOpen("SignUp")}
                      variant="ghost"
                      fontFamily="Raleway-Bold"
                      fontSize="18px"
                      color="white"
                      _hover={{
                        transform: "scale(1.08)",
                      }}
                    >
                      Sign Up
                    </Button>

                    <Button
                      onClick={() => handleOpen("LogIn")}
                      variant="ghost"
                      fontFamily="Raleway-Bold"
                      fontSize="18px"
                      color="white"
                      _hover={{
                        transform: "scale(1.08)",
                      }}
                    >
                      Log In
                    </Button>
                    <PopUp isOpen={isOpen} onClose={onClose} type={type} /> */}
      </HStack>
    </Box>
  )
}
// GTgDNjWkASNPNsPovItMQHFOmXd2

HeaderUser.propTypes = {
  siteTitle: PropTypes.string,
}

HeaderUser.defaultProps = {
  siteTitle: ``,
}

export default HeaderUser
