import React, { useState, useEffect } from "react"
import { updateUser } from "../../models/User"

import {
  Box,
  HStack,
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Spacer,
  Text,
  Image,
  useToast,
} from "@chakra-ui/react"

import { RiArrowLeftRightLine } from "react-icons/ri"
import ProfilePicture from "../../images/RippleDEXDark.svg"

import { BiSearch } from "react-icons/bi"

const SwitchOrgPopup = props => {
  const toast = useToast()
  const allOrg = props.user?.organizations

  const orgList = allOrg.map((allOrg, i) => {
    return (
      <li w="100%" mt="10%" textAlign="left" key={i}>
        <Button
          bgColor="white"
          h="50px"
          textAlign="left"
          _hover={{
            transform: "scale(1.08)",
          }}
          leftIcon={<RiArrowLeftRightLine />}
          onClick={() => {
            updateUser(props.user?.id, {
              lastOpenedOrganization: allOrg.toString(),
            })
              .then(updatedUser => props.setUser(updatedUser))
              .then(
                toast({
                  title: "New Organization Added",
                  description: "Organization has been changed",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                }),
                window.location.reload(false)
              )
          }}
        >
          {allOrg}
        </Button>
        <hr />
      </li>
    )
  })

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent
        pos="absolute"
        h="fit-content"
        minHeight="50%"
        maxW="30%"
        p="15px"
        pb="30px"
        borderRadius="15px"
        value="inside"
        scrollBehavior="inside"
      >
        <ModalCloseButton m="15px" />
        <Center>
          <Box textAlign="left" w="80%" mt="25px">
            <Text
              pb="5px"
              fontFamily="Nunito-Bold"
              fontSize="23px"
              color="ripple.200"
            >
              Switch Organizations
            </Text>
            <hr w="100%" />
            <HStack maxW="100%">
              <Box>
                <Spacer pb="30px" />
                <Text pb="10px" fontSize="20px" color="ripple.200">
                  Current Organization: <br />
                  <Text color="black"> {props.org?.name} </Text>
                  <Text color="grey" fontSize="15px">
                    {" "}
                    {props.org?.description}{" "}
                  </Text>
                </Text>
              </Box>
              <Spacer />
              <Image
                src={props.org?.profilePicture || ProfilePicture}
                boxSize="100px"
                p="20px"
              />
            </HStack>
            <Text pt="10px" pb="10px" fontSize="20px" color="ripple.200">
              All Organization <br />
            </Text>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BiSearch style={{ color: "#a2b1c0" }} />}
              />
              <Input type="text" placeholder="Search" />
            </InputGroup>
            <Box pt="30px" pb="30px" w="100%">
              <ol style={{ listStyleType: "none" }}>
                {orgList}
                <hr />
              </ol>
            </Box>
          </Box>
        </Center>
      </ModalContent>
    </Modal>
  )
}

export default SwitchOrgPopup
