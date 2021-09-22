import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import {getFirestore, doc, setDoc, getDoc, updateDoc, Timestamp,collection, query, where, getDocs, doc, deleteDoc,addDoc,  }  from "firebase/firestore"

const db = getFirestore(firebase)



/**
 * creates new company
 * 
 * @param {String} orgID ID of organization registering the company
 * @param {String} companyName the name of the company being created
 * @param {String} companyDesc description of the company
 * @param {String} companyWeb the website of the company being created 
 * @param {Integer} personnel the personnel of the company 
 * @param {Float} annualRevenue the annual revenue of the company 
 * @param {Object} companyAddress the address of the company 
 * @param {String} contactID the primary contact of the company 
 * 
 * 
 * @return {DocumentReference} newly created company 
 */
export const createNewCompany = async (orgID, companyName, companyDesc, companyWeb, personnel,annualRevenue, companyAddress,contactID) =>{
    const docRef = await addDoc(collection(db, "organizations"),{
        registeredBy: orgID,
        name: companyName,
        description: companyDesc,
        website: companyWeb,
        personnel: personnel,
        annualRevenue : annualRevenue,
        address: companyAddress,
        relationship: null,
        primaryContact: contactID,
        contactID: null
    }).then(()=>{
        return await getCompany(docRef.id);
    }).catch((error) => {
        console.log("Error adding new company: ", error);
    })

}



/**
 * updates information on company
 * 
 * @param {String} companyID ID of company to be updated
 * @param {Object} options List of company properities to change
 * 
 * @returns {DocumentReference} updated company object
 */
export const updateCompany = async (companyID, options) =>{
    const docRef = doc(db, "companies", companyID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
        return updateDoc(docRef, options).then(() => getCompany(companyID))
    } else {
        console.log("No such document!");
    }
}

/**
 * gets all companies based on organizaiton ID
 * 
 * @param {String} orgID ID of the organizaiton
 * 
 * @returns {Object} the list of all companies
 */
 export const getCompanyByOrg = async (orgID) => {
    const q = query(collection(db, "companies"), where("registeredBy", "==", orgID));
    const querySnapshot = await getDocs(q);
    const companyList = [];
    querySnapshot.forEach((company) => {
        companyList.push(getCompany(company.id));
        return companyList
}).catch((error) => {
    console.error("Error getting companies: ", error);
});
}

/**
 * gets company based on its ID
 * 
 * @param {String} companyID ID of the company
 * 
 * @returns {DocumentReference}
 */
 export const getContact = async (companyID) =>{
    const docRef = doc(db, "companies", companyID)    
    return getDoc(docRef).then((company) => {
        const data = company.data()
        data.id = companyID
        return data
    }).catch((error) => {
        console.error("Error getting company: ", error);
    });

}

/**
 * Delete the existing company
 * 
 * @param {String} companyID ID of the company
 * 
 * @returns {DocumentReference}
 */
 export const deleteComapny = async (companyID) => {
    const docRef = doc(db, "companies", companyID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()){
        return await deleteDoc(docRef);
    } else {
        console.log("No such document!");
    }
}


