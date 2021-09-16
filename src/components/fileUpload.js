import React, { useState, useEffect } from "react"

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  CircularProgress,
  Image
} from "@chakra-ui/react"

import firebase from "../../plugins/gatsby-plugin-firebase-custom";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "@firebase/storage";

const storage = getStorage(firebase); // Middleware for firebase storage

/**
 * Gets the task when uploading files to firestore
 * @param {String} reference reference for the path, where it will be <reference>/<file.name>
 * @param {File} file the file to be uploaded
 * @returns {import("@firebase/storage").UploadTask}
 */
const uploadFile = (reference, file) => {
    if ( file != null){
        const storageRef = ref(storage, reference+"/"+file.name);
        return uploadBytesResumable(storageRef, file)
    }
    else {
        alert ("Make sure file is uploaded")
    }
}

/**
 * Sets the image state as the file selected
 */
const UploadImageButton = () => {

    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [uploadedURL, setUploadedURL] = useState("")

    const [isSelected, setSelected] = useState(false)
    const [inProgress, setInProgress] = useState(false)
    const [isUploaded, setUploaded] = useState(false)

    const reference = "images" // the folder path in the firestore storage

    // Handler for when the user selects a file
    const onImageChange = (e) => {
        const reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.onload = () => {
                if (reader.readyState === 2){
                    console.log(file)
                    setImage(file)
                    setSelected(true)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else {
            setImage(null)
        }
    } 

    const handleClick = () => {

        const uploadTask = uploadFile(reference,image)
        if (uploadTask == null ){
            alert("Make sure file is uploaded")
            return;
        }
        uploadTask.on("state_changed", 
        
            // Observer state when image is uploading
            (snapshot) => {
                setInProgress(true)
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress)
            },

            // File upload has failed
            (error) => {
                console.log(error)
            },

            // File upload is successfull
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    // Attach to required document ... 
                    setUploaded(true)
                    setUploadedURL(url)
                })
            }
        )
    }
  

  return (
    <>
        <Box
            style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }}
        >
            <Input
                type = "file"
                accept = "image/x-png,image/jpeg"
                onChange={e => onImageChange(e)}
            />
            <Button
                value = "Upload file"
                type = "Submit"
                disabled = {!isSelected}
                hidden = {!isSelected}
                onClick={handleClick}
            > Upload File </Button>
            <CircularProgress
                value={progress}
                max="100"
                hidden = {!inProgress}
            />
            <Image
                hidden = {!isUploaded}
                src = {uploadedURL}
                alt = "Uploaded image"
            />
        </Box>
        
    </>
  )
}

export default UploadImageButton

