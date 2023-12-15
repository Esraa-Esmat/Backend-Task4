const express = require('express')
var hbs = require('hbs')
const geocode = require('./tools/geocode')
const forecast = require('./tools/forecastFile')
const path = require("path")


const app = express()

const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

const viewsDirectory = path.join(__dirname, "../weather/views")
app.set("views", viewsDirectory)

app.set('view engine', 'hbs');

const partialsPath = path.join(__dirname, "../weather/partials")
hbs.registerPartials(partialsPath)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



app.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the Weather App'
    })
})

app.get('/checkWeather', (req, res) => {
    res.render('checkWeather', {
        pageTitle: 'weather',
        message: 'Cheack the Weather '
    })
})





// ----------------------------------------


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            // shorthand property error:error
            return res.send({ error })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: req.query.address,
                location: req.query.address,
                latitude: data.latitude,
            })
        })
    })
})
// -----------------------




app.get('*', (req, res) => {
    res.send('404 Page Not Founded')
})