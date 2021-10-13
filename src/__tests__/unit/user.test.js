/**
 * This is the offline version, hence all of the functions that interacts directly
 * to firestore will be mocked. This is used temporarily
 */

import * as userFunctions from "../../models/User"

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore"

jest.mock("firebase/firestore")

const sampleUserData = {
  firstName: "Alice",
  lastName: "Test",
  email: "alice@test.com",
  phoneNumber: ["Mobile", "0488111222"],
  organizations: [],
  lastOpenedOrganization: null,
  profilePicture: null,
  lastOnline: Timestamp.now(),
  notificationMode: "000",
  isInvisible: false,
}
const sampleUserDocRef = {
  id: "sampleUser",
}

const sampleUserDoc = {
  id: "sampleUser",
  data: function () {
    return sampleUserData
  },
  exists: function () {
    return true
  },
}

const sampleError = "This is an error"

const options = {}

describe("Ensure all packets are installed properly for test", () => {
  it("Test to make sure everything is working", () => {
    expect(10 + 10).toBe(20)
  })
})

describe("Testing user functions", () => {
  beforeEach(() => {
    setDoc.mockResolvedValue()
    doc.mockReturnValue(sampleUserDocRef)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Account is created in database", async () => {
    getDoc.mockResolvedValue(sampleUserDoc)
    Timestamp.now.mockReturnValue("")
    const returnValue = await userFunctions.createNewUser(
      sampleUserData.firstName,
      sampleUserData.lastName,
      sampleUserDoc.id,
      sampleUserData.email,
      sampleUserData.phoneNumber,
      sampleUserData.profilePicture
    )
    expect(returnValue).toStrictEqual(sampleUserDoc.id)
    expect(setDoc).toBeCalledTimes(1)
    expect(setDoc).toBeCalledWith(sampleUserDocRef, {
      firstName: sampleUserData.firstName,
      lastName: sampleUserData.lastName,
      email: sampleUserData.email,
      phoneNumber: sampleUserData.phoneNumber,
      organizations: [],
      lastOpenedOrganization: null,
      profilePicture: null,
      lastOnline: "",
      isInvisible: false,
    })
  })

  it("Check if user exists", async () => {
    getDoc.mockResolvedValue(sampleUserDoc)
    const returnValue = await userFunctions.doesUserExist(sampleUserDoc.id)
    expect(getDoc).toBeCalledTimes(1)
    expect(returnValue).toBe(true)
  })

  it(" Update existing document", async () => {
    getDoc.mockResolvedValue(sampleUserDoc)
    updateDoc.mockResolvedValue()
    const returnValue = await userFunctions.updateUser(
      sampleUserDoc.data.userID,
      options
    )
    // One for updating actual document, the other one for updating last online
    expect(updateDoc).toBeCalledTimes(1)
    expect(returnValue).toBe(sampleUserDoc.data.userID)
    expect(updateDoc).toBeCalledWith(sampleUserDocRef, options)
  })

  it(" Retrieve user ", async () => {
    updateDoc.mockResolvedValue()
    Timestamp.now.mockReturnValue("")
    getDoc.mockResolvedValue(sampleUserDoc)
    const returnedValue = await userFunctions.getUser("sampleUser", true)
    const returnedData = sampleUserData
    returnedData.id = sampleUserData.id
    expect(returnedValue).toBe(returnedData)
    expect(updateDoc).toBeCalledTimes(1)
    expect(getDoc).toBeCalledTimes(1)
    expect(updateDoc).toBeCalledWith(sampleUserDocRef, { lastOnline: "" })
  })
})
