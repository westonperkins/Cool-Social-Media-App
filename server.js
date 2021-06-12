const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

app.use(ejsLayouts)
app.use(express.static('public'))
app.use(methodOverride('_method'));
app.set('view engine' , 'ejs')
app.set("port", process.env.PORT || 4000 )

app.listen(app.get('port'), () => {
    console.log(`listening on ${app.get('port')}`)
})