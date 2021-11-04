import React from "react"
import { render, fireEvent, act, waitFor, document } from "@testing-library/react"
import { Button } from "@chakra-ui/react"
import { createNewDeal } from "../../models/Deal"
import DealPopUp from "../../components/deals/dealPopup"
import Login from "../../components/auth/login"
import * as dealFunctions from "../../models/Deal"


jest.mock("../../models/Deal")

const date = new Date()
const selected= {
  id: "12345",
  forOrganization: '1234',
  name: "test",
  dealSize: 1.0,
  closeDate: date,
  recordedBy: "1234",
  contacts: "1234",
  company: "1234",
  stage: "test",
  notes: null,
}

describe("Integration testing for deal components", () => {
    afterEach(() => {
      jest.resetAllMocks()
    })

    test("Pressing 'Add' button will allow bring out fields for input", async() =>{
      dealFunctions.createNewDeal = jest.fn().mockReturnValue({})
      dealFunctions.updateDeal = jest.fn().mockReturnValue({})

      const { getByTestId } = render(
        <DealPopUp 
          selected={selected}
          setSelected={() => {}}
          companies={{}}
          members={{}}
          onUpdate={() => {}}/>)

      const dealPopupButton = getByTestId("dealOpenButton")

      fireEvent.click(dealPopupButton)
       
      const nameInput = getByTestId("Name")
      const sizeInput = getByTestId("dealSize")
      const button = getByTestId("addButton")

      expect(nameInput).toBe("")
      expect(sizeInput).toBe("")

      fireEvent.change(nameInput, { target: { value: "test" } })
      fireEvent.change(sizeInput, { target: { value: "test" } })

      expect(nameInput.value).toBe("test")
      expect(sizeInput.value).toBe("test")

      fireEvent.click(button)

      await waitFor(() => {
        expect(createNewDeal).toBeCalledTimes(1)
      })



    })
})