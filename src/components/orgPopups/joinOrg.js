import React, { useState, useEffect } from "react"
import { getInvitesByEmail, addUserToOrganization } from "../../models/Organisation"
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
    Spacer,
    useToast,
  } from "@chakra-ui/react"



const JoinOrgPopup = (props) => {
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [orgName, setOrgName] = useState("")
    const [orgDesc, setOrgDesc] = useState("")
    const [invites, setInvites] = useState([])

    useEffect( () => {
            const currentInvite = getInvitesByEmail(props.userEmail)
            if (currentInvite){
                setInvites(currentInvite)
            }else{
                setInvites(["there are no invites"])
            }
         }, [])

    const allInvite = invites.map((invites, i) => {
        return (
          <li w="100%" mt="10%" textAlign="left" key={i}>
            <Button
              bgColor="white"
              h="50px"
              textAlign="left"
              _hover={{
                transform: "scale(1.08)",
              }}
            >
              {invites}
            </Button>
            <hr />
          </li>
        )
      })
    
    



    return <Modal isOpen={props.isOpen} onClose={props.onClose}>
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
              Join Organization <Spacer />{props.userEmail}
            </ModalHeader>
            <hr/>
            <Box pt="30px" pb="30px" w="100%">
              <ol style={{ listStyleType: "none" }}>
                {allInvite}
                <hr />
              </ol>
            </Box>


        </ModalContent>
    </Modal>   
}

export default JoinOrgPopup