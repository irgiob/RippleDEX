import React from "react"
import { render, fireEvent, act, waitFor, document } from "@testing-library/react"
import CompanyPopUp from "../../components/companies/companyPopup"
import * as companyFunctions from "../../models/Company"


jest.mock("../../models/Company")


const selected= {
  id: "12345",
  registeredBy: "1234",
  name: "companyName",
  description: null,
  website: "companyWeb",
  personnel: null,
  annualRevenue: 0.0,
  address: null,
  relationship: null,
  primaryContact: "1234",
  industry: "industry",
  profilePicture: null,
}

const sampleContact = {
    registeredBy: "sampleOrg",
    name: "sample contact",
    company: "12345",
    email: "contactEmail",
    phoneNumber: "1234567",
    position: null,
    notes: null,
  }

describe("Integration testing for company components", () => {
    afterEach(() => {
      jest.resetAllMocks()
    })

    test("Pressing 'Add' button will allow bring out fields for input", async() =>{
    
      companyFunctions.updateCompany = jest.fn().mockReturnValue({})

      const { getByTestId } = render(
        <CompanyPopUp 
          selected={selected}
          setSelected={() => {}}
          companies={{}}
          members={{}}
          deals={{}}
          contacts={{}}
          orgID={{}}
          afterUpdate={() => {}}/>)

      const PopupButton = getByTestId("OpenButton")

      fireEvent.click(PopupButton)
       
      const nameInput = getByTestId("name")
      const revenueInput = getByTestId("Annual Revenue")
      const personnelInput = getByTestId("Personne")
      const industryInput = getByTestId("industry")
      const relationshipInput = getByTestId("relationship")
      const contactInput = getByTestId("primary contact")
      const webInput = getByTestId("web")
      const addButton = getByTestId("addButton")

      expect(nameInput.value).toBe("")
      expect(revenueInput.value).toBe("")
      expect(personnelInput.value).toBe("")
      expect(industryInput.value).toBe("")
      expect(relationshipInput.value).toBe("")
      expect(contactInput.value).toBe("")
      expect(webInput.value).toBe("")


      fireEvent.change(nameInput, { target: { value: "test" } })
      fireEvent.change(revenueInput, { target: { value: 0.0 } })
      fireEvent.change(personnelInput, { target: { value: "test" } })
      fireEvent.change(industryInput, { target: { value: "test" } })
      fireEvent.change(relationshipInput, { target: { value: "test" } })
      fireEvent.change(contactInput, { target: { value: "test" } })
      fireEvent.change(webInput, { target: { value: "test" } })

      expect(nameInput.value).toBe("test")
      expect(revenueInput.value).toBe(0.0)
      expect(personnelInput.value).toBe("test")
      expect(industryInput.value).toBe("test")
      expect(relationshipInput.value).toBe("test")
      expect(contactInput.value).toBe("test")
      expect(webInput.value).toBe("test")

      fireEvent.click(addButton)

      await waitFor(() => {
        expect(companyFunctions.updateCompany).toBeCalledTimes(1)
      })



    })
})