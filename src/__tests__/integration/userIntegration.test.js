import React from "react"
import { render, fireEvent, act, waitFor } from "@testing-library/react"
import ProfileSettings from "../../components/settings/profileSettings"

import { updateMemberPosition } from "../../models/Organisation"
import { updateUser } from "../../models/User"

jest.mock("../../models/Organisation")
jest.mock("../../models/User")

const sampleUser = {
  id: "123",
  firstName: "Test",
  lastName: "Test",
  profilePicture: "",
  signInMethod: "password",
}

const sampleOrg = {
  members: [
    {
      userID: "123",
      position: "test",
    },
  ],
}

describe("Testing profile components", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test("Edit profile", async () => {
    const { getByTestId } = render(
      <ProfileSettings
        isOpen={true}
        user={sampleUser}
        org={sampleOrg}
        setUser={() => {}}
      />
    )

    const firstName = getByTestId("firstName")
    const lastName = getByTestId("lastName")
    const position = getByTestId("position")
    const saveChangesButton = getByTestId("saveChanges")

    expect(firstName.value).toBe(sampleUser.firstName)
    expect(lastName.value).toBe(sampleUser.lastName)
    expect(position.value).toBe(sampleOrg.members[0].position)

    fireEvent.change(firstName, { target: { value: "test" } })
    fireEvent.change(lastName, { target: { value: "test" } })
    fireEvent.change(position, { target: { value: "test" } })

    expect(firstName.value).toBe("test")
    expect(lastName.value).toBe("test")
    expect(position.value).toBe("test")

    fireEvent.click(saveChangesButton)

    await waitFor(() => {
      expect(updateUser).toBeCalledTimes(1)
    })
  })

  test("Change Profile Picture shows upload box", async () => {
    const { getByTestId } = render(
      <ProfileSettings
        isOpen={true}
        user={sampleUser}
        org={sampleOrg}
        setUser={() => {}}
      />
    )

    const changePicture = getByTestId("changePicture")

    fireEvent.click(changePicture)

    await waitFor(() => {
      getByTestId("uploadBox")
    })
  })

  test("Reset password will show reset password box", async () => {
    const { getByTestId } = render(
      <ProfileSettings
        isOpen={true}
        user={sampleUser}
        org={sampleOrg}
        setUser={() => {}}
      />
    )

    const resetPasswordButton = getByTestId("resetPasswordButton")

    fireEvent.click(resetPasswordButton)

    await waitFor(() => {
      getByTestId("resetPasswordBox")
    })
  })
})
