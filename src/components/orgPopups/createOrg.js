import React, { useState } from "react"
import { createNewOrganization, inviteToOrganization } from "../../models/Organisation"
import { navigate } from "gatsby-link"

import LogoWhite from "../../images/RippleDEXWhite.svg"
import Worker from "../../images/HomePage/Worker.png" 

import {
    Box,
    Image,
    Text,
    HStack,
    Stack,
    Button,
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    Input,
    SimpleGrid,
    useToast,
} from "@chakra-ui/react"

const CreateOrgPopup = (props) => {
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [orgName, setOrgName] = useState("")
    const [orgDesc, setOrgDesc] = useState("")
    const [invites, setInvites] = useState([
        {email: "", position: ""},
        {email: "", position: ""},
        {email: "", position: ""},
        {email: "", position: ""}
    ])

    const handleSubmit = async event => {
        setLoading(true)
        event.preventDefault()
        const org = await createNewOrganization(props.userID, orgName, orgDesc)
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
    
    return <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay/>
        <ModalContent pos="absolute" h="900px" minHeight="90%" maxW="80%" borderRadius="15px" value="inside">
            <ModalCloseButton m="15px"/>
            <Stack h="100%" direction={["column", "row"]} spacing="30px">
                <Box w="35%" h="full" bg = "ripple.100" borderRadius="15px 0px 0px 15px" p="35px">
                    <HStack>
                        <Image 
                            w="80px"
                            mt="5px"
                            mr="15px"
                            src={LogoWhite}
                        />
                        <Text fontFamily="Raleway-Bold" fontSize="30px" color="white"> 
                            RippleDEX
                        </Text>
                    </HStack>
                    <Text 
                        align="left"
                        fontFamily="Nunito-Bold"
                        fontSize="25px"
                        color="white"
                        ml = "1em"
                        mt = "2em"
                    > 
                        A few clicks away from growing your business
                    </Text>
                    <Center>
                        <Image margin="auto" w={["900px", "600px"]} src={Worker} />
                    </Center>
                </Box>
                {/* Right side of the the Organization page */}
                <Box pt= "5%" pl="30px" w="60%" h="100%"> 
                    <ModalHeader fontFamily="Raleway-Bold" fontSize="30px" color="ripple.200">
                        Register your Organization
                    </ModalHeader>
                    <form method="post">
                        <SimpleGrid w="100%" pt="5%" mr="15px" ml="15px" columns={2} spacing={4}>
                            {/* Organization info and description here */}
                            <Box  height="80px">
                                <Text pb="20px" fontSize="15px">Company / Workspace Name</Text>
                                <Input
                                    key="name"
                                    isRequired={true}
                                    w = "90%"
                                    size = "lg"
                                    variant="outline"
                                    type="text"
                                    name="name"
                                    onChange={event => setOrgName(event.target.value)}
                                />
                            </Box>
                            <Box height="80px">
                                <Text pb="20px" fontSize="15px">Company Description</Text>
                                <Input
                                    key="description"
                                    isRequired={true}
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
                        <Box pt="4em" ml="15px">
                            <Text fontSize="15px">
                                Invite Employees (You can add other employees later)
                            </Text>
                        </Box>
                        <SimpleGrid w="100%" pt="0.5em" mr="15px" ml="15px" columns={2} spacing={4}>
                            {invites.map((invite, i) => {
                                return <div key={i}>
                                    <Box key={"EmailBox_" + i} pt="1em" height="3em">
                                        <Input
                                            key={"Email_" + i}
                                            w = "90%"
                                            size = "lg"
                                            variant="outline"
                                            type="text"
                                            placeholder={"Email " + (i+1)}
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
                                            w = "90%"
                                            size = "lg"
                                            variant="outline"
                                            type="text"
                                            placeholder={"Position " + (i+1)}
                                            name={"Position_" + i}
                                            onChange={event => {
                                                const inviteCopy = invites.slice()
                                                inviteCopy[i].position = event.target.value
                                                setInvites(inviteCopy)
                                            }}
                                        />
                                    </Box>
                                </div>
                            })}
                        </SimpleGrid>
                        {/* create Workspace button */}
                        <Box pt = "6em">
                            <Button
                                w = "50%"
                                minW = "fit-content"
                                h = "65px"
                                className="here"
                                bgColor="ripple.200"
                                color="white"
                                fontFamily="Raleway-Bold"
                                fontSize="25px"
                                borderRadius="30px"
                                size="lg"
                                _hover={{transform: "scale(1.05)"}}
                                type="Submit"
                                value="Create Organization"
                                onClick={handleSubmit}
                                isLoading={loading}
                                loadingText="Submitting"
                            >Create workspace</Button>
                        </Box>  
                    </form>
                </Box>
            </Stack>
        </ModalContent>
    </Modal>   
}

export default CreateOrgPopup