import * as React from "react"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useMediaQuery,
  Text,
} from "@chakra-ui/react"

import SignUp from "./signup"
import LogIn from "./login"

const AuthPopUp = ({ isOpen, onClose, type }) => {
  const [isLargeSize] = useMediaQuery("(min-width: 42em)")

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        pos="absolute"
        maxW={!isLargeSize ? "90vw" : "500px"}
        borderRadius="20px"
        p="20px"
      >
        <ModalHeader>
          {type === "SignUp" ? (
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
        <ModalBody>{type === "SignUp" ? <SignUp /> : <LogIn />}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AuthPopUp
