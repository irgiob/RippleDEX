import React, { useState, useEffect, useProps } from "react"

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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  useMediaQuery,
  ModalFooter
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
 * 
 * Sets the image state as the file selected
 * Props:
 * @property {funcion} changeUrl prop which contains a function to set the URL state 
 * @property {string} buttonText prop for text in the button 
 * @property {object} style prop for button style 
 */
const UploadImageButton = (props) => {

  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)

  const [isSelected, setSelected] = useState(false)
  const [inProgress, setInProgress] = useState(false)
  const [isUploaded, setUploaded] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  // const initialRef = React.useRef()
  // const finalRef = React.useRef()
  const [isLargeSize] = useMediaQuery("(min-width: 42em)")


  const reference = "images" // the folder path in the firestore storage

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
        getDownloadURL(uploadTask.snapshot.ref).then( url => {
          setUploaded(true)
          props.changeUrl(url)
          clearState()
          onClose()
        })
      }
    )
  }

  // When pop up is close, reset all states
  const clearState = () => {
    setImage(null)
    setProgress(0)
    setInProgress(false)
    setUploaded(false)
    setSelected(false)
  }

  return (
    <>
      <Button style={props.style} onClick={onOpen}>{props.buttonMessage}</Button>
      <Modal
        isOpen={isOpen} 
        onClose={onClose}
        isCentered
      >
        <ModalOverlay/>
        <ModalContent
          pos="absolute"
          top="15vh"
          maxW={!isLargeSize ? "90vw" : "500px"}
          borderRadius="20px"
          p="20px"
        >
          <ModalHeader>Upload photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          >
            <Box left="50%" top="50%">
                <Input
                  pt="260px"
                  h="300px"
                  w="400px"
                  top="25%"
                  align="center"
                  type="file"
                  accept="image/x-png,image/jpeg"
                  backgroundImage={Pic}
                  backgroundRepeat="no-repeat"
                  backgroundPosition="center"
                  backgroundSize='75%'
                  borderStyle="dashed"
                  onChange={e => onImageChange(e)}
                />
                <Text 
                  hidden={isSelected}
                  pt="10px"
                  color="gray.400" 
                  align="center" 
                >
                  Choose a file or drag it here
                </Text>
                <Progress value={progress} max="100" colorScheme="cyan" hidden={!inProgress} width="400px" />
              </Box>  
          </ModalBody>

            <ModalFooter>
              <Box
                  align="center"
                >
                  <VStack>
                    <Button
                      bgColor="ripple.200"
                      color="white"
                      fontFamily="Raleway-Bold"
                      borderRadius="50px"
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
            </ModalFooter>

        </ModalContent>
      </Modal>
      
    </>
  )
}

export default UploadImageButton
