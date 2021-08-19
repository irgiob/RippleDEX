import * as React from "react"
import PropTypes from "prop-types"

import {
  Box,
  Image,
  Circle,
  HStack,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react"

import Logo from "../images/RippleDexRect.png"

const Header = ({ siteTitle }) => (
  <Box w="100vw" h="60px" bgColor="ripple.100">
    <HStack>
      <Box pt="7px">
        <Circle ml="20px" bgColor="ripple.100" size="70px">
          <Image w="70px" src={Logo} alt="logo" />
        </Circle>
      </Box>
      <Spacer />
      <Text
        fontFamily="Raleway-Bold"
        fontSize="18px"
        pr="20px"
        h="50px"
        textAlign="center"
        color="white"
      >
        Sign Up
      </Text>
      <Text
        fontFamily="Raleway-Bold"
        fontSize="18px"
        pr="20px"
        h="50px"
        textAlign="center"
        color="white"
      >
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
