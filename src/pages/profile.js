import React, { useState, useEffect } from "react"
import { onAuthLoad, logout } from "../utils/AuthFunctions"
import { getUser } from "../models/User"
import { navigate } from "gatsby-link"
import Layout from "../components/layout"
import { Button } from "@chakra-ui/react"


const Profile = (props) => {
    const [user, setUser] = useState(null)

    useEffect( () => {
      onAuthLoad((loggedUser) => {
        console.log(loggedUser.uid)
        getUser(loggedUser.uid).then((userData) => setUser(userData))
      }, () => navigate("/"))
    }, [])

    const clickHandler = () => {
        logout();
        navigate("/");
    }

    if (!user) {
      return (<Layout location={props.location}><h1>Loading...</h1></Layout>)
    }

    return( 
      <Layout location={props.location}>
          <h1>IS LOGGED IN</h1>
          <p>hi {user.name} </p>
          <Button onClick={clickHandler}>Logout</Button>
      </Layout>
    )
  }

  export default Profile