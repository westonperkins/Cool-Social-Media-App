const mongoose = require('../db/connection')

const mediaSchema = new mongoose.Schema(
    {
        text: {type: Boolean, required: true},
        content: String,

        gif: {type: Boolean, required: true},
        video: {type: Boolean, required: true},
        image: {type: Boolean, required: true},
        imageCapture: {type: Boolean, required: true},
        datePosted: { type: Date, default: Date.now },
        url: String,

    },
    { timestamps: true },
)

const Media = mongoose.model('Media', mediaSchema)
module.exports = Media