import "firebase/firestore"
import firebase from "gatsby-plugin-firebase"

export const firestore = firebase.firestore()

/**
 * creates a new user (in the context of Firestore)
 * 
 * @param {Firestore} db Firestore Database Object

 * @param {String} userName name of user to be created
 * @param {String} userID ID of user to be created
 * @param {String} userEmail email of user to be created
 * @param {Object} userPhoneNumber phone number of user to be created
 * 
 * @returns {User} new user just created
 */
export const createNewUser = (db, userName, userID,userEmail,userPhoneNumber) => {
    console.log("HELLO")
    firestore.collection("users").doc(userID).set({
        name: userName,
        email: userEmail,
        phoneNumber: ["Mobile",userPhoneNumber],
        organizations: [],
        lastOpenedOrganization: null,
        profilePicture: null
    }).then((newUser)=>{
        console.log(newUser)
        return newUser
    }).catch((error) => {
        console.log("Error adding new user: ", error);
    })

    

}

/**
 * updates information on a user
 * 
 * @param {Firestore} db Firestore Database Object
 * @param {String} userID ID of user to be updated
 * @param {Object} options List of user properities to change
 * @param {String} [options.userName] new name for user
 * @param {String} [options.userEmail] new email for user
 * @param {String} [options.profilePicture] new profile picture for user
 * 
 * @returns {DocumentReference} updated user object
 */
export var updateUser = async (db, userID, options) => {
    // note: userName, userEmail, are profilePicture are all optional
    
    var docRef = db.collection("users").doc(userID);
    var docSnap = await docRef.get();

    // must check if they are present
    
    if (docSnap.exists()){
        return docRef.update({
            name: options.userName,
            email: options.userEmail,
            profilePicture: options.profilePicture
        })
        } else {
            //console.log("No such document!");
          }
    }


/**
 * updates the notification settings for a specific user
 * 
 * @param {Firestore} db Firestore Database Object
 * @param {String} userID ID of user to be updated
 * @param {Integer} notificationMode new notification mode
 */
export const updateUserNotificationSettings = (db, userID, notificationMode) => {

    var docRef = db.collection("users").doc(userID);
    docRef.update( {
        notificationMode: notificationMode
      });

}

/**
 * gets the last organization the user had opened while using the app
 * 
 * @param {Firestore} db Firestore Database Object
 * @param {String} userID ID of user to be updated
 * 
 * @returns {DocumentReference}
 */
export const getLastOpenedOrganization = (db, userID) => {

    var docRef = db.collection("users").doc(userID).get()
    .then((user) => {
        return user.lastOpenedOrganization;
    }).catch((error) => {
        console.error("Error getting user: ", error);
    });
}