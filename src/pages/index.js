import React, { useEffect, useRef } from "react"
import { onAuthLoad } from "../utils/AuthFunctions"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "./index.scss"

import { IoIosArrowDown } from "react-icons/io"

import Statistics from "../images/HomePage/Statistics.png"
import Donut from "../images/HomePage/Donut.png"
import Spring from "../images/HomePage/Spring.png"

import Analytics from "../images/HomePage/Analytics.png"
import Chats from "../images/HomePage/Chats.png"
import Calendar from "../images/HomePage/Calendar.png"
import Mobile from "../images/HomePage/Mobile.png"

import AuthPopUp from "../components/auth/authPopup"

import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  VStack,
  Stack,
  Button,
  Center,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react"
import { navigate } from "gatsby-link"

const IndexPage = props => {
  const [isLargeSize] = useMediaQuery("(min-width: 42em)")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const homeInfo = useRef()
  const scrollToDiv = ref => window.scrollTo(0, ref.current.offsetTop - 10)

  useEffect(() => {
    onAuthLoad(
      user => navigate("/dashboard"),
      () => {}
    )
  }, [])

  return (
    <Layout location={props.location}>
      <Seo title="Home" />

      <Box
        overflow="hidden"
        bgColor="ripple.100"
        w="100vw"
        justifyContent="center"
      >
        <Center>
          <Stack direction={["column", "column", "row"]}>
            <Center>
              <VStack
                maxW={["100vw", "100vw", "35vw"]}
                p="50px"
                alignItems="left"
              >
                <Heading
                  pb="10px"
                  fontSize={["40px", "50px"]}
                  color="ripple.200"
                >
                  RippleDEX
                </Heading>
                <Text fontSize="20px" color="white">
                  Manage clients and close deals with our state of the art CRM
                </Text>
                <br />
                <HStack gridGap={15}>
                  <Button
                    onClick={onOpen}
                    bgColor="ripple.200"
                    color="white"
                    fontFamily="Raleway-Bold"
                    borderRadius="30px"
                    variant="solid"
                    size="lg"
                    _hover={{
                      bgColor: "white",
                      color: "ripple.200",
                      transform: "scale(1.05)",
                      boxShadow:
                        "rgba(22, 138, 168, 1) 5px 5px, rgba(22, 138, 168, 0.6) 10px 10px, rgba(22, 138, 168, 0.3) 15px 15px",
                    }}
                  >
                    Sign Up
                  </Button>
                  <AuthPopUp isOpen={isOpen} onClose={onClose} type="SignUp" />
                  <Button
                    onClick={() => scrollToDiv(homeInfo)}
                    color="ripple.200"
                    fontFamily="Raleway-Bold"
                    borderRadius="20px"
                    variant="ghost"
                    size="lg"
                    rightIcon={<IoIosArrowDown />}
                    _hover={{
                      transform: "scale(1.08)",
                    }}
                  >
                    Learn More
                  </Button>
                </HStack>
              </VStack>
            </Center>

            <Box>
              <Box
                style={{
                  animation: "floatAnim 3s ease-in-out infinite",
                }}
              >
                <Image
                  style={{ transform: "rotate(10deg)" }}
                  w="500px"
                  src={Statistics}
                />
              </Box>
              <Box
                style={{
                  animation: "floatAnim2 2s ease-in-out infinite",
                }}
                float="left"
                marginTop="-150px"
              >
                <Image
                  style={{ transform: "rotate(10deg)" }}
                  h="80px"
                  src={Donut}
                />
              </Box>
              <Box
                style={{
                  animation: "floatAnim2 2.5s ease-in-out infinite",
                }}
                float="right"
                marginTop="-400px"
              >
                <Image
                  style={{ transform: "rotate(10deg)" }}
                  h="130px"
                  src={Spring}
                />
              </Box>
            </Box>
          </Stack>
        </Center>
        <div id="scroll">
          <svg
            style={{ marginBottom: "-2px" }}
            position="relative"
            width="100%"
            height="20vh"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 20 130 30"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="wave"
                d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
              />
            </defs>
            <g className="waves">
              <use
                xlinkHref="#wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.6)"
              />
              <use
                xlinkHref="#wave"
                x="48"
                y="2"
                fill="rgba(255,255,255,0.4)"
              />
              <use
                xlinkHref="#wave"
                x="48"
                y="4"
                fill="rgba(255,255,255,0.2)"
              />
              <use xlinkHref="#wave" x="48" y="6" fill="white" />
            </g>
          </svg>
        </div>
      </Box>

      <Center ref={homeInfo}>
        <VStack pt="60px" maxW={["85vw", "80vw"]}>
          <Stack
            direction={["column", "row"]}
            gridGap={["0px", "70px"]}
            pb={!isLargeSize && "30px"}
          >
            <Center>
              <Box maxW="700px" textAlign={!isLargeSize && "center"}>
                <Text
                  fontFamily="Nunito-Bold"
                  color="ripple.200"
                  pb={["10px", "20px"]}
                  pl="2px"
                >
                  FEATURES
                </Text>
                <Heading
                  pb="30px"
                  fontFamily="Raleway-Bold"
                  fontSize={["35px", "40px"]}
                >
                  What's cool about us?
                </Heading>
                <Text pb={isLargeSize && "30px"} fontSize="20px">
                  RippleDEX's features are built with Companies in mind. Your
                  teams, the tools they need, customer data, are all stored in
                  one place.
                </Text>
              </Box>
            </Center>
          </Stack>

          {/* First two Features */}

          <Stack
            direction={["column", "row"]}
            gridGap={["0px", "70px"]}
            pb={!isLargeSize && "30px"}
          >
            <Center>
              <Box textAlign="center" maxW="500px">
                <Image margin="auto" w={["200px", "300px"]} src={Chats} />
                <Heading
                  pb="30px"
                  fontFamily="Raleway-Bold"
                  fontSize={["30px", "35px"]}
                >
                  Save time between clients
                </Heading>
                <Text pb="20px" color="gray" fontSize="20px">
                  RippleDEX allows seamless access to logs kept for each client.
                  Users won't need to depend on third party apps to pull up
                  previous interactions and information.
                </Text>
              </Box>
            </Center>
            <Center>
              <Box textAlign="center" maxW="500px">
                <Image margin="auto" w={["200px", "300px"]} src={Calendar} />
                <Heading
                  pb="30px"
                  fontFamily="Raleway-Bold"
                  fontSize={["30px", "35px"]}
                >
                  Clear Calendar & Notification System
                </Heading>
                <Text color="gray" fontSize="20px">
                  Tired of spam notifications? Our notifications are fully
                  customizable depending on your preferences. The system also
                  includes a daily digest of missed notifications so you can get
                  back on track easily.
                </Text>
              </Box>
            </Center>
          </Stack>

          {/* Second Feature */}

          <Stack
            direction={["column", "row"]}
            gridGap={["0px", "70px"]}
            pb={!isLargeSize && "30px"}
          >
            <Center>
              <Box pt={isLargeSize && "30px"} textAlign="center" maxW="500px">
                <Image margin="auto" w={["200px", "300px"]} src={Analytics} />
                <Heading
                  pb="30px"
                  fontFamily="Raleway-Bold"
                  fontSize={["30px", "35px"]}
                >
                  Business and Sales Analytics
                </Heading>
                <Text color="gray" fontSize="20px">
                  Our CRM crunches the numbers and displays highly visual and
                  engaing statistics in real time. Boost productivity by finding
                  out the best customers to follow up with based on varying
                  factors.
                </Text>
              </Box>
            </Center>
            <Center>
              <Box pt={!isLargeSize && "30px"} textAlign="center" maxW="500px">
                <Image margin="auto" w={["200px", "300px"]} src={Mobile} />
                <Heading
                  pb="30px"
                  fontFamily="Raleway-Bold"
                  fontSize={["30px", "35px"]}
                >
                  Mobile CRM
                </Heading>
                <Text color="gray" fontSize="20px">
                  RippleDEX is fully integrated for mobile use. View data and
                  receive alerts on the go from your mobile devices.
                </Text>
              </Box>
            </Center>
          </Stack>

          <Box h="100px" w="100vw"></Box>
        </VStack>
      </Center>
    </Layout>
  )
}

export default IndexPage
