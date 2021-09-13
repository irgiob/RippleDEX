import React, { useState, useEffect } from "react"
import { onAuthLoad, logout } from "../utils/AuthFunctions"
import { getUser } from "../models/User"
import { createNewOrganization } from "../models/Organisation"
import { navigate } from "gatsby-link"
import Layout from "../components/layout"

import PopUp from "../components/popup"
import LogoDark from "../images/RippleDEXDark.svg" 
import LogoWhite from "../images/RippleDEXWhite.svg"
import Worker from "../images/HomePage/Worker.png" 
import {
  Box,
  Flex,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Spacer,
  ModalCloseButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react"

const Workspace = (props) => {
    
  const [user, setUser] = useState(null)
  const [userID, setUserID] = useState(null)
  useEffect(() => {
    onAuthLoad(
      loggedUser => {
        console.log(loggedUser.uid)
        setUserID(loggedUser.uid)
        getUser(loggedUser.uid).then(userData => setUser(userData))
      },
      () => navigate("/")
    )
  }, [])
   
    const [orgName, setOrgName] = useState("")
    const [orgDesc, setOrgDesc] = useState("")
  
    const [loading, setLoading] = React.useState(false)
    const handleLoad = () => setLoading(true)
    const toast = useToast()
  
    const handleSubmit = async event => {
      handleLoad()
      event.preventDefault()
      const validUser = await createNewOrganization(userID, orgName, orgDesc)
      if (validUser == null) {
        // Failed to create Organization
        setLoading(false)
        toast({
          title: "Failed to create Organization",
          description: "Please try again",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      } else {
        navigate(`/dashboard`)
        toast({
          title: "New Organization Added",
          description: "Welcome to the Dashboard!",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      }
    }


    const { isOpen, onOpen, onClose } = useDisclosure()




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
                <Text fontSize="35px" color="grey" align="center" opacity = "0.5" fontFamily="Nunito-Bold" variant="solid"> 
                You don’t have an active workspace at <br/>the moment
                </Text>
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
                              fontSize="35px"
                              color="white"
                              ml = "60px"
                              mt = "120px"
                              > 
                                A few clicks away <br/> from growing your <br/> business
                            </Text>
                            <Center>
                              <Image margin="auto" w={["900px", "600px"]} src={Worker} />
                            </Center>
                          </Box>
                          {/* Right side of the the Organization page */}
                          <Box pt= "150px" pl="30px" w="60%" h="100%"> 
                            <ModalHeader fontFamily="Raleway-Bold" fontSize="30px" color="ripple.200">
                              Register your Organization
                            </ModalHeader>
                            <form method="post">
                              <SimpleGrid w="100%" pt="50px" mr="15px" ml="15px" columns={2} spacing={4}>
                                  {/* Organization info and description here */}
                                  <Box  height="80px">
                                    <Text pb="20px" fontSize="15px">
                                      Company / Workspace Name
                                    </Text>
                                    <Input
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
                                      w = "90%"
                                      size = "lg"
                                      variant="outline"
                                      type="text"
                                      name="description"
                                      onChange={event => setOrgDesc(event.target.value)}
                                    />
                                  </Box>
                                  {/* Invite Emails Here */}
                                  <Box pt = "60px" height="80px">
                                    <Text pb="20px" fontSize="15px">
                                    Invite Employees (You can add other employees later)
                                    </Text>
                                    <Input
                                      w = "90%"
                                      size = "lg"
                                      variant="outline"
                                      type="text"
                                      placeholder="Email"
                                    />
                                  </Box>
                                  <Box pt="100px" pb="80px" height="80px">
                                    <Input
                                      w = "90%"
                                      size = "lg"
                                      variant="outline"
                                      type="text"
                                      placeholder="Email"
                                    />
                                  </Box>
                                  <Box  height="80px">
                                    <Input
                                      w = "90%"
                                      size = "lg"
                                      variant="outline"
                                      type="text"
                                      placeholder="Email"
                                    />
                                  </Box>
                                  <Box height="80px">
                                    <Input
                                      w = "90%"
                                      size = "lg"
                                      variant="outline"
                                      type="text"
                                      placeholder="Email"
                                    />
                                  </Box>
                                  {/* create Workspace button */}
                                  <Box pt = "40px">
                                    <Button
                                      w = "90%"
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
                              </SimpleGrid>
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