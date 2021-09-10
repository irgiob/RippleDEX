import React, { useState, useEffect } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap";
import { signup } from "../../utils/AuthFunctions"
import { navigate } from "gatsby"

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react"

import { MdError } from "react-icons/md"

const SignUp = () => {
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const [show, setShow] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleClick = () => setShow(!show)
  const handleLoad = () => setLoading(true)

  const toast = useToast()

  const handleSubmit = async event => {
    handleLoad()
    event.preventDefault()
    const uid = await signup(userName, userEmail, userPassword, null)
    if (uid == null) {
      // Fail to signup
      setLoading(false)
      toast({
        title: "Failed to create an account",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } else {
      navigate(`/dashboard`)
      toast({
        title: "Account created",
        description: "Welcome to RippleDEX!",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <form method="post">
        <Input
          variant="outline"
          placeholder="Full Name"
          type="text"
          name="name"
          onChange={event => setUserName(event.target.value)}
        />
        <Box h="20px" />
        <Input
          variant="outline"
          placeholder="Email Address"
          type="text"
          name="email"
          onChange={event => setUserEmail(event.target.value)}
        />
        <Box h="20px" />
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            name="password"
            placeholder="Enter a Password"
            onChange={event => setUserPassword(event.target.value)}
          />
          <Box h="20px" />
          <InputRightElement w="5rem">
            <Button
              fontFamily="Nunito-Bold"
              variant="solid"
              bgColor="white"
              fontSize="13px"
              color="ripple.200"
              h="1.75rem"
              size="sm"
              onClick={handleClick}
            >
              {show ? "HIDE" : "SHOW"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Box h="40px" />
        <Button
          className="here"
          bgColor="ripple.200"
          color="white"
          fontFamily="Raleway-Bold"
          borderRadius="30px"
          variant="solid"
          size="lg"
          _hover={{
            transform: "scale(1.05)",
          }}
          type="Submit"
          value="Sign Up"
          onClick={handleSubmit}
          isLoading={loading}
          loadingText="Submitting"
        >
          Sign Up
        </Button>
      </form>
    </>
  )
}

export default SignUp
