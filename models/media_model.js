const mongoose = require('../db/connection')

const mediaSchema = new mongoose.Schema(
    {
        text: String,
        url: String,
        uploads: { data: Buffer, contentType: String }
    },
    { timestamps: true },
)

const Media = mongoose.model('Media', mediaSchema)
module.exports = Media