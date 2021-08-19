import { extendTheme } from "@chakra-ui/react"

const colors = {
  ripple: {
    100: "#78cfec",
    200: "#168aa8",
  },
}

const fonts = {
  heading: "Raleway-Extra",
  body: "Nunito",
}

const theme = extendTheme({ colors, fonts })

export default theme
