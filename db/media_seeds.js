const mediaData = require('./media_seeds.json')
const Media = require('../models/media_model.js')

Media.deleteMany({})
    .then(() => {
        return Media.insertMany(mediaData)
    })
    .then(console.log)
    .catch(console.error)
    .finally(() => {
        process.exit()
    })