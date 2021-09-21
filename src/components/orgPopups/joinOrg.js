import React, { useState } from "react"
import { getInvite, addUserToOrganization } from "../../models/Organisation"
import { navigate } from "gatsby-link"

import {
    Box,
    Image,
    Text,
    HStack,
    VStack,
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



const JoinOrgPopup = (props) => {
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [orgName, setOrgName] = useState("")
    const [orgDesc, setOrgDesc] = useState("")
    const [invites, setInvites] = useState("")

    const inviteList = async (currentUser) => {
       const allInvites = await getInvite(currentUser)
       if (allInvites){
           setInvites(allInvites)
       }else{
            setInvites("no current invite")
       }
    }
    

    // useEffect(() => {
    //     const allInvites = getInvite(props.userID)
    //     if (allInvites) {
    //       setInvites(allInvites)
    //     } else {
    //       setInvites("no current invite")
    //     }
    //   }, [])
    


    

    // const orgList = allOrg.map((allOrg, i) => {
    //     return (
    //       <li w="100%" mt="10%" textAlign="left" key={i}>
    //         <Button
    //           bgColor="white"
    //           h="50px"
    //           textAlign="left"
    //           _hover={{
    //             transform: "scale(1.08)",
    //           }}
    //           leftIcon={<RiArrowLeftRightLine />}
    //           onClick={() => {
    //             updateUser(props.user?.id, {
    //               lastOpenedOrganization: allOrg.toString(),
    //             })
    //               .then(updatedUser => props.setUser(updatedUser))
    //               .then(
    //                 toast({
    //                   title: "New Organization Added",
    //                   description: "Organization has been changed",
    //                   status: "success",
    //                   duration: 5000,
    //                   isClosable: true,
    //                 }),
    //                 window.location.reload(false)
    //               )
    //           }}
    //         >
    //           {allOrg}
    //         </Button>
    //         <hr />
    //       </li>
    //     )
    //   })

    // const handleSubmit = async event => {
    //     setLoading(true)
    //     event.preventDefault()
    //     const org = await createNewOrganization(props.userID, orgName, orgDesc)
    //     if (org) {
    //       invites.forEach(async invite => {
    //         if (invite.email) {
    //           var inviteID = await inviteToOrganization(
    //             invite.email,
    //             org.id,
    //             invite.position
    //           )
    //           console.log(inviteID)
    //         }
    //       })
    //       navigate(`/dashboard`)
    //       toast({
    //         title: "New Organization Added",
    //         description: "Welcome to the Dashboard!",
    //         status: "success",
    //         duration: 5000,
    //         isClosable: true,
    //       })
    //     } else {
    //       // Failed to create Organization
    //       setLoading(false)
    //       toast({
    //         title: "Failed to create Organization",
    //         description: "Please try again",
    //         status: "error",
    //         duration: 5000,
    //         isClosable: true,
    //       })
    //     }
    //   }



    return <Modal isOpen={props.isOpen} onClose={props.onClose} onLoad={inviteList(props.userID)}>
        <ModalOverlay/>
        <ModalContent pos="absolute" h="900px" minHeight="90%" maxW="80%" borderRadius="15px" value="inside">
            <ModalCloseButton m="15px"/>
            <ModalHeader
              pl="15px"
              pb="10px"
              fontFamily="Raleway-Bold"
              fontSize="28px"
              color="ripple.200"
            >
              Join Organization {props.userID} aaaaaaa {invites}
            </ModalHeader>
            <hr/>


        </ModalContent>
    </Modal>   
}

export default JoinOrgPopup