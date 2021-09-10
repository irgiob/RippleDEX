import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import HeaderUser from "./headerUser"
import SideNav from "./sideNav"
import theme from "./theme"
import "./layout.css"

import { ChakraProvider } from "@chakra-ui/react"

let pathname = window.location.pathname


const Layout = ({ children }) => {
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
        { (pathname === '/') ? 
          <Header siteTitle={data.site.siteMetadata?.title || `Title`} /> 
          : <HeaderUser siteTitle={data.site.siteMetadata?.title || `Title`} /> 
        }
      </div>
      { pathname  != '/' && <SideNav/> }
      <main style={(pathname === '/') ? { paddingTop: "60px"} : { paddingTop: "60px", paddingLeft: "110px"}}>{children}</main>
      {/*
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
        */}
    </ChakraProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
