const express = require('express')
const mongoose = require('mongoose')
const app = express()
const multer = require('multer')
const path = require('path')
const ejsLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.use(ejsLayouts)
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const methodOverride = require('method-override')
app.use(methodOverride('_method'));
const feedController = require('./controllers/feed')
const { dirname } = require('path')
const Users = require('./models/users_models')
app.use('/', feedController)

app.use(express.static(__dirname + "/public"))


app.use(express.json())
app.use(express.urlencoded({ extended: false }));




app.set("port", process.env.PORT || 4000 )

app.listen(app.get('port'), () => {
    console.log(`listening on ${app.get('port')}`)
})
