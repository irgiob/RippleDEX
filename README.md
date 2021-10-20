<h1 align="center">
  <img src="src/images/RippleDex1.png" width="150px"/><br/>
  RippleDEX
</h1>

[RippleDEX](https://ripple-dex.web.app/) is an online Customer Relationship Manager (CRM) built with **functionality and user experience** in mind. Manage multiple workspaces, deals, companies, contacts, tasks, and meetings all in one place.

<hr/>

## Dependencies

Before cloning and attempting to run this code, you will need:

- Node (npm)
- Firebase CLI (Optional, for deployment only)
- Git (Optional, repo can also be downloaded as .zip)
- Gatsby CLI (Optional)

<br/>

## Getting Started

1. clone this repo to your device.
2. run `npm install`, assuming you have node installed on your device.
3. Create a new firebase project in the [Firebase Console](https://console.firebase.google.com/) and activate Authentication, Firestore (w/ rules optionally), and Storage. To troubleshoot, please view Firebase's own documentation.
4. run `touch .env` to generate a environment file
5. go to your Firebase project's settings, copy the project keys, and paste them into the .env file you created
6. run `npm start` to develop on localhost:8000, or run `npm run build` followed by `npm run serve` to run a more optimized version at localhost:9000

<br/>

## Deployment

You can deploy this site to any hosting platform of your choice, but this project recommends Firebase Hosting, as this will allow you to connect your hosting to the Firebase project used in the Getting Started section. Note that you need to run `npm run build` before you can deploy the site. To deploy your local copy of this repository:

1. if you haven't already, run `firebase login` to login to your google account with your Firebase Project for this app
2. run `firebase init hosting` and follow the instructions given (making sure to select the appropriate Firebase Project)
3. run `firebase deploy --only hosting` to deploy your site to the URLs <PROJECT_ID>.web.app and <PROJECT_ID>.firebaseapp.com. You can find your Project ID in the project settings page in the Firebase console.

For further hosting configuration (such as setting up a custom domain), please view Firebase's own documentation.

<br/>

## Features

<details>
  <summary>User and Profile</summary>
  
  * Sign up using either email & password or Google sign-in
  * Email verification
  * Password resetting (both logged and not logged in)
  * Account Session Protection: logged out on tab close
  * Choose and customize name, number, position (per workspace), profile picture, and online visibility (invisble or visible)
</details>
<details>
  <summary>Workspaces</summary>
  
  * Supports multiple workspaces per account
  * Create new workspaces and invite others by email
  * Accept or decline workspace invitations, or leave already joined workspaces
  * Admin can customize workspace name, description, and profile picture
</details>
<details>
  <summary>Data Table Pages</summary>
  
  * Deals Page: Organize your deals & sales, and track your progress from the different stages from lead all the way to closed
  * Companies Page: Manage the companies you work with and potential new leads
  * Contacts Page: Add contacts for your companies and identify customers to manage
  * Interactions Page: Schedule and manage meetings with your contacts to persue leads and close deals
</details>
<details>
  <summary>Special Pages</summary>
  
  * Welcome Page: Helps you get started with getting your emailed verified, creating your first workspace, or joining an existing workspace
  * Dashboard Page: Quick home page per workspace that shows your daily meetings and statistics regarding your deals
  * Calendar Page: View your interactions in calendar format to help plan and schedule your meetings relative to others
  * Tasks Page: Create a kanban board to organize the tasks you have to do for each deal. Create kanban lanes and assign tasks to specific deals and workspace members
</details>

<br/>

## Tech Stack

- Web Framework: SSG using Gatsby
- Frontend: React
- Backend: Firebase (Authentication, Database, & File Upload)
- Testing: Jest and Babel
- CI: Github Actions (used for automated testing and deployment)

<br/>

## Frontend

### Pages

`src/pages`
These files each have one exported React component that gets converted into the website's endpoints using Gatsby's Static Site Generator. Changes to individual pages can be made here.

### Componenets

`src/components` These files contain React components that are embedded into the page files. They perform specific functions like reusable widgets, popups, and elements that appear on every page.

<br/>

## Backend

### Data Models

`/src/models` Each of these files contain the CRUD functions (plus more specific functions) for each of the data models. Changes or additions to how the data is accessed and manipulated can be made here.

### Utilities

`/src/utils` These files are used to handle additional backend functionallity not related to the data models, primarily authentication and file uploading, as well as others.

<br/>

## Testing

`src/__tests__` These files contain all the tests to ensure the code is running as intended. They include unit, integration, and end-to-end testing, and can be run using `npm test`. Additions and modifications to test can be done here.

<br/>

## Contributors

<a href="https://github.com/irgiob">
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/53930437?v=4?s=100" width="50px"/>
</a>
<a href="https://github.com/fionajoyceline">
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/86419049?v=4?s=100" width="50px"/>
</a>
<a href="https://github.com/Wvww-git">
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/80228649?v=4?s=100" width="50px"/>
</a>
<a href="https://github.com/wilbertcargeson">
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/58966149?v=4?s=100" width="50px"/>
</a>
<a href="https://github.com/StephR1128">
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/54741960?v=4?s=100" width="50px"/>
</a>
<br/>

<br/>

## License

RippleDEX is licensed under the terms of the BSD Zero Clause License (0BSD) and is available as open-source and free.

<br/>

## Links

- [Website](https://ripple-dex.web.app/)
- [Documentation: Google Drive](https://drive.google.com/drive/u/2/folders/10l7JbdpvygHe7UQ4WtmQfIlt-nyAagsy) (Must request permission to view)
- [Documentation: Confluence](https://rippledex.atlassian.net/wiki/spaces/WAD/overview) (Must request permission to view)
- [Source Code](https://github.com/irgiob/RippleDEX)
