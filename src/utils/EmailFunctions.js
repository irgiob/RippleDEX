import { init, send } from "emailjs-com"

const userID = process.env.EMAILJS_USER_ID
const templateID = process.env.EMAILJS_TEMPLATE_ID
const serviceID = process.env.EMAILJS_SERVICE_ID

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
    organization_name: organizationName,
    to_name: to_name,
    to_email: to_email,
  }

  send(serviceID, templateID, templateParams).then(res => {
    console.log("EMAIL SENT!")
    console.log(res)
  })
}
