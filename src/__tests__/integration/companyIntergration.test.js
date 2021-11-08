import React from "react"
import {
  render,
  fireEvent,
  act,
  waitFor,
  document,
} from "@testing-library/react"
import CompanyPopUp from "../../components/companies/companyPopup"
import * as companyFunctions from "../../models/Company"

jest.mock("../../models/Company")

const selected = {
  id: "12345",
  name: "name",
  registeredBy: "orgID",
  description: "companyDesc",
  website: "companyWeb",
  personnel: 5,
  industry: "something",
  annualRevenue: 20,
  address: "companyAddress",
  relationship: "relationship",
  primaryContact: "primaryContact",
}

const sampleContact = [
  {
    registeredBy: "sampleOrg",
    name: "sample contact",
    company: "12345",
    email: "contactEmail",
    phoneNumber: "1234567",
    position: null,
    notes: null,
  },
]

const sampleCompany = [
  {
    registeredBy: "orgID",
    name: "companyName",
    description: "companyDesc",
    website: "companyWeb",
    personnel: "personnel",
    annualRevenue: "annualRevenue",
    address: "companyAddress",
    relationship: "relationship",
    primaryContact: "primaryContact",
  },
]

describe("Integration testing for company components", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test("Pressing 'Add' button will allow bring out fields for input", async () => {
    companyFunctions.updateCompany = jest.fn().mockReturnValue({})

    const { getByTestId } = render(
      <CompanyPopUp
        selected={selected}
        setSelected={() => {}}
        companies={[]}
        members={[]}
        deals={[]}
        contacts={sampleContact}
        orgID={"orgID"}
        afterUpdate={() => {}}
        onUpdate={() => {}}
      />
    )

    const PopupButton = getByTestId("openButton")

    fireEvent.click(PopupButton)

    const nameInput = getByTestId("name")
    const revenueInput = getByTestId("Annual Revenue")
    const personnelInput = getByTestId("Personnel")
    const industryInput = getByTestId("industry")
    const relationshipInput = getByTestId("relationship")
    const webInput = getByTestId("web")
    const addButton = getByTestId("addButton")

    expect(nameInput.value).toBe("name")
    expect(revenueInput.value).toBe("$20")
    expect(personnelInput.value).toBe("5")
    expect(industryInput.value).toBe("something")
    expect(relationshipInput.value).toBe("relationship")
    expect(webInput.value).toBe("companyWeb")

    fireEvent.change(nameInput, { target: { value: "test" } })
    fireEvent.change(revenueInput, { target: { value: 0.0 } })
    fireEvent.change(personnelInput, { target: { value: 10 } })

    fireEvent.change(industryInput, { target: { value: "test" } })
    fireEvent.change(relationshipInput, { target: { value: "test" } })
    fireEvent.change(webInput, { target: { value: "test" } })

    expect(nameInput.value).toBe("test")
    expect(revenueInput.value).toBe("$0")
    expect(personnelInput.value).toBe("10")

    expect(industryInput.value).toBe("test")
    expect(relationshipInput.value).toBe("test")
    expect(webInput.value).toBe("test")

    fireEvent.click(addButton)

    await waitFor(() => {
      expect(companyFunctions.updateCompany).toBeCalledTimes(1)
    })
  })
})
