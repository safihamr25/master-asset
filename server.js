express = require('express')
var app = express()

var bodyParser = require('body-parser')
parseform = bodyParser.urlencoded({ extended: true })

app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static("./public"))

app.use('/', require('./routers/router'))
app.use('/forms', require('./controllers/formController'))


app.listen(4000, (err) => {
    if (err) throw err
    console.log('App runs on http://localhost:4000')
})