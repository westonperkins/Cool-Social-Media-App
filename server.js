const express = require('express')
const mongoose = require('mongoose')
const app = express()
const multer = require('multer')
const path = require('path')
const ejsLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});

// initialize upload 
const upload = multer({
    storage: storage,
    limits:{fileSize: 10000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
}).single('imageSelect')

// file type check
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|mp4/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error:images only')
    }
}

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const methodOverride = require('method-override')
app.use(methodOverride('_method'));
const feedController = require('./controllers/feed')
const { dirname } = require('path')
app.use('/', feedController)

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"))

app.set("port", process.env.PORT || 4000 )

app.listen(app.get('port'), () => {
    console.log(`listening on ${app.get('port')}`)
})
