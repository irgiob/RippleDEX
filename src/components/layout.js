import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import HeaderUser from "./headerUser"
import SideNav from "./sideNav"
import theme from "./theme"
import "./layout.css"

import { ChakraProvider } from "@chakra-ui/react"

const Layout = ({ children, location }) => {
  const pathname = location.pathname
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  

  return (
    <ChakraProvider theme={theme}>
      <div>
        { (pathname === '/') 
          ? <Header siteTitle={data.site.siteMetadata?.title || `Title`} /> 
          : <HeaderUser siteTitle={data.site.siteMetadata?.title || `Title`} /> 
        }
      </div>
      { !['/','/workspace/'].includes(pathname) && <SideNav location={location}/> }
      <main style={(pathname === '/') ? { paddingTop: "60px"} : { paddingTop: "60px", paddingLeft: "110px"}}>{children}</main>
    </ChakraProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
