import firebase from "gatsby-plugin-firebase"
import "firebase/auth";
import { createNewUser } from "../models/User"

const auth = firebase.auth();

/**
 * @param {String} name
 * @param {String} email 
 * @param {String} password 
 * @param {String} phoneNumber
 * @returns {User} User ID, if doesnt exists returns null
 */
async function signup(name, email, password,phoneNumber) {
  return auth.createUserWithEmailAndPassword(email, password)
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
function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
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
function isLoggedIn() {
  if (auth.currentUser) { return auth.currentUser ; }
  return null;
}

/**
 * Signs in using Google Account via popup
*/
function signInGoogle(){
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
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
function logout() {
  return auth.signOut()
}

function resetPassword(email) {
  return auth.sendPasswordResetEmail(email)
}

function updateEmail(email) {
  return auth.currentUser.updateEmail(email)
}

function updatePassword(password) {
  return auth.currentUser.updatePassword(password)
}



export {
  login,
  signup,
  logout,
  resetPassword,
  isLoggedIn,
  updateEmail,
  updatePassword,
  signInGoogle
}


