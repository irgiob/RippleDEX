import React, { useState, useEffect } from "react";
// import { Form, Button, Card, Alert } from "react-bootstrap";
import { signup, isLoggedIn } from "../../utils/AuthFunctions";
import { navigate } from "gatsby"

import firebase from "../../../plugins/gatsby-plugin-firebase-custom"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const SignUp = () => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    useEffect( () => {
      const auth = getAuth(firebase)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/profile")
        } 
      })
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const uid = await signup(userName, userEmail, userPassword, null)
        if ( uid == null ){
            // Fail to signup
            navigate(`/login`)
          }
        else {
          navigate(`/profile`)
        }
    }

    return (
      <>
        <h1>Sign Up</h1>
        <form
          method="post"
          onSubmit={event => {
            handleSubmit(event)
          }}
        >
          <label>
            Name
            <input type="text" name="name" onChange={(event) => setUserName(event.target.value)} />
          </label>
          <label>
            Email
            <input type="text" name="email" onChange={(event) => setUserEmail(event.target.value)} />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              onChange={(event) => setUserPassword(event.target.value)}
            />
          </label>
          <input type="submit" value="Sign Up" />
        </form>
      </>
    )
}

export default SignUp;