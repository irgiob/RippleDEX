/**
 * This is the offline version, hence all of the functions that interacts directly
 * to firestore will be mocked. This is used temporarily
 */

import * as userFunctions from "../models/User";

import {getFirestore, doc, setDoc, getDoc, updateDoc} from "firebase/firestore"

jest.mock("firebase/firestore")

const sampleUser = {
    userName: "Alice123",
    userID: "12345678",
    userEmail: "alice@test.com",
    userPhoneNumber : "0488111222"
}

const sampleDoc = {
    data : function () {
        return {
            name: "Alice123",
            email: "alice@test.com",
            phoneNumber: ["Mobile","0488111222"],
            organizations: [],
            lastOpenedOrganization: null,
            profilePicture: null
        }
    },
    exists : function () { return true; }
}

const sampleError = "This is an error"


describe ("Ensure all packets are installed properly for test", () => {

    it("Test to make sure everything is working" , () => {
        expect(10+10).toBe(20);
    })

})

describe ( "Testing user functions", () => {

    beforeAll( () => {
        setDoc.mockResolvedValue()
    })

    afterEach( () => { jest.clearAllMocks(); })

    it("Account is created in database", async () => {
        getDoc.mockResolvedValue(sampleDoc)
        const returnValue = await userFunctions.createNewUser(sampleUser.userName, sampleUser.userID, sampleUser.userEmail, sampleUser.userPhoneNumber)
        expect(returnValue.name).toBe(sampleUser.userName);
        expect(setDoc).toBeCalledTimes(1);
        expect(getDoc).toBeCalledTimes(1);
    })

    it("Account creation failed", () => {
        getDoc.mockRejectedValue(sampleError);
        const _ = userFunctions.createNewUser(sampleUser.userName, sampleUser.userID, sampleUser.userEmail, sampleUser.userPhoneNumber)
        expect(setDoc).toBeCalledTimes(1); 
        expect(getDoc).toBeCalledTimes(0); 
    })

    
    it(" Update existing document", async () => {
        getDoc.mockResolvedValue(sampleDoc)
        const returnValue = await userFunctions.updateUser("",sampleDoc.data.userID,"")
        expect(updateDoc).toBeCalledTimes(1);
    }) 

    it("Account update failed", async () => {
        const errorDoc = sampleDoc;
        errorDoc.exists = function(){return false;}
        getDoc.mockResolvedValue(errorDoc);
        const returnValue = await userFunctions.updateUser("",sampleDoc.data.userID,"")
        expect(updateDoc).toBeCalledTimes(0);
    })


    it(" Update existing document", async () => {
        getDoc.mockResolvedValue(sampleDoc)
        await userFunctions.updateUserNotificationSettings(sampleDoc.data.userID, 0)
        expect(updateDoc).toBeCalledTimes(1);
        
    }) 
})