const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.use(ejsLayouts)

const feedController = require('./controllers/feed')
const methodOverride = require('method-override')
app.use('/', feedController)

app.use(methodOverride('_method'));


app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// app.use(express.static('public'))

app.use(express.static(__dirname + "/public/css/"))






app.set("port", process.env.PORT || 4000 )

app.listen(app.get('port'), () => {
    console.log(`listening on ${app.get('port')}`)
})
