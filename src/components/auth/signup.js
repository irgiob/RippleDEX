import React, { useState } from "react"
import { signup } from "../../utils/AuthFunctions"
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
  Text
} from "@chakra-ui/react"

const SignUp = () => {
  const [userFirstName, setUserFirstName] = useState("")
  const [userLastName, setUserLastName] = useState("")
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
    const uid = await signup(userFirstName, userLastName, userEmail, userPassword, null)
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
            h="200vh" w="200vw" 
            transform="translate(-40%, 25%)" 
            bg="rgba(0,0,0,0.5)"
          >
            <Box 
              bg="white" 
              borderRadius="3xl" 
              p="2em" pl="4em" 
              pr="4em" pb="0.75em" 
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
                <Image w="10em" src={CreateAccount} alignSelf="center"/>
              </Center>
            </Box>
          </Center>
        )
      })
    }
  }

  return (
    <>
      <form method="post">
        <Input
          variant="outline"
          placeholder="First Name"
          type="text"
          name="firstName"
          onChange={event => setUserFirstName(event.target.value)}
        />
        <Box h="20px" />
        <Input
          variant="outline"
          placeholder="Last Name"
          type="text"
          name="lastName"
          onChange={event => setUserLastName(event.target.value)}
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
