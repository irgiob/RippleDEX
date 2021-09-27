import React, { useState } from "react"

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    Input,
    useToast
} from "@chakra-ui/react"

import { inviteToOrganization } from "../../models/Organisation"

const InviteOrgPopup = ({children, orgID, placement}) => {
    const [email, setEmail] = useState("")
    const [position, setPosition] = useState("")
    const toast = useToast()

    return (
    <Popover placement={placement}>
        {({ isOpen, onClose }) => (<>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Invite by email to workspace</PopoverHeader>
                <PopoverBody>
                    <Input
                        mb="0.5em"
                        variant="outline"
                        placeholder="Email"
                        type="text"
                        name="email"
                        onChange={event => setEmail(event.target.value)}
                    />
                    <Input
                        mb="1em"
                        variant="outline"
                        placeholder="Position"
                        type="text"
                        name="position"
                        onChange={event => setPosition(event.target.value)}
                    />
                    <Button
                        w="100%"
                        onClick={() => 
                            inviteToOrganization(email, orgID, position).then(
                                toast({
                                    title: "Success",
                                    description: "Invite has been sent",
                                    status: "success",
                                    duration: 5000,
                                    isClosable: true,
                                }),
                                onClose()
                            )
                        }
                    >
                        Invite
                    </Button>
                </PopoverBody>
            </PopoverContent>
        </>)}
    </Popover>  
    )
}

export default InviteOrgPopup