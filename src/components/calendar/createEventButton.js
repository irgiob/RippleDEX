import React from "react"
import { Button } from "@chakra-ui/react"
import { RiAddFill } from "react-icons/ri"

/**
 *
 * @property {function} onOpen function used for opening a pop up
 * @returns {JSX}
 */
const CreateEventButton = ({ onOpen }) => {
  return (
    <Button
      size="lg"
      leftIcon={<RiAddFill size={20} />}
      bgColor="ripple.200"
      color="white"
      fontFamily="Raleway-Bold"
      borderRadius="30px"
      variant="solid"
      _hover={{
        transform: "scale(1.05)",
      }}
      onClick={onOpen}
    >
      Add Interaction
    </Button>
  )
}

export default CreateEventButton
