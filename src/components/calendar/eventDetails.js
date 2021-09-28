import React from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  useDisclosure,
  Box,
  Portal,
  Text,
  Flex,
  Spacer,
  IconButton,
  HStack,
  Tooltip,
} from "@chakra-ui/react"

import { AiOutlineClose, AiOutlineClockCircle } from "react-icons/ai"

import { RiNotificationOffLine } from "react-icons/ri"

/**
 *
 * @property {tippy.Event} eventInfo event information to be display
 * @property {function} deleteEvent function to delete current event from the calendar
 * @property {function} editEvent function to edit current event
 * @returns
 */
const EventDetails = props => {
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
            backgroundColor="#78cfec"
            padding="5px"
            borderRadius="10px"
            color="white"
          >
            {props.eventInfo.event.title}
          </Box>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>
              <Flex>
                <Spacer />
                <HStack>
                  {/* Close , delete and edit button on top right*/}
                  <Tooltip label="Don't remind me">
                    <IconButton
                      aria-label="Delete"
                      backgroundColor="white"
                      icon={<RiNotificationOffLine size={24} />}
                      onClick={() => {
                        props.deleteEvent()
                        onClose()
                      }}
                    />
                  </Tooltip>

                  {/* <Tooltip label = "Edit"> 
                            <IconButton 
                                    aria-label="Edit" 
                                    backgroundColor="white"
                                    icon={<AiOutlineEdit size={24}/>} />
                            </Tooltip> */}

                  <Tooltip label="Close">
                    <IconButton
                      aria-label="Close"
                      backgroundColor="white"
                      icon={<AiOutlineClose size={24} />}
                      onClick={onClose}
                    />
                  </Tooltip>
                </HStack>
              </Flex>
            </PopoverHeader>
            <PopoverBody paddingLeft="50px">
              <Box>
                {/* Display event details*/}
                <Text fontSize="2xl" pb="30px">
                  {props.eventInfo.event.title}
                </Text>
                {props.eventInfo.event.end != null ? (
                  <>
                    <HStack>
                      <Text width="50px">from: </Text>
                      <Text width="300px">
                        {props.eventInfo.event.start.toLocaleString("en-US")}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text width="50px">to: </Text>
                      <Text width="300px">
                        {props.eventInfo.event.end.toLocaleString("en-US")}
                      </Text>
                    </HStack>
                  </>
                ) : (
                  <>
                    All day
                    <HStack>
                      <Text width="50px">from: </Text>
                      <Text width="300px">
                        {props.eventInfo.event.start.toLocaleString("en-US")}
                      </Text>
                    </HStack>
                  </>
                )}
              </Box>
            </PopoverBody>
            <PopoverFooter></PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  )
}

export default EventDetails
