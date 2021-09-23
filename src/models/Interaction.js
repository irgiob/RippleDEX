import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import {getFirestore, doc, getDoc, updateDoc, collection, query, where, getDocs, doc, deleteDoc, addDoc}  from "firebase/firestore"

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
export const createNewInteraction = async (contactID,interPart,userID,orgID,dealID,taskID,start,end,type,interNote,remind) =>{
    const docRef = await addDoc(collection(db,"interactions"),{
        contact: contactID,
        participants: interPart,
        addedBy: userID,
        forDeal: dealID,
        forTask: taskID,
        forOrganization: orgID,
        meetingStart: start,
        meetingEnd: end,
        meetingType: type,
        notes : interNote, // Or create structure so people can add comments?
        remindMe: remind
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
 export const updateInteraction = async (interID, options) =>{
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
 export const deleteInteraction = async (interID) => {
    const docRef = doc(db, "interactions", interID)
    return await deleteDoc(docRef)
}

export const getInteractionsByOrg = async (orgID) => {
    return await getInteractionsByField("forOrganization", orgID)
}

export const getInteractionsByDeal = async (dealID) => {
    return await getInteractionsByField("forDeal", dealID)
}

export const getInteractionsByTask = async (taskID) => {
    return await getInteractionsByField("forTask", taskID)
}

/**
 * gets all interactions where value in field is equal to foreignKey
 * 
 * @param {String} field specific field in document to filter by
 * @param {String} foreignKey the key to compare the value in the field too
 * 
 * @returns {Object} the list of all interactions
 */
const getInteractionsByField = async (field, foreignKey) => {
    const q = query(collection(db, "interactions"), where(field, "==", foreignKey));
    const querySnapshot = await getDocs(q);
    const interactionList = [];
    querySnapshot.forEach((interaction) => {
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
export const getInteraction = async (interID) =>{
    const docRef = doc(db, "interactions", interID)    
    return getDoc(docRef).then((interaction) => {
        const data = interaction.data()
        data.id = interID
        return data
    }).catch((error) => {
        console.error("Error getting interaction: ", error);
    });
}
