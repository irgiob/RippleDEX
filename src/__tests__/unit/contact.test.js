/**
 * This is the offline version, hence all of the functions that interacts directly
 * to firestore will be mocked. This is used temporarily
 */

import * as contactFunctions from "../../models/Contact"
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  addDoc,
} from "firebase/firestore"

jest.mock("firebase/firestore")

const sampleContactData = {
  registeredBy: "sampleOrg",
  name: "sample contact",
  company: "company ID",
  email: "contactEmail",
  phoneNumber: "1234567",
  position: null,
  notes: null,
}

const sampleContactDocRef = {
  id: "sampleContact",
}

const sampleContactDoc = {
  id: "sampleContact",
  data: function () {
    return sampleContactData
  },
  exists: function () {
    return true
  },
}

const sampleError = "This is an error"

describe("Ensure all packets are installed properly for test", () => {
  it("Test to make sure everything is working", () => {
    expect(10 + 10).toBe(20)
  })
})

describe("Testing contact functions", () => {
  beforeEach(() => {
    //setDoc.mockResolvedValue()
    //doc.mockReturnValue(sampleUserDocRef)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Create new contact", async () => {
    getDoc.mockResolvedValue(sampleContactDoc)
    addDoc.mockResolvedValue(sampleContactDocRef)
    const returnValue = await contactFunctions.createNewContact(
      sampleContactData.registeredBy,
      sampleContactData.name,
      sampleContactData.company,
      sampleContactData.email,
      sampleContactData.phoneNumber
    )
    expect(returnValue).toBe(sampleContactDoc.id)
    expect(addDoc).toBeCalledTimes(1)
  })

  it("Update existing document", async () => {
    getDoc.mockResolvedValue(sampleContactDoc)
    doc.mockReturnValue(sampleContactDocRef)
    updateDoc.mockResolvedValue()
    const returnValue = await contactFunctions.updateContact(
      sampleContactDoc.data.id,
      {}
    )
    expect(updateDoc).toBeCalledTimes(1)
    expect(returnValue).toBe(sampleContactDoc.data.id)
    expect(updateDoc).toBeCalledWith(sampleContactDocRef, {})
  })

  it("Get contacts by emails", async () => {
    // If the await function returns something, use mock return value. If it uses then, use mock resolve value :)
    getDocs.mockReturnValue([sampleContactDoc])
    const returnValue = await contactFunctions.getContactsByOrg("sampleOrg")
    let sampleContactDataWithID = { ...sampleContactData } // Copy object
    sampleContactDataWithID.id = sampleContactDoc.id
    expect(returnValue).toStrictEqual([sampleContactDataWithID]) // toStrictEqual needs to be used if you compare 2 object that has the same field but not the same address
    expect(getDocs).toBeCalledTimes(1)
    expect(query).toBeCalledTimes(1)
  })

  it("Get contacts by companies", async () => {
    getDocs.mockReturnValue([sampleContactDoc])
    const returnValue = await contactFunctions.getContactsByOrg("sampleOrg")
    let sampleContactDataWithID = { ...sampleContactData } // Copy object
    sampleContactDataWithID.id = sampleContactDoc.id
    expect(returnValue).toStrictEqual([sampleContactDataWithID]) // toStrictEqual needs to be used if you compare 2 object that has the same field but not the same address
    expect(getDocs).toBeCalledTimes(1)
    expect(query).toBeCalledTimes(1)
  })

  it("Get contact", async () => {
    doc.mockReturnValue(sampleContactDocRef)
    getDoc.mockResolvedValue(sampleContactDoc)
    const data = await contactFunctions.getContact(sampleContactDoc.id)
    expect(data).toBe(sampleContactData)
    expect(getDoc).toBeCalledWith(sampleContactDocRef)
    expect(doc).toBeCalledTimes(1)
    expect(getDoc).toBeCalledTimes(1)
  })

  it("Failed to get Contact", async () => {
    doc.mockReturnValue(sampleContactDocRef)
    getDoc.mockResolvedValue(sampleContactDoc)
    const data = await contactFunctions.getContact(sampleContactDoc.id)
  })

  it("Delete contact", async () => {
    doc.mockReturnValue(sampleContactDocRef)
    deleteDoc.mockReturnValue(sampleContactDocRef) // It's okay to mock functions that has unclear return
    const data = await contactFunctions.deleteContact("sampleContact")
    expect(data).toBe(sampleContactDocRef)
  })
})
