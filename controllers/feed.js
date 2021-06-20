const express = require('express')
const router = express.Router()

const multer = require('multer')
const storage = multer.memoryStorage()

const Media = require('../models/media_model')

const fileFilter = (req, file, cb) => {

    //if the filetype is not right
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
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
            res.render('home.ejs', { posts: posts })
        })
})

router.get('/data', (req, res) => {
    Media.find({})
        .then((data) => {
            res.json(data)
        })
})



router.post('/create', upload.single('imageUpload'), (req, res, next) => {
    let product = {
        url: req.body.url,
        text: req.body.text,
    }
    let product2
        if(req.file != undefined) {
            product2 = {
                url: req.body.url,
                text: req.body.text,
                imageUpload: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                },
        }
    }
    
    // console.log(req.file)
    if(req.body.url != '' || req.body.text != '') {
        Media.create(product)
        .then((media) => {
            console.log(media)
        })
        .then(res.redirect('/'))
        .then(console.log(req.body))
    } else if(req.body.imageUpload != '') {
         Media.create(product2)
        .then((media) => {
            console.log(media)
            console.log(media.imageUpload.data.buffer)
        })
        .then(res.redirect('/'))
        .then(console.log(req.body))
    } else {
        console.log('must inc data')
    }
})



// Multer stuff
// router.post('/create', (req, res) => {
//     Media.upload(req, res, (err) => {
//         if(err) {
//             console.log(err)
//         } else {
//             if(req.file == "undefined" || req.file == null) {
//                 console.log('eror no file selected')
//             } else {
//                 console.log('success')
//             }
//             console.log(req.file);
//             res.send('test')
//         }
//     });
//     // console.log(req.file)
//     // res.redirect('/')
// });


// router.get('/edit/:id', (req, res) => {
//     res.render("createTest", {id : req.params.id})
// })

router.put('/:id', (req, res, next) => {
    let id = req.params.id
    if(req.body.url != '' || req.body.text != '') {
    Media.findOneAndUpdate({_id: id}, { $set: {text: req.body.text, url: req.body.url}})
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