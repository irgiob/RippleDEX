
import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import {
  getStorage,
  ref,
  uploadBytesResumable,
} from "@firebase/storage"

const storage = getStorage(firebase) // Middleware for firebase storage

/**
 * Gets the task when uploading files to firestore
 * @param {String} reference reference for the path, where it will be <reference>/<file.name>
 * @param {File} file the file to be uploaded
 * @returns {import("@firebase/storage").UploadTask}
 */
export const uploadFile = (reference, file) => {
  if (file != null) {
    const storageRef = ref(storage, reference + "/" + file.name)
    return uploadBytesResumable(storageRef, file)
  } else {
    alert("Make sure file is uploaded")
  }
}