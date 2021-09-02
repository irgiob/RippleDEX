import * as React from "react"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useMediaQuery,
  useDisclosure,
  Text,
  Image,
  Button,
  Box,
} from "@chakra-ui/react"

import SignUp from "./auth/signup"
import LogIn from "./auth/login"

import SignUpIll from "../images/RippleDexDark.svg"

const PopUp = ({ isOpen, onClose, type }) => {
  const [isLargeSize] = useMediaQuery("(min-width: 42em)")

  const isOpenPopup = useDisclosure()
  const onOpenPopup = useDisclosure()
  const onClosePopup = useDisclosure()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        pos="absolute"
        top="15vh"
        maxW={!isLargeSize ? "90vw" : "500px"}
        borderRadius="20px"
        p="20px"
      >
        <ModalHeader>
          {type == "SignUp" ? (
            <Text
              mb="10px"
              fontFamily="Raleway-Bold"
              fontSize={["18px", "20px", "25px"]}
              color="ripple.200"
            >
              Create an Account{" "}
            </Text>
          ) : (
            <Text
              mb="10px"
              fontFamily="Raleway-Bold"
              fontSize={["18px", "20px", "25px"]}
              color="ripple.200"
            >
              Welcome Back!{" "}
            </Text>
          )}
        </ModalHeader>
        <ModalCloseButton m="20px" />
        <ModalBody>{type == "SignUp" ? <SignUp /> : <LogIn />}</ModalBody>
        {type == "SignUp" && (
          <Image
            w="70px"
            right="40px"
            bottom="40px"
            pos="absolute"
            src={SignUpIll}
          />
        )}
      </ModalContent>
    </Modal>
  )
}

export default PopUp
