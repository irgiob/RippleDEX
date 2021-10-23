import React from "react"

import Layout from "../components/layout"

import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  SimpleGrid,
  Image,
  Center,
} from "@chakra-ui/react"

import { FaLinkedinIn } from "react-icons/fa"

import fiona from "../images/About/fiona.jpeg"

const About = props => {
  return (
    <Layout location={props.location}>
      <Box pr="20px" pl="20px">
        <VStack>
          <Text
            pt="30px"
            pb="30px"
            fontFamily="Raleway-Bold"
            fontSize="28px"
            color="ripple.200"
          >
            Meet The Team
          </Text>
          <SimpleGrid columns={[1, 3]} gap="20px">
            <Box
              borderRadius="20px"
              maxW="300px"
              p="20px"
              boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.02)",
              }}
            >
              <VStack spacing={0}>
                <Box pb="15px">
                  <Image borderRadius="50px" w="100px" src={""} />
                </Box>
                <Text fontSize="20px" fontFamily="Raleway-Bold">
                  Irgio Basrewan
                </Text>
                <Box>
                  <Badge
                    px="10px"
                    borderRadius="full"
                    color="ripple.200"
                    bgColor="trans.100"
                  >
                    <Text fontFamily="Nunito-Bold">Full Stack Developer</Text>
                  </Badge>
                </Box>
              </VStack>
              <Box pt="15px" />
              <Text color="gray">{""}</Text>
              <Box pt="15px" />
              <Box float="right" w="15px">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/irgiobasrewan/"
                >
                  <Box
                    transition="0.3s ease-in-out"
                    _hover={{
                      cursor: "pointer",
                      transform: "scale(1.2)",
                    }}
                  >
                    <FaLinkedinIn color="#168aa8" />
                  </Box>
                </a>
              </Box>
            </Box>

            <Box
              borderRadius="20px"
              maxW="300px"
              p="20px"
              boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.02)",
              }}
            >
              <VStack spacing={0}>
                <Box pb="15px">
                  <Image borderRadius="50px" w="100px" src={fiona} />
                </Box>
                <Text fontSize="20px" fontFamily="Raleway-Bold">
                  Fiona Joyceline
                </Text>
                <Box>
                  <Badge
                    px="10px"
                    borderRadius="full"
                    color="ripple.200"
                    bgColor="trans.100"
                  >
                    <Text fontFamily="Nunito-Bold">Front End Developer</Text>
                  </Badge>
                </Box>
              </VStack>
              <Box pt="15px" />
              <Text color="gray">
                Designed the website's UI and developed the front end
                components.
              </Text>
              <Box pt="15px" />
              <Box float="right" w="15px">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/fionajoyceline/"
                >
                  <Box
                    transition="0.3s ease-in-out"
                    _hover={{
                      cursor: "pointer",
                      transform: "scale(1.2)",
                    }}
                  >
                    <FaLinkedinIn color="#168aa8" />
                  </Box>
                </a>
              </Box>
            </Box>

            <Box
              borderRadius="20px"
              maxW="300px"
              p="20px"
              boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.02)",
              }}
            >
              <VStack spacing={0}>
                <Box pb="15px">
                  <Image borderRadius="50px" w="100px" src={""} />
                </Box>
                <Text fontSize="20px" fontFamily="Raleway-Bold">
                  Wedad Amer
                </Text>
                <Box>
                  <Badge
                    px="10px"
                    borderRadius="full"
                    color="ripple.200"
                    bgColor="trans.100"
                  >
                    <Text fontFamily="Nunito-Bold">Front End Developer</Text>
                  </Badge>
                </Box>
              </VStack>
              <Box pt="15px" />
              <Text color="gray">{""}</Text>
              <Box pt="15px" />
              <Box float="right" w="15px">
                <a target="_blank" href="">
                  <Box
                    transition="0.3s ease-in-out"
                    _hover={{
                      cursor: "pointer",
                      transform: "scale(1.2)",
                    }}
                  >
                    <FaLinkedinIn color="#168aa8" />
                  </Box>
                </a>
              </Box>
            </Box>

            <Box
              borderRadius="20px"
              maxW="300px"
              p="20px"
              boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.02)",
              }}
            >
              <VStack spacing={0}>
                <Box pb="15px">
                  <Image borderRadius="50px" w="100px" src={""} />
                </Box>
                <Text fontSize="20px" fontFamily="Raleway-Bold">
                  Wilbert Cargeson
                </Text>
                <Box>
                  <Badge
                    px="10px"
                    borderRadius="full"
                    color="ripple.200"
                    bgColor="trans.100"
                  >
                    <Text fontFamily="Nunito-Bold">Back End Developer</Text>
                  </Badge>
                </Box>
              </VStack>
              <Box pt="15px" />
              <Text color="gray">{""}</Text>
              <Box pt="15px" />
              <Box float="right" w="15px">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/wilbert-cargeson/"
                >
                  <Box
                    transition="0.3s ease-in-out"
                    _hover={{
                      cursor: "pointer",
                      transform: "scale(1.2)",
                    }}
                  >
                    <FaLinkedinIn color="#168aa8" />
                  </Box>
                </a>
              </Box>
            </Box>

            <Box
              borderRadius="20px"
              maxW="300px"
              p="20px"
              boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.02)",
              }}
            >
              <VStack spacing={0}>
                <Box pb="15px">
                  <Image borderRadius="50px" w="100px" src={""} />
                </Box>
                <Text fontSize="20px" fontFamily="Raleway-Bold">
                  Stephanie Rao
                </Text>
                <Box>
                  <Badge
                    px="10px"
                    borderRadius="full"
                    color="ripple.200"
                    bgColor="trans.100"
                  >
                    <Text fontFamily="Nunito-Bold">Back End Developer</Text>
                  </Badge>
                </Box>
              </VStack>
              <Box pt="15px" />
              <Text color="gray">{""}</Text>
              <Box pt="15px" />
              <Box float="right" w="15px">
                <a target="_blank" href="">
                  <Box
                    transition="0.3s ease-in-out"
                    _hover={{
                      cursor: "pointer",
                      transform: "scale(1.2)",
                    }}
                  >
                    <FaLinkedinIn color="#168aa8" />
                  </Box>
                </a>
              </Box>
            </Box>
          </SimpleGrid>
        </VStack>
      </Box>
    </Layout>
  )
}

export default About
