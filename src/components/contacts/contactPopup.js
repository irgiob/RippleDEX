import React, { useEffect, useState } from "react"
import { updateContact } from "../../models/Contact"

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

import {
  RiArrowLeftSLine,
  RiMailAddFill,
  RiCalendarEventFill,
} from "react-icons/ri"

import LogoLight from "../../images/RippleDEXWhite.svg"

// {value.id}
// {value.name}
// {value.company}
// {value.email}{" "}
// {value.phoneNumber}
// {value.position}

const ContactPopUp = ({ isOpen, onClose, value }) => {
  const [isLargeSize] = useMediaQuery("(min-width: 42em)")

  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhoneNumber, setContactPhoneNumber] = useState("")
  const [contactCompany, setContactCompany] = useState("")
  const [contactPosition, setContactPosition] = useState("")
  const [contactMemo, setContactMemo] = useState("")

  useEffect(() => {
    setContactName(value.name)
    setContactEmail(value.email)
    setContactPhoneNumber(value.phoneNumber)
    setContactCompany(value.company)
    setContactPosition(value.position)
    setContactMemo(value.notes)
  }, [value])

  const toast = useToast()

  // couldnt get the whole show memo from the database working
  // useEffect(() => {
  //   const getMemo = async contactID => {
  //     const currentMemo = await getContact(contactID)
  //     if (currentMemo) {
  //         setContactMemo(currentMemo?.notes)
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
        maxW="70vw"
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
                    placeholder="Contact Name"
                    type="text"
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                  />

                  <Text pt="20px" mt="25px" fontSize="20px">
                    Email
                  </Text>
                  <Input
                    variant="outline"
                    placeholder="Contact Email"
                    type="text"
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                  />
                  <Text pt="20px" mt="25px" fontSize="20px">
                    Phone Number
                  </Text>
                  <Input
                    variant="outline"
                    placeholder="Contact Phone Number"
                    type="text"
                    value={contactPhoneNumber}
                    onChange={e => setContactPhoneNumber(e.target.value)}
                  />
                </VStack>
              </GridItem>
              <GridItem rowSpan={8} colSpan={2}>
                <VStack align="left">
                  <Text fontSize="20px">Company</Text>
                  <Input
                    variant="outline"
                    placeholder="Contact's Company"
                    type="text"
                    value={contactCompany}
                    onChange={e => setContactCompany(e.target.value)}
                  />

                  <Text pt="20px" mt="25px" fontSize="20px">
                    Position at Company
                  </Text>
                  <Input
                    variant="outline"
                    placeholder="Contact Position"
                    type="text"
                    value={contactPosition}
                    onChange={e => setContactPosition(e.target.value)}
                  />
                  <Text pt="20px" mt="25px" fontSize="20px">
                    Details
                  </Text>
                  <Textarea
                    resize="none"
                    h="15vh"
                    placeholder="Notes"
                    value={contactMemo}
                    onChange={e => setContactMemo(e.target.value)}
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
                    leftIcon={<RiMailAddFill size={20} />}
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
                    leftIcon={<RiCalendarEventFill size={20} />}
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
            <Text fontSize="25px" color="ripple.200" fontFamily="Raleway-Bold">
              Deals
            </Text>
            <hr />
            <Box>Deals Table Here</Box>
            <Text fontSize="25px" color="ripple.200" fontFamily="Raleway-Bold">
              Interactions
            </Text>
            <hr />
            <Box>Interactions Table Here</Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ContactPopUp
