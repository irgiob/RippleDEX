import React, { useState } from "react"
import { signup, signInGoogle } from "../../utils/AuthFunctions"
import { navigate } from "gatsby"

import CreateAccount from "../../images/PopUps/CreateAccount.png"

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Image,
  Center,
  Text,
  VStack,
} from "@chakra-ui/react"

import { FcGoogle } from "react-icons/fc"

const SignUp = () => {
  const [userFirstName, setUserFirstName] = useState("")
  const [userLastName, setUserLastName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [passwordCheck, setPasswordCheck] = useState("")

  const [show, setShow] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleClick = () => setShow(!show)
  const handleLoad = () => setLoading(true)

  const toast = useToast()

  const checkPassword = password =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)

  const handleSubmit = async event => {
    handleLoad()
    event.preventDefault()
    const uid = await signup(
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
      null
    )
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
        duration: 3000,
        render: () => (
          <Center
            h="200vh"
            w="200vw"
            transform="translate(-40%, 25%)"
            bg="rgba(0,0,0,0.5)"
          >
            <Box
              bg="white"
              borderRadius="3xl"
              p="2em"
              pl="4em"
              pr="4em"
              pb="0.75em"
              textAlign="center"
            >
              <Text
                mb="-1em"
                w="10em"
                fontFamily="Nunito-Bold"
                fontSize="1.5rem"
                color="ripple.200"
              >
                Account Successfully Created!
              </Text>
              <Center>
                <Image w="10em" src={CreateAccount} alignSelf="center" />
              </Center>
            </Box>
          </Center>
        ),
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
    <VStack spacing="20px">
      <Input
        variant="outline"
        placeholder="First Name"
        type="text"
        name="firstName"
        onChange={event => setUserFirstName(event.target.value)}
      />
      <Input
        variant="outline"
        placeholder="Last Name"
        type="text"
        name="lastName"
        onChange={event => setUserLastName(event.target.value)}
      />
      <Input
        variant="outline"
        placeholder="Email Address"
        type="text"
        name="email"
        onChange={event => setUserEmail(event.target.value)}
      />
      <Box w="100%">
        <InputGroup>
          <Input
            isInvalid={!checkPassword(userPassword)}
            type={show ? "text" : "password"}
            name="password"
            placeholder="Enter a Password"
            onChange={event => setUserPassword(event.target.value)}
          />
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
        {!checkPassword(userPassword) && (
          <Text color="red" fontSize="0.6rem" mt="10px" mb="-10px">
            Password must contain at least 8 characters, 1 uppercase and
            lowercase letter, and 1 number
          </Text>
        )}
      </Box>
      <InputGroup>
        <Input
          isInvalid={passwordCheck !== userPassword}
          type={show ? "text" : "password"}
          name="passwordCheck"
          placeholder="Retype Password"
          onChange={event => setPasswordCheck(event.target.value)}
        />
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
      <Button
        bgColor="ripple.200"
        color="white"
        w="100%"
        fontFamily="Raleway-Bold"
        borderRadius="30px"
        variant="solid"
        size="lg"
        _hover={{ transform: "scale(1.05)" }}
        disabled={
          !(
            userFirstName &&
            userLastName &&
            userEmail &&
            checkPassword(userPassword) &&
            userPassword === passwordCheck
          )
        }
        type="Submit"
        value="Sign Up"
        onClick={handleSubmit}
        isLoading={loading}
        loadingText="Submitting"
      >
        Sign Up
      </Button>
      <Text fontFamily="Raleway-Bold" color="ripple.200">
        ─────────── OR ───────────
      </Text>
      <Button
        leftIcon={<FcGoogle />}
        bgColor="gray.100"
        color="gray.500"
        w="100%"
        fontFamily="Raleway-Bold"
        borderRadius="30px"
        variant="solid"
        size="lg"
        _hover={{
          transform: "scale(1.05)",
        }}
        type="Submit"
        value="Log In"
        onClick={handleGoogleSignIn}
        loadingText="Logging In"
      >
        Sign Up with Google
      </Button>
    </VStack>
  )
}

export default SignUp
