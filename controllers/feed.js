const express = require('express')
const router = express.Router()

const Media = require('../models/media_model')

router.get('/', (req, res) => {
    Media.find({})
        .then((posts) => {
            res.render('home.ejs', { posts: posts })
        })
})

router.get('/data', (req, res) => {
    Media.find({})
        .then((data) => {
            res.json(data)
        })
})









// -------------------------------------------
module.exports = router