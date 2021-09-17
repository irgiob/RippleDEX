import React, { useState } from "react"
import { createNewOrganization, inviteToOrganization } from "../models/Organisation"
import { navigate } from "gatsby-link"

import LogoWhite from "../images/RippleDEXWhite.svg"
import Worker from "../images/HomePage/Worker.png" 

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

const JoinOrgPopup = (props) => {
    const toast = useToast()

    return <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay/>
        <ModalContent pos="absolute" h="90%" maxW="80%" borderRadius="15px">
            <ModalCloseButton m="15px"/>
            
        </ModalContent>
    </Modal>   
}

export default JoinOrgPopup