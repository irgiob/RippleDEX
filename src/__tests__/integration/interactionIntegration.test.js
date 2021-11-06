import React from "react"
import * as interFunctions from "../../models/Interaction"
import { render, fireEvent, act, waitFor } from "@testing-library/react"
import { Button } from "@chakra-ui/react"
import InteractionPopUp from "../../components/interactions/interactionPopup"
import Login from "../../components/auth/login"

jest.mock("../../models/Interaction")
jest.mock("../../models/Contact")


const selected= {
  id: "12345",
  registeredBy: "1234",
  name: "companyName",
  description: null,
  website: "companyWeb",
  personnel: null,
  annualRevenue: 100.0,
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

  const companyList =[
    {
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
  ]


describe("Integration testing for interaction components", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test("Pressing 'Add' button will allow bring out fields for input", async () => {
    interFunctions.updateInteraction = jest.fn().mockReturnValue({})
    const { getByTestId } = render(
      <InteractionPopUp
        selected={selected}
        setSelected={() => {}}
        companies={companyList}
        afterUpdate={() => {}}
        contacts={sampleContact}
        tasks={{}}
        deals={{}}
        members={{}}
      />
    )

    const PopupButton = getByTestId("interactionOpenButton")

    fireEvent.click(PopupButton)

    const nameInput = getByTestId("Name")
    const typeInput = getByTestId("type")
    const timeInput = getByTestId("time")
    const button = getByTestId("addButton")

    expect(nameInput.value).toBe("companyName")
    expect(typeInput.value).toBe("")
    expect(timeInput.value).toBe("")

    fireEvent.change(nameInput, { target: { value: "test" } })
    fireEvent.change(typeInput, { target: { value: "test" } })
    fireEvent.change(timeInput, { target: { value: "413" } })

    expect(nameInput.value).toBe("test")
    expect(typeInput.value).toBe("test")
    expect(timeInput.value).toBe("413")

    fireEvent.click(button)

    await waitFor(() => {
      expect(interFunctions.updateInteraction).toBeCalledTimes(1)
    })
  })
})