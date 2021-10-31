import React from "react"
import { render, fireEvent, act, waitFor } from "@testing-library/react"
import { login, signInGoogle, signup } from "../../utils/AuthFunctions"
import {
  createNewOrganization,
  inviteToOrganization,
} from "../../models/Organisation"
import CreateOrgPopup from "../../components/orgPopups/createOrg"
jest.mock("../../utils/AuthFunctions")
jest.mock("../../models/Organisation")

describe("Testing organization components", () => {
  test("Create new organization", async () => {
    const { getByTestId } = render(<CreateOrgPopup isOpen={true} />)

    const orgName = getByTestId("orgName")
    const orgDesc = getByTestId("orgDesc")
    const createButton = getByTestId("createButton")

    expect(orgName.value).toBe("")
    expect(orgDesc.value).toBe("")
    expect(createButton.value).toBe("Create Organization")

    fireEvent.change(orgName, { target: { value: "test" } })
    fireEvent.change(orgDesc, { target: { value: "test" } })

    expect(orgName.value).toBe("test")
    expect(orgDesc.value).toBe("test")

    fireEvent.click(createButton)

    await waitFor(() => {
      expect(createNewOrganization).toBeCalledTimes(1)
    })
  })
})
