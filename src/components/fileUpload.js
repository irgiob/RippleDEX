import React, { useState, useEffect } from "react"

import {
  Box,
  Button,
  Input,
  Text,
  CircularProgress,
  Center,
  Image,
  VStack,
  Progress,
  HStack,
} from "@chakra-ui/react"


import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "@firebase/storage"

import Pic from "../images/Upload/upload.png"
import { FiUpload } from "react-icons/fi"
import { MdCancel } from "react-icons/md"

const storage = getStorage(firebase) // Middleware for firebase storage

/**
 * Gets the task when uploading files to firestore
 * @param {String} reference reference for the path, where it will be <reference>/<file.name>
 * @param {File} file the file to be uploaded
 * @returns {import("@firebase/storage").UploadTask}
 */
const uploadFile = (reference, file) => {
  if (file != null) {
    const storageRef = ref(storage, reference + "/" + file.name)
    return uploadBytesResumable(storageRef, file)
  } else {
    alert("Make sure file is uploaded")
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
  // const [uploadTask, setTask] = useState(null);

  // Handler for when the user selects a file
  const onImageChange = e => {
    const reader = new FileReader()
    let file = e.target.files[0]
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          console.log(file)
          setImage(file)
          setSelected(true)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      setImage(null)
    }
  }

  // Handle when file upload button is clicked
  const handleClick = () => {
    const uploadTask = uploadFile(reference, image)
    if (uploadTask == null) {
      alert("Make sure file is uploaded")
      return
    }
    setInProgress(true)
    uploadTask.on(
      "state_changed",

      // Observer state when image is uploading
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },

      // File upload has failed
      error => {
        
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            console.log("Upload canceled")
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }

        setProgress(false)
        setUploaded(false)
      },

      // File upload is successfull
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
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
        pos="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
      >
        <Box
          align="center"
          pos="absolute"
          left="50%"
          top="38%"
          transform="translate(-50%, -50%)"
        >
          <Image h="200px" src={Pic} />
        </Box>
        <Input
          pt="260px"
          pl="200px"
          h="400px"
          w="600px"
          type="file"
          accept="image/x-png,image/jpeg"
          onChange={e => onImageChange(e)}
        />
        <Box
          align="center"
          pos="absolute"
          left="50%"
          top="82%"
          transform="translate(-50%, -50%)"
        >
          <Text hidden={isSelected} color="gray.400">
            Choose a file or drag it here
          </Text>
          <VStack>
            <Button
              bgColor="ripple.200"
              color="white"
              fontFamily="Raleway-Bold"
              borderRadius="30px"
              variant="solid"
              size="md"
              leftIcon={<FiUpload />}
              _hover={{ transform: "scale(1.05)" }}
              value="Upload file"
              type="Submit"
              disabled={!isSelected}
              hidden={!isSelected || inProgress}
              onClick={handleClick}
            >
              Upload File
            </Button>
          </VStack>
        </Box>
        <Progress value={progress} max="100" colorScheme="cyan" />
      </Box>
    </>
  )
}

export default UploadImageButton
