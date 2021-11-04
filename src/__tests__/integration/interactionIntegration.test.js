import React from "react"
import * as interFunctions from "../../models/Interaction"
import { render, fireEvent, act, waitFor } from "@testing-library/react"
import { Button } from "@chakra-ui/react"
import InteractionPopUp from "../../components/interactions/interactionPopup"
import Login from "../../components/auth/login"

jest.mock("../../models/Interaction")
jest.mock("../../models/Contact")

const selected = {
  id: "12345",
  contact: "1234",
  addedBy: "12345",
  forDeal: "1111",
  forTask: "2222",
  forOrganization: "3333",
  meetingStart: null,
  meetingEnd: null,
  meetingType: "test",
  notes: "test", // Or create structure so people can add comments?
  name: "test",
  remindMe: false,
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
        companies={{}}
        afterUpdate={() => {}}
        contacts={sampleContact}
        tasks={{}}
        deals={{}}
        members={{}}
      />
    )

    const PopupButton = getByTestId("interactionOpenButton")

    fireEvent.click(PopupButton)

    const nameInput = getByTestId("tName")
    const typeInput = getByTestId("type")
    const timeInput = getByTestId("time")
    const button = getByTestId("addButton")

    expect(nameInput.value).toBe("Test")
    expect(typeInput.value).toBe("")
    expect(timeInput.value).toBe("")

    fireEvent.change(nameInput, { target: { value: "test" } })
    fireEvent.change(typeInput, { target: { value: "test" } })
    fireEvent.change(timeInput, { target: { value: "413" } })

    expect(nameInput.value).toBe("test")
    expect(typeInput.value).toBe("test")
    expect(time.value).toBe("413")

    fireEvent.click(button)

    await waitFor(() => {
      expect(interFunctions.updateInteraction).toBeCalledTimes(1)
    })
  })
})