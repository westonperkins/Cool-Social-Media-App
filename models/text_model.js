const { text } = require('express')
const mongoose = require('../db/connection')

const textSchema = new mongoose.Schema(
    {
        text: {type: Boolean, required: true},
        content: {type: String, required: true},
        datePosted: { type: Date, default: Date.now },
    },
    { timestamps: true },
)

const Text = mongoose.model('Text', textSchema)
module.exports = Text