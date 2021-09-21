import { init, send } from 'emailjs-com'

// Intended to be added as environmental variables when available
const userID = "user_87aTOH0aFmEJe7pujkavs"
const templateID = "template_i9actum"
const serviceID = "service_85qavfs"

init(userID)

/**
 * Sends email to the targeted email address
 * IMPORTANT: WE HAVE VERY LIMITED QUOTA ON THIS, DO NOT SPAM THIS, IT IS TESTED TO WORK PROPERLY GIVEN
 * THE PROPER PARAMETERS
 * @param {string} organizationName the name of the organization inviting
 * @param {string} to_name the name of recipient
 * @param {string} to_email email of the recipient
 */
export const composeEmail = (organizationName, to_name, to_email) => {
    const templateParams = {
        organization_name : organizationName,
        to_name : to_name,
        to_email : to_email
    }

    send(serviceID, templateID, templateParams)
    .then((res)=>{
        console.log("EMAIL SENT!")
        console.log(res)
    })
}

