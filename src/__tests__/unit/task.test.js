/**
 * This is the offline version, hence all of the functions that interacts directly
 * to firestore will be mocked. This is used temporarily
 */

import * as taskFunctions from "../../models/Task"

import {
  getFirestore,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
} from "firebase/firestore"

jest.mock("firebase/firestore")

const sampleTaskData = {
  deal: "dealID",
  name: "taskName",
  description: "taskDesc",
  status: " ",
  company: [],
  interactions: [],
  assignedUsers: [],
  forOrganization: "orgID",
}

const sampleTaskDocRef = {
  id: "sampleTask",
}

const sampleTaskDoc = {
  id: "sampleTask",
  data: function () {
    return sampleTaskData
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

describe("Testing task functions", () => {
  beforeEach(() => {
    setDoc.mockResolvedValue()
    doc.mockReturnValue(sampleTaskDocRef)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("A task is creared in the database", async () => {
    addDoc.mockResolvedValue(sampleTaskDocRef)
    const returnValue = await taskFunctions.createNewTask(
      sampleTaskData.deal,
      sampleTaskData.description,
      sampleTaskData.name,
      sampleTaskData.forOrganization
    )
    expect(returnValue).toBe(sampleTaskDoc.id)
    expect(addDoc).toBeCalledTimes(1)
  })

  it("Update information on task", async () => {
    getDoc.mockResolvedValue(sampleTaskDoc)
    updateDoc.mockResolvedValue()
    const returnValue = await taskFunctions.updateTask(
      sampleTaskDoc.data.id,
      options
    )
    expect(updateDoc).toBeCalledTimes(1)
    expect(returnValue).toBe(sampleTaskDoc.data.id)
    expect(updateDoc).toBeCalledWith(sampleTaskDocRef, options)
  })

  it("Get Task", async () => {
    getDoc.mockResolvedValue(sampleTaskDoc)
    const data = await taskFunctions.getTask(sampleTaskDoc.id)
    expect(data).toBe(sampleTaskData)
    expect(doc).toBeCalledTimes(1)
    expect(getDoc).toBeCalledTimes(1)
    expect(getDoc).toBeCalledWith(sampleTaskDocRef)
  })
})
