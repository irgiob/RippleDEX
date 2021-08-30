import { collection, doc, addDoc, updateDoc, arrayUnion, DocumentReference } from "@firebase/firestore"
import { Firestore } from "@firebase/firestore"

/**
 * creates a new user (in the context of Firestore)
 * 
 * @param {Firestore} db Firestore Database Object
 * 
 * @returns {User} new user just created
 */
export const createNewUser = (db) => {
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
    // must check if they are present
}

/**
 * updates the notification settings for a specific user
 * 
 * @param {Firestore} db Firestore Database Object
 * @param {String} userID ID of user to be updated
 * @param {Integer} notificationMode new notification mode
 */
export const updateUserNotificationSettings = (db, userID, notificationMode) => {

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

}