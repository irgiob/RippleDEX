import React, { useState, useEffect } from "react"
import { onAuthLoad } from "../utils/AuthFunctions"
import { getUser } from "../models/User"
import { createNewOrganization, inviteToOrganization, getInvite } from "../models/Organisation"
import { navigate } from "gatsby-link"
import Layout from "../components/layout"

import LogoDark from "../images/RippleDEXDark.svg" 
import LogoWhite from "../images/RippleDEXWhite.svg"
import Worker from "../images/HomePage/Worker.png" 

import {
  Box,
  Image,
  Text,
  HStack,
  VStack,
  Stack,
  Button,
  Center,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Input,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react"

const Workspace = (props) => {
  const [user, setUser] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    onAuthLoad(
      loggedUser => {
        console.log(loggedUser.uid)
        getUser(loggedUser.uid).then(userData => setUser(userData))
      },
      () => navigate("/")
    )
  }, [])
   
  const [orgName, setOrgName] = useState("")
  const [orgDesc, setOrgDesc] = useState("")
  const [invites, setInvites] = useState([
    {email: "", position: ""},
    {email: "", position: ""},
    {email: "", position: ""},
    {email: "", position: ""}
  ])
  const [loading, setLoading] = React.useState(false)
  
  const handleLoad = () => setLoading(true)
  const toast = useToast()

  const handleSubmit = async event => {
    handleLoad()
    event.preventDefault()
    const org = await createNewOrganization(user.id, orgName, orgDesc)
    if (org){
      invites.forEach(async (invite) => {
        if (invite.email) {
          var inviteID = await inviteToOrganization(invite.email, org.id, invite.position)
          console.log(inviteID)
        }
      })
      navigate(`/dashboard`)
      toast({
        title: "New Organization Added",
        description: "Welcome to the Dashboard!",
        status: "success",
        duration: 5000,
        isClosable: true,
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

  if (!user) {
    return (<Layout location={props.location}><h1>Loading...</h1></Layout>)
  }

  return( 
    <Layout location={props.location}>
      <Box mr = "110px" mt = "250px">
        <Center>
          <VStack pt="30px" VStack spacing={10} align="center" >
            <Box h="30px">
              <Image
                    style={{  opacity: "0.4" , filter: "grayscale(80%)" }}
                    w="120px"
                    src={LogoDark}
              />
            </Box>
            <Box pt="20px">
            {!user?.lastOpenedOrganization && 
              <Text fontSize="35px" color="grey" align="center" opacity = "0.5" fontFamily="Nunito-Bold" variant="solid"> 
              You don’t have an active workspace at <br/>the moment
              </Text>
            }
            {user?.lastOpenedOrganization && 
              <Text fontSize="35px" color="grey" align="center" opacity = "0.5" fontFamily="Nunito-Bold" variant="solid"> 
              Add another organization<br/>to the workspace
              </Text>
            }
            </Box>
            <Box h="50px">
              <Button
                p = "35px"
                bgColor="ripple.200"
                color="white"
                fontFamily="Raleway-Bold"
                borderRadius="40px"
                variant="solid"
                fontSize="30px"
                w="500px"
                _hover={{
                  transform: "scale(1.05)",
                }}
                onClick={onOpen}
              >
                Create a workspace
              </Button>
              <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay  />
                    <ModalContent pos="absolute" h="90%" maxW="80%" borderRadius="15px">
                    <ModalCloseButton m="15px" />
                      <Stack h="100%" direction={["column", "row"]} spacing="30px">
                        <Box w="35%" h="100%" bg = "ripple.100" borderRadius="15px 0px 0px 15px" p="35px">
                          <HStack>
                            <Image 
                              w="80px"
                              mt = "5px"
                              mr="15px"
                              src={LogoWhite}
                            />
                            <Text fontFamily="Raleway-Bold" fontSize="30px" color="white"> RippleDEX</Text>
                          </HStack>
                          <Text 
                            align="left"
                            fontFamily="Nunito-Bold"
                            fontSize="25px"
                            color="white"
                            ml = "1em"
                            mt = "2em"
                            > 
                              A few clicks away <br/> from growing your <br/> business
                          </Text>
                          <Center>
                            <Image margin="auto" w={["900px", "600px"]} src={Worker} />
                          </Center>
                        </Box>
                        {/* Right side of the the Organization page */}
                        <Box pt= "2em" pl="30px" w="60%" h="100%"> 
                          <ModalHeader fontFamily="Raleway-Bold" fontSize="30px" color="ripple.200">
                            Register your Organization
                          </ModalHeader>
                          <form method="post">
                            <SimpleGrid w="100%" pt="1empx" mr="15px" ml="15px" columns={2} spacing={4}>
                                {/* Organization info and description here */}
                                <Box  height="80px">
                                  <Text pb="20px" fontSize="15px">
                                    Company / Workspace Name
                                  </Text>
                                  <Input
                                    isRequired = "true"
                                    w = "90%"
                                    size = "lg"
                                    variant="outline"
                                    type="text"
                                    name="name"
                                    onChange={event => setOrgName(event.target.value)}
                                  />
                                </Box>
                                <Box  height="80px">
                                  <Text pb="20px" fontSize="15px">
                                    Company Description
                                  </Text>
                                  <Input
                                    isRequired = "true"
                                    w = "90%"
                                    size = "lg"
                                    variant="outline"
                                    type="text"
                                    name="description"
                                    onChange={event => setOrgDesc(event.target.value)}
                                  />
                                </Box>
                              </SimpleGrid>
                              {/* Invite Emails Here */}
                              <Box pt="2em" ml="15px">
                                <Text fontSize="15px">
                                  Invite Employees (You can add other employees later)
                                </Text>
                              </Box>
                              <SimpleGrid w="100%" pt="0.5em" mr="15px" ml="15px" columns={2} spacing={4}>
                                {invites.map((invite, i) => {
                                  return <>
                                    <Box pt = "1em" height="3em">
                                      <Input
                                        w = "90%"
                                        size = "lg"
                                        variant="outline"
                                        type="text"
                                        placeholder={"Email " + i}
                                        name={"Email_" + i}
                                        onChange={event => {
                                          const inviteCopy = invites.slice()
                                          inviteCopy[i].email = event.target.value
                                          setInvites(inviteCopy)
                                        }}
                                      />
                                    </Box>
                                    <Box pt = "1em" height="3em">
                                      <Input
                                        w = "90%"
                                        size = "lg"
                                        variant="outline"
                                        type="text"
                                        placeholder={"Position " + i}
                                        name={"Position_" + i}
                                        onChange={event => {
                                          const inviteCopy = invites.slice()
                                          inviteCopy[i].position = event.target.value
                                          setInvites(inviteCopy)
                                        }}
                                      />
                                    </Box>
                                  </>
                                })}
                                </SimpleGrid>
                                {/* create Workspace button */}
                                <Box pt = "40px">
                                  <Button
                                    w = "50%"
                                    h = "65px"
                                    className="here"
                                    bgColor="ripple.200"
                                    color="white"
                                    fontFamily="Raleway-Bold"
                                    fontSize="25px"
                                    borderRadius="30px"
                                    size="lg"
                                    _hover={{
                                      transform: "scale(1.05)",
                                    }}
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
                      </Stack>
                    </ModalContent>
              </Modal>
            </Box>
          </VStack>
        </Center>
      </Box>
    </Layout>
  )
}

  export default Workspace