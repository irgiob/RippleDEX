import React, { useEffect, useState } from "react"
import {
  updateContact,
} from "../../models/Contact"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useMediaQuery,
  Box,
  Text,
  Input,
  Textarea,
  InputGroup,
  InputRightElement,
  Button,
  Grid,
  GridItem,
  Image,
  Spacer,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react"

import { RiArrowLeftSLine, RiMailAddFill, RiCalendarEventFill } from "react-icons/ri"

import LogoLight from "../../images/RippleDEXWhite.svg"

// {value.id}
// {value.name}
// {value.company}
// {value.email}{" "}
// {value.phoneNumber}
// {value.position}

const ContactPopUp = ({ isOpen, onClose, value }) => {
  const [isLargeSize] = useMediaQuery("(min-width: 42em)")
  const [contactName, SetContactName] = useState(value.name)
  const [contactEmail, SetContactEmail] = useState(value.email)
  const [contactPhoneNumber, SetContactPhoneNumber] = useState(
    value.phoneNumber
  )
  const [contactCompany, SetContactCompany] = useState(value.company)
  const [contactPosition, SetContactPosition] = useState(value.position)
  const [contactMemo, SetContactMemo] = useState(
    "There are currently No Memo's"
  )
  const toast = useToast()

  // couldnt get the whole show memo from the database working
  // useEffect(() => {
  //   const getMemo = async contactID => {
  //     const currentMemo = await getContact(contactID)
  //     if (currentMemo) {
  //         SetContactMemo(currentMemo?.notes)
  //       }
  //     }
  //   getMemo(value.id)
  // }, [value.id])

  const handleClick = async () => {
    const options = {
      company: contactCompany,
      email: contactEmail,
      name: contactName,
      notes: contactMemo,
      phoneNumber: contactPhoneNumber,
      position: contactPosition,
    }
    await updateContact(value.id, options)
    toast({
      title: "Success",
      description: "Your The Contact Detail Have Been Updated",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        h="90vh"
        maxW="90vw"
        borderRadius="15px"
        overflowY="scroll"
        value="inside"
      >
        <ModalCloseButton m="20px" />
        <ModalBody m="20px">
          <Box maxW="100%" value="inside">
            <Button
              leftIcon={<RiArrowLeftSLine size={40} />}
              fontSize="25px"
              color="ripple.200"
              fontFamily="Raleway-Bold"
              bg="none"
              _hover={{
                transform: "scale(1.05)",
              }}
              onClick={onClose}
            >
              {value.name}
            </Button>

            <Grid
              h="60vh"
              p="10px"
              alignContent="left"
              templateRows="repeat(9, 1fr)"
              templateColumns="repeat(5, 1fr)"
              gap={8}
            >
              <GridItem rowSpan={4} colSpan={1} align="center">
                <Image
                  mt="30px"
                  boxSize="90%"
                  bg="grey"
                  borderRadius="30px"
                  objectFit="contain"
                  src={LogoLight}
                  alt="Workspace Image"
                />
              </GridItem>
              <GridItem rowSpan={6} colSpan={2}>
                <VStack align="left">
                  <Text fontSize="20px">Name</Text>
                  <Input
                    variant="outline"
                    placeholder={value.name}
                    type="text"
                    value={contactName}
                    onChange={e => SetContactName(e.target.value)}
                  />

                  <Text pt="20px" mt="25px" fontSize="20px">
                    Email
                  </Text>
                  <Input
                    variant="outline"
                    placeholder={value.email}
                    type="text"
                    value={contactEmail}
                    onChange={e => SetContactEmail(e.target.value)}
                  />
                  <Text pt="20px" mt="25px" fontSize="20px">
                    Phone Number
                  </Text>
                  <Input
                    variant="outline"
                    placeholder={value.phoneNumber}
                    type="text"
                    value={contactPhoneNumber}
                    onChange={e => SetContactPhoneNumber(e.target.value)}
                  />
                </VStack>
              </GridItem>
              <GridItem rowSpan={8} colSpan={2}>
                <VStack align="left">
                  <Text fontSize="20px">Company</Text>
                  <Input
                    variant="outline"
                    placeholder={value.company}
                    type="text"
                    value={contactCompany}
                    onChange={e => SetContactCompany(e.target.value)}
                  />

                  <Text pt="20px" mt="25px" fontSize="20px">
                    Position at Company
                  </Text>
                  <Input
                    variant="outline"
                    placeholder={value.position}
                    type="text"
                    value={contactPosition}
                    onChange={e => SetContactPosition(e.target.value)}
                  />
                  <Text pt="20px" mt="25px" fontSize="20px">
                    Details
                  </Text>
                  <Textarea
                    resize="none"
                    h="15vh"
                    placeholder={contactMemo}
                    value={contactMemo}
                    onChange={e => SetContactMemo(e.target.value)}
                  />
                  <Box align="right">
                    <Button
                      mb="60px"
                      bgColor="ripple.200"
                      color="white"
                      fontFamily="Raleway-Bold"
                      borderRadius="30px"
                      variant="solid"
                      w="50%"
                      _hover={{
                        transform: "scale(1.05)",
                      }}
                      onClick={handleClick}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </VStack>
              </GridItem>
              <GridItem rowSpan={4} colSpan={1} pt="20px">
                <VStack>
                  <Button
                    bgColor="ripple.200"
                    color="white"
                    fontFamily="Raleway-Bold"
                    borderRadius="30px"
                    variant="solid"
                    w="100%"
                    leftIcon={<RiMailAddFill size={20}/>}
                    _hover={{
                      transform: "scale(1.05)",
                    }}
                  >
                    Email
                  </Button>
                  <Spacer />
                  <Button
                    bgColor="ripple.200"
                    color="white"
                    fontFamily="Raleway-Bold"
                    borderRadius="30px"
                    variant="solid"
                    w="100%"
                    leftIcon={<RiCalendarEventFill size={20}/>}
                    _hover={{
                      transform: "scale(1.05)",
                    }}
                  >
                    Add Reminder
                  </Button>
                </VStack>
              </GridItem>

              <GridItem rowSpan={4} colSpan={2}>
                Last Contacted By
              </GridItem>
              <GridItem rowSpan={2} colSpan={1} />
            </Grid>
          </Box>
          <VStack w="100%" align="left">
            <Text fontSize="25px"
              color="ripple.200"
              fontFamily="Raleway-Bold">Deals</Text>
              <hr/>
            <Box>Deals Table Here</Box>
            <Text fontSize="25px"
              color="ripple.200"
              fontFamily="Raleway-Bold">Interactions</Text>
              <hr/>
            <Box>Interactions Table Here</Box>
          </VStack>
          
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ContactPopUp
