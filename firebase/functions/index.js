const functions = require('firebase-functions')
const algoliasearch = require('algoliasearch')

// load in env
// get API Keys from https://www.algolia.com/apps/80R55RX4B0/api-keys/all
const env = require('./env.json')
const ALGOLIA_ADMIN_KEY = env.ALGOLIA_ADMIN_KEY
const ALGOLIA_ID = env.ALGOLIA_ID

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

/* Create Artifacts in Algolia */
exports.onArtifactCreate = functions.firestore
  .document('/artifacts/{artifactId}')
  .onCreate((snap, context) => {
    // Get the artifact
    const artifact = snap.data()
    // Add an 'objectID' field which Algolia requires
    artifact.objectID = context.params.artifactId
    // Write to the algolia index
    return client.initIndex(ALGOLIA_INDEX_NAME).saveObject(artifact)
  })

/* Update Artifacts in Algolia */
exports.onArtifactUpdated = functions.firestore
  .document('/artifacts/{artifactId}')
  .onUpdate((change, context) => {
    // Get the artifact after the change
    const artifact = change.after.data()
    // Add an 'objectID' field which Algolia requires
    artifact.objectID = context.params.artifactId
    // Write to the algolia index, updating it
    return client.initIndex(ALGOLIA_INDEX_NAME).saveObject(recipe)
  })

/* Delete Artifacts from Algolia */
exports.onArtifactDeleted = functions.firestore
  .document('/artifacts/{artifactId}')
  .onDelete((snap, context) =>
    client.initIndex(ALGOLIA_INDEX_NAME).deleteObject(context.params.artifactId)
  )
