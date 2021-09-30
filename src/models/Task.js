import firebase from "../../plugins/gatsby-plugin-firebase-custom"
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

const db = getFirestore(firebase)

/**
 * creates a new task (in the context of Firestore)
 *
 * @param {String} taskName name of task to be created
 * @param {String} taskID ID of task to be created
 * @param {String} taskDesc the description of task to be created
 * @param {String} taskName the name of the task to be created
 * @param {String} orgID the ID of organizaiton to contain the task
 *
 * @returns {DocumentReference} new task just created
 */
export const createNewTask = async (
  dealID,
  taskDesc,
  taskName,
  orgID,
  status = ""
) => {
  const docRef = await addDoc(collection(db, "tasks"), {
    deal: dealID,
    name: taskName,
    description: taskDesc,
    status: status,
    company: [],
    interactions: [],
    assignedUsers: [],
    forOrganization: orgID,
  })
  return docRef.id
}

/**
 * updates information on a task
 *
 * @param {String} taskID ID of task to be updated
 * @param {Object} options List of task properities to change
 *
 * @returns {DocumentReference} updated task object
 */
export const updateTask = async (taskID, options) => {
  const docRef = doc(db, "tasks", taskID)
  return await updateDoc(docRef, options)
}

/**
 * gets all tasks based on organizaiton ID
 *
 * @param {String} orgID ID of the organizaiton
 *
 * @returns {Object} the list of all tasks
 */
export const getTasksByOrg = async orgID => {
  const q = query(
    collection(db, "tasks"),
    where("forOrganization", "==", orgID)
  )
  const querySnapshot = await getDocs(q)
  const taskList = []
  querySnapshot.forEach(task => {
    const data = task.data()
    data.id = task.id
    taskList.push(data)
  })
  return taskList
}

/**
 * gets task based on task ID
 *
 * @param {String} taskID ID of the task
 *
 * @returns {DocumentReference}
 */
export const getTask = async taskID => {
  const docRef = doc(db, "tasks", taskID)
  return getDoc(docRef)
    .then(task => {
      const data = task.data()
      data.id = taskID
      return data
    })
    .catch(error => {
      console.error("Error getting task: ", error)
    })
}

/**
 * Delete task
 *
 * @param {String} taskID ID of the task
 *
 * @returns {DocumentReference}
 */
export const deleteTask = async taskID => {
  const docRef = doc(db, "tasks", taskID)
  return await deleteDoc(docRef)
}
