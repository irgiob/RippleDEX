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

const ContactPopUp = props => {
  const [isLargeSize] = useMediaQuery("(min-width: 42em)")
  const { isOpen, onClose } = props
  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton m="20px" />
        <ModalBody m="20px">
          <Text>Hi</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ContactPopUp
