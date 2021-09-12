import "@firebase/firestore"
import {getFirestore, doc, setDoc, getDoc, updateDoc} from "firebase/firestore"

const db = getFirestore(firebase)

/**
 * creates new organization
 * 
 * @param {String} userID ID of user creating the organization
 * 
 * @return {DocumentReference} newly created organization
 */
export const createNewOrganization =  (userID, orgName, orgDesc) => {
    const docRef = collection(db, "organizations")
    return addDoc(docRef,{
        admin: userID,
        name: orgName,
        description: orgDesc,
        members: [{userID: userID, position: "Admin"}],
        profilePicture: null
    }).then(()=>{
        return getDoc(docRef).then((doc) => {
            data = doc.data()
            data.id = doc.id
            return data
        })
    }).catch((error) => {
        console.log("Error adding new organization: ", error);
        throw "Error in createNewOrgnization";
    })
}

/**
 * invite a new individual to gain access to the organization
 * 
 * @param {String} email email address of invitee
 * @param {String} orgID ID of organization
 */
export const inviteToOrganization = (email,orgID) => {
    const docRef = collection(db, "invites");
    return addDoc(docRef,{
        email: email,
        organizationID: orgID
    }).then(()=>{
        return getDoc(docRef).then((doc) => {
            return doc.data()
        })
    }).catch((error) => {
        console.log("Error adding new individual: ", error);
        throw "Error in inviteNewIndividual";
    })
}


/**
 * adds a user to an organization
 * 
 * @param {String} orgID ID of organization
 * @param {String} userID ID of user
 */
export const addUserToOrganization = (orgID, userID) => {
    const docRef = doc(db, "organizations", orgID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
        return updateDoc(docRef, {
            members: arrayUnion(userID)
        }).then(() => getOrganization(orgID))
    } else {
        console.log("No such document!");
    }
}

/**
 * checks if a specific user is a member of a specific organization
 * 
 * @param {String} orgID ID of organization
 * @param {String} userID ID of user
 * 
 * @returns bool
 */
export const isUserInOrganization = (orgID, userID) => {
    const org = await getOrganization(orgID)
    return org.members.some(member => member.userID === userID)
}

/**
 * checks if a user is the admin of a specific organization
 * 
 * @param {String} orgID ID of organization
 * @param {String} userID ID of user
 * 
 * @returns bool
 */
 export const isUserAdmin = async (orgID, userID) => {
    const org = await getOrganization(orgID)
    return org.admin == userID
}

/**
 * updates information on an organization
 * 
 * @param {String} orgID ID of organization to be updated
 * @param {Object} options List of organization properities to change
 * 
 * @returns {DocumentReference} updated user object
 */
 export const updateOrganization = async (orgID, options) => {
    const docRef = doc(db, "organizations", orgID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
        return updateDoc(docRef, options).then(() => getOrganization(orgID))
    } else {
        console.log("No such document!");
    }
}

/**
 * gets organization based on organization ID
 * 
 * @param {String} orgID ID of the organization
 * 
 * @returns {DocumentReference}
 */
 export const getOrganization = (orgID) => {
    const docRef = doc(db, "organizations", orgID)
    return getDoc(docRef).then((org) => {
        const data = org.data()
        data.id = orgID
        return data
    }).catch((error) => {
        console.error("Error getting organization: ", error);
    });
}