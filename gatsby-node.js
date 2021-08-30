const firebase = require('firebase-admin');
const crypto = require('crypto');
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const getDigest = id =>
  crypto
    .createHash('md5')
    .update(id)
    .digest('hex');

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
    const { createNode } = actions
  
    types = [
        {
          type: 'User',
          collection: 'Users',
          map: doc => ({
            name: doc.name,
            email: doc.email,
            lastOpenedOrganization___NODE: doc.lastOpenedOrganization.id,
            notificationMode: doc.notificationMode,
            profilePicture: doc.profilePicture,
            phoneNumber: [doc.phoneNumber.number, doc.phoneNumber.type],
            organizations___NODE: doc.organizations.map(org => org.id),
          }),
        },
        {
          type: 'Organization',
          collection: 'Organizations',
          map: doc => ({
            name: doc.name,
            description: doc.description,
            profilePicture: doc.profilePicture,
            admin___NODE: doc.admin.id,
            members___NODE: doc.members.map(user => user.id),
          }),
        },
    ]

    firebase.initializeApp({ credential: firebase.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
    })});
    const db = firebase.firestore();

    const promises = types.map(
    async ({ collection, type, populate, map = node => node }) => {
        const snapshot = await db.collection(collection).get();
        for (let doc of snapshot.docs) {
        const contentDigest = getDigest(doc.id);
        const node = createNode(
            Object.assign({}, map(doc.data()), {
            id: doc.id,
            parent: null,
            children: [],
            internal: {
                type,
                contentDigest,
            },
            })
        );

        Promise.resolve();
        }
    }
    );

    await Promise.all(promises);

    return;
  }