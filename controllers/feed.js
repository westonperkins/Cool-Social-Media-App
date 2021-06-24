const express = require('express')
const router = express.Router()

const multer = require('multer')
const storage = multer.memoryStorage()

const Media = require('../models/media_model')

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


router.get('/', (req, res) => {
    Media.find({}).sort({updatedAt:-1})
        .then((posts) => {
            posts.forEach((post) => {
                if(post["flag"] == 5) {
                        Media.findOneAndDelete({"flag": 5})
                        .then((media) => {
                            console.log(media)
                            console.log('deleted')
                        })
                        .then(res.redirect('/'))
                }
                    console.log(post["flag"])
            })    
            res.render('home.ejs', { posts: posts })
        })
})


router.get('/data', (req, res) => {
    Media.find({}, {imageUpload: 0})
        .then((data) => {
            res.json(data)
        })
})




router.post('/create2', upload.single('imageUpload'),  (req, res, next) => {
    let product = {
        url: req.body.url,
        text: req.body.text,
    }
    if(req.body.url != '') {
        Media.create(product)
        .then((media) => {
            console.log(media)
            console.log("ew")
        })
        .then(res.redirect('/'))
        .then(console.log(req.body))
    } else {
        console.log('no')
    }

})


router.post('/create3', upload.single('imageUpload'),  (req, res, next) => {
    if(req.file != undefined) {
            product = {
                url: req.body.url,
                text: req.body.text,
                imageUpload: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                },
                upload: true,
            }
        
        Media.create(product)
        .then((media) => {
            console.log(media + " mediua")
            res.redirect('/')
            // undefined coming from line 84 ^
        })
    } 
    
    else {
        console.log('something wrong w post route')
    }
}) 



router.post('/create', upload.single('imageUpload'),  (req, res, next) => {
    let product = {
        url: req.body.url,
        text: req.body.text,
    }

    if(req.body.text != '') {
        Media.create(product)
        .then((media) => {
            console.log(media)
        })
        .then(res.redirect('/'))
        .then(console.log(req.body.text + " REQ"))
        .catch((err) => {
            console.log(err)
        })
    } else {
        console.log('no two')
    }
})


// && (req.body.url[req.body.url.length-5] == "." || req.body.url[req.body.url.length-4] == ".")



let a = 'heybeans.jpeg'
console.log(a[a.length-5])



router.put('/:id', (req, res, next) => {
    let id = req.params.id
    if(req.body.url != '' || req.body.text != '') {
    Media.findOneAndUpdate({_id: id}, { $set: { text: req.body.text, url: req.body.url }}, {new:true})
    .then((media) => {
        console.log(media)
    })
    .then(res.redirect('/'))
    console.log('put')
    } else if(req.body.flag == 'on') {
    Media.findOneAndUpdate({_id:id}, { $inc: {flag: 1}})
    .then((media) => {
        console.log(media + " flags")
        res.redirect('/')
    })
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