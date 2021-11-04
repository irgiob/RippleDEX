import React, { useEffect, useState } from "react"
import { navigate } from "gatsby-link"

import { updateContact } from "../../models/Contact"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Text,
  Input,
  Textarea,
  Button,
  Grid,
  GridItem,
  Avatar,
  AvatarBadge,
  Spacer,
  VStack,
  Link,
  useToast,
} from "@chakra-ui/react"

import {
  RiArrowLeftSLine,
  RiMailAddFill,
  RiImageAddLine,
  RiChat1Fill,
} from "react-icons/ri"

import { CustomAutoComplete, AutoCompleteListItem } from "../CustomAutoComplete"
import UploadImageButton from "../uploadImageButton"

import LogoLight from "../../images/RippleDEXWhite.svg"

const ContactPopUp = ({ selected, setSelected, companies, onUpdate }) => {
  const [contactName, setContactName] = useState()
  const [contactEmail, setContactEmail] = useState()
  const [contactNumber, setContactNumber] = useState()
  const [contactCompany, setContactCompany] = useState()
  const [contactPosition, setContactPosition] = useState()
  const [contactImage, setContactImage] = useState()
  const [contactMemo, setContactMemo] = useState()

  const toast = useToast()

  useEffect(() => {
    setContactName(selected?.name)
    setContactEmail(selected?.email)
    setContactNumber(selected?.phoneNumber)
    setContactCompany(selected?.company)
    setContactPosition(selected?.position)
    setContactImage(selected?.profilePicture)
    setContactMemo(selected?.notes)
  }, [selected])

  const handleClick = async () => {
    const options = {
      company: contactCompany?.id || null,
      email: contactEmail || null,
      name: contactName || null,
      notes: contactMemo || null,
      phoneNumber: contactNumber || null,
      position: contactPosition || null,
      profilePicture: contactImage || null,
    }
    onUpdate({ ...selected, ...options, company: contactCompany })
    if (selected?.id) {
      await updateContact(selected?.id, options)
      toast({
        title: "Success",
        description: "Contact details have been updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    } else {
      setSelected(null)
    }
  }

  return (
    <Modal isCentered isOpen={selected} onClose={() => setSelected(null)}>
      <ModalOverlay />
      <ModalContent maxW="1000px" borderRadius="15px" value="inside">
        <ModalBody m="20px">
          <Box value="inside">
            <Button
              pl="0px"
              mb="10px"
              bg="none"
              leftIcon={<RiArrowLeftSLine size="40px" />}
              fontSize="25px"
              color="ripple.200"
              fontFamily="Raleway-Bold"
              _hover={{
                transform: "scale(1.05)",
              }}
              onClick={() => setSelected(null)}
              data-testid="contactOpenButton"
            >
              {contactName}
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
                <Avatar
                  mt="30px"
                  w="8em"
                  h="8em"
                  src={contactImage || LogoLight}
                  alt="Contact Image"
                >
                  <AvatarBadge boxSize="2em" bg="white">
                    <UploadImageButton
                      fontFamily="Raleway-Bold"
                      borderRadius="full"
                      size="sm"
                      _hover={{ transform: "scale(1.08)" }}
                      buttonMessage={
                        <RiImageAddLine color="black" size="1rem" />
                      }
                      changeUrl={setContactImage}
                    />
                  </AvatarBadge>
                </Avatar>
              </GridItem>
              <GridItem rowSpan={6} colSpan={2}>
                <VStack align="left">
                  <Text fontSize="15px" color="ripple.200">
                    Contact Name
                  </Text>
                  <Input
                    variant="outline"
                    placeholder="Contact Name"
                    type="text"
                    value={contactName}
                    data-testid="contactName"
                    onChange={e => setContactName(e.target.value)}
                  />

                  <Text pt="13px" fontSize="15px" color="ripple.200">
                    Email
                  </Text>
                  <Input
                    variant="outline"
                    placeholder="Contact Email"
                    type="text"
                    value={contactEmail}
                    data-testid="email"
                    onChange={e => setContactEmail(e.target.value)}
                  />
                  <Text pt="19px" fontSize="15px" color="ripple.200">
                    Phone Number
                  </Text>
                  <Input
                    value={contactNumber}
                    placeholder="Contact Phone Number"
                    data-testid="phoneNumber"
                    onChange={e => {
                      if (
                        e.target.value.match(
                          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g
                        )
                      )
                        setContactNumber(e.target.value)
                    }}
                    variant="outline"
                  />
                </VStack>
              </GridItem>
              <GridItem rowSpan={8} colSpan={2}>
                <VStack align="left">
                  <Text fontSize="15px" color="ripple.200">
                    Company
                  </Text>
                  <CustomAutoComplete
                    placeholder="Contact's Company"
                    items={companies}
                    itemRenderer={company => (
                      <AutoCompleteListItem
                        name={company.name}
                        profilePicture={company.profilePicture}
                      />
                    )}
                    disableCreateItem={true}
                    onCreateItem={() => null}
                    value={contactCompany ? contactCompany : undefined}
                    
                    onChange={setContactCompany}
                    valueInputAttribute="name"
                    size="md"
                    variant="outline"
                  />
                  <Text pt="20px" fontSize="15px" color="ripple.200">
                    Position at Company
                  </Text>
                  <Input
                    variant="outline"
                    placeholder="Contact Position"
                    type="text"
                    value={contactPosition}
                    data-testid="Position at Company"
                    onChange={e => setContactPosition(e.target.value)}
                  />
                  <Text pt="20px" fontSize="15px" color="ripple.200">
                    Details
                  </Text>
                  <Textarea
                    resize="none"
                    h="15vh"
                    placeholder="Notes"
                    value={contactMemo}
                    data-testid="memo"
                    onChange={e => setContactMemo(e.target.value)}
                  />
                  <Box pt="30px" align="end">
                    <Button
                      bgColor="ripple.200"
                      color="white"
                      fontFamily="Raleway-Bold"
                      borderRadius="50px"
                      variant="solid"
                      size="lg"
                      _hover={{
                        transform: "scale(1.05)",
                      }}
                      onClick={handleClick}
                      data-testid="addButton"
                    >
                      {selected?.id ? "Save Changes" : "Create Contact"}
                    </Button>
                  </Box>
                </VStack>
              </GridItem>
              {selected?.id && (
                <GridItem rowSpan={4} colSpan={1} pt="20px">
                  <VStack>
                    {contactEmail && (
                      <Link
                        w="100%"
                        href={"mailto:" + contactEmail}
                        isExternal
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          bgColor="ripple.200"
                          color="white"
                          fontFamily="Raleway-Bold"
                          borderRadius="30px"
                          variant="solid"
                          w="100%"
                          leftIcon={<RiMailAddFill size={20} />}
                          _hover={{ transform: "scale(1.05)" }}
                        >
                          Email
                        </Button>
                      </Link>
                    )}
                    <Spacer />
                    <Button
                      bgColor="ripple.200"
                      color="white"
                      fontFamily="Raleway-Bold"
                      borderRadius="30px"
                      variant="solid"
                      w="100%"
                      leftIcon={<RiChat1Fill size={20} />}
                      _hover={{ transform: "scale(1.05)" }}
                      onClick={() =>
                        navigate("/interactions/", {
                          state: { selectedFilter: selected?.name },
                        })
                      }
                    >
                      View Interactions
                    </Button>
                  </VStack>
                </GridItem>
              )}
            </Grid>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ContactPopUp
