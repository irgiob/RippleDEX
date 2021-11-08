import React from "react"
import * as contactFunctions from "../../models/Contact"
import { render, fireEvent, act, waitFor } from "@testing-library/react"
import { Button } from "@chakra-ui/react"
import { createNewContact } from "../../models/Contact"
import ContactPopUp from "../../components/contacts/contactPopup"
import Login from "../../components/auth/login"

jest.mock("../../models/Contact")
jest.mock("../../utils/AuthFunctions")
//jest.mock("../../components/contacts/contactPopup")

const selected = {
  id: "12345",
  name: "alice",
  email: "test@test.com",
  phoneNumber: "213456789",
  position: "test",
  profilePicture: "",
  notes: "",
}

describe("Integration testing for contact components", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test("Pressing 'Add' button will allow bring out fields for input", async () => {
    contactFunctions.updateContact = jest.fn().mockReturnValue({})
    const { getByTestId } = render(
      <ContactPopUp
        selected={selected}
        setSelected={() => {}}
        companies={[]}
        onUpdate={() => {}}
      />
    )

    const contactPopupButton = getByTestId("contactOpenButton")

    fireEvent.click(contactPopupButton)

    const nameInput = getByTestId("contactName")
    const emailInput = getByTestId("email")
    const phoneNumberInput = getByTestId("phoneNumber")
    const positionInput = getByTestId("Position at Company")
    const memoInput = getByTestId("memo")
    const button = getByTestId("addButton")

    expect(nameInput.value).toBe("alice")
    expect(emailInput.value).toBe("test@test.com")
    expect(phoneNumberInput.value).toBe(selected.phoneNumber)
    expect(positionInput.value).toBe(selected.position)
    expect(memoInput.value).toBe(selected.notes)

    fireEvent.change(nameInput, { target: { value: "test" } })
    fireEvent.change(emailInput, { target: { value: "test@test.com" } })
    fireEvent.change(phoneNumberInput, { target: { value: "4138247503" } })
    fireEvent.change(positionInput, { target: { value: "test" } })
    fireEvent.change(memoInput, { target: { value: "test" } })

    expect(nameInput.value).toBe("test")
    expect(emailInput.value).toBe("test@test.com")
    expect(phoneNumberInput.value).toBe("4138247503")
    expect(positionInput.value).toBe("test")
    expect(memoInput.value).toBe("test")

    fireEvent.click(button)

    await waitFor(() => {
      expect(contactFunctions.updateContact).toBeCalledTimes(1)
    })
  })
})
