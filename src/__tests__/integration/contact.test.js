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

describe("Integration testing for contact components", () => {
    afterEach(() => {
      jest.resetAllMocks()
    })

    test("Pressing 'Add' button will allow bring out fields for input", async() =>{
      
      const { getByTestId } = render(<ContactPopUp isOpen={true}/>) 
         
      const nameInput = getByTestId ("contactName")
      const emailInput = getByTestId ("email")
      const phoneNumberInput = getByTestId ("phoneNumber")      
      const companyInput = getByTestId ("company")
      const positionInput = getByTestId ("Position at Company")
      const memoInput = getByTestId ("memo")
      const button = getByTestId("addButton")

      expect(nameInput.value).toBe("")
      //expect(emailInput.value).toBe("")
      //expect(phoneNumberInput.value).toBe("")
      //expect(companyInput.value).toBe("")
      //expect(positionInput.value).toBe("")
      //expect(memoInput.value).toBe("")

      fireEvent.change(nameInput, { target: { value: "test" } })
      //fireEvent.change(emailInput, { target: { value: "test@test.com" } })
      //fireEvent.change(phoneNumberInput, { target: { value: "4138247503" } })
      //fireEvent.change(companyInput, { target: { value: "test" } })
      //fireEvent.change(positionInput, { target: { value: "test" } })
      //fireEvent.change(memoInput, { target: { value: "test" } })

      expect(nameInput.value).toBe("test")
      //expect(emailInput.value).toBe("test@test.com")
      //expect(phoneNumberInput.value).toBe("4138247503")
      //expect(companyInput.value).toBe("test")
      //expect(positionInput.value).toBe("test")
      //expect(memoInput.value).toBe("test")

      fireEvent.click(button)

      await waitFor(() => {
        expect(createNewContact).toBeCalledTimes(1)
      })



    })
})