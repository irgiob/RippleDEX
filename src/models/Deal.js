import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import {getFirestore, doc, setDoc, getDoc, updateDoc, Timestamp,collection, query, where, getDocs, doc, deleteDoc,addDoc,  }  from "firebase/firestore"

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
 * 
 * 
 * @return {DocumentReference} newly created deal
 */

export　const createNewDeal = (orgID, dealName,dealDesc, dealSize, userID, dealNote ) => {
    const docRef = await addDoc(collection(db, "deals"),{
        forOrganizaiton: orgID,
        name: dealName,
        description: dealDesc,
        dealSize: dealSize,
        closeDate: null,
        recordedBy: userID,
        contacts: [],
        stage: null,
        notes: dealNote
    }).then(()=>{
        return await getDeal(docRef.id);
    }).catch((error) => {
        console.log("Error adding new deal: ", error);
    })
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
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
        return updateDoc(docRef, options).then(() => getDeal(dealID))
    } else {
        console.log("No such document!");
    }
}

/**
 * Delete the existing deal
 * 
 * @param {String} dealID ID of the deal
 * 
 * @returns {DocumentReference}
 */
 export const deleteComapny = async (dealID) => {
    const docRef = doc(db, "deals", dealID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
        return await deleteDoc(docRef);
    } else {
        console.log("No such document!");
    }
}

/**
 * gets all deals based on organizaiton ID
 * 
 * @param {String} orgID ID of the organizaiton
 * 
 * @returns {Object} the list of all deals
 */
 export const getDealByOrg = async (orgID) => {
    const q = query(collection(db, "deals"), where("forOrganizaiton", "==", orgID));
    const querySnapshot = await getDocs(q);
    const dealList = [];
    querySnapshot.forEach((deal) => {
        dealList.push(getDeal(deal.id));
        return dealList
}).catch((error) => {
    console.error("Error getting deals: ", error);
});
}


/**
 * gets all deals based on user ID
 * 
 * @param {String} userID ID of the organizaiton
 * 
 * @returns {Object} the list of all deals
 */
 export const getDealByUser = async (userID) => {
    const q = query(collection(db, "deals"), where("recordedBy", "==", userID));
    const querySnapshot = await getDocs(q);
    const dealList = [];
    querySnapshot.forEach((deal) => {
        dealList.push(getDeal(deal.id));
        return dealList
}).catch((error) => {
    console.error("Error getting deals: ", error);
});
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