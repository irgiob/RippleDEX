import React, { useEffect, useRef } from "react"
import { onAuthLoad } from "../utils/AuthFunctions"

import Layout from "../components/layout"

import "./index.scss"

import { IoIosArrowDown } from "react-icons/io"

import Statistics from "../images/HomePage/Statistics.png"
import Donut from "../images/HomePage/Donut.png"
import Spring from "../images/HomePage/Spring.png"

import ContactSS from "../images/Screenshots/contacts.png"
import DealSS from "../images/Screenshots/deals.png"
import DashboardSS from "../images/Screenshots/dashboard.png"
import CalendarSS from "../images/Screenshots/calendar.png"
import TaskSS from "../images/Screenshots/tasks.png"

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
    // set features on odd lanes to be correct width
    for (const i of [1, 3])
      document.getElementById("features").childNodes[i].firstChild.style.width =
        "500px"

    // navigate to dashboard if already logged in
    onAuthLoad(
      user => navigate("/dashboard"),
      () => {}
    )
  }, [])

  return (
    <Layout location={props.location}>
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
                  RippleDEX's features are built with closing deals in mind.
                  Your teams, the tools they need, customer data, are all stored
                  in one place.
                </Text>
              </Box>
            </Center>
          </Stack>

          <Center>
            <VStack
              id="features"
              spacing={["60px", "100px"]}
              pt="30px"
              maxW={["85vw", "80vw"]}
            >
              {/* First Feature */}

              <Stack
                pb={!isLargeSize && "30px"}
                direction={["column", "row"]}
                gridGap={["0px", "70px"]}
              >
                <Center>
                  <Box pb={!isLargeSize && "30px"}>
                    <Image w={["300px", "500px"]} src={ContactSS} />
                  </Box>
                </Center>
                <Center>
                  <Box textAlign={!isLargeSize && "center"} maxW="500px">
                    <Heading
                      pb="30px"
                      fontFamily="Raleway-Bold"
                      fontSize={["35px", "40px"]}
                    >
                      Save time between clients
                    </Heading>
                    <Text fontSize="20px">
                      RippleDEX allows seamless access to logs kept for each
                      client. Users won't need to depend on third party apps to
                      pull up previous interactions and information.
                    </Text>
                  </Box>
                </Center>
              </Stack>

              {/* Second Feature */}

              <Stack
                pb={!isLargeSize && "30px"}
                direction={["column", "row"]}
                gridGap={["0px", "70px"]}
              >
                {!isLargeSize && (
                  <Center>
                    <Box pb="30px">
                      <Image w="300px" src={CalendarSS} />
                    </Box>
                  </Center>
                )}
                <Center>
                  <Box
                    textAlign={!isLargeSize && "center"}
                    pl={isLargeSize && "30px"}
                    maxW="500px"
                  >
                    <Heading
                      pb="30px"
                      fontFamily="Raleway-Bold"
                      fontSize={["35px", "40px"]}
                    >
                      Clear Calendar & Scheduling System
                    </Heading>
                    <Text fontSize="20px">
                      Never forget a client meeting again with our easy-to-use
                      calendar system. Schedule past and upcoming events with
                      ease. Our system will specifically remind you of events
                      related to you so you never miss that important meeting.
                    </Text>
                  </Box>
                </Center>
                {isLargeSize && (
                  <Center>
                    <Box>
                      <Image w="500px" src={CalendarSS} />
                    </Box>
                  </Center>
                )}
              </Stack>

              {/* Third Feature */}

              <Stack
                pb={!isLargeSize && "30px"}
                direction={["column", "row"]}
                gridGap={["0px", "70px"]}
              >
                <Center>
                  <Box pb={!isLargeSize && "30px"}>
                    <Image w={["300px", "500px"]} src={DealSS} />
                  </Box>
                </Center>
                <Center>
                  <Box textAlign={!isLargeSize && "center"} maxW="500px">
                    <Heading
                      pb="30px"
                      fontFamily="Raleway-Bold"
                      fontSize={["35px", "40px"]}
                    >
                      Optimized Deal Pipeline
                    </Heading>
                    <Text fontSize="20px">
                      Keep track of all your deals related to a workspace.
                      Categorize and plan progression of deals based on it's
                      stage in the deal pipeline and clearly view your
                      progression through the stages.
                    </Text>
                  </Box>
                </Center>
              </Stack>

              {/* Fourth Feature */}

              <Stack
                pb={!isLargeSize && "30px"}
                direction={["column", "row"]}
                gridGap={["0px", "70px"]}
              >
                {!isLargeSize && (
                  <Center>
                    <Box pb="30px">
                      <Image w="300px" src={TaskSS} />
                    </Box>
                  </Center>
                )}
                <Center>
                  <Box
                    textAlign={!isLargeSize && "center"}
                    pl={isLargeSize && "30px"}
                    maxW="500px"
                  >
                    <Heading
                      pb="30px"
                      fontFamily="Raleway-Bold"
                      fontSize={["35px", "40px"]}
                    >
                      Draggable Tasks
                    </Heading>
                    <Text fontSize="20px">
                      Easily manage tasks related to your deals with RippleDEX's
                      task kanban board, where users can drag tasks around to
                      update their status.
                    </Text>
                  </Box>
                </Center>
                {isLargeSize && (
                  <Center>
                    <Box>
                      <Image w="500px" src={TaskSS} />
                    </Box>
                  </Center>
                )}
              </Stack>

              {/* Fifth feature */}

              <Stack direction={["column", "row"]} gridGap={["0px", "70px"]}>
                <Center>
                  <Box pb={!isLargeSize && "30px"}>
                    <Image w={["300px", "500px"]} src={DashboardSS} />
                  </Box>
                </Center>
                <Center>
                  <Box textAlign={!isLargeSize && "center"} maxW="500px">
                    <Heading
                      pb="30px"
                      fontFamily="Raleway-Bold"
                      fontSize={["35px", "40px"]}
                    >
                      Business and Sales Analytics
                    </Heading>
                    <Text fontSize="20px">
                      Our CRM crunches the numbers and displays highly visual
                      and engaing statistics in real time. Boost productivity by
                      by seeing metrics about your deals and identify which
                      areas need the most attention and improvement.
                    </Text>
                  </Box>
                </Center>
              </Stack>
              <Center pb="25px">
                <VStack>
                  <Text color="gray">© 2021 RippleDEX Team</Text>
                </VStack>
              </Center>
            </VStack>
          </Center>
        </VStack>
      </Center>
    </Layout>
  )
}

export default IndexPage
