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
  VStack,
} from "@chakra-ui/react"

const InteractionPopUp = ({ isOpen, onClose, value }) => {
  const [isLargeSize] = useMediaQuery("(min-width: 42em)")
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton m="20px" />
        <ModalBody m="20px">
          {value.id} {value.name} {value.company} {value.email}{" "}
          {value.phoneNumber} {value.position}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default InteractionPopUp
