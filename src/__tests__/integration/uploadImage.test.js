import React from "react"
import { render, fireEvent, act, waitFor } from "@testing-library/react"
import UploadImageButton from "../../components/uploadImageButton"
import * as uploadFunctions from "../../utils/FirebaseStorageFunctions"
import "@testing-library/jest-dom"

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

describe("Testing upload image", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test("Upload field available on render", async () => {
    const { getByTestId } = render(<UploadImageButton />)
    uploadFunctions.uploadFile = jest.fn()

    const changePicture = getByTestId("changePicture")

    fireEvent.click(changePicture)

    const uploadBox = getByTestId("uploadBox")

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/jpeg" })

    await waitFor(() => {
      fireEvent.change(uploadBox, { target: { files: [file] } })
    })
  })
})
