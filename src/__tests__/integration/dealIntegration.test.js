import React from "react"
import { render, fireEvent, act, waitFor, document } from "@testing-library/react"
import { Button } from "@chakra-ui/react"
import { createNewDeal } from "../../models/Deal"
import DealPopUp from "../../components/deals/dealPopup"
import Login from "../../components/auth/login"


jest.mock("../../models/Deal")

describe("Integration testing for contact components", () => {
    afterEach(() => {
      jest.resetAllMocks()
    })

    test("Pressing 'Add' button will allow bring out fields for input", async() =>{
      
      const { getByTestId } = render(<DealPopUp isOpen={true}/>)
      //const { queryByTestId } = render(<DealPopUp isOpen={true}/>)
       
      const nameInput = getByTestId("Name")
      const sizeInput = getByTestId("dealSize")
      const button = getByTestId("addButton")

      expect(nameInput).toBe(null)
      expect(sizeInput).toBe(null)

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