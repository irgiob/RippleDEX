import React from "react"
import Login from "../../components/auth/login"
import SignUp from "../../components/auth/signup"
import { render, fireEvent, act, waitFor } from "@testing-library/react"
import { login, signInGoogle } from "../../utils/AuthFunctions"
import { navigate } from "gatsby-link"
jest.mock("../../utils/AuthFunctions")

describe("Integration testing for authenticaiton components", () => {
  test("Testing login component with email password login", async () => {
    const component = render(<Login />)

    // Remember to add testid to relevant components
    const emailInput = await component.getByTestId("email")
    const passwordInput = await component.getByTestId("password")
    const button = await component.getByTestId("button")

    expect(emailInput.value).toBe("")
    expect(passwordInput.value).toBe("")

    fireEvent.change(emailInput, { target: { value: "test@test.com" } })
    fireEvent.change(passwordInput, { target: { value: "Abcd1234" } })

    expect(emailInput.value).toBe("test@test.com")
    expect(passwordInput.value).toBe("Abcd1234")

    fireEvent.click(button)

    // As clicking the button changes internal state asynchronously, we would like to use waitFor
    await waitFor(() => {
      expect(login).toBeCalledTimes(1)
    })
  })

  test("Testing login component with google login", async () => {
    const component = render(<Login />)

    const googleSignIn = await component.getByTestId("google")

    fireEvent.click(googleSignIn)

    // As clicking the button changes internal state asynchronously, we would like to use waitFor
    await waitFor(() => {
      expect(signInGoogle).toBeCalledTimes(1)
    })
  })

  // test("Testing signup component", () => {
  //   const component = render(<SignUp />)
  //   const emailInput = component.getByPlaceholderText("Email Address")
  //   const firstName = component.getByPlaceholderText("First Name")

  //   // console.log(emailInput)
  //   expect(emailInput.textContent).toBe("")
  // })
})
