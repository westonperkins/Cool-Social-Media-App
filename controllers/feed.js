const express = require('express')
const router = express.Router()

const Media = require('../models/media_model')

router.get('/', (req, res) => {
    Media.find({}).sort({updatedAt:-1})
        .then((posts) => {
            res.render('home.ejs', { posts: posts })
        })
})

router.get('/data', (req, res) => {
    Media.find({})
        .then((data) => {
            res.json(data)
        })
        .then(console.log(req.params))
})

router.get('/create', (req, res) => {
    res.render("createTest")
})

router.post('/create', (req, res, next) => {
    Media.create(req.body)
        .then((media) => {
            console.log(media)
        })
        .then(res.redirect('/'))
        .then(console.log(req.body))
        .then(console.log('test'))
})

router.get('/edit', (req, res) => {
    res.render('testEdit')
})




// -------------------------------------------
module.exports = router