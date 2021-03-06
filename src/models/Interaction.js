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
 * creates new interaction
 *
 * @param {String} contactID the ID of contact of the interaction
 * @param {Array} interPart the participantes of the interaction
 * @param {String} userID the ID of the user adding the interaction
 * @param {String} orgID the ID of organizaiton
 * @param {String} dealID the ID of deal
 * @param {String} taskID the ID of task
 * @param {String} start the start date of the meeting
 * @param {String} end the end date of the meeting
 * @param {String} type the type of the meeting
 * @param {String} interNote the note of the interaction
 * @param {Boolean} remind choose to remind the user or not
 *
 * @return {DocumentReference} newly created interaction
 */
export const createNewInteraction = async (
  orgID,
  contactID,
  userID,
  dealID,
  start,
  type,
  interNote,
  taskID,
  remindMe = true,
  name = "",
  end = null
) => {
  const docRef = await addDoc(collection(db, "interactions"), {
    contact: contactID,
    addedBy: userID,
    forDeal: dealID,
    forTask: taskID,
    forOrganization: orgID,
    meetingStart: start,
    meetingEnd: end,
    meetingType: type,
    notes: interNote, // Or create structure so people can add comments?
    name: name,
    remindMe: remindMe,
  })
  return docRef.id
}

/**
 * updates information on interaction
 *
 * @param {String} interID ID of interaction to be updated
 * @param {Object} options List of interaction properities to change
 *
 * @returns {DocumentReference} updated interaction object
 */
export const updateInteraction = async (interID, options) => {
  const docRef = doc(db, "interactions", interID)
  return updateDoc(docRef, options)
}

/**
 * Delete the existing interaction
 *
 * @param {String} interID ID of the interaction
 *
 * @returns {DocumentReference}
 */
export const deleteInteraction = async interID => {
  const docRef = doc(db, "interactions", interID)
  return await deleteDoc(docRef)
}

export const getInteractionsByOrg = async orgID => {
  const q = query(
    collection(db, "interactions"),
    where("forOrganization", "==", orgID)
  )
  return await getInteractionsByQuery(q)
}

export const getInteractionsForDashboard = async (userID, orgID) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  const q = query(
    collection(db, "interactions"),
    where("forOrganization", "==", orgID),
    where("addedBy", "==", userID),
    where("meetingStart", ">=", today),
    where("meetingStart", "<=", tomorrow)
  )
  return await getInteractionsByQuery(q)
}

/**
 * gets all interactions where value in field is equal to foreignKey
 *
 * @param {String} field specific field in document to filter by
 * @param {String} foreignKey the key to compare the value in the field too
 *
 * @returns {Object} the list of all interactions
 */
const getInteractionsByQuery = async q => {
  const querySnapshot = await getDocs(q)
  const interactionList = []
  querySnapshot.forEach(interaction => {
    const data = interaction.data()
    data.id = interaction.id
    interactionList.push(data)
  })
  return interactionList
}

/**
 * gets interaction based on its ID
 *
 * @param {String} interID ID of the interaction
 *
 * @returns {DocumentReference}
 */
export const getInteraction = async interID => {
  const docRef = doc(db, "interactions", interID)
  return getDoc(docRef)
    .then(interaction => {
      if (interaction.exists()) {
        const data = interaction.data()
        data.id = interID
        return data
      }
    })
    .catch(error => {
      console.error("Error getting interaction: ", error)
    })
}
