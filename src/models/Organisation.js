import { collection, doc, addDoc, updateDoc, arrayUnion, DocumentReference } from "@firebase/firestore"
import { Firestore } from "@firebase/firestore"

/**
 * creates new organization
 * 
 * @param {Firestore} db Firestore Database Object
 * @param {String} userID ID of user creating the organization
 * 
 * @return {DocumentReference} newly created organization
 */
export const createNewOrganization = (db, userID) => {

    const newOrg = doc(collection(db, "organizations"))
    
    await setDoc(newOrg, {
        admin: userID,
    });
    
}

/**
 * invite a new individual to gain access to the organization
 * 
 * @param {Firestore} db Firestore Database Object
 * @param {String} email email address of invitee
 * @param {String} orgID ID of organization
 */
export const inviteToOrganization = (db, email,orgID) => {

    const newInvite = doc(collection(db,"invites"));
    await setDoc(newInvite,{
          email: email,
          organizationID: orgID
      })
}

/**
 * adds a user to an organization
 * 
 * @param {Firestore} db Firestore Database Object
 * @param {String} orgID ID of organization
 * @param {String} userID ID of user
 */
export const addUserToOrganization = (db, orgID, userID) => {

    const docRef = doc(db,"organizations",orgID);
    await updateDoc(docRef,{
        members: arrayUnion(userID)
      });

}

/**
 * checks if a specific user is a member of a specific organization
 * 
 * @param {Firestore} db Firestore Database Object
 * @param {String} orgID ID of organization
 * @param {String} userID ID of user
 * 
 * @returns bool
 */
export const isUserInOrganization = (db, orgID, userID) => {

    const docRef = doc(db,"organizations",orgID);
    return (docRef.members.includes(userID))

}

/**
 * checks if a user is the admin of a specific organization
 * 
 * @param {Firestore} db Firestore Database Object
 * @param {String} orgID ID of organization
 * @param {String} userID ID of user
 * 
 * @returns bool
 */
 export const isUserAdmin = (db, orgID, userID) => {

    const docRef = doc(db,"organizations",orgID);
    return ((docRef.admin) === (userID))

}

/**
 * updates information on a user
 * 
 * @param {Firestore} db Firestore Database Object
 * @param {String} orgID ID of organization to be updated
 * @param {Object} options List of organization properities to change
 * @param {String} [options.organizationName] new name for organization
 * @param {String} [options.organizationDesc] new description for organization
 * @param {String} [options.profilePicture] new profile picture for organization
 * 
 * @returns {DocumentReference} updated organization object
 */
 export const updateOrganization = (db, orgID, options) => {
    // note: organizationName, organizationEmail, are profilePicture are all optional
    
    const docRef = doc(db, "organizations", orgID);
    const docSnap = await getDoc(docRef);

    // must check if they are present
    if (docSnap.exists()){
        await updateDoc(docRef, {
                name: options.organizationName,
                email: options.organizationDesc,
                profilePicture: options.profilePicture
            })
        } else {
            //console.log("No such document!");
          }
    }
