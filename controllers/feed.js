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
})



router.post('/create', (req, res, next) => {
    if(req.body.url != '' || req.body.text != '') {
        Media.create(req.body)
        .then((media) => {
            console.log(media)
        })
        .then(res.redirect('/'))
        .then(console.log(req.body))
    } else {
        console.log('must inc data')
    }
})


router.get('/edit/:id', (req, res) => {
    res.render("createTest", {id : req.params.id})
})

router.put('/:id', (req, res, next) => {
    let id = req.params.id
    Media.updateOne({_id: id}, { $set: {text: req.body.text, url: req.body.url}})
    .then((media) => {
        console.log(media)
    })
    .then(res.redirect('/'))
    console.log('put')
    
})



// -------------------------------------------
module.exports = router