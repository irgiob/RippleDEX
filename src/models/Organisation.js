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
export const createNewOrganization =  (userID) => {

    const docRef = doc(db, "organizations", userID)
    return setDoc(docRef,{
        admin: userID,
    }).then(()=>{
        return getDoc(docRef).then((doc) => {
            return doc.data()
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
    addDoc(docRef,{
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

    const docRef = doc(db,"organizations",orgID);
    
    updateDoc(docRef,{
        members: arrayUnion(userID)
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
export const isUserInOrganization = (orgID, userID) => {

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
 export const isUserAdmin =  (orgID, userID) => {

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
 export const updateOrganization = async (orgID, options) => {
    //note: organizationName, organizationEmail, are profilePicture are all optional
    
    const docRef = doc(db, "organizations", orgID);
    const docSnap = await getDoc(docRef);

    //must check if they are present
    if (docSnap.exists()){

        return updateDoc(docRef, options)

        } else {

            console.log("No such document!");

          }
    }