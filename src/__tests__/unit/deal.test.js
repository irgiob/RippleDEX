/**
 * This is the offline version, hence all of the functions that interacts directly
 * to firestore will be mocked. This is used temporarily
 */

import * as dealFunctions from "../../models/Deal"
import {
  doc,
  getDoc,
  updateDoc,
  query,
  getDocs,
  deleteDoc,
  addDoc,
} from "firebase/firestore"

jest.mock("firebase/firestore")

const sampleDealData = {
  forOrganizaiton: "orgID",
  name: "dealName",
  description: "dealDesc",
  dealSize: 10.0,
  closeDate: "closeDate",
  recordedBy: "userID",
  contacts: [],
  stage: "stage",
  notes: "dealNote",
}

const sampleDealDocRef = {
  id: "sampleDeal",
}

const sampleDealDoc = {
  id: "sampleDeal",
  data: function () {
    return sampleDealData
  },
  exists: function () {
    return true
  },
}

const sampleError = "This is an error"
const options = {}

describe("Testing deal functions", () => {
  it("Create new deal", async () => {
    getDoc.mockResolvedValue(sampleDealDoc)
    addDoc.mockResolvedValue(sampleDealDocRef)
    const returnValue = await dealFunctions.createNewDeal(
      sampleDealData.forOrganizaiton,
      sampleDealData.name,
      sampleDealData.description,
      sampleDealData.dealSize,
      sampleDealData.recordedBy,
      sampleDealData.notes,
      sampleDealData.stage,
      sampleDealData.closeDate,
      sampleDealData.contacts
    )
    expect(returnValue).toBe(sampleDealDoc.id)
    expect(addDoc).toBeCalledTimes(1)
  })

  it("Update existing document", async () => {
    getDoc.mockResolvedValue(sampleDealDoc)
    doc.mockReturnValue(sampleDealDocRef)
    updateDoc.mockResolvedValue()
    const returnValue = await dealFunctions.updateDeal(
      sampleDealDoc.data.id,
      options
    )
    expect(updateDoc).toBeCalledTimes(1)
    expect(returnValue).toBe(sampleDealDoc.data.id)
    expect(updateDoc).toBeCalledWith(sampleDealDocRef, options)
  })

  it("Get deals by emails", async () => {
    getDocs.mockReturnValue([sampleDealDoc])
    const returnValue = await dealFunctions.getDealsByOrg("orgID")
    let sampleDealDataWithID = { ...sampleDealData }
    sampleDealDataWithID.id = sampleDealDoc.id
    expect(returnValue).toStrictEqual([sampleDealDataWithID])
    expect(getDocs).toBeCalledTimes(1)
    expect(query).toBeCalledTimes(1)
  })

  it("Get deal", async () => {
    doc.mockReturnValue(sampleDealDocRef)
    getDoc.mockResolvedValue(sampleDealDoc)
    const data = await dealFunctions.getDeal(sampleDealDoc.id)
    expect(data).toBe(sampleDealData)
    expect(getDoc).toBeCalledWith(sampleDealDocRef)
    expect(doc).toBeCalledTimes(2)
    expect(getDoc).toBeCalledTimes(1)
  })

  it("Delete contact", async () => {
    doc.mockReturnValue(sampleDealDocRef)
    deleteDoc.mockReturnValue(sampleDealDocRef) // It's okay to mock functions that has unclear return
    const data = await dealFunctions.deleteDeal(sampleDealDocRef.id)
    expect(data).toBe(sampleDealDocRef)
  })
})
