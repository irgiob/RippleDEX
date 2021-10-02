import * as React from "react"

import { Box, Button, HStack, VStack, Text } from "@chakra-ui/react"

import { updateDeal } from "../../models/Deal"

import {
  Stepper,
  Step,
  StepButton,
  StepLabel,
  Typography,
} from "@material-ui/core"
import { RiAppleFill } from "react-icons/ri"

const StageStepper = ({ setStage, value }) => {
  const steps = [
    "Prospect",
    "Lead",
    "Pitch",
    "Qualified",
    "Proposal Sent",
    "Negotiation",
    "Closed",
  ]

  const [activeStep, setActiveStep] = React.useState(0)
  const [currStage, setCurrStage] = React.useState(0)
  const [completed, setCompleted] = React.useState({})

  React.useEffect(() => {
    if (value) {
      setActiveStep(value - 1)
      const newCompleted = {}

      let i = 0

      if (value == 7) {
        for (i; i < value; ++i) {
          newCompleted[i] = true
        }
      } else {
        for (i; i < value - 1; ++i) {
          newCompleted[i] = true
        }
      }

      setCompleted(newCompleted)
      setStage(value)
    }
  }, [value])

  const handleClick = index => {
    setActiveStep(index)
  }

  const handleComplete = currStep => {
    setActiveStep(currStep + 1)
    const newCompleted = {}

    if (currStep == 5) {
      for (let i = 0; i < currStep + 2; ++i) {
        newCompleted[i] = true
      }
    } else {
      for (let i = 0; i < currStep + 1; ++i) {
        newCompleted[i] = true
      }
    }
    setCompleted(newCompleted)
    setStage(currStep + 2)
  }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
    setStage(1)
  }

  return (
    <VStack w="100%">
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepLabel onClick={() => handleClick(index)}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <HStack spacing="20px">
        <Button
          bgColor="ripple.200"
          color="white"
          size="sm"
          borderRadius="20px"
          onClick={handleReset}
          _hover={{
            transform: "scale(1.05)",
          }}
        >
          Reset
        </Button>
        <Button
          bgColor="ripple.200"
          color="white"
          size="sm"
          borderRadius="20px"
          onClick={() => handleComplete(activeStep)}
          _hover={{
            transform: "scale(1.05)",
          }}
        >
          Complete Stage
        </Button>
      </HStack>
    </VStack>
  )
}

export default StageStepper
