const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const session = require('express-session')
const mongoose = require('mongoose')
const localStrategy = require('passport-local').Strategy
const flash = require('express-flash')


const multer = require('multer')
const storage = multer.memoryStorage()

const Media = require('../models/media_model')
const Users = require('../models/users_models')




// MULTER ------------------------------------

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





// PASSPORT------------------------------

router.use(session({
    secret: "testSecret",
    resave: false,
    saveUninitialized: true
}))

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => {
        done(err, user)
    })
}) 

passport.use(new localStrategy((username, password, done) => {
    Users.findOne({ username: username }, (err, user) => {
        if (err) return done(err)
        if (!user) return done(null, false, { message: "Incorrect username"})
        
        bcrypt.compare(password, user.password, (err, res) => {
            if (err) return done(err)
            if (res === false) {
                return done(null, false, {message: "incorrect password"})
            }
            return done(null, user)
        })
    })
}))

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
    console.log(req.isAuthenticated())
}

function isLoggedOut(req, res, next) {
	if (!req.isAuthenticated()) return next();
	res.redirect('/');
}


// LOGIN  REGISTER---------------------

router.get('/login', isLoggedOut, (req, res) => {
	const response = {
		title: "Login",
		error: req.query.error
	}
	res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login?error=true'
}));

router.get('/logout', function (req, res){
	req.logout();
	res.redirect('/');
});

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let userInfo = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }
        Users.create(userInfo) 
        .then((user) => {
            console.log(user)
        })
        .then(res.redirect('/login'))
    } catch {

    }
})




// APP FUNCTIONALITY STUFF


// get route with conditional to check if the post has 5 flags
router.get('/', isLoggedIn, (req, res) => {
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
            })    
            res.render('home.ejs', { posts: posts })
        })
})




// JSON route media
router.get('/data', isLoggedIn, (req, res) => {
    Media.find({}, {imageUpload: 0})
        .then((data) => {
            res.json(data)
        })
})

// JSON route users
router.get('/dataUser', isLoggedIn, (req, res) => {
    Users.find({})
        .then((users) => {
            res.json(users)
        })
})






// URL create route
router.post('/create2', upload.single('imageUpload'),  (req, res, next) => {
    let product = {
        url: req.body.url,
        text: req.body.text,
        caption: req.body.caption
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

// imageUpload create route
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
                caption: req.body.caption
            }
        
        Media.create(product)
        .then((media) => {
            console.log(media + " mediua")
            res.redirect('/')
            // undefined coming from line 84 ^
        })
        .then(res.redirect('/'))
        
    } 
    
    else {
        console.log('something wrong w post route')
    }
}) 

// text create routez
router.post('/create', upload.single('imageUpload'),  (req, res, next) => {
    let product = {
        url: req.body.url,
        text: req.body.text,
        caption: req.body.caption
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




// update route with flag counter update integrated
router.put('/:id', (req, res, next) => {
    let id = req.params.id
    if(req.body.url != '' && req.body.text != '') {
       console.log('you can only update one at a time')
    }
    if(req.body.flag == 'on') {
    Media.findOneAndUpdate({_id:id}, { $inc: {flag: 1}},{new:true})
    .then((media) => {
        console.log(media + " flags")
    })
    .then(res.redirect('/'))
    } 
     if(req.body.likes == 'on') {
    Media.findOneAndUpdate({_id:id}, { $inc: {likes: 1}},{new:true})
    .then((media) => {
        console.log(media + " likes")
    })
    .then(res.redirect('/'))
    } 
    if (req.body.caption != '') {
    Media.updateOne({_id: id}, { $set: { caption: req.body.caption }}, {new:true})
    .then((media) => {
       console.log(media + " caption")
    })
    .then(res.redirect('/'))
    }
     if(req.body.url != '' || req.body.text != '') {
    Media.findOneAndUpdate({_id: id}, { $set: { text: req.body.text, url: req.body.url }}, {new:true})
    .then((media) => {
       console.log(media + "heyyyy") 
    })
    .then(res.redirect('/'))
    console.log('put')
    } 
    else {
        console.log("include data to update")
    }
})
// delete route
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