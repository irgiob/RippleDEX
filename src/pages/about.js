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
        <VStack pb="30px">
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
              <Text align="center" color="gray">
                {""}
              </Text>
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

            <a
              target="_blank"
              href="https://www.linkedin.com/in/fionajoyceline/"
            >
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
                <Text align="center" color="gray">
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
                <Box h="20px" />
              </Box>
            </a>

            <a
              target="_blank"
              href="https://www.linkedin.com/in/irgiobasrewan/"
            >
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
                <Text align="center" color="gray">
                  {""}
                </Text>
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
                <Box h="20px" />
              </Box>
            </a>

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
                  Sifan Rao
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
              <Text align="center" color="gray">
                {""}
              </Text>
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

            <a
              target="_blank"
              href="https://www.linkedin.com/in/wilbert-cargeson/"
            >
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
                <Text align="center" color="gray">
                  {""}
                </Text>
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
                <Box h="20px" />
              </Box>
            </a>
          </SimpleGrid>
        </VStack>
      </Box>
    </Layout>
  )
}

/**
 * gets the profile data for a LinkedIn user
 * @param {String} name the username of the linked in profile
 * @returns {Object} profile data
 */
const getLinkedinProfileData = (name) => {
	const promise = new Promise((resolve, reject) => {
		// generate fetch url
		const callback = "LIBadgeCallback"
		const baseURL = "https://badges.linkedin.com/profile?"
		const queryParams = {
			vanityname: name,
			trk: "profile-badge",
			maxsize: "large",
			locale: "en_US",
			badgetype: "VERTICAL",
			badgetheme: "light",
			uid: Math.round(1000000 * Math.random()),
			version: "v1",
		}
		const url = baseURL + Object.keys(queryParams).map(key => key + "=" + queryParams[key]).join("&")

		// get data from url using jsonp
		var script = document.createElement('script')
	    script.src = url
	    document.body.appendChild(script)

	    // run callback on url load
	    window[callback] = (badgeHtml, badgeUid) => {
	    	// clean up created scripts
	    	delete window[callback]
        document.body.removeChild(script)

        // parse data from html and return data object
        const cls = "profile-badge__content-profile-"
	      var span = document.createElement('span')
	  		span.innerHTML = badgeHtml
	  		data = {
	  			profilePicture: span.getElementsByClassName(cls + "image")[0].src,
	  			name: span.getElementsByClassName(cls + "name-link")[0].text.replace("\n", "").trim(),
	  			url: span.getElementsByClassName(cls + "name-link")[0].href.split("?")[0],
	  			headline: span.getElementsByClassName(cls + "headline")[0].textContent.replace("\n", "").trim(),
	  			orgs: Array.from(span.getElementsByClassName(cls + "company-school-info-link")).map(el => ({
	  				name: el.text,
	  				url: el.href.split("?")[0],
	  			})),
	  		}
	  		resolve(data)
	    }
	})
	return promise
}

export default About
