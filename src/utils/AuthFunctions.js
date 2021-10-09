import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  browserSessionPersistence,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth"

import { createNewUser, doesUserExist } from "../models/User"

/**
 * @param {String} name
 * @param {String} email
 * @param {String} password
 * @param {String} phoneNumber
 * @returns {User} User ID, if doesnt exists returns null
 */
export async function signup(
  firstName,
  lastName,
  email,
  password,
  phoneNumber
) {
  const auth = getAuth(firebase)
  auth.setPersistence(browserSessionPersistence)
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async userCredential => {
      const userID = userCredential.user.uid
      await updateProfile(userCredential.user, {
        displayName: firstName + " " + lastName,
      })
      await sendVerificationEmail(userCredential.user)
      return createNewUser(
        firstName,
        lastName,
        userID,
        email,
        phoneNumber,
        null
      )
    })
    .catch(error => {
      console.log("Error signing up: ", error)
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
  auth.setPersistence(browserSessionPersistence)
  return signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const userID = userCredential.user.uid
      return userID
    })
    .catch(error => {
      console.log("Login failed")
      console.log(error.message)
      return null
    })
}

/**
 * runs callback function on user load
 *
 * @param {function} isLoggedIn function that gets run when user loads
 * @param {function} isNotLoggedIn function that runs if user is not logged in
 */
export function onAuthLoad(isLoggedIn, isNotLoggedIn) {
  const auth = getAuth(firebase)
  var unsubscribe = onAuthStateChanged(auth, user => {
    if (user) {
      isLoggedIn(user)
      unsubscribe()
    } else {
      isNotLoggedIn()
      unsubscribe()
    }
  })
}

/**
 * Signs in using Google Account via popup
 */
export async function signInGoogle() {
  const auth = getAuth(firebase)
  auth.setPersistence(browserSessionPersistence)
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
    .then(async result => {
      const userID = result.user.uid
      const firstName = result.user.displayName
        .split(" ")
        .slice(0, -1)
        .join(" ")
      const lastName = result.user.displayName.split(" ").slice(-1).join(" ")
      const email = result.user.email
      const number = result.user.phoneNumber
      const profilePicture = result.user.photoURL.split("=")[0] + "=s400-c"
      const userExists = await doesUserExist(userID)
      if (!userExists) {
        return createNewUser(
          firstName,
          lastName,
          userID,
          email,
          number,
          profilePicture
        )
      } else {
        return userID
      }
    })
    .catch(err => {
      console.log(err)
      return null
    })
}

/**
 * sends a verification email to the user
 * @param {User} user firebase auth user object, provided or use default
 */
export async function sendVerificationEmail(user = null) {
  const auth = getAuth()
  return user
    ? sendEmailVerification(user)
    : sendEmailVerification(auth.currentUser)
}

/**
 * Signs out current user
 * @returns {firebase.auth.signOut}
 */
export function logout() {
  const auth = getAuth(firebase)
  return signOut(auth)
}
