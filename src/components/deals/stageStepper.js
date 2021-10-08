import React, { useState, useEffect } from "react"

import { Button, HStack, VStack } from "@chakra-ui/react"
import { Stepper, Step, StepLabel } from "@material-ui/core"

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

  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({})

  useEffect(() => {
    if (value) {
      setActiveStep(value - 1)
      const newCompleted = {}

      let i = 0

      if (value === 7) {
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
  }, [value, setStage])

  const handleClick = index => {
    setActiveStep(index)
    const newCompleted = {}

    if (index === 5) {
      for (let i = 0; i < index + 2; ++i) {
        newCompleted[i] = true
      }
    } else {
      for (let i = 0; i < index + 1; ++i) {
        newCompleted[i] = true
      }
    }
    setCompleted(newCompleted)
    setStage(index + 2)
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
            <StepLabel onClick={() => handleClick(index - 1)}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <HStack spacing="20px">
        <Button
          fontFamily="Raleway-Bold"
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
          fontFamily="Raleway-Bold"
          bgColor="ripple.200"
          color="white"
          size="sm"
          borderRadius="20px"
          onClick={() => handleClick(activeStep)}
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
