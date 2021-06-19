const express = require('express')
const mongoose = require('mongoose')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.use(ejsLayouts)

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const methodOverride = require('method-override')
app.use(methodOverride('_method'));
const feedController = require('./controllers/feed')
app.use('/', feedController)



app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// app.use(express.static('public'))

app.use(express.static(__dirname + "/public"))






app.set("port", process.env.PORT || 4000 )

app.listen(app.get('port'), () => {
    console.log(`listening on ${app.get('port')}`)
})
