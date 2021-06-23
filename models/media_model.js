const mongoose = require('../db/connection')

const mediaSchema = new mongoose.Schema(
    {
        text: String,
        url: String,
        imageUpload: { data: Buffer, contentType: String },
        upload: Boolean,
        name: String,
        flags: Number,
    },
    { timestamps: true },
)

const Media = mongoose.model('Media', mediaSchema)
module.exports = Media