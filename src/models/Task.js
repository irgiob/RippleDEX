import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import {getFirestore, doc, setDoc, getDoc, updateDoc, Timestamp} from "firebase/firestore"

const db = getFirestore(firebase)


/**
 * creates a new task (in the context of Firestore)
 * 
 * @param {String} taskName name of task to be created
 * @param {String} taskID ID of task to be created
 * @param {String} taskDesc the description of task to be created
 * @param {String} taskName the name of the task to be created
 * @param {String} orgID the ID of organizaiton to contain the task
 * 
 * @returns {DocumentReference} new task just created
 */
export const createNewTask = async( dealID, taskDesc, taskName, orgID) => {
    const docRef = doc(db, "tasks")
    return setDoc(docRef, {
        deal: dealID,
        name: taskName,
        description: taskDesc,
        status: " ",
        company: [],
        interactions : [],
        assignedUsers: [],
        forOrganization : orgID
    }).then(()=>{
        return getTask(docRef.id);
    }).catch((error) => {
        console.log("Error adding new task: ", error);
    })
}

/**
 * updates information on a task
 * 
 * @param {String} taskID ID of task to be updated
 * @param {Object} options List of task properities to change
 * 
 * @returns {DocumentReference} updated task object
 */
export const updateTask = async (taskID, options) =>{
    const docRef = doc(db, "tasks", taskID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
        return updateDoc(docRef, options).then(() => getTask(taskID))
    } else {
        console.log("No such document!");
    }
}


/**
 * gets all tasks based on organizaiton ID
 * 
 * @param {String} orgID ID of the organizaiton
 * 
 * @returns {Object} the list of all tasks
 */
 export const getTasksByOrg = async (orgID) => {
    const q = query(collection(db, "tasks"), where("forOrganization", "==", orgID));
    const querySnapshot = await getDocs(q);
    const taskList = [];
    querySnapshot.forEach((task) => {
        taskList.push(getTask(task.id));
        return taskList
}).catch((error) => {
    console.error("Error getting tasks: ", error);
});
 }

/**
* gets task based on task ID
* 
* @param {String} taskID ID of the task
*
* @returns {DocumentReference}
*/
export const getTask = async (taskID) =>{
    const docRef = doc(db, "tasks", taskID)    
    return getDoc(docRef).then((task) => {
        const data = task.data()
        data.id = taskID
        return data
    }).catch((error) => {
        console.error("Error getting task: ", error);
    });


}

/**
 * Delete task
 * 
 * @param {String} taskID ID of the task
 * 
 * @returns {DocumentReference}
 */
 export const deletetask = async (taskID) => {
    const docRef = doc(db, "tasks", taskID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
        return await deleteDoc(docRef);
    } else {
        console.log("No such document!");
    }
}
