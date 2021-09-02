import React from "react";
import { login, isLoggedIn, signInGoogle } from "../../utils/AuthFunctions";
import { navigate } from "gatsby"
import { Button } from "@chakra-ui/react";

class Login extends React.Component {

    state = {
        email: ``,
        password: ``
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const uid = await login(this.state.email, this.state.password);
        console.log(uid);
        if (!uid){
          // Fail to login
          this.state = { email:``, password:``}
          navigate(`/login`)
        }
        else {
          navigate(`/profile`)
        }
        
    }

    handleUpdate = event => {
      this.setState({
        [event.target.name]: event.target.value,
      })
    }

    handleGoogleSignIn = async () => {
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

    render() {
      if (isLoggedIn()) {
        navigate(`/profile`)
      }
      return (
        <>
          <h1>Log in</h1>
          <form
            method="post"
            onSubmit={event => {
              this.handleSubmit(event)
            }}
          >
            <label>
              Email
              <input type="text" name="email" onChange={this.handleUpdate} />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                onChange={this.handleUpdate}
              />
            </label>
            <input type="submit" value="Log In" />
          </form>
          <Button onClick={this.handleGoogleSignIn}>Sign in with Google</Button>
        </>
      )
    }
}

export default Login;