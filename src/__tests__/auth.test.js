// Referenced from firebase documentation
// https://firebase.google.com/docs/functions/unit-testing

// The test will run the ONLINE version, make sure you are connected with the internet
// We will using another project called ripple-dex-test, ask Wilbert to give you access if you want to access via the console
// Please do not forget to obtain the new .env which contains the test variables and 
// the admin key, which both will be uploaded in the google drive.
// We will be using JEST
// The test will mainly check on the firestore functions

// Initialize SDK
const test = require("firebase-functions-test")({
    apiKey: process.env.TEST_API_KEY,
    authDomain:  process.env.TEST_AUTH_DOMAIN,
    projectId:  process.env.TEST_PROJECT_ID,
    storageBucket: process.env.TEST_STORAGE_BUCKET,
    messagingSenderId: process.env.TEST_MESSENGER_SENDER_ID,
    appId:  process.env.TEST_APP_ID
}, "../ripple-dex-test-key.json");

// Mock user object as it is difficult to access auth
const testCredential = {
    user : {
        email : "test@gmail.com",
        uid : "123456789"
    }
}


// Function to be tested
import { signup } from "../utils/AuthFunctions";
import {test as test1} from "../utils/Test"


describe ("Testing authentication passwords", () => {
    
    it("Test to make sure everything is working" , () => {
        expect(test1()).toBe(1);
    })
})

// describe ( "Testing authentication functions", () => {

//     beforeAll( () => {
        
//     })
//     describe ( "AUTH-001: Create account", () => {

//         beforeAll( () => {
//             const wrapped = test.wrap(signup);
            
//         })

//         it("Account is created in authentication", () => {
//             const wrapped = test.wrap(signup);
//         })

//         it("Account is created in database", () => {

//         })
//     })
// })



