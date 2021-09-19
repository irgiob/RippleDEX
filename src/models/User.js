import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import {getFirestore, doc, setDoc, getDoc, updateDoc, Timestamp} from "firebase/firestore"

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
export const createNewUser = (userFirstName, userLastName, userID, userEmail,userPhoneNumber) => {
    const docRef = doc(db, "users", userID)
    return setDoc(docRef, {
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        phoneNumber: userPhoneNumber,
        organizations: [],
        lastOpenedOrganization: null,
        profilePicture: null,
        lastOnline: Timestamp.now(),
        notificationMode: "000",
        isInvisible: false
    }).then(()=>{
        return getDoc(docRef).then((doc) => {
            return doc.data()
        })
    }).catch((error) => {
        console.log("Error adding new user: ", error);
    })
}

/**
 * updates information on a user
 * 
 * @param {String} userID ID of user to be updated
 * @param {Object} options List of user properities to change
 * 
 * @returns {DocumentReference} updated user object
 */
export const updateUser = async (userID, options) => {
    const docRef = doc(db, "users", userID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
        return updateDoc(docRef, options).then(() => getUser(userID, true))
    } else {
        console.log("No such document!");
    }
}

/**
 * checks if a specific userID is registered on the Firebase user collection
 * 
 * @param {String} userID ID of user being check
 * @returns {Boolean} if the user exists in Firestore or not
 */
export const doesUserExist = async (userID) => {
    const docRef = doc(db, "users", userID)
    const docSnap = await getDoc(docRef)
    return docSnap.exists()
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
export const getUser = async (userID, updateLastOnline) => {
    const docRef = doc(db, "users", userID)
    // Logs the user activity for lastOnline
    if (updateLastOnline)
        await updateDoc(docRef, {lastOnline: Timestamp.now()})
    // returns the user, appending the userID to the data
    const user = await getDoc(docRef)
    if (user.exists()) {
        const data = user.data()
        data.id = userID
        return data
    } else {
        console.error("Error getting user");
    }
}