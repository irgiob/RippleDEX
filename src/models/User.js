import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import {getFirestore, doc, setDoc, getDoc, updateDoc} from "firebase/firestore"

const db = getFirestore(firebase)

/**
 * creates a new user (in the context of Firestore)
 * 
 * @param {String} userName name of user to be created
 * @param {String} userID ID of user to be created
 * @param {String} userEmail email of user to be created
 * @param {Object} userPhoneNumber phone number of user to be created
 * 
 * @returns {User} new user just created
 */
export const createNewUser = (userName, userID, userEmail,userPhoneNumber) => {
    const docRef = doc(db, "users", userID)
    return setDoc(docRef, {
        name: userName,
        email: userEmail,
        phoneNumber: ["Mobile",userPhoneNumber],
        organizations: [],
        lastOpenedOrganization: null,
        profilePicture: null
    }).then(()=>{
        return getDoc(docRef).then((doc) => {
            return doc.data()
        })
    }).catch((error) => {
        console.log("Error adding new user: ", error);
        throw "Error in createNewUser";
    })
}

/**
 * updates information on a user
 * 
 * @param {String} userID ID of user to be updated
 * @param {Object} options List of user properities to change
 * @param {String} [options.userName] new name for user
 * @param {String} [options.userEmail] new email for user
 * @param {String} [options.profilePicture] new profile picture for user
 * 
 * @returns {DocumentReference} updated user object
 */
export const updateUser = async (userID, options) => {
    const docRef = doc(db, "users", userID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
        return updateDoc(docRef, options)
    } else {
        console.log("No such document!");
    }
}

/**
 * updates the notification settings for a specific user
 * 
 * @param {String} userID ID of user to be updated
 * @param {Integer} notificationMode new notification mode
 */
export const updateUserNotificationSettings = (userID, notificationMode) => {
    const docRef = doc(db, "users", userID);
    return updateDoc(docRef, {
        notificationMode: notificationMode
    });

}

/**
 * gets the last organization the user had opened while using the app
 * 
 * @param {String} userID ID of user to be updated
 * 
 * @returns {DocumentReference}
 */
export const getUser = (userID) => {
    const docRef = doc(db, "users", userID)
    return getDoc(docRef).then((user) => {
        return user.data();
    }).catch((error) => {
        console.error("Error getting user: ", error);
    });
}