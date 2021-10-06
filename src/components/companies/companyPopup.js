import React, { useEffect, useState } from "react"
import { updateCompany } from "../../models/Company"
import { createNewContact, getContactsByCompany } from "../../models/Contact"

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
  VStack,
  Link,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  useToast,
} from "@chakra-ui/react"

import {
  RiArrowLeftSLine,
  RiSendPlaneFill,
  RiImageAddLine,
  RiUserFill,
  RiBookOpenFill,
} from "react-icons/ri"

import { CustomAutoComplete, AutoCompleteListItem } from "../CustomAutoComplete"
import UploadImageButton from "../uploadImageButton"
import ContactPopUp from "../contacts/contactPopup"

import LogoLight from "../../images/RippleDEXWhite.svg"
import { navigate } from "gatsby-link"

const CompanyPopUp = ({
  selected,
  setSelected,
  companies,
  onUpdate,
  orgID,
}) => {
  const [companyName, setCompanyName] = useState()
  const [companyRevenue, setCompanyRevenue] = useState(0)
  const [companyDesc, setCompanyDesc] = useState()
  const [companyIndustry, setCompanyIndustry] = useState()
  const [companyPersonnel, setCompanyPersonnel] = useState(0)
  const [companyContact, setCompanyContact] = useState()
  const [companyImage, setCompanyImage] = useState()
  const [companyWebsite, setCompanyWebsite] = useState()
  const [companyRelation, setCompanyRelation] = useState()
  const [companyAddress, setCompanyAddress] = useState()
  const [contacts, setContacts] = useState([])
  const [newContact, setNewContact] = useState()

  const toast = useToast()

  useEffect(() => {
    setCompanyName(selected?.name)
    setCompanyRevenue(selected?.annualRevenue)
    setCompanyDesc(selected?.description)
    setCompanyIndustry(selected?.industry)
    setCompanyPersonnel(selected?.personnel)
    setCompanyContact(selected?.primaryContact)
    setCompanyImage(selected?.profilePicture)
    setCompanyWebsite(selected?.website)
    setCompanyRelation(selected?.relationship)
    setCompanyAddress(selected?.address)

    const fetchCompanyContacts = async companyID => {
      const contacts = await getContactsByCompany(companyID)
      setContacts(contacts)
    }
    if (selected && selected.id) fetchCompanyContacts(selected?.id)
  }, [selected])

  const handleClick = async () => {
    if (companyContact && companyContact.id === null) {
      const contactID = await createNewContact(
        orgID,
        companyContact.name || null,
        companyContact.company?.id || null,
        companyContact.email || null,
        companyContact.phoneNumber || null,
        companyContact.position || null,
        companyContact.profilePicture || null
      )
      if (contactID) companyContact.id = contactID
    }
    const options = {
      name: companyName || null,
      annualRevenue: parseFloat(companyRevenue) || null,
      description: companyDesc || null,
      industry: companyIndustry || null,
      personnel: parseInt(companyPersonnel) || null,
      primaryContact: companyContact?.id || null,
      profilePicture: companyImage || null,
      website: companyWebsite || null,
      relationship: companyRelation || null,
    }
    onUpdate({ ...selected, ...options, primaryContact: companyContact })
    if (selected?.id) {
      await updateCompany(selected?.id, options)
      toast({
        title: "Success",
        description: "Your company details have been updated",
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
        <ModalBody p="20px">
          <Box value="inside">
            <Button
              pl="0px"
              leftIcon={<RiArrowLeftSLine size={40} />}
              fontSize="25px"
              color="ripple.200"
              fontFamily="Raleway-Bold"
              bg="none"
              _hover={{
                transform: "scale(1.05)",
              }}
              onClick={() => setSelected(null)}
            >
              {companyName}
            </Button>

            <Grid
              h="100%"
              p="10px"
              alignContent="left"
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(5, 1fr)"
              gap={8}
            >
              <GridItem rowSpan={1} colSpan={1} align="center">
                <VStack spacing="1em">
                  <Avatar
                    mt="30px"
                    w="8em"
                    h="8em"
                    src={companyImage || LogoLight}
                    alt="Company Image"
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
                        changeUrl={setCompanyImage}
                      />
                    </AvatarBadge>
                  </Avatar>
                  {selected?.id && (
                    <>
                      {companyWebsite && (
                        <Link
                          w="100%"
                          href={
                            companyWebsite.substr(0, "https://".length) !==
                            "https://"
                              ? "https://" + companyWebsite
                              : companyWebsite
                          }
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
                            leftIcon={<RiSendPlaneFill size={20} />}
                            _hover={{ transform: "scale(1.05)" }}
                          >
                            Visit Website
                          </Button>
                        </Link>
                      )}
                      <Button
                        bgColor="ripple.200"
                        color="white"
                        fontFamily="Raleway-Bold"
                        borderRadius="30px"
                        variant="solid"
                        w="100%"
                        leftIcon={<RiUserFill size={20} />}
                        _hover={{ transform: "scale(1.05)" }}
                        onClick={() =>
                          navigate("/contacts/", {
                            state: { selectedFilter: selected?.name },
                          })
                        }
                      >
                        View Contacts
                      </Button>
                      <Button
                        bgColor="ripple.200"
                        color="white"
                        fontFamily="Raleway-Bold"
                        borderRadius="30px"
                        variant="solid"
                        w="100%"
                        leftIcon={<RiBookOpenFill size={20} />}
                        _hover={{ transform: "scale(1.05)" }}
                        onClick={() =>
                          navigate("/deals/", {
                            state: { selectedFilter: selected?.name },
                          })
                        }
                      >
                        View Deals
                      </Button>
                    </>
                  )}
                </VStack>
              </GridItem>
              <GridItem rowSpan={1} colSpan={2}>
                <VStack align="left">
                  <Text fontSize="15px" color="ripple.200" pt="20px">
                    Name
                  </Text>
                  <Input
                    variant="outline"
                    placeholder="Contact Name"
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                  />
                  <Text fontSize="15px" color="ripple.200" pt="10px">
                    Annual Revenue
                  </Text>
                  <NumberInput
                    precision={2}
                    min={0}
                    value={
                      companyRevenue
                        ? `$` +
                          companyRevenue
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : "$"
                    }
                    onChange={e => {
                      const parse = val => val.replace(/^\$/, "")
                      setCompanyRevenue(parse(e))
                    }}
                    variant="outline"
                  >
                    <NumberInputField />
                  </NumberInput>
                  <Text fontSize="15px" color="ripple.200" pt="10px">
                    Personnel
                  </Text>
                  <NumberInput
                    precision={0}
                    min={0}
                    value={companyPersonnel || 0}
                    onChange={e => setCompanyPersonnel(Math.round(e))}
                    variant="outline"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Text fontSize="15px" color="ripple.200" pt="10px">
                    Industry
                  </Text>
                  <Input
                    value={companyIndustry}
                    placeholder="Company Industry"
                    onChange={e => setCompanyIndustry(e.target.value)}
                    variant="outline"
                  />
                  <Text fontSize="15px" color="ripple.200" pt="10px">
                    Company Relationship
                  </Text>
                  <Input
                    variant="outline"
                    placeholder="Company Relationship"
                    type="text"
                    value={companyRelation}
                    onChange={e => setCompanyRelation(e.target.value)}
                  />
                </VStack>
              </GridItem>
              <GridItem rowSpan={1} colSpan={2}>
                <VStack align="left">
                  <Box>
                    <Text
                      pt="20px"
                      pos="absolute"
                      fontSize="15px"
                      color="ripple.200"
                    >
                      Primary Contact
                    </Text>
                    <Box pt="45px">
                      <CustomAutoComplete
                        placeholder="Company's Primary Contact"
                        items={contacts}
                        itemRenderer={contact => (
                          <AutoCompleteListItem
                            name={contact.name}
                            profilePicture={contact.profilePicture}
                          />
                        )}
                        disableCreateItem={false}
                        onCreateItem={newContactName =>
                          setNewContact({
                            id: null,
                            company: selected,
                            email: null,
                            name: newContactName.value,
                            notes: null,
                            phoneNumber: null,
                            position: null,
                            profilePicture: null,
                            registeredBy: orgID,
                          })
                        }
                        value={companyContact ? companyContact : undefined}
                        onChange={setCompanyContact}
                        valueInputAttribute="name"
                        size="md"
                        variant="outline"
                      />
                    </Box>
                  </Box>
                  <ContactPopUp
                    selected={newContact}
                    setSelected={setNewContact}
                    companies={companies}
                    onUpdate={newUpdatedContact =>
                      setCompanyContact(newUpdatedContact)
                    }
                  />
                  <Box>
                    <Text
                      pt="12px"
                      pb="10px"
                      fontSize="15px"
                      color="ripple.200"
                    >
                      Website
                    </Text>
                    <Input
                      variant="outline"
                      placeholder="Company Website"
                      type="text"
                      value={companyWebsite}
                      onChange={e => setCompanyWebsite(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <Text fontSize="15px" color="ripple.200" pt="10px">
                      Notes
                    </Text>
                    <Box pt="10px">
                      <Textarea
                        resize="none"
                        h="15vh"
                        placeholder="Notes"
                        value={companyDesc}
                        onChange={e => setCompanyDesc(e.target.value)}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Text fontSize="15px" color="ripple.200" pt="10px">
                      Company Address
                    </Text>
                    <Box pt="10px">
                      <Textarea
                        resize="none"
                        h="15vh"
                        placeholder="Company Address"
                        value={companyAddress}
                        onChange={e => setCompanyAddress(e.target.value)}
                      />
                    </Box>
                  </Box>
                  <Box pt="10px" align="right">
                    <Button
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
                      {selected?.id ? "Save Changes" : "Add Company"}
                    </Button>
                  </Box>
                </VStack>
              </GridItem>
            </Grid>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CompanyPopUp
