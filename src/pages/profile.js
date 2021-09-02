import React, { useState, useEffect } from "react";
import { isLoggedIn, logout } from "../utils/AuthFunctions";
import { navigate } from "gatsby-link";
import Layout from "../components/layout"
import { Button } from "@chakra-ui/react";

import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import { getAuth } from "firebase/auth"


const Profile = () => {
    const [user, setUser] = useState(null)
    useEffect( () => {
      if (!user) {
         getUser()
      }
    })

    async function getUser() {
        const loggedUser = await isLoggedIn()
        console.log(loggedUser)
        if ( loggedUser == null ) {
          navigate("/login")
          return null
        }
        setUser(loggedUser) 
    }

    const clickHandler = () => {
        logout();
        navigate("/login");
    }

    return( 
    <Layout>
        <h1>IS LOGGED IN</h1>
        <p>hi {user?.uid} </p>
        <Button onClick={clickHandler}>Logout</Button>
    </Layout>)
  }

  export default Profile