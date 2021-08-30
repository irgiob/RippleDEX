import * as React from "react"
import PropTypes from "prop-types"

import { Box, Image, Circle, HStack, Spacer, Text } from "@chakra-ui/react"

import Logo from "../images/RippleDEXWhite.svg"

const Header = ({ siteTitle }) => (
  <Box zIndex={999} position="fixed" w="100vw" h="60px" bgColor="ripple.100">
    <HStack h="100%" textAlign="center">
      <a href="/">
        <Box pt="7px">
          <Image
            top="20px"
            left="21px"
            zIndex={999}
            pos="absolute"
            w="80px"
            src={Logo}
            alt="logo"
          />
          <Circle
            left="20px"
            top="-5px"
            pos="absolute"
            bgColor="ripple.100"
            size="80px"
          ></Circle>
        </Box>
      </a>
      <Spacer />
      <Text fontFamily="Raleway-Bold" fontSize="18px" pr="20px" color="white">
        Sign Up
      </Text>
      <Text fontFamily="Raleway-Bold" fontSize="18px" pr="20px" color="white">
        Log In
      </Text>
    </HStack>
  </Box>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
