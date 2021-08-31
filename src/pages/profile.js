import React from "react";
import { isLoggedIn, logout } from "../utils/AuthFunctions";
import { navigate } from "gatsby-link";
import Layout from "../components/layout"
import { Button } from "@chakra-ui/react";


const Profile = () => {

    const user = isLoggedIn()
    if ( user == null ) {
      navigate("/login")
      return null
    }

    const clickHandler = () => {
        logout();
        navigate("/login");
    }

    return( 
    <Layout>
        <h1>IS LOGGED IN</h1>
        <p>hi {user.uid} </p>
        <Button onClick={clickHandler}>Logout</Button>
    </Layout>)
  }

  export default Profile