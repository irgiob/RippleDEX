import React, { useState, useEffect } from "react"
import { login, signInGoogle } from "../../utils/AuthFunctions"
import { navigate } from "gatsby"

import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react"

import { FcGoogle } from "react-icons/fc"

const Login = () => {
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
    const uid = await login(userEmail, userPassword)
    console.log(uid)
    if (!uid) {
      // Fail to login
      setUserEmail("")
      setUserPassword("")
      setLoading(false)
      toast({
        title: "Failed to Login",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } else {
      navigate(`/dashboard`)
      toast({
        title: "Login Success",
        description: "Welcome back!",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleGoogleSignIn = async () => {
    const uid = await signInGoogle()
    console.log(uid)
    if (uid == null) {
      // Fail to login
      setLoading(false)
      toast({
        title: "Failed to Login",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } else {
      navigate(`/dashboard`)
      toast({
        title: "Login Success",
        description: "Welcome back!",
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
              fontSize="13px"
              variant="solid"
              bgColor="white"
              color="ripple.200"
              h="1.75rem"
              size="sm"
              onClick={handleClick}
            >
              {show ? "HIDE" : "SHOW"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Box h="30px" />
        <Center>
          <Button
            bgColor="ripple.200"
            color="white"
            fontFamily="Raleway-Bold"
            borderRadius="30px"
            variant="solid"
            size="lg"
            w="1000px"
            _hover={{
              transform: "scale(1.05)",
            }}
            type="Submit"
            value="Log In"
            onClick={handleSubmit}
            isLoading={loading}
            loadingText="Logging In"
          >
            Log In
          </Button>
        </Center>
      </form>
      <Box h="20px" />
      <Center>
        <Button
          leftIcon={<FcGoogle />}
          bgColor="gray.100"
          color="gray.500"
          fontFamily="Raleway-Bold"
          borderRadius="30px"
          variant="solid"
          size="lg"
          w="1000px"
          _hover={{
            transform: "scale(1.05)",
          }}
          type="Submit"
          value="Log In"
          onClick={handleGoogleSignIn}
          loadingText="Logging In"
        >
          Sign In with Google
        </Button>
      </Center>
    </>
  )
}

export default Login
