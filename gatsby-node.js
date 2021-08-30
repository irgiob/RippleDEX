const firebase = require("firebase-admin")
const crypto = require("crypto")
const model = require("./src/models/model")
require("dotenv").config({
  path: `.env`,
})

const getDigest = id => crypto.createHash("md5").update(id).digest("hex")

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  types = model.Types

  firebase.initializeApp({
    credential: firebase.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  })
  const db = firebase.firestore()

  const promises = types.map(
    async ({ collection, type, populate, map = node => node }) => {
      const snapshot = await db.collection(collection).get()
      for (let doc of snapshot.docs) {
        const contentDigest = getDigest(doc.id)
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
        )

        Promise.resolve()
      }
    }
  )

  await Promise.all(promises)

  return
}
