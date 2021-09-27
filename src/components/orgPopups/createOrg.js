import React, { useState } from "react"
import {
  createNewOrganization,
  inviteToOrganization,
} from "../../models/Organisation"
import { navigate } from "gatsby-link"

import LogoWhite from "../../images/RippleDEXWhite.svg"
import Worker from "../../images/HomePage/Worker.png"
import CreateWorkspace from "../../images/PopUps/CreateWorkspace.png"

import {
  Box,
  Image,
  Text,
  HStack,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Input,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react"

const CreateOrgPopup = props => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [orgName, setOrgName] = useState("")
  const [orgDesc, setOrgDesc] = useState("")
  const [invites, setInvites] = useState([
    { email: "", position: "" },
    { email: "", position: "" },
    { email: "", position: "" },
    { email: "", position: "" },
  ])

  const handleSubmit = async event => {
    setLoading(true)
    event.preventDefault()
    const orgID = await createNewOrganization(props.userID, orgName, orgDesc)
    if (orgID) {
      invites.forEach(async invite => {
        if (invite.email)
          await inviteToOrganization(invite.email, orgID, invite.position)
      })
      navigate(`/dashboard`)
      toast({
        duration: 3000,
        render: () => (
          <Center 
            h="200vh" w="200vw" 
            transform="translate(-40%, 25%)" 
            bg="rgba(0,0,0,0.5)"
          >
            <Box 
              bg="white" 
              borderRadius="3xl" 
              p="2em" pl="4em" 
              pr="4em" pb="0.75em" 
              textAlign="center"
            >
              <Text
                mb="-1em"
                w="10em"
                fontFamily="Nunito-Bold"
                fontSize="1.5rem"
                color="ripple.200"
              >
                Workspace Successfully Created!
              </Text>
              <Center>
                <Image w="10em" src={CreateWorkspace} alignSelf="center"/>
              </Center>
            </Box>
          </Center>
        )
      })
    } else {
      // Failed to create Organization
      setLoading(false)
      toast({
        title: "Failed to create Organization",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent
        pos="absolute"
        maxHeight="90%"
        maxW="80%"
        borderRadius="15px"
        value="inside"
      >
        <ModalCloseButton m="15px" />
        <HStack h="100%" spacing="30px">
          <Box
            w="35%"
            h="100%"
            bg="ripple.100"
            borderRadius="15px 0px 0px 15px"
            p="35px"
          >
            <HStack>
              <Image w="80px" mt="5px" mr="15px" src={LogoWhite} />
              <Text fontFamily="Raleway-Bold" fontSize="30px" color="white">
                RippleDEX
              </Text>
            </HStack>
            <Text
              align="left"
              fontFamily="Nunito-Bold"
              fontSize="25px"
              color="white"
              mt="20px"
            >
              A few clicks away from growing your business
            </Text>
            <Center>
              <Image margin="auto" w={["900px", "600px"]} src={Worker} />
            </Center>
          </Box>
          {/* Right side of the the Organization page */}
          <Box w="60%" h="100%">
            <Text
              pl="15px"
              pb="10px"
              fontFamily="Raleway-Bold"
              fontSize="28px"
              color="ripple.200"
            >
              Register your Organization
            </Text>
            <form method="post">
              <SimpleGrid w="100%" mr="15px" ml="15px" columns={2} spacing={3}>
                {/* Organization info and description here */}
                <Box>
                  <Text pb="15px" fontSize="15px">
                    Company / Workspace Name
                  </Text>
                  <Input
                    key="name"
                    isRequired={true}
                    w="90%"
                    size="md"
                    variant="outline"
                    type="text"
                    name="name"
                    onChange={event => setOrgName(event.target.value)}
                  />
                </Box>
                <Box height="80px">
                  <Text pb="15px" fontSize="15px">
                    Company Description
                  </Text>
                  <Input
                    key="description"
                    isRequired={true}
                    w="90%"
                    size="md"
                    variant="outline"
                    type="text"
                    name="description"
                    onChange={event => setOrgDesc(event.target.value)}
                  />
                </Box>
              </SimpleGrid>
              {/* Invite Emails Here */}
              <Box mt="10px" ml="15px">
                <Text fontSize="15px">
                  Invite Employees (You can add other employees later)
                </Text>
              </Box>
              <SimpleGrid w="100%" mr="15px" ml="15px" columns={2} spacing={4}>
                {invites.map((invite, i) => {
                  return (
                    <div key={i}>
                      <Box key={"EmailBox_" + i} pt="1em" height="3em">
                        <Input
                          key={"Email_" + i}
                          w="90%"
                          size="md"
                          variant="outline"
                          type="text"
                          placeholder={"Email " + (i + 1)}
                          name={"Email_" + i}
                          onChange={event => {
                            const inviteCopy = invites.slice()
                            inviteCopy[i].email = event.target.value
                            setInvites(inviteCopy)
                          }}
                        />
                      </Box>
                      <Box key={"PositionBox_" + i} pt="1em" height="3em">
                        <Input
                          key={"Position_" + i}
                          w="90%"
                          size="md"
                          variant="outline"
                          type="text"
                          placeholder={"Position " + (i + 1)}
                          name={"Position_" + i}
                          onChange={event => {
                            const inviteCopy = invites.slice()
                            inviteCopy[i].position = event.target.value
                            setInvites(inviteCopy)
                          }}
                        />
                      </Box>
                    </div>
                  )
                })}
              </SimpleGrid>
              {/* create Workspace button */}
              <Box align="right" pt="40px">
                <Button
                  w="240px"
                  minW="fit-content"
                  h="50px"
                  className="here"
                  bgColor="ripple.200"
                  color="white"
                  fontFamily="Raleway-Bold"
                  fontSize="20px"
                  borderRadius="30px"
                  _hover={{ transform: "scale(1.05)" }}
                  type="Submit"
                  value="Create Organization"
                  onClick={handleSubmit}
                  isLoading={loading}
                  loadingText="Submitting"
                >
                  Create workspace
                </Button>
              </Box>
            </form>
          </Box>
        </HStack>
      </ModalContent>
    </Modal>
  )
}

export default CreateOrgPopup
