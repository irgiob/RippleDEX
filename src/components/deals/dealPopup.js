import React, { useState, useEffect, forwardRef } from "react"
import { navigate } from "gatsby-link"

import StageStepper from "./stageStepper"
import DatePicker from "react-datepicker"
import { CustomAutoComplete, AutoCompleteListItem } from "../CustomAutoComplete"

import { updateDeal } from "../../models/Deal"
import { dateToFirebaseTimestamp } from "../../utils/DateTimeHelperFunctions"

import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  NumberInput,
  NumberInputField,
  Input,
  VStack,
  HStack,
  useToast,
  Button,
  Textarea,
  Spacer,
} from "@chakra-ui/react"

import { RiArrowLeftSLine } from "react-icons/ri"

const stageOptions = [
  "Prospect",
  "Lead",
  "Pitch",
  "Qualified",
  "Proposal Sent",
  "Negotiation",
  "Closed",
]

const DealPopUp = ({ selected, setSelected, companies, members, onUpdate }) => {
  const [dealName, setDealName] = useState("")
  const [dealSize, setDealSize] = useState("")
  const [company, setCompany] = useState(null)
  const [stage, setStage] = useState("")
  const [closeDate, setCloseDate] = useState(new Date())
  const [recordedBy, setRecordedBy] = useState(null)
  const [notes, setNotes] = useState("")
  const toast = useToast()

  const handleClick = async () => {
    const newCloseDate = closeDate ? dateToFirebaseTimestamp(closeDate) : null
    const options = {
      company: company?.id || null,
      dealSize: dealSize || null,
      name: dealName || null,
      notes: notes || null,
      recordedBy: recordedBy?.id || null,
      stage: stageOptions[stage - 1],
      closeDate: newCloseDate,
    }
    await updateDeal(selected.id, options)
    onUpdate({
      ...selected,
      ...options,
      company: company,
      recordedBy: recordedBy,
    })
    toast({
      title: "Success",
      description: "Deal details have been updated",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }

  useEffect(() => {
    if (selected) {
      setDealName(selected.name)
      setDealSize(selected.dealSize)
      setStage(stageOptions.indexOf(selected.stage) + 1)
      if (selected.closeDate != null) {
        setCloseDate(selected.closeDate.toDate())
      } else if (selected.closeDate == null) {
        setCloseDate(null)
      }
      setCompany(selected.company)
      setRecordedBy(selected.recordedBy)
      setNotes(selected.notes)
    }
  }, [selected])

  const format = val =>
    `$` + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const parse = val => val.replace(/^\$/, "")

  const DateCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Box ref={ref} onClick={onClick}>
      <Input
        value={value || "Not Closed"}
        focusBorderColor="ripple.200"
        isReadOnly
      />
    </Box>
  ))

  const companyItem = company => {
    return (
      <AutoCompleteListItem
        name={company.name}
        profilePicture={company.profilePicture}
      />
    )
  }

  const memberItem = member => {
    return (
      <AutoCompleteListItem
        name={member.firstName + " " + member.lastName}
        profilePicture={member.profilePicture}
        showImage={true}
      />
    )
  }

  return (
    <Modal isCentered isOpen={selected} onClose={() => setSelected(null)}>
      <ModalOverlay />
      <ModalContent maxW="850px">
        <ModalBody>
          <HStack spacing="20px">
            <VStack align="start" mx="10px" my="20px">
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
              >
                {dealName}
              </Button>
              <HStack spacing="20px" w="100%">
                <Box w="100%">
                  <Text fontSize="15px" color="ripple.200" pb="10px">
                    Deal Name
                  </Text>
                  <Input
                    focusBorderColor="ripple.200"
                    placeholder="Deal name"
                    value={dealName}
                    onChange={event => {
                      setDealName(event?.target.value)
                    }}
                  />
                </Box>
                <Box w="100%">
                  <Text fontSize="15px" color="ripple.200" pb="10px">
                    Deal Size
                  </Text>
                  <NumberInput
                    precision={2}
                    min={0}
                    placeholder="Deal Size"
                    value={dealSize ? format(dealSize) : format("")}
                    onChange={e => setDealSize(parse(e))}
                    focusBorderColor="ripple.200"
                  >
                    <NumberInputField />
                  </NumberInput>
                </Box>
                <Box w="100%">
                  <Text fontSize="15px" color="ripple.200" pb="10px">
                    Closing Date
                  </Text>
                  <DatePicker
                    popperClassName="newDatePicker"
                    dateFormat="dd/MM/yyyy"
                    selected={closeDate}
                    onChange={date => setCloseDate(date)}
                    customInput={<DateCustomInput />}
                    portalId="popup-portal"
                  />
                </Box>
              </HStack>
              <HStack w="100%">
                <Box mr="0.5em">
                  <Text fontSize="15px" color="ripple.200" pt="20px">
                    Current Stage
                  </Text>
                  <StageStepper setStage={setStage} value={stage} />
                </Box>
                <Spacer />
                <VStack spacing="15px" align="left" w="100%">
                  <Box w="100%">
                    <Text pos="absolute" fontSize="15px" color="ripple.200">
                      Company
                    </Text>
                    <Box pt="20px" w="100%">
                      <CustomAutoComplete
                        variant="outline"
                        size="md"
                        placeholder="Select company"
                        items={companies}
                        itemRenderer={companyItem}
                        disableCreateItem={false}
                        onCreateItem={() => navigate("/companies")}
                        value={company || undefined}
                        valueInputAttribute="name"
                        onChange={setCompany}
                      />
                    </Box>
                  </Box>
                  <Spacer />
                  <Box w="100%">
                    <Text pos="absolute" fontSize="15px" color="ripple.200">
                      Recorded By
                    </Text>
                    <Box pt="20px">
                      <CustomAutoComplete
                        variant="outline"
                        size="md"
                        placeholder="Select member"
                        items={members}
                        itemRenderer={memberItem}
                        disableCreateItem={true}
                        onCreateItem={() => null}
                        value={recordedBy || undefined}
                        onChange={setRecordedBy}
                        valueInputAttribute="label"
                      />
                    </Box>
                  </Box>
                </VStack>
              </HStack>
              <HStack align="end" spacing="30px" w="785px">
                <Box w="100%">
                  <Text fontSize="15px" color="ripple.200" pt="10px" pb="10px">
                    Notes
                  </Text>
                  <Textarea
                    focusBorderColor="ripple.200"
                    placeholder="Notes"
                    value={notes || ""}
                    onChange={event => {
                      setNotes(event?.target.value)
                    }}
                  />
                </Box>
                <Box>
                  <Button
                    onClick={handleClick}
                    bgColor="ripple.200"
                    color="white"
                    fontFamily="Raleway-Bold"
                    variant="solid"
                    borderRadius="30px"
                    _hover={{
                      transform: "scale(1.05)",
                    }}
                    padding="20px"
                  >
                    Save Changes
                  </Button>
                </Box>
              </HStack>
            </VStack>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default DealPopUp
