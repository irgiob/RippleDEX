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

const StageStepper = ({ value }) => {
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
  const [completed, setCompleted] = React.useState({})

  React.useEffect(() => {
    if (value) {
      handleComplete(value - 2)
      setActiveStep(value - 1)
      if (value == 7) {
        setCompleted([true, true, true, true, true, true, true])
      }
    }
  }, [value])

  const handleClick = index => {
    setActiveStep(index)
  }

  const handleComplete = currStep => {
    const newCompleted = {}
    for (let i = 0; i < currStep + 1; ++i) {
      newCompleted[i] = true
    }
    setCompleted(newCompleted)
    handleNext()
  }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  const handleNext = () => {
    const newActiveStep =
      activeStep === steps.length - 1 &&
      !(Object.keys(completed).length === steps.length)
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1
    setActiveStep(newActiveStep)
    if (newActiveStep == 6) {
      setCompleted([true, true, true, true, true, true, true])
    }
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
        <Button size="sm" onClick={handleReset}>
          Reset
        </Button>
        <Button size="sm" onClick={() => handleComplete(activeStep)}>
          Complete Stage
        </Button>
      </HStack>
    </VStack>
  )
}

export default StageStepper
