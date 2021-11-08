import React from "react"
import {
  render,
  fireEvent,
  act,
  waitFor,
  document,
} from "@testing-library/react"
import { Button } from "@chakra-ui/react"
import { createNewDeal } from "../../models/Deal"
import DealPopUp from "../../components/deals/dealPopup"
import Login from "../../components/auth/login"
import * as dealFunctions from "../../models/Deal"
import { Timestamp } from "firebase/firestore"

jest.mock("../../models/Deal")

const date = new Date()
const selected = {
  id: "12345",
  forOrganizaiton: "orgID",
  name: "dealName",
  description: "dealDesc",
  dealSize: "10.0",
  closeDate: {
    toDate: function () {
      return date
    },
  },
  recordedBy: "userID",
  contacts: [],
  stage: "stage",
  notes: "dealNote",
}

describe("Integration testing for deal components", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test("Pressing 'Add' button will allow bring out fields for input", async () => {
    dealFunctions.updateDeal = jest.fn().mockReturnValue({})

    const { getByTestId } = render(
      <DealPopUp
        selected={selected}
        setSelected={() => {}}
        companies={[]}
        members={[]}
        onUpdate={() => {}}
      />
    )

    const dealPopupButton = getByTestId("dealOpenButton")

    fireEvent.click(dealPopupButton)

    const nameInput = getByTestId("name")
    const sizeInput = getByTestId("dealSizeField")
    const button = getByTestId("addButton")

    expect(nameInput.value).toBe("dealName")
    expect(sizeInput.value).toBe("$10.0")

    fireEvent.change(nameInput, { target: { value: "test" } })
    fireEvent.change(sizeInput, { target: { value: 20 } })

    expect(nameInput.value).toBe("test")
    expect(sizeInput.value).toBe("$20")

    fireEvent.click(button)

    await waitFor(() => {
      expect(dealFunctions.updateDeal).toBeCalledTimes(1)
    })
  })
})
