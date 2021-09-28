import React from "react"
import { Button } from "@chakra-ui/react"
import { RiAddFill } from "react-icons/ri"

const CreateEventButton = ({ onOpen }) => {
  return (
    <Button
      leftIcon={<RiAddFill size={20} />}
      backgroundColor="ripple.100"
      border="10px"
      margin="10px"
      float="right"
      size="lg"
      onClick={onOpen}
    >
      Add Interaction
    </Button>
  )
}

export default CreateEventButton
