import React from "react"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    useDisclosure,
    Button,
    Box,
    Portal,
    Text,
    Flex,
    Spacer,
    IconButton,
    HStack,
    Tooltip

  } from "@chakra-ui/react"

import {
    AiOutlineClose,
    AiOutlineEdit,
    AiOutlineDelete,
    AiOutlineClockCircle
} from "react-icons/ai"

/**
 * 
 * @property {tippy.Event} eventInfo event information to be display
 * @property {function} deleteEvent function to delete current event from the calendar
 * @property {function} editEvent function to edit current event
 * @returns 
 */
export function EventDetails(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <Popover
            placement="left"
            onOpen={onOpen}
            onClose={onClose}
            isOpen={isOpen}
        >
        <PopoverTrigger>
            <Box
            width="100%"
            >{props.eventInfo.event.title}</Box>
        </PopoverTrigger>
        <Portal>
            <PopoverContent
            >
                <PopoverArrow />
                <PopoverHeader
                    
                >
                    <Flex>
                        <Spacer/>
                        <HStack>
                            {/* Close , delete and edit button on top right*/}
                            <Tooltip label="Delete">
                                <IconButton 
                                    aria-label="Delete" 
                                    backgroundColor="white" 
                                    icon={<AiOutlineDelete size={24}/>} 
                                    onClick ={()=>{props.deleteEvent(); onClose();}}/>
                            </Tooltip>

                            <Tooltip label = "Edit"> 
                            <IconButton 
                                    aria-label="Edit" 
                                    backgroundColor="white"
                                    icon={<AiOutlineEdit size={24}/>} />
                            </Tooltip>

                            <Tooltip label = "Close">
                                <IconButton 
                                    aria-label="Close" 
                                    backgroundColor="white"
                                    icon={<AiOutlineClose size={24}/>} 
                                    onClick={onClose}
                                />
                            </Tooltip>
                        </HStack>
                    </Flex>
                </PopoverHeader>
                <PopoverBody
                    paddingLeft="50px"
                    paddingRight="50px"
                >
                    <Box
                    >
                        {/* Display event details*/}
                        <Text fontSize="2xl" pb="30px">{props.eventInfo.event.title}</Text>
                        <HStack><AiOutlineClockCircle/><Text >{props.eventInfo.event.startStr}</Text></HStack>
                    </Box>
                </PopoverBody>
                <PopoverFooter>

                </PopoverFooter>
            </PopoverContent>
        </Portal>
        
        </Popover>
        </>
    )
}