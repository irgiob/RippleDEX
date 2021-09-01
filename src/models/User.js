import { collection, doc, setDoc, addDoc, updateDoc, arrayUnion, DocumentReference } from "@firebase/firestore"
import { Firestore } from "@firebase/firestore"

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
    
    const newUser = await setDoc(doc(db, "users", userID), {
        name: userName,
        email: userEmail,
        phoneNumber: arrayUnion(userPhoneNumber.type,userPhoneNumber.number),
    });

    return newUser;
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
export const updateUser = (db, userID, options) => {
    // note: userName, userEmail, are profilePicture are all optional
    
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);

    // must check if they are present
    if (docSnap.exists()){
        await updateDoc(docRef, {
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

    const docRef = doc(db, 'users', userID);
    await updateDoc(docRef, {
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

    const docRef = doc(db, "users", userID);
    const lastOpenedOrganization = docRef.lastOpenedOrganization.id;

    return lastOpenedOrganization;
}