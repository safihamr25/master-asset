var app = express.Router()

var controller = require('../controllers/controller')

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/record', (req, res) => {
    res.render('record')
})
app.post('/submitForm', parseform, (req, res, next) => {
    console.log('reached submit form in router' + JSON.stringify(req.body['sub_location']) + 'over')
    next()
}, controller.submitForm)
app.post('/submitElectrical', parseform, (req, res, next) => {
    console.log('reached submit electrical form in router' + JSON.stringify(req.body) + 'over')
    next()
}, controller.submitElectrical)
app.get('/getLocation', (req, res, next) => {
    console.log("reached get Location")
    next()
}, controller.getLocation)
app.post('/getSubLocation', parseform, (req, res, next) => {
    console.log("reached getSubLocation")
    next()
}, controller.getsubLocation)
app.post('/getRecord', parseform, (req, res, next) => {
    console.log("reached get record" + JSON.stringify(req.body))
    next()
}, controller.getRecord)

module.exports = app