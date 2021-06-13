const express = require('express')
const router = express.Router()

const Media = require('../models/media_model')

router.get('/', (req, res) => {
    res.send('home route')
})

router.get('/data', (req, res) => {
    Media.find({})
        .then((data) => {
            res.json(data)
        })
})









// -------------------------------------------
module.exports = router