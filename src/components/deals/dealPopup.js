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

const DealPopUp = ({ isOpen, onClose, value }) => {
  const [isLargeSize] = useMediaQuery("(min-width: 42em)")
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton m="20px" />
        <ModalBody m="20px">{value.id}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default DealPopUp
