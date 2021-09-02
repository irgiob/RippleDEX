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
  ModalFooter,
} from "@chakra-ui/react"

import SignUp from "./auth/signup"
import LogIn from "./auth/login"

import SignUpIll from "../images/RippleDexDark.svg"

const PopUp = ({ isOpen, onClose, type }) => {
  const [isLargeSize] = useMediaQuery("(min-width: 42em)")

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxW={!isLargeSize ? "90vw" : "500px"}
        borderRadius="20px"
        p="20px"
      >
        <ModalHeader>
          <Text
            mb="10px"
            fontFamily="Raleway-Bold"
            fontSize={["18px", "20px", "25px"]}
            color="ripple.200"
          >
            Create an Account
          </Text>
        </ModalHeader>
        <ModalCloseButton m="20px" />
        <ModalBody>
          <SignUp />
        </ModalBody>

        <Image
          w="70px"
          right="40px"
          bottom="40px"
          pos="absolute"
          src={SignUpIll}
        />
      </ModalContent>
    </Modal>
  )
}

export default PopUp
