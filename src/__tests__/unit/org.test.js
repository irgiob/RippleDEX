/**
 * This is the offline version, hence all of the functions that interacts directly
 * to firestore will be mocked. This is used temporarily
 */

import * as orgFunctions from "../../models/Organisation"

import {
  getFirestore,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  collection,
  arrayUnion,
  arrayRemove,
  query,
  getDocs,
} from "firebase/firestore"
import { async, deepCopy } from "@firebase/util"
import { update } from "@firebase/database"

jest.mock("firebase/firestore")

const sampleUserData = {
  userName: "Alice123",
  userID: "12345678",
  userEmail: "alice@test.com",
  userPhoneNumber: "0488111222",
}

const sampleOrgData = {
  admin: "sampleAdmin",
  description: "The best organization in the business!",
  members: [
    {
      position: "Supreme Leader",
      userID: "user001",
    },
    {
      position: "Boss Man",
      userID: "user002",
    },
  ],
  name: "sample organization",
  profilePicture: "",
}

const sampleInvData = {
  id: "sampleUser",
  email: "alice@test.com",
  organizationId: "sampleOrg",
  position: "test",
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

const sampleOrgDoc = {
  id: "sampleOrg",
  data: function () {
    return sampleOrgData
  },
  exists: function () {
    return true
  },
}

const sampleAdminDoc = {
  id: "sampleAdmin",
  data: function () {
    return sampleOrgData
  },
  exists: function () {
    return true
  },
}

const sampleInvDoc = {
  id: "sampleInv",
  data: function () {
    return sampleInvData
  },
  exists: function () {
    return true
  },
}

const sampleUserDocRef = {
  id: "sampleUser",
}

const sampleOrgDocRef = {
  id: "sampleOrg",
}

const sampleAdminDocRef = {
  id: "sampleAdmin",
}

const sampleInvDocRef = {
  id: "sampleInv",
}

const sampleError = "This is an error"

describe("Testing organizations functions", () => {
  beforeAll(() => {})

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Create new organizations", async () => {
    addDoc.mockResolvedValue(sampleOrgDocRef)
    getDoc.mockResolvedValue(sampleOrgDoc)
    updateDoc.mockResolvedValue()
    const data = await orgFunctions.createNewOrganization(
      sampleUserData.userID,
      "test",
      "test"
    )
    expect(data).toStrictEqual(sampleOrgDoc.id)
    expect(addDoc).toBeCalledTimes(1)
    //expect(getDoc).toBeCalledTimes(1)
    //expect(updateDoc).toBeCalledTimes(2)
    //expect(orgFunctions.addUserToOrganization).toBeCalledWith(sampleOrgDoc.id,"12345678")
  })

  it("Invite to organizations", async () => {
    addDoc.mockResolvedValue(sampleInvDocRef)
    getDoc.mockResolvedValue(sampleInvDoc)
    const id = await orgFunctions.inviteToOrganization("", "", "")
    expect(id).toBe(sampleInvDoc.id)
    expect(addDoc).toBeCalledTimes(1)
  })

  it("Get invitation from email", async () => {
    query.mockReturnValue()
    getDocs.mockReturnValue([sampleInvDoc, sampleInvDoc])
    const data = await orgFunctions.getInvitesByEmail(sampleUserData.userEmail)
    expect(data).toStrictEqual([sampleInvData, sampleInvData])
    expect(query).toBeCalledTimes(1)
    expect(getDocs).toBeCalledTimes(1)
  })

  it("Add user to organization", async () => {
    updateDoc.mockResolvedValue()
    arrayUnion.mockReturnValue()
    await orgFunctions.addUserToOrganization(
      "sampleOrg",
      "sampleUser",
      "tester"
    )
    expect(updateDoc).toBeCalledTimes(2)
    expect(arrayUnion).toBeCalledWith({
      userID: "sampleUser",
      position: "tester",
    })
    expect(arrayUnion).toBeCalledWith("sampleOrg")
  })

  it("Get organization", async () => {
    doc.mockReturnValue(sampleOrgDocRef)
    getDoc.mockResolvedValue(sampleOrgDoc)
    const data = await orgFunctions.getOrganization("sampleOrg")
    expect(data).toBe(sampleOrgData)
    expect(getDoc).toBeCalledWith(sampleOrgDocRef)
    expect(doc).toBeCalledTimes(1)
    expect(getDoc).toBeCalledTimes(1)
  })

  it("Update organization according to options ", async () => {
    doc.mockReturnValue(sampleOrgDocRef)
    getDoc.mockResolvedValue(sampleOrgDoc)
    updateDoc.mockResolvedValue()
    const org = await orgFunctions.updateOrganization(sampleOrgDoc.data.id, {})
    expect(org).toBe(sampleOrgDoc.data.id)
    expect(doc).toBeCalledTimes(1)
    expect(updateDoc).toBeCalledTimes(1)
    expect(updateDoc).toBeCalledWith(sampleOrgDocRef, {})
  })

  it("Update members in organization ", async () => {
    doc.mockReturnValue(sampleOrgDocRef)
    getDoc.mockResolvedValue(sampleOrgDoc)
    updateDoc.mockResolvedValue()
    arrayRemove.mockReturnValue()
    arrayUnion.mockReturnValue()
    const org = await orgFunctions.updateMemberPosition("sampleOrg")
    expect(org).toBe(sampleOrgData)
    expect(getDoc).toBeCalledWith(sampleOrgDocRef)
    expect(getDoc).toBeCalledTimes(1)
    expect(doc).toBeCalledTimes(3)
    expect(updateDoc).toBeCalledTimes(2)
  })
})
