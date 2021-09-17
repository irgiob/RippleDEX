import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { Image } from "@chakra-ui/image"
import UploadImageButton from "../components/uploadImageButton"

const Upload = () => {

  const [url, setUrl] = useState('')
  const getUrl = (newUrl) => {
    setUrl(newUrl)
  }

  return (
    <Layout>
      <UploadImageButton changeUrl={getUrl} buttonMessage={"Upload photo"}/>
      <Image src={url}/>
    </Layout>
  )
}
export default Upload
