import * as React from "react"
import PropTypes from "prop-types"

import PopUp from "./popup"
import { Link } from 'gatsby'
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
  PopoverCloseButton,
  Avatar,
  Heading,
  Text
} from "@chakra-ui/react"

import {
  RiArrowDropDownLine
} from 'react-icons/ri'


import Logo from "../images/RippleDEXWhite.svg"

const Header = ({ siteTitle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [type, setType] = React.useState("SignUp")
  // Organization Here Static data
  const organization = "Microsoft"
  const org_Id = "microsoft-2954"

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
          <Popover>
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
                  <PopoverContent w = "350px" >
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
                    <PopoverBody pr="70px" >
                      <br />
                      <Link to="/Settings" > Settings &amp; Administration</Link>
                      <br />
                      <br />
                      <Link to="/Invite" >  Invite people to {organization}</Link>
                      <br />
                      <br />
                    </PopoverBody>
                    <PopoverFooter pr="70px">
                      <br />
                      <Popover>
              <PopoverTrigger >
                <Button 
                  w="100%"
                  pr="70px"
                  decoration="none"
                  bgColor="white"
                  _hover={{transform: "scale(1.01)"}} 
                >
                  Switch Workplace
                </Button>
              </PopoverTrigger>
                  <PopoverContent w = "350px" >
                    <PopoverHeader >
                      <Box  mt={4} mb={4} p="10px" w="100%" display = "flex" flexDir="row" pr="60px">
                      </Box>
                    </PopoverHeader>
                    <PopoverBody pr="70px">
                      <br />
                      <Link to="/Settings"> Settings &amp; Administration</Link>
                      <br />
                      <br />
                      <Link to="/Invite"> Invite people to {organization}</Link>
                      <br />
                      <br />
                    </PopoverBody>
                    <PopoverFooter pr="70px">
                      <br />
                      Invite people to {organization}
                      <br />
                      <br />
                    </PopoverFooter>
                  </PopoverContent>
          </Popover>
                      <br />
                      <br />
                    </PopoverFooter>
                  </PopoverContent>
          </Popover>
        </Box>
        <Spacer />
        {/* <Button
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
        </Button> */}
        <PopUp isOpen={isOpen} onClose={onClose} type={type} />
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
