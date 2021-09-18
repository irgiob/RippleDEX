import React, { useState, useEffect } from "react"
import { navigate } from "gatsby-link"
import PropTypes from "prop-types"
import Header from "./header"
import HeaderUser from "./headerUser"
import SideNav from "./sideNav"
import theme from "./theme"
import "./layout.css"

import { onAuthLoad } from "../utils/AuthFunctions"
import { getUser } from "../models/User"
import { getOrganization } from "../models/Organisation"

import { ChakraProvider, Spinner, Center, Text, VStack, Box } from "@chakra-ui/react"

const Layout = ({ children, location }) => {
  const pathname = location.pathname
  const [user, setUser] = useState(null)
  const [org, setOrg] = useState(null)

  useEffect(() => {
    onAuthLoad(
      async loggedUser => {
        const user = await getUser(loggedUser.uid)
        setUser(user)
        if (user.lastOpenedOrganization) {
          const org = await getOrganization(user.lastOpenedOrganization)
          setOrg(org)
        } else {
          navigate("/welcome")
        }
      },
      () => navigate("/")
    )
  }, [])

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { user, setUser, org, setOrg });
    }
    return child;
  });

  if (!user || !org) {
    return (
      <ChakraProvider theme={theme}>
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

  return (
    <ChakraProvider theme={theme}>
      <div>
        { (pathname === '/') 
          ? <Header/> 
          : <HeaderUser
              user={user}
              setUser={setUser}
              org={org}
              setOrg={setOrg}
            /> 
        }
      </div>
      { !['/','/welcome/'].includes(pathname) && <SideNav location={location}/> }
      <main 
        style={(pathname === '/') 
          ? { paddingTop: "60px"} 
          : { paddingTop: "60px", paddingLeft: "110px"}
        }
      >
        {childrenWithProps}
      </main>
    </ChakraProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
