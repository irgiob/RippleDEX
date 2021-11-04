import React from "react"
import { render, fireEvent, act, waitFor, document } from "@testing-library/react"
import { createNewDeal } from "../../models/Deal"
import TaskPopUp from "../../components/tasks/taskPopup"
import * as taskFunctions from "../../models/Task"


jest.mock("../../models/Task")


const selected= {
  id: "12345",
  deal: "111222",
  name: "test",
  description: "test",
  status: "test",
  assignedUser: "12345",
  forOrganization: "1234567",
}

describe("Integration testing for task components", () => {
    afterEach(() => {
      jest.resetAllMocks()
    })

    test("Pressing 'Add' button will allow bring out fields for input", async() =>{
    
      taskFunctions.updateTask = jest.fn().mockReturnValue({})

      const { getByTestId } = render(
        <TaskPopUp 
          selected={selected}
          setSelected={() => {}}
          companies={{}}
          members={{}}
          deals={{}}
          org={{}}
          afterUpdate={() => {}}/>)
       
      const nameInput = getByTestId("taskName")
      const addButton = getByTestId("addButton")

      expect(nameInput.value).toBe("")

      fireEvent.change(nameInput, { target: { value: "test" } })

      expect(nameInput.value).toBe("test")

      fireEvent.click(addButton)

      await waitFor(() => {
        expect(taskFunctions.updateTask).toBeCalledTimes(1)
      })



    })
})