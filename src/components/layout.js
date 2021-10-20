import React, { useState, useEffect } from "react"
import { navigate } from "gatsby-link"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import Header from "./headers/header"
import HeaderUser from "./headers/headerUser"
import "./layout.css"

import ProSidebar from "./proSideNav"

import { onAuthLoad } from "../utils/AuthFunctions"
import { getUser } from "../models/User"
import { getOrganization } from "../models/Organisation"

import {
  ChakraProvider,
  Spinner,
  Center,
  Text,
  VStack,
  Box,
  useToast,
  extendTheme,
} from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    ripple: {
      100: "#78cfec",
      200: "#168aa8",
    },
    trans: {
      100: "rgba(120, 207, 236, 0.1)",
    },
  },
  fonts: {
    heading: "Raleway-Extra",
    body: "Nunito",
  },
})

const Layout = ({ children, location }) => {
  const pathname = location.pathname
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [org, setOrg] = useState(null)

  useEffect(() => {
    if (pathname !== "/") {
      onAuthLoad(
        async loggedUser => {
          const user = await getUser(loggedUser.uid, true)
          user.isVerified = loggedUser.emailVerified
          user.signInMethod = loggedUser.providerData[0].providerId
          setUser(user)
          if (user.lastOpenedOrganization) {
            const org = await getOrganization(user.lastOpenedOrganization)
            setOrg(org)
            setLoading(false)
          } else {
            if (pathname !== "/welcome/") {
              navigate("/welcome/")
            } else {
              setLoading(false)
            }
          }
          setTimeout(() => toast.closeAll(), 1000)
        },
        () => navigate("/")
      )
    }
  }, [pathname, toast])

  if (pathname === "/") {
    return (
      <ChakraProvider theme={theme}>
        <MetaData location={{ pathname: "RippleDEX", href: location.href }} />
        <Header />
        <main style={{ paddingTop: "60px" }}>{children}</main>
      </ChakraProvider>
    )
  } else {
    if (loading) {
      return (
        <ChakraProvider theme={theme}>
          <MetaData location={location} />
          <Center h="100vh">
            <VStack>
              <Box>
                <Spinner
                  thickness="1em"
                  speed="1s"
                  emptyColor="gray.200"
                  color="ripple.200"
                  w="10em"
                  h="10em"
                />
              </Box>
              <Box>
                <Text className="shimmer" fontFamily="Nunito-Bold">
                  RippleDEX is loading...
                </Text>
              </Box>
            </VStack>
          </Center>
        </ChakraProvider>
      )
    }

    const childrenWithProps = React.Children.map(children, child => {
      if (React.isValidElement(child))
        return React.cloneElement(child, { user, setUser, org, setOrg })
      return child
    })

    return (
      <ChakraProvider theme={theme}>
        <MetaData location={location} />
        <HeaderUser user={user} setUser={setUser} org={org} setOrg={setOrg} />
        {pathname !== "/welcome/" && <ProSidebar location={location} />}
        <main
          style={
            pathname !== "/welcome/"
              ? { paddingTop: "60px", paddingLeft: "80px" }
              : { paddingTop: "60px" }
          }
        >
          {childrenWithProps}
        </main>
      </ChakraProvider>
    )
  }
}

const MetaData = ({ location }) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>
      {location.pathname.replace(/\//g, "").charAt(0).toUpperCase() +
        location.pathname.replace(/\//g, "").slice(1)}
    </title>
    <link rel="canonical" href={location.href} />
  </Helmet>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
