/**
 * This is the offline version, hence all of the functions that interacts directly
 * to firestore will be mocked. This is used temporarily
 */

import * as userFunctions from "../models/User";
import {test as test1} from "../utils/Test"
import {getFirestore, doc, setDoc, getDoc, updateDoc} from "firebase/firestore"


const sampleUser = {
    userName: "Alice123",
    userID: "12345678",
    userEmail: "alice@test.com",
    userPhoneNumber : "0488111222"
}

// const sampleDoc = {
//     name: "Alice123",
//     email: userEmail,
//     phoneNumber: ["Mobile",userPhoneNumber],
//     organizations: [],
//     lastOpenedOrganization: null,
//     profilePicture: null
// }


describe ("Ensure all packets are installed properly for test", () => {

    it("Test to make sure everything is working" , () => {
        expect(test1()).toBe(1);
    })

})

// describe ( "Testing user functions", () => {

//     beforeAll( () => {

//     })
//     describe ( "AUTH-001: Create account", () => {

//         beforeAll( () => {
//             // Mock firestore functions
//             doc = jest.fn().mockReturnValue({});

//         })

//         it("Account is created in database", async () => {

//         })
//     })
// })