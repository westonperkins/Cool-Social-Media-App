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

router.post('/create', (req, res) => {
    Media.upload(req, res, (err) => {
        if(err) {
            console.log(err)
        } else {
            if(req.file == "undefined" || req.file == null) {
                console.log('eror no file selected')
            } else {
                console.log('success')
            }
            console.log(req.file);
            res.send('test')
        }
    });
    // console.log(req.file)
    // res.redirect('/')
});


// router.get('/edit/:id', (req, res) => {
//     res.render("createTest", {id : req.params.id})
// })

router.put('/:id', (req, res, next) => {
    let id = req.params.id
    if(req.body.url != '' || req.body.text != '') {
    Media.updateOne({_id: id}, { $set: {text: req.body.text, url: req.body.url}})
    .then((media) => {
        console.log(media)
    })
    .then(res.redirect('/'))
    console.log('put')
    } else {
        console.log("include data to update")
    }
    
})

router.delete('/:id', (req, res) => {
    let id = req.params.id
    Media.findOneAndRemove({_id: id})
    .then((media) => {
        console.log(media)
        console.log('delete')
    })
    .then(res.redirect('/'))
})



// -------------------------------------------
module.exports = router