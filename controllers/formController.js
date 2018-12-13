var app = express.Router()

app.get('/civil_structure', (req, res) => {
    res.render('forms/civil_structure');
})
app.get('/lightning_electrical', (req, res, next) => {
    res.render('forms/lightning_electrical')
})
app.get('/plumbing', (req, res) => {
    res.render('forms/plumbing')
})
app.get('/hvac', (req, res) => {
    res.render('forms/hvac')
})
app.get('/f_&_f', (req, res) => {
    res.render('forms/f_&_f')
})
app.get('/processing_packaging', (req, res) => {
    res.render('forms/processing_packaging')
})
app.get('/transportation', (req, res) => {
    res.render('forms/transportation')
})


module.exports = app