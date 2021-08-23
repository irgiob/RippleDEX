import { extendTheme } from "@chakra-ui/react"

const colors = {
  ripple: {
    100: "#78cfec",
    200: "#168aa8",
  },
  trans: {
    100: "rgba(120, 207, 236, 0.1)",
  },
}

const fonts = {
  heading: "Raleway-Extra",
  body: "Nunito",
}

const theme = extendTheme({ colors, fonts })

export default theme
