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
} from "firebase/firestore"

const db = getFirestore(firebase)

/**
 * creates new contact (in the context of Firestore)
 *
 * @param {String} contactID ID of contact to be created
 * @param {String} contactName the name of contact to be created
 * @param {String} companyID the ID of the company
 * @param {String} orgID the ID of organizaiton
 * @param {String} contactEmail email of contact to be created
 * @param {Object} contactPhoneNumber phone number of contact to be created
 *
 * @returns {DocumentReference} new contact just created
 */
export const createNewContact = async (
  orgID,
  contactName,
  companyID,
  contactEmail,
  contactPhoneNumber,
  position
) => {
  const docRef = await addDoc(collection(db, "contacts"), {
    registeredBy: orgID,
    name: contactName,
    company: companyID,
    email: contactEmail,
    phoneNumber: contactPhoneNumber,
    position: position,
    notes: null, // Same like Interaction 's notes?
  })
  return docRef.id
}

/**
 * updates information on contact
 *
 * @param {String} contactID ID of contact to be updated
 * @param {Object} options List of contact properities to change
 *
 * @returns {DocumentReference} updated contact object
 */
export const updateContact = async (contactID, options) => {
  const docRef = doc(db, "contacts", contactID)
  return await updateDoc(docRef, options)
}

/**
 * gets all contact based on organizaiton ID
 *
 * @param {String} orgID ID of the organizaiton
 *
 * @returns {Object} the list of all contact
 */
export const getContactsByOrg = async orgID => {
  const q = query(
    collection(db, "contacts"),
    where("registeredBy", "==", orgID)
  )
  const querySnapshot = await getDocs(q)
  const contactList = []
  querySnapshot.forEach(contact => {
    const data = contact.data()
    data.id = contact.id
    contactList.push(data)
  })
  return contactList
}

/**
 * gets all contacts based on company ID
 * @param {String} companyID ID of the company
 *
 * @returns {Object} the list of all contacts
 */
export const getContactsByCompany = async companyID => {
  const q = query(collection(db, "contacts"), where("company", "==", companyID))
  const querySnapshot = await getDocs(q)
  const contactList = []
  querySnapshot.forEach(contact => {
    const data = contact.data()
    data.id = contact.id
    contactList.push(data)
  })
  return contactList
}

/**
 * gets contact based on its ID
 *
 * @param {String} contactID ID of the contact
 *
 * @returns {DocumentReference}
 */
export const getContact = async contactID => {
  const docRef = doc(db, "contacts", contactID)
  return getDoc(docRef)
    .then(contact => {
      const data = contact.data()
      data.id = contactID
      return data
    })
    .catch(error => {
      console.error("Error getting contact: ", error)
    })
}

/**
 * Delete contact
 *
 * @param {String} contactID ID of the contact
 *
 * @returns {DocumentReference}
 */
export const deleteContact = async contactID => {
  const docRef = doc(db, "contacts", contactID)
  return await deleteDoc(docRef)
}
