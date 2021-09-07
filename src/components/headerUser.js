import * as React from "react"
import PropTypes from "prop-types"
import { isLoggedIn, logout } from "../utils/AuthFunctions";
import PopUp from "./popup"
import { Link } from 'gatsby'
import { navigate } from "gatsby-link";
import {
  Box,
  Image,
  Circle,
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
  Text
} from "@chakra-ui/react"

import {
  RiArrowDropDownLine,
  RiArrowLeftRightLine,
  RiLogoutBoxLine
} from 'react-icons/ri'


import Logo from "../images/RippleDEXWhite.svg"
import ProfilePicture from "../images/RippleDEXWhite.svg"

const Header = ({ siteTitle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [type, setType] = React.useState("SignUp")
  // Organization Here Static data
  const organization = "Microsoft"
  const org_Id = "microsoft-2954"
  const userName = "General Kenobi"
  const Email = "General@ground.com"


  const clickHandler = () => {
    logout();
    navigate("/login");
  }

  const handleOpen = type => {
    setType(type)
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
        <Box pl='170px'>        
          <Popover >
              <PopoverTrigger >
                <Button 
                  w="fit" h = "50px"
                  color="white"
                  bgColor="ripple.200"
                  fontFamily="Raleway-Bold"
                  fontSize="30px"
                  _hover={{transform: "scale(1.01)",}}
                  _active={{bg: "ripple.200",
                    transform: "scale(1.01)",
                  }}
                >
                {organization}
                {<RiArrowDropDownLine size = "50px" />}
                </Button>
              </PopoverTrigger>
                  <PopoverContent w = "350px">
                    <PopoverHeader >
                      <Box  mt={4} mb={4} p="10px" w="100%" display = "flex" flexDir="row" pr="60px">
                            <Spacer />
                            <Avatar size="md" src={Logo} />
                            <Spacer />
                            <Box textAlign = "left" ml>
                                <Heading as="h3" size="md">{organization}</Heading>
                                <Text color="gray">id: {org_Id}</Text>
                            </Box>
                            <Spacer />
                            <Spacer />
                      </Box>
                    </PopoverHeader>
                    <PopoverBody pl="40px" textAlign="left">
                      <br />
                      <Link to="/Settings" > Settings &amp; Administration</Link>
                      <br />
                      <br />
                      <Link to="/Invite" >  Invite people to {organization}</Link>
                      <br />
                      <br />
                    </PopoverBody>
                    <PopoverFooter pl="30px" textAlign="left">
                      <br />
                      <Button
                        bgColor="white"
                        onClick={() => handleOpen("SignUp")}
                        _hover={{
                          transform: "scale(1.08)",
                        }}
                        leftIcon={<RiArrowLeftRightLine />}
                      >
                        Switch Workspace
                      </Button>
                      <br />
                      <br />
                    </PopoverFooter>
                  </PopoverContent>
          </Popover>
        </Box>
        <Spacer />
        {/* Header Profile Right Side */}
        <Box pr = "15px">
        <Popover>
              <PopoverTrigger  >
                <Avatar 
                    size="md" 
                    name={userName} 
                    src={ProfilePicture} 
                    _hover={{
                        transform: "scale(1.01)",
                    }}
                  >
                  <AvatarBadge boxSize="20px" bg="green.500"  borderColor="black"/> {/* bg is online or offline, change based on boolean later */}
                </Avatar>
              </PopoverTrigger>
                  <PopoverContent w = "350px">
                    <PopoverHeader >
                      <Box  mt={4} mb={4} p="10px" w="100%" display = "flex" flexDir="row" pr="60px">
                            <Spacer />
                            <Avatar 
                                size="md" 
                                name={userName} 
                                src={ProfilePicture} 
                                _hover={{
                                    transform: "scale(1.01)",
                                }}
                              >
                              <AvatarBadge boxSize="20px" borderColor="black" bg="green.500" /> {/* bg is online or offline, change based on boolean later */}
                            </Avatar>
                            <Spacer />
                            <Box textAlign = "left" ml>
                                <Heading as="h3" size="md">{userName}</Heading>
                                <Text color="gray">{Email}</Text>
                            </Box>
                            <Spacer />
                            <Spacer />
                      </Box>
                    </PopoverHeader>
                    <PopoverBody pl="40px" textAlign="left" >
                      <br />
                      <Link to="/visibility" > Set as Invisible</Link>  {/* should be a button*/}
                      <br />
                      <br />
                      <Link to="/Notification" >  Notifications</Link>
                      <br />
                    </PopoverBody>
                    <PopoverHeader />
                    <PopoverBody pl="40px" textAlign="left">
                      <br />
                      <Link to="/profile" > Edit Profile</Link>
                      <br /><br />
                      <Link to="/profile" >  View Profile</Link>
                      <br /><br />
                    </PopoverBody>
                    <PopoverFooter pl="20px" textAlign="left">
                      <br />
                      <Button
                        color="red"
                        bgColor="white"
                        onClick={clickHandler}
                        _hover={{transform: "scale(1.08)",}}
                        leftIcon={<RiLogoutBoxLine />}> 
                        Sign out of RippleDEX
                      </Button>
                      <br />
                      <br />
                    </PopoverFooter>
                  </PopoverContent>
          </Popover>
        </Box>
      </HStack>
    </Box>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
