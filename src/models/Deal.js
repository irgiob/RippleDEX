import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import {getFirestore, doc, getDoc, updateDoc, collection, query, where, getDocs, doc, deleteDoc, addDoc}  from "firebase/firestore"

const db = getFirestore(firebase)

/**
 * creates new deal
 * 
 * @param {String} orgID ID of organization has the deal
 * @param {String} dealName the name of the deal being created
 * @param {String} dealDesc the description of the deal
 * @param {Float} dealSize the size of deal being created 
 * @param {String} userID the user recording the deal 
 * @param {String} dealNote the note of the deal
 * @param {String} stage current stage of deal
 * @param {Date} closeDate date the deal was closed
 * @param {Array} contacts contacts associated with the closing of a deal
 * 
 * @return {DocumentReference} newly created deal
 */

export　const createNewDeal = (orgID, dealName, dealDesc, dealSize, userID, dealNote, stage, closeDate, contacts) => {
    const docRef = await addDoc(collection(db, "deals"),{
        forOrganizaiton: orgID,
        name: dealName,
        description: dealDesc,
        dealSize: dealSize,
        closeDate: closeDate,
        recordedBy: userID,
        contacts: contacts,
        stage: stage,
        notes: dealNote
    })
    return docRef.id
}

/**
 * updates information on deal
 * 
 * @param {String} dealID ID of deal to be updated
 * @param {Object} options List of deal properities to change
 * 
 * @returns {DocumentReference} updated deal object
 */
 export const updateDeal = async (dealID, options) =>{
    const docRef = doc(db, "deals", dealID)
    return updateDoc(docRef, options)
}

/**
 * Delete the existing deal
 * 
 * @param {String} dealID ID of the deal
 * 
 * @returns {DocumentReference}
 */
 export const deleteDeal = async (dealID) => {
    const docRef = doc(db, "deals", dealID)
    return await deleteDoc(docRef)
}

/**
 * gets all deals based on organizaiton ID
 * 
 * @param {String} orgID ID of the organizaiton
 * 
 * @returns {Object} the list of all deals
 */
 export const getDealsByOrg = async (orgID) => {
    const q = query(collection(db, "deals"), where("forOrganizaiton", "==", orgID));
    const querySnapshot = await getDocs(q);
    const dealList = [];
    querySnapshot.forEach((deal) => {
        const data = deal.data()
        data.id = deal.id
        dealList.push(data)
    })
    return dealList
}


/**
 * gets deal based on its ID
 * 
 * @param {String} dealID ID of the deal
 * 
 * @returns {DocumentReference}
 */
export const getDeal = async (dealID) =>{
    const docRef = doc(db, "deals", dealID)    
    return getDoc(docRef).then((deal) => {
        const data = deal.data()
        data.id = dealID
        return data
    }).catch((error) => {
        console.error("Error getting deal: ", error);
    });
}