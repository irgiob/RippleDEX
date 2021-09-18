import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import {
    getFirestore, 
    doc, 
    addDoc, 
    getDoc, 
    updateDoc, 
    collection, 
    arrayUnion, 
    arrayRemove
} from "firebase/firestore"

const db = getFirestore(firebase)

/**
 * creates new organization
 * 
 * @param {String} userID ID of user creating the organization
 * @param {string} orgName the name of the organization being created
 * @param {string} orgDesc description of the organization
 * 
 * @return {DocumentReference} newly created organization
 */
export const createNewOrganization = async (userID, orgName, orgDesc) => {
    const docRef = await addDoc(collection(db, "organizations"),{
        admin: userID,
        name: orgName,
        description: orgDesc,
        members: [],
        profilePicture: null
    })
    await addUserToOrganization(docRef.id, userID, "Admin")
    return await getDoc(docRef).then((doc) => {
        const data = doc.data()
        data.id = doc.id
        return data
    })
}

/**
 * invite a new individual to gain access to the organization
 * 
 * @param {String} email email address of invitee
 * @param {String} orgID ID of organization
 * @param {String} position of the new member in the organization
 */
export const inviteToOrganization = async (email, orgID, position) => {
    const docRef = await addDoc(collection(db, "invites"),{
        email: email,
        organizationID: orgID,
        position: position
    })
    const docSnap = await getDoc(docRef)
    return docSnap.id
}


/**
 * invite a new individual to gain access to the organization
 * @param {String} inviteID of the new member in the organization
 */

export const getInvite = async (inviteID) => {
    const docRef = doc(db, "invites", inviteID)
    return getDoc(docRef).then((invite) => {
        return invite.data()
    }).catch((error) => {
        console.error("Error getting invite: ", error);
        return null
    });
}
/**
 * adds a user to an organization
 * 
 * @param {String} orgID ID of organization
 * @param {String} userID ID of user
 */
export const addUserToOrganization = async (orgID, userID, position) => {
    // adds user to organizations document
    await updateDoc(doc(db, "organizations", orgID), {
        members: arrayUnion({userID: userID, position: position})
    })
    // adds organization to users document
    await updateDoc(doc(db, "users", userID), {
        lastOpenedOrganization: orgID,
        organizations: arrayUnion(orgID)
    })
}

/**
 * checks if a specific user is a member of a specific organization
 * 
 * @param {String} orgID ID of organization
 * @param {String} userID ID of user
 * 
 * @returns bool
 */
export const isUserInOrganization = async (orgID, userID) => {
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
    return org.admin === userID
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

export const updateMemberPosition = async (orgID, userID, oldPosition, newPosition) => {
    await updateDoc(doc(db, "organizations", orgID), {
        members: arrayRemove({userID: userID, position: oldPosition})
    })
    await updateDoc(doc(db, "organizations", orgID), {
        members: arrayUnion({userID: userID, position: newPosition})
    })
    return getOrganization(orgID)
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