const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const feedController = require('./controllers/feed')


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(feedController)
app.use(ejsLayouts)
app.use(express.static('public'))
app.use(methodOverride('_method'));
app.set('view engine' , 'ejs')
app.set("port", process.env.PORT || 4000 )

app.listen(app.get('port'), () => {
    console.log(`listening on ${app.get('port')}`)
})