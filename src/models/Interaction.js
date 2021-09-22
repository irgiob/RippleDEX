import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import {getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, doc, deleteDoc,addDoc,  }  from "firebase/firestore"

const db = getFirestore(firebase)

/**
 * creates new interaction
 * 
 * @param {String} contactID the ID of contact of the interaction 
 * @param {Object} interPart the participantes of the interaction
 * @param {String} userID the ID of the user adding the interaction
 * @param {String} orgID the ID of organizaiton 
 * @param {String} meetStart the start date of the meeting
 * @param {String} meetEnd the end date of the meeting
 * @param {String} meetType the type of the meeting
 * @param {String} interNote the note of the interaction
 * @param {Boolean} remind choose to remind the user or not
 * 
 * @return {DocumentReference} newly created interaction
 */
export const createNewInteraction = async (contactID,interPart,userID,orgID,interNote,remind) =>{
    const docRef = await addDoc(collection(db,"interactions"),{
        contact: contactID,
        participants: interPart,
        addedBy: userID,
        forDeal: null,
        forTask: null,
        forOrganization: orgID,
        meetingStart: null,
        meetingEnd: null,
        meetingType: null,
        notes : interNote, // Or create structure so people can add comments?
        remindMe: remind
    }).then(()=>{
        return await getInteraction(docRef.id);
    }).catch((error) => {
        console.log("Error adding new interaction: ", error);
    })
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
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
        return updateDoc(docRef, options).then(() => getInteraction(interID))
    } else {
        console.log("No such document!");
    }
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
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
        return await deleteDoc(docRef);
    } else {
        console.log("No such document!");
    }
}

/**
 * gets all interactions based on organizaiton ID
 * 
 * @param {String} orgID ID of the organizaiton
 * 
 * @returns {Object} the list of all interactions
 */
 export const getInteractionByOrg = async (orgID) => {
    const q = query(collection(db, "interactions"), where("forOrganizaiton", "==", orgID));
    const querySnapshot = await getDocs(q);
    const interactionList = [];
    querySnapshot.forEach((interaction) => {
        interactionList.push(getDeal(interaction.id));
        return interactionList
}).catch((error) => {
    console.error("Error getting interactions: ", error);
});
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
