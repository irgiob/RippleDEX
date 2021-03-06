import React, { useState, useEffect } from "react"

import Layout from "../components/layout"

import {
  Box,
  Text,
  VStack,
  Badge,
  SimpleGrid,
  Image,
  Skeleton,
} from "@chakra-ui/react"

import { FaLinkedinIn } from "react-icons/fa"

const m = [
  {
    id: "wedad-amer",
    role: "front end developer",
    desc: "Created UI mockups and developed the general front end page layouts.",
  },
  {
    id: "fionajoyceline",
    role: "front end developer",
    desc: "Designed the website's UI and developed the front end components.",
  },
  {
    id: "irgiobasrewan",
    role: "full stack developer",
    desc: "Managed project timeline and implimented features across website.",
  },
  {
    id: "sifan-rao",
    role: "back end developer",
    desc: "Implimented datebase models and assistend in application testing.",
  },
  {
    id: "wilbert-cargeson",
    role: "back end developer",
    desc: "Designed the website's back end architecture and testing suite.",
  },
]

const About = props => {
  const [members, setMembers] = useState(m)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchLinkedInData = async members => {
      const membersData = []
      for (const member of members) {
        const memberData = await getLinkedinProfileData(member.id)
        membersData.push({ ...member, ...memberData })
      }
      console.log(membersData)
      setMembers(membersData)
      setLoading(false)
    }
    fetchLinkedInData(m)
  }, [])

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
            {members.map((member, i) => (
              <Skeleton key={"member_" + i} isLoaded={!loading}>
                <a rel="noreferrer" target="_blank" href={member?.url}>
                  <Box
                    borderRadius="20px"
                    maxW="300px"
                    h="100%"
                    p="20px"
                    pos="relative"
                    boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                    transition="0.3s ease-in-out"
                    _hover={{ transform: "scale(1.02)" }}
                  >
                    <VStack spacing={0}>
                      <Box pb="15px">
                        <Image
                          borderRadius="50px"
                          w="100px"
                          src={member?.profilePicture}
                        />
                      </Box>
                      <Text fontSize="20px" fontFamily="Raleway-Bold">
                        {member?.name}
                      </Text>
                      <Text
                        textColor="gray"
                        fontSize="10px"
                        fontFamily="Raleway-Bold"
                        textAlign="center"
                      >
                        {member?.headline}
                      </Text>
                      <Box pt="5px" />
                      <Box>
                        <Badge
                          px="10px"
                          borderRadius="full"
                          color="ripple.200"
                          bgColor="trans.100"
                        >
                          <Text fontFamily="Nunito-Bold">{member?.role}</Text>
                        </Badge>
                      </Box>
                    </VStack>
                    <Box pt="15px" />
                    <Text align="center" color="gray">
                      {member?.desc}
                    </Text>
                    <Box pt="15px" />
                    <Box
                      w="15px"
                      pos="absolute"
                      bottom="15px"
                      right="15px"
                      transition="0.3s ease-in-out"
                      _hover={{
                        cursor: "pointer",
                        transform: "scale(1.2)",
                      }}
                    >
                      <FaLinkedinIn color="#168aa8" />
                    </Box>
                    <Box h="20px" />
                  </Box>
                </a>
              </Skeleton>
            ))}
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
const getLinkedinProfileData = name => {
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
    const url =
      baseURL +
      Object.keys(queryParams)
        .map(key => key + "=" + queryParams[key])
        .join("&")

    // get data from url using jsonp
    var script = document.createElement("script")
    script.src = url
    document.body.appendChild(script)

    // run callback on url load
    window[callback] = (badgeHtml, badgeUid) => {
      // clean up created scripts
      delete window[callback]
      document.body.removeChild(script)

      // parse data from html and return data object
      const cls = "profile-badge__content-profile-"
      var span = document.createElement("span")
      span.innerHTML = badgeHtml
      const data = {
        profilePicture: span.getElementsByClassName(cls + "image")[0].src,
        name: span
          .getElementsByClassName(cls + "name-link")[0]
          .text.replace("\n", "")
          .trim(),
        url: span
          .getElementsByClassName(cls + "name-link")[0]
          .href.split("?")[0],
        headline: span
          .getElementsByClassName(cls + "headline")[0]
          .textContent.replace("\n", "")
          .trim(),
        orgs: Array.from(
          span.getElementsByClassName(cls + "company-school-info-link")
        ).map(el => ({
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
