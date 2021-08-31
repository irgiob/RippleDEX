import firebase from "gatsby-plugin-firebase"
import "firebase/auth";

const UserModel = require("../models/User")

export const auth = firebase.auth();


/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns {firebase.User.uid} User ID, if doesnt exists returns null
 */
function signup(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
  .then( (userCredential) => {
    const userID = userCredential.user.uid;
    UserModel.createNewUser(firebase.database, userID);
    return userID
  })
  .catch( () => { return null } )
}

/**
 * Logs in the user
 * @param {String} email 
 * @param {String} password 
 * 
 * @returns {firebase.User.uid} User ID, if doesnt exists returns null
 */
function login(email, password) {

  auth.signInWithEmailAndPassword(email, password)
  .then( (userCredential) => {
    const userID = userCredential.user.uid;
    console.log(userID);
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


