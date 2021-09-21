import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import {getFirestore, doc, setDoc, getDoc, updateDoc, Timestamp,collection, query, where, getDocs }  from "firebase/firestore"

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
export const createNewContact = async (contactID, orgID, contactName, companyID, contactEmail, contactPhoneNumber ) => {
    const docRef = doc(db, "contacts", contactID)
    return setDoc(docRef, {
        registeredBy : orgID,
        name: contactName,
        company: companyID,
        email: contactEmail,
        phoneNumber: contactPhoneNumber,
        position : null,
        notes: null // Same like Interaction 's notes?
    }).then(()=>{
        return getDoc(docRef).then((doc) => {
            return doc.data()
        })
    }).catch((error) => {
        console.log("Error adding new contact: ", error);
    })

}


/**
 * updates information on contact
 * 
 * @param {String} contactID ID of contact to be updated
 * @param {Object} options List of contact properities to change
 * 
 * @returns {DocumentReference} updated contact object
 */
export const updateContact = async (contactID, options) =>{
    const docRef = doc(db, "contacts", contactID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
        return updateDoc(docRef, options).then(() => getContact(contactID))
    } else {
        console.log("No such document!");
    }
    
}

/**
 * gets all contact based on organizaiton ID
 * 
 * @param {String} orgID ID of the organizaiton
 * 
 * @returns {Object} the list of all tasks 
 */
export const getContactsByOrg = async (orgID) => {
    const q = query(collection(db, "contacts"), where("registeredBy", "==", orgID));
    const querySnapshot = await getDocs(q);
    const contactList = [];
    querySnapshot.forEach((contact) => {
        contactList.push(contact.id);
        return contactList
}).catch((error) => {
    console.error("Error getting contacts: ", error);
});
}

/**
 * gets contact based on its ID
 * 
 * @param {String} contactID ID of the contact
 * 
 * @returns {DocumentReference}
 */
export const getContact = async (contactID) =>{
    const docRef = doc(db, "contacts", contactID)    
    return getDoc(docRef).then((contact) => {
        const data = contact.data()
        data.id = conatctID
        return data
    }).catch((error) => {
        console.error("Error getting contact: ", error);
    });

}