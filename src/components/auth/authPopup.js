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
  Image,
} from "@chakra-ui/react"

import SignUp from "./signup"
import LogIn from "./login"

import SignUpIll from "../../images/RippleDEXDark.svg"

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
        {type === "SignUp" && (
          <Image
            w="70px"
            right="40px"
            bottom="30px"
            pos="absolute"
            src={SignUpIll}
          />
        )}
      </ModalContent>
    </Modal>
  )
}

export default AuthPopUp
