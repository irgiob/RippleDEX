import React, { useState } from "react"
import { addUserToOrganization } from "../../models/Organisation"
import { navigate } from "gatsby-link"

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    useToast,
} from "@chakra-ui/react"

const JoinOrgPopup = (props) => {
    const toast = useToast()

    return <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay/>
        <ModalContent pos="absolute" h="900px" minHeight="90%" maxW="80%" borderRadius="15px" value="inside">
            <ModalCloseButton m="15px"/>
            
        </ModalContent>
    </Modal>   
}

export default JoinOrgPopup