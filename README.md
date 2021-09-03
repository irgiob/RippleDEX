# RippleDEX CRM

Hey team! Gio here. This repo might be confusing if you're not experienced since it uses Gatsby for the build and deploy workflow. I'll get you up to speed on how you can get the web app running on your localhost!

## Getting Started

Here's what you need to do to get this repo running on your local machine:

1. clone this repo to your device.
2. run `npm install`, assuming you have node installed on your device.
3. once you have the dependancies installed, you'll need to download the enviornment file `.env.development` from our team Google Drive. This contain the credentials to allow the app to access the database from your local device.
4. after all that, simply run `npm start`, wait a bit, then you should be able to access the web app at localhost:8000. Happy coding!

## For Frontend

If you're on the front-end team, the folders you'll mostly be working in are `/components` and `/pages`. Pages are dynamically generated using Gatsby and GraphQL, so the actual coding is for the React templates that use the data from graphQL. Another thing to mention is that this project uses Sass instead of plain CSS. More info coming soon.

## For Backend

The back-end team mostly works in the `/models` folder, where functions to create, access and modify data objects are written. Since we're using Gatsby, our data pipeline is supplemented by GraphQL, which makes accessing the data pretty easy. For accessing data, we will mostly be writing GraphQL queries to access different levels of data for different use cases. If you would like a demo of these GraphQL queries, you can see them at [localhost:8000/\_\_\_graphql](localhost:8000/___graphql). Besides that, we will also be focused on writing the functions to create and modify data. There will be a specific format to writing these functions and the tests associated with them. More info on this coming soon.


## Authentication

Hey yall, I've added authentication to out web app, here are some information to ease development:

`/utils/AuthFunctions ` - Contains the main authentication functions to be used in Components and Pages, includes:

1. Sign Up
2. Log in
3. Log in via Google
4. Sign out

### Backend 
Funtions 1 to 3 returns User ID of the authenticated user, please use this as user identifier for the database

### Frontend
Please edit these components/pages

- [ ] Login component and page
- [ ] Sign up component and page
- [ ] Profile page

### For me - Wilbert
TO DO:
1. Change password and email function
2. Implement more GraphQL

Feel free to add more

## Testing

WORK IN PROGRESS
