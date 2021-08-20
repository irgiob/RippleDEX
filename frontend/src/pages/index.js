import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "./index.css"

import { IoIosArrowForward } from "react-icons/io"

import Img1 from "../images/Img1.png"
import Donut from "../images/Donut.png"
import Spring from "../images/Spring.png"

import Analytics from "../images/Analytics.png"
import Chats from "../images/Chats.png"
import Calendar from "../images/Calendar.png"
import Mobile from "../images/Mobile.png"

import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  VStack,
  Spacer,
  Stack,
  Button,
  Center,
  useMediaQuery,
} from "@chakra-ui/react"

const IndexPage = () => {
  const [isLargeSize] = useMediaQuery("(min-width: 42em)")

  return (
    <Layout>
      <Seo title="Home" />

      <Box bgColor="ripple.100" h="90vh" w="100vw" justifyContent="center">
        <Center>
          <HStack gridGap="200px">
            <VStack maxW="35vw" pl="100px" alignItems="left">
              <Heading pb="10px" fontSize="50px" color="ripple.200">
                RippleDEX
              </Heading>
              <Text fontSize="20px" color="white">
                Manage clients and close deals with our state of the art CRM
              </Text>
              <br />
              <HStack gridGap={15}>
                <Button
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
                <Button
                  color="ripple.200"
                  fontFamily="Raleway-Bold"
                  borderRadius="20px"
                  variant="ghost"
                  size="lg"
                  rightIcon={<IoIosArrowForward />}
                  _hover={{
                    transform: "scale(1.08)",
                  }}
                >
                  Learn More
                </Button>
              </HStack>
            </VStack>

            <Box
              style={{
                animation: "floatAnim 3s ease-in-out infinite",
              }}
            >
              <Image
                style={{ transform: "rotate(10deg)" }}
                h="500px"
                src={Img1}
              />
            </Box>
            <Box
              style={{
                animation: "floatAnim2 2s ease-in-out infinite",
              }}
              left="760px"
              top="250px"
              pos="absolute"
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
              right="230px"
              top="100px"
              pos="absolute"
            >
              <Image
                style={{ transform: "rotate(10deg)" }}
                h="130px"
                src={Spring}
              />
            </Box>
          </HStack>
        </Center>
      </Box>

      <div class="custom-shape-divider-bottom">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>

      <Center>
        <VStack pt="30px" maxW="80vw">
          {/* First Feature */}

          <Stack gridGap="70px" direction="row">
            <Center>
              <Box>
                <Image h="500px" src={Chats} />
              </Box>
            </Center>
            <Center>
              <Box maxW="500px">
                <Heading pb="30px" fontFamily="Raleway-Bold" fontSize="50px">
                  Save time between clients
                </Heading>
                <Text fontSize="20px">
                  RippleDEX allows seamless access to logs kept for each client.
                  Users won't need to depend on third party apps to pull up
                  previous interactions and information.
                </Text>
              </Box>
            </Center>
          </Stack>

          {/* Second Feature */}

          <Stack gridGap="70px" direction="row">
            <Center>
              <Box pl="30px" maxW="500px">
                <Heading pb="30px" fontFamily="Raleway-Bold" fontSize="50px">
                  Clear Calendar & Notification System
                </Heading>
                <Text fontSize="20px">
                  Tired of spam notifications? Our notifications are fully
                  customizable depending on your preferences. The system also
                  includes a daily digest of missed notifications so you can get
                  back on track easily.
                </Text>
              </Box>
            </Center>
            <Center>
              <Box>
                <Image h="500px" src={Calendar} />
              </Box>
            </Center>
          </Stack>

          {/* Third Feature */}

          <Stack gridGap="70px" direction="row">
            <Center>
              <Box>
                <Image h="500px" src={Analytics} />
              </Box>
            </Center>
            <Center>
              <Box maxW="500px">
                <Heading pb="30px" fontFamily="Raleway-Bold" fontSize="50px">
                  Business and Sales Analytics
                </Heading>
                <Text fontSize="20px">
                  Our CRM crunches the numbers and displays highly visual and
                  engaing statistics in real time. Boost productivity by finding
                  out the best customers to follow up with based on varying
                  factors.
                </Text>
              </Box>
            </Center>
          </Stack>

          {/* Fourth Feature */}

          <Stack gridGap="70px" direction="row">
            <Center>
              <Box pl="30px" maxW="500px">
                <Heading pb="30px" fontFamily="Raleway-Bold" fontSize="50px">
                  Mobile CRM
                </Heading>
                <Text fontSize="20px">
                  RippleDEX is fully integrated for mobile use. View data and
                  receive alerts on the go from your mobile device.
                </Text>
              </Box>
            </Center>
            <Center>
              <Box>
                <Image h="500px" src={Mobile} />
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
