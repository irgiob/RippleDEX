// import "@firebase/firestore"

// /**
//  * creates new organization
//  * 
//  * @param {Firestore} db Firestore Database Object
//  * @param {String} userID ID of user creating the organization
//  * 
//  * @return {DocumentReference} newly created organization
//  */
// export const createNewOrganization =  async (db, userID) => {

//     db.collection("organizations").doc(userID).set({
//         admin: userID,
//     }).then((newOrg)=>{
//         return newOrg;
//     }).catch((error)=>{
//         console.error("Error adding new organizaitions: ", error);
//     })
    
// }

// /**
//  * invite a new individual to gain access to the organization
//  * 
//  * @param {Firestore} db Firestore Database Object
//  * @param {String} email email address of invitee
//  * @param {String} orgID ID of organization
//  */
// export const inviteToOrganization = async (db, email,orgID) => {
    
//     db.collection("invites").add({
//         email: email,
//           organizationID: orgID
//     }).then((docRef)=>{
//         return docRef;
//     }).catch(error=>{
//         console.error("Error inviting new individual", error);
//     })
//     }


// /**
//  * adds a user to an organization
//  * 
//  * @param {Firestore} db Firestore Database Object
//  * @param {String} orgID ID of organization
//  * @param {String} userID ID of user
//  */
// export const addUserToOrganization = (db, orgID, userID) => {

//     const docRef = doc(db,"organizations",orgID);
//     db.collection("organizations").doc(orgID).update({
//         members: firebase.firestore.FieldValue.arrayUnion(serID)
//     })
    

// }

// /**
//  * checks if a specific user is a member of a specific organization
//  * 
//  * @param {Firestore} db Firestore Database Object
//  * @param {String} orgID ID of organization
//  * @param {String} userID ID of user
//  * 
//  * @returns bool
//  */
// export const isUserInOrganization = async (db, orgID, userID) => {

//     const docRef = doc(db,"organizations",orgID);
//     return (docRef.members.includes(userID))

// }

// /**
//  * checks if a user is the admin of a specific organization
//  * 
//  * @param {Firestore} db Firestore Database Object
//  * @param {String} orgID ID of organization
//  * @param {String} userID ID of user
//  * 
//  * @returns bool
//  */
//  export const isUserAdmin = async (db, orgID, userID) => {

//     const docRef = doc(db,"organizations",orgID);
//     return ((docRef.admin) === (userID))

// }

// /**
//  * updates information on a user
//  * 
//  * @param {Firestore} db Firestore Database Object
//  * @param {String} orgID ID of organization to be updated
//  * @param {Object} options List of organization properities to change
//  * @param {String} [options.organizationName] new name for organization
//  * @param {String} [options.organizationDesc] new description for organization
//  * @param {String} [options.profilePicture] new profile picture for organization
//  * 
//  * @returns {DocumentReference} updated organization object
//  */
//  export const updateOrganization = async (db, orgID, options) => {
//     // note: organizationName, organizationEmail, are profilePicture are all optional
    
//     const docRef = doc(db, "organizations", orgID);
//     const docSnap = await getDoc(docRef);

//     // must check if they are present
//     if (docSnap.exists()){
//         await updateDoc(docRef, {
//                 name: options.organizationName,
//                 email: options.organizationDesc,
//                 profilePicture: options.profilePicture
//             })
//         } else {
//             //console.log("No such document!");
//           }
//     }
