/**
 * This is the offline version, hence all of the functions that interacts directly
 * to firestore will be mocked. This is used temporarily
 */

import * as interFunctions from "../../models/Interaction"
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

const sampleInteractionData = {
  contact: "contactID",
  participants: "interPart",
  addedBy: "userID",
  forDeal: "dealID",
  forTask: "taskID",
  forOrganization: "orgID",
  meetingStart: "startDate",
  meetingEnd: "endDate",
  meetingType: "type",
  notes: "interNote",
  remindMe: true,
}

const sampleInteractionDocRef = {
  id: "sampleInteraction",
}

const sampleInteractionDoc = {
  id: "sampleInteraction",
  data: function () {
    return sampleInteractionData
  },
  exists: function () {
    return true
  },
}

const options = {}

describe("Testing deal functions", () => {
  it("Create new interaction", async () => {
    getDoc.mockResolvedValue(sampleInteractionDoc)
    addDoc.mockResolvedValue(sampleInteractionDocRef)
    const returnValue = await interFunctions.createNewInteraction(
      sampleInteractionData.contact,
      sampleInteractionData.participants,
      sampleInteractionData.addedBy,
      sampleInteractionData.forDeal,
      sampleInteractionData.forTask,
      sampleInteractionData.forOrganization,
      sampleInteractionData.meetingStart,
      sampleInteractionData.meetingEnd,
      sampleInteractionData.meetingType,
      sampleInteractionData.notes,
      sampleInteractionData.remindMe
    )
    expect(returnValue).toBe(sampleInteractionDoc.id)
    expect(addDoc).toBeCalledTimes(1)
  })

  it("Update existing document", async () => {
    getDoc.mockResolvedValue(sampleInteractionDoc)
    doc.mockReturnValue(sampleInteractionDocRef)
    updateDoc.mockResolvedValue()
    const returnValue = await interFunctions.updateInteraction(
      sampleInteractionDoc.data.id,
      options
    )
    expect(updateDoc).toBeCalledTimes(1)
    expect(returnValue).toBe(sampleInteractionDoc.data.id)
    expect(updateDoc).toBeCalledWith(sampleInteractionDocRef, options)
  })

  it("Get interaction", async () => {
    doc.mockReturnValue(sampleInteractionDocRef)
    getDoc.mockResolvedValue(sampleInteractionDoc)
    const data = await interFunctions.getInteraction(sampleInteractionDoc.id)
    expect(data).toBe(sampleInteractionData)
    expect(getDoc).toBeCalledWith(sampleInteractionDocRef)
    expect(doc).toBeCalledTimes(2)
    expect(getDoc).toBeCalledTimes(1)
  })

  it("Get interactions by organizations", async () => {
    getDocs.mockReturnValue([sampleInteractionDoc])
    const returnValue = await interFunctions.getInteractionsByOrg(
      sampleInteractionData.forOrganization
    )
    let sampleInteractionDataWithID = { ...sampleInteractionData }
    sampleInteractionDataWithID.id = sampleInteractionDoc.id
    expect(returnValue).toStrictEqual([sampleInteractionDataWithID])
    expect(getDocs).toBeCalledTimes(1)
    expect(query).toBeCalledTimes(1)
  })

  it("Get interactions by deals", async () => {
    getDocs.mockReturnValue([sampleInteractionDoc])
    const returnValue = await interFunctions.getInteractionsByOrg(
      sampleInteractionData.forDeal
    )
    let sampleInteractionDataWithID = { ...sampleInteractionData }
    sampleInteractionDataWithID.id = sampleInteractionDoc.id
    expect(returnValue).toStrictEqual([sampleInteractionDataWithID])
    expect(getDocs).toBeCalledTimes(2)
    expect(query).toBeCalledTimes(2)
  })

  it("Get interactions by tasks", async () => {
    getDocs.mockReturnValue([sampleInteractionDoc])
    const returnValue = await interFunctions.getInteractionsByOrg(
      sampleInteractionData.forTask
    )
    let sampleInteractionDataWithID = { ...sampleInteractionData }
    sampleInteractionDataWithID.id = sampleInteractionDoc.id
    expect(returnValue).toStrictEqual([sampleInteractionDataWithID])
    expect(getDocs).toBeCalledTimes(3)
    expect(query).toBeCalledTimes(3)
  })
})
