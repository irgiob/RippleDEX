import firebase from "../../plugins/gatsby-plugin-firebase-custom"
import {getFirestore, doc, getDoc, updateDoc, collection, query, where, getDocs, doc, deleteDoc, addDoc}  from "firebase/firestore"

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
export const createNewCompany = async (orgID, companyName, companyDesc, companyWeb, personnel,annualRevenue, relationship, companyAddress, primaryContact) =>{
    const docRef = await addDoc(collection(db, "organizations"),{
        registeredBy: orgID,
        name: companyName,
        description: companyDesc,
        website: companyWeb,
        personnel: personnel,
        annualRevenue : annualRevenue,
        address: companyAddress,
        relationship: relationship,
        primaryContact: primaryContact,
    })
    return docRef.id
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
    return await updateDoc(docRef, options)
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
    for await (const company of querySnapshot) {
        const data = company.data()
        data.id = company.id
        companyList.push(data)
    }
    return companyList
}

/**
 * gets company based on its ID
 * 
 * @param {String} companyID ID of the company
 * 
 * @returns {DocumentReference}
 */
 export const getCompany = async (companyID) =>{
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
    return await deleteDoc(docRef)
}


