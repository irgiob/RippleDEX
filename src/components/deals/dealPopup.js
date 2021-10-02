import * as React from "react"

import { navigate } from "gatsby-link"

import StageStepper from "./stageStepper"
import DatePicker from "react-datepicker"
import { CustomAutoComplete, AutoCompleteListItem } from "../CustomAutoComplete"

import { updateDeal } from "../../models/Deal"

import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useMediaQuery,
  Text,
  Image,
  Input,
  VStack,
  HStack,
  useToast,
  Button,
  Textarea,
  Spacer,
} from "@chakra-ui/react"

import { RiArrowLeftSLine } from "react-icons/ri"

const DealPopUp = ({ isOpen, onClose, value, companies, members }) => {
  const stageOptions = {
    Prospect: 1,
    Lead: 2,
    Pitch: 3,
    Qualified: 4,
    "Proposal Sent": 5,
    Negotiation: 6,
    Closed: 7,
  }

  const reverseStageOptions = {
    1: "Prospect",
    2: "Lead",
    3: "Pitch",
    4: "Qualified",
    5: "Proposal Sent",
    6: "Negotiation",
    7: "Closed",
  }

  const handleStage = stageText => {}

  const [isLargeSize] = useMediaQuery("(min-width: 42em)")

  const [dealName, setDealName] = React.useState("")
  const [dealSize, setDealSize] = React.useState("")
  const [company, setCompany] = React.useState(null)
  const [stage, setStage] = React.useState("")
  const [closeDate, setCloseDate] = React.useState(new Date())
  const [recordedBy, setRecordedBy] = React.useState(null)
  const [notes, setNotes] = React.useState("")
  const toast = useToast()

  const handleClick = async () => {
    const options = {
      company: company.id,
      dealSize: dealSize,
      name: dealName,
      notes: notes,
      recordedBy: recordedBy.id,
      stage: reverseStageOptions[stage],
      closeDate: closeDate,
    }
    await updateDeal(value.id, options)
    toast({
      title: "Success",
      description: "Deal details have been updated",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }

  React.useEffect(() => {
    if (value) {
      setDealName(value.name)
      setDealSize(value.dealSize)
      setStage(stageOptions[value.stage])
      if (value.closeDate != null) {
        setCloseDate(value.closeDate.toDate())
      } else if (value.closeDate == null) {
        setCloseDate(null)
      }
      setCompany(value.company)
      setRecordedBy(value.recordedBy)
      setNotes(value.notes)
    }
  }, [value])

  const format = val =>
    `$` + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const parse = val => val.replace(/^\$/, "")

  const DateCustomInput = React.forwardRef(({ value, onClick }, ref) => (
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
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
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
                onClick={onClose}
              >
                {value.name}
              </Button>
              <HStack spacing="20px" w="100%">
                <Box>
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
                <Box>
                  <Text fontSize="15px" color="ripple.200" pb="10px">
                    Deal Size
                  </Text>
                  <Input
                    focusBorderColor="ripple.200"
                    placeholder="Deal Size"
                    value={format(dealSize)}
                    onChange={e => {
                      setDealSize(e?.target.value)
                    }}
                  />
                </Box>
                <Spacer />
                <Box>
                  <Text fontSize="15px" color="ripple.200" pb="10px">
                    Closing Date
                  </Text>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={closeDate}
                    onChange={date => setCloseDate(date)}
                    customInput={<DateCustomInput />}
                    portalId="root-portal"
                  />
                </Box>
              </HStack>
              <HStack w="100%">
                <Box>
                  <Text fontSize="15px" color="ripple.200" pt="20px">
                    Current Stage
                  </Text>
                  <StageStepper setStage={setStage} value={stage} />
                </Box>
                <Spacer />
                <VStack spacing="15px">
                  <Box>
                    <Text pos="absolute" fontSize="15px" color="ripple.200">
                      Company
                    </Text>
                    <Box pt="20px">
                      <CustomAutoComplete
                        variant="outline"
                        size="md"
                        placeholder="Select company"
                        items={companies}
                        itemRenderer={companyItem}
                        disableCreateItem={false}
                        onCreateItem={() => navigate("/companies")}
                        value={company}
                        valueInputAttribute="name"
                        onChange={setCompany}
                      />
                    </Box>
                  </Box>
                  <Spacer />
                  <Box>
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
                        value={recordedBy}
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
                    value={notes}
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
