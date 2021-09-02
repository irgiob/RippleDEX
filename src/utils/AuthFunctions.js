import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import { createNewUser } from "../models/User"

/**
 * @param {String} name
 * @param {String} email 
 * @param {String} password 
 * @param {String} phoneNumber
 * @returns {User} User ID, if doesnt exists returns null
 */
export async function signup(name, email, password,phoneNumber) {
  const auth = getAuth(firebase)
  return createUserWithEmailAndPassword(auth, email, password)
  .then( (userCredential) => {
    const userID = userCredential.user.uid
    return createNewUser(name, userID, email, phoneNumber)
  })
  .catch((error) => { 
    return null 
  })
}

/**
 * Logs in the user
 * @param {String} email 
 * @param {String} password 
 * 
 * @returns {firebase.User.uid} User ID, if doesnt exists returns null
 */
export async function login(email, password) {
  const auth = getAuth(firebase)
  return signInWithEmailAndPassword(auth, email, password)
  .then( (userCredential) => {
    const userID = userCredential.user.uid;
    return userID;
  })
  .catch( (error) => {
    console.log("Login failed");
    console.log(error.message)
    return null;
  })
}

/**
 * 
 * @returns {firebase.User.uid} current user ID
 */
export function isLoggedIn() {
  const auth = getAuth(firebase)
  console.log("A", auth.currentUser)
  return auth.currentUser
}

/**
 * Signs in using Google Account via popup
*/
export async function signInGoogle(){
  const auth = getAuth(firebase)
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
  .then( (result) => {
    const userID = result.user.uid;
    console.log("Google log in")
    console.log(userID);
    return userID;
  })
  .catch( (err) => {
    console.log(err)
    return null;
  })
}

/**
 * Signs out current user
 * @returns {firebase.auth.signOut}
 */
export function logout() {
  const auth = getAuth(firebase)
  return signOut(auth)
}