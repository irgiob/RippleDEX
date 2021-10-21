import React from "react"
import Login from "../../components/auth/login"
import SignUp from "../../components/auth/signup"
import { render, fireEvent, act, waitFor } from "@testing-library/react"
import { login, signInGoogle, signup } from "../../utils/AuthFunctions"
import { navigate } from "gatsby-link"
jest.mock("../../utils/AuthFunctions")

describe("Integration testing for authenticaiton components", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  test("Testing login component with email password login", async () => {
    const { getByTestId } = render(<Login />)

    // Remember to add testid to relevant components
    const emailInput = getByTestId("email")
    const passwordInput = getByTestId("password")
    const button = getByTestId("button")

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

  test("Testing signup component", async () => {
    const { getByTestId } = render(<SignUp />)

    // Remember to add testid to relevant components
    const emailInput = getByTestId("email")
    const firstNameInput = getByTestId("firstName")
    const lastNameInput = getByTestId("lastName")
    const passwordInput = getByTestId("password")
    const passwordRetypeInput = getByTestId("password-retype")
    const button = getByTestId("button")

    expect(emailInput.value).toBe("")
    expect(passwordInput.value).toBe("")
    expect(passwordRetypeInput.value).toBe("")
    expect(firstNameInput.value).toBe("")
    expect(lastNameInput.value).toBe("")

    fireEvent.change(emailInput, { target: { value: "test@test.com" } })
    fireEvent.change(passwordInput, { target: { value: "Abcd1234" } })
    fireEvent.change(passwordRetypeInput, { target: { value: "Abcd1234" } })
    fireEvent.change(firstNameInput, { target: { value: "test" } })
    fireEvent.change(lastNameInput, { target: { value: "test" } })

    expect(emailInput.value).toBe("test@test.com")
    expect(passwordInput.value).toBe("Abcd1234")
    expect(passwordRetypeInput.value).toBe("Abcd1234")
    expect(firstNameInput.value).toBe("test")
    expect(lastNameInput.value).toBe("test")

    fireEvent.click(button)

    // As clicking the button changes internal state asynchronously, we would like to use waitFor
    await waitFor(() => {
      expect(signup).toBeCalledTimes(1)
    })
  })

  test("Testing signup component with google login", async () => {
    const component = render(<SignUp />)

    const googleSignIn = await component.getByTestId("google")

    fireEvent.click(googleSignIn)

    // As clicking the button changes internal state asynchronously, we would like to use waitFor
    await waitFor(() => {
      expect(signInGoogle).toBeCalledTimes(1)
    })
  })
})
