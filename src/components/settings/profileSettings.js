import React, { useState } from "react"

import { updateMemberPosition } from "../../models/Organisation"
import { updateUser } from "../../models/User"

import {
  Box,
  Button,
  Center,
  Circle,
  Divider,
  HStack,
  Image,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Spacer,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react"

import ProfilePicture from "../../images/RippleDEXWhite.svg"

import { BiTrash } from "react-icons/bi"

import UploadImageButton from "../uploadImageButton"
import { ResetPasswordPopup } from "../auth/resetPassword"

const ProfileSettings = props => {
  const [firstName, setFirstName] = useState(props.user?.firstName)
  const [lastName, setLastName] = useState(props.user?.lastName)
  const [position, setPosition] = useState(
    props.org?.members.filter(member => member.userID === props.user?.id)[0]
      .position
  )
  const [phoneNumber, setPhoneNumber] = useState(props.user?.phoneNumber)
  const toast = useToast()

  const [photoUrl, setPhotoUrl] = useState(props.user?.profilePicture)
  const changePhotoUrl = newUrl => {
    setPhotoUrl(newUrl)
  }

  const handleClick = async () => {
    const options = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      profilePicture: photoUrl,
    }
    await updateUser(props.user?.id, options)
    props.setUser({ ...props.user, ...options })
    if (props.org) {
      const oldPosition = props.org?.members.filter(
        member => member.userID === props.user?.id
      )[0].position
      if (oldPosition !== position) {
        const updatedOrg = await updateMemberPosition(
          props.org?.id,
          props.user?.id,
          oldPosition,
          position
        )
        props.setOrg(updatedOrg)
      }
    }
    toast({
      title: "Success",
      description: "Your details have been updated",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Modal size="2xl" isCentered isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent
        pos="absolute"
        h="500px"
        borderRadius="20px"
        pt="10px"
        pb="10px"
      >
        <ModalCloseButton m="15px" />
        <ModalBody>
          <Box pb="10px" pl="10px" textAlign="left">
            <Text
              pt="8px"
              pb="10px"
              fontFamily="Nunito-Bold"
              fontSize="23px"
              color="ripple.200"
            >
              Profile Settings
            </Text>
            <Divider />
          </Box>
          <VStack>
            <HStack align="start" spacing={5}>
              <VStack textAlign="left" spacing={5}>
                <Box textAlign="left" w="300px">
                  <Text color="ripple.200" pb="5px" fontSize="12px">
                    First Name
                  </Text>
                  <Input
                    variant="outline"
                    placeholder="First Name"
                    type="text"
                    value={firstName}
                    onChange={event => setFirstName(event.target.value)}
                  />
                </Box>
                <Box textAlign="left" w="300px">
                  <Text color="ripple.200" pb="5px" fontSize="12px">
                    Last Name
                  </Text>
                  <Input
                    placeholder="Last Name"
                    type="text"
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}
                  />
                </Box>
                {props.org && (
                  <Box textAlign="left" w="300px">
                    <Text color="ripple.200" pb="5px" fontSize="12px">
                      Position at Company
                    </Text>
                    <Input
                      placeholder="Position at Company"
                      type="text"
                      value={position}
                      onChange={event => setPosition(event.target.value)}
                    />
                  </Box>
                )}
                <Box textAlign="left" w="300px">
                  <Text color="ripple.200" pb="5px" fontSize="12px">
                    Phone Number
                  </Text>
                  <Input
                    placeholder="Phone Number"
                    type="text"
                    value={phoneNumber}
                    onChange={event => setPhoneNumber(event.target.value)}
                  />
                </Box>
                <Box textAlign="left" w="300px">
                  <ResetPasswordPopup email={props.user?.email} readOnly={true}>
                    <Text
                      w="auto"
                      color="ripple.200"
                      cursor="pointer"
                      _hover={{ transform: "scale(1.05)" }}
                    >
                      Reset Password
                    </Text>
                  </ResetPasswordPopup>
                </Box>
              </VStack>
              <Spacer />
              <VStack spacing={0}>
                <Center h="200px" w="200px" bgColor="ripple.100">
                  <Image
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    src={
                      photoUrl || props.user?.profilePicture || ProfilePicture
                    }
                  />
                </Center>
                <Box h="10px" />
                <HStack spacing={1}>
                  <UploadImageButton
                    color="ripple.200"
                    fontFamily="Raleway-Bold"
                    borderRadius="20px"
                    variant="ghost"
                    size="sm"
                    _hover={{ transform: "scale(1.08)" }}
                    buttonMessage="Change Profile Picture"
                    changeUrl={changePhotoUrl}
                  />
                  <Circle
                    _hover={{ transform: "scale(1.2)" }}
                    onClick={async () => {
                      await updateUser(props.user?.id, { profilePicture: null })
                      props.setUser({ ...props.user, profilePicture: null })
                    }}
                  >
                    <BiTrash style={{ color: "red" }} />
                  </Circle>
                </HStack>
                <Box h="50px" />
                <Button
                  bgColor="ripple.200"
                  color="white"
                  fontFamily="Raleway-Bold"
                  borderRadius="30px"
                  variant="solid"
                  size="lg"
                  _hover={{ transform: "scale(1.05)" }}
                  onClick={handleClick}
                >
                  Save Changes
                </Button>
              </VStack>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ProfileSettings
