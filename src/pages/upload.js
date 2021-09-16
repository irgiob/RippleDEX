import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import UploadImageButton from "../components/fileUpload"

const Upload = () => {
  return (
    <Layout>
      <UploadImageButton folderPath={"test"} />
    </Layout>
  )
}
export default Upload
