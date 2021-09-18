import * as React from "react"

import AuthPopUp from "./auth/authPopup"

import {
  Box,
  Image,
  Circle,
  HStack,
  Spacer,
  useDisclosure,
  Button,
} from "@chakra-ui/react"

import Logo from "../images/RippleDEXWhite.svg"

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [type, setType] = React.useState("SignUp")

  const handleOpen = type => {
    setType(type)
    onOpen()
  }

  return (
    <Box zIndex={999} position="fixed" w="100vw" h="60px" bgColor="ripple.100">
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
              bgColor="ripple.100"
              size="80px"
            />
          </Box>
        </a>
        <Spacer/>
        <Button
          onClick={() => handleOpen("SignUp")}
          variant="ghost"
          fontFamily="Raleway-Bold"
          fontSize="18px"
          color="white"
          _hover={{ transform: "scale(1.08)" }}
        >
          Sign Up
        </Button>
        <Button
          onClick={() => handleOpen("LogIn")}
          variant="ghost"
          fontFamily="Raleway-Bold"
          fontSize="18px"
          color="white"
          _hover={{ transform: "scale(1.08)" }}
        >
          Log In
        </Button>
        <AuthPopUp isOpen={isOpen} onClose={onClose} type={type} />
      </HStack>
    </Box>
  )
}

export default Header
