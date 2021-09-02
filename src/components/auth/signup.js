import React, { useState, useEffect } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap";
import { signup, isLoggedIn } from "../../utils/AuthFunctions"
import { navigate } from "gatsby"

import firebase from "../../../plugins/gatsby-plugin-firebase-custom"
import { getAuth, onAuthStateChanged } from "firebase/auth"

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"

const SignUp = () => {
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const [show, setShow] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const handleClick = () => setShow(!show)
  const handleLoad = () => setLoading(true)

  useEffect(() => {
    const auth = getAuth(firebase)
    onAuthStateChanged(auth, user => {
      if (user) {
        navigate("/profile")
      }
    })
  }, [])

  const handleSubmit = async event => {
    handleLoad()
    event.preventDefault()
    const uid = await signup(userName, userEmail, userPassword, null)
    if (uid == null) {
      // Fail to signup
      navigate(`/login`)
    } else {
      navigate(`/profile`)
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
          <InputRightElement w="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Box h="80px" />
        <Button
          bgColor="ripple.200"
          color="white"
          fontFamily="Raleway-Bold"
          borderRadius="30px"
          variant="solid"
          size="lg"
          _hover={{
            bgColor: "white",
            color: "ripple.200",
            transform: "scale(1.05)",
            boxShadow:
              "rgba(22, 138, 168, 1) 5px 5px, rgba(22, 138, 168, 0.6) 10px 10px, rgba(22, 138, 168, 0.3) 15px 15px",
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
