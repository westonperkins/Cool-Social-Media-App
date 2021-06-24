const mongoose = require('../db/connection')

const mediaSchema = new mongoose.Schema(
    {
        text: String,
        url: String,
        imageUpload: { data: Buffer, contentType: String },
        upload: Boolean,
        name: String,
        caption: String,
        flag: { type: Number, min: 0, max: 5, default: 0},
    },
    { timestamps: true },
)

const Media = mongoose.model('Media', mediaSchema)
module.exports = Media