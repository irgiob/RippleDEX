import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { Heading } from "@chakra-ui/react"

const TasksPage = ({user, setUser, org, setOrg}) => {
  return (<>
      <Heading>Tasks for {org.name}</Heading>
  </>)
}

const Tasks = (props) => (
  <Layout location={props.location}>
    <Seo title="Tasks" />
    <TasksPage/>
  </Layout>
)

export default Tasks
