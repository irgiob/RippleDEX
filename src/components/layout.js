import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import SideNav from "./sideNav"
import theme from "./theme"
import "./layout.css"

import { ChakraProvider } from "@chakra-ui/react"

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
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <SideNav/>
      <main style={{ paddingTop: "60px", paddingLeft: "110px" }}>{children}</main>
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
