import React, { useState, useEffect } from "react";
import { isLoggedIn, logout } from "../utils/AuthFunctions";
import { navigate } from "gatsby-link";
import Layout from "../components/layout"
import { Button } from "@chakra-ui/react";

import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import { getAuth, onAuthStateChanged } from "firebase/auth"


const Profile = () => {
    const [user, setUser] = useState(null)
    useEffect( () => {
      const auth = getAuth(firebase)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
        } else {
          navigate("/login")
        }
      })
    }, [])

    const clickHandler = () => {
        logout();
        navigate("/login");
    }
    if (!user) {
      return (<Layout><h1>Loading...</h1></Layout>)
    }

    return( 
    <Layout>
        <h1>IS LOGGED IN</h1>
        <p>hi {user?.uid} </p>
        <Button onClick={clickHandler}>Logout</Button>
    </Layout>)
  }

  export default Profile