/**
 * This is the offline version, hence all of the functions that interacts directly
 * to firestore will be mocked. This is used temporarily
 */

import * as companyFunctions from "../../models/Company"

import {
  getFirestore,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
  doc,
} from "firebase/firestore"

jest.mock("firebase/firestore")

const sampleCompanyData = {
  registeredBy: "orgID",
  name: "companyName",
  description: "companyDesc",
  website: "companyWeb",
  personnel: "personnel",
  annualRevenue: "annualRevenue",
  address: "companyAddress",
  relationship: "relationship",
  primaryContact: "primaryContact",
}

const sampleCompanyDocRef = {
  id: "sampleCompany",
}

const sampleCompanyDoc = {
  id: "sampleCompany",
  data: function () {
    return sampleCompanyData
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

describe("Testing company functions", () => {
  beforeEach(() => {
    setDoc.mockResolvedValue()
    doc.mockReturnValue(sampleCompanyDocRef)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("A company is creared in the database", async () => {
    addDoc.mockResolvedValue(sampleCompanyDocRef)
    const returnValue = await companyFunctions.createNewCompany(
      sampleCompanyData.registeredBy,
      sampleCompanyData.name,
      sampleCompanyData.description,
      sampleCompanyData.website,
      sampleCompanyData.personnel,
      sampleCompanyData.annualRevenue,
      sampleCompanyData.relationship,
      sampleCompanyData.address,
      sampleCompanyData.primaryContact
    )
    expect(returnValue).toBe(sampleCompanyDoc.id)
    expect(addDoc).toBeCalledTimes(1)
  })

  it("Update information on company", async () => {
    getDoc.mockResolvedValue(sampleCompanyDoc)
    updateDoc.mockResolvedValue()
    const returnValue = await companyFunctions.updateCompany(
      sampleCompanyDoc.data.id,
      options
    )
    expect(updateDoc).toBeCalledTimes(1)
    expect(doc).toBeCalledTimes(1)
    expect(returnValue).toBe(sampleCompanyDoc.data.id)
    expect(updateDoc).toBeCalledWith(sampleCompanyDocRef, options)
  })

  it("Get companies", async () => {
    doc.mockReturnValue(sampleCompanyDocRef)
    getDoc.mockResolvedValue(sampleCompanyDoc)
    const data = await companyFunctions.getCompany(sampleCompanyDoc.id)
    expect(data).toBe(sampleCompanyData)
    expect(doc).toBeCalledTimes(1)
    expect(getDoc).toBeCalledTimes(1)
    expect(getDoc).toBeCalledWith(sampleCompanyDocRef)
  })
})
