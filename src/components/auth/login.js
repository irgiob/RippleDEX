import React, { useState, useEffect } from "react";
import { login, isLoggedIn, signInGoogle } from "../../utils/AuthFunctions";
import { navigate } from "gatsby"
import { Button } from "@chakra-ui/react";

import firebase from "../../../plugins/gatsby-plugin-firebase-custom"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const Login = () => {
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
        const uid = await login(userEmail, userPassword);
        console.log(uid);
        if (!uid){
          // Fail to login
          setUserEmail('')
          setUserPassword('')
          navigate(`/login`)
        }
        else {
          navigate(`/profile`)
        }
        
    }

    const handleGoogleSignIn = async () => {
      const uid = await signInGoogle()
      console.log(uid);
      if ( uid == null ){
        // Fail to login
        navigate(`/login`)
      }
      else {
        navigate(`profile`)
      }
    }

    return (
      <>
        <h1>Log in</h1>
        <form
          method="post"
          onSubmit={event => {
            handleSubmit(event)
          }}
        >
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
          <input type="submit" value="Log In" />
        </form>
        <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
      </>
    )
}

export default Login;