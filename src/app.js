const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Harisanker'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Harisanker'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Harisanker',
        helpText: 'Some help text!'
    })
})


app.get('/weather', (req, res) => {
    
    const address = req.query.address;

    if(!address) {
        return res.send({error: 'You must provide an address!'})
    }

    geocode(address, (error, {location, longitude, lattitude} = {}) => {

        if(error) {
            return res.send({error})
        }
        
        forecast(longitude, lattitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                location,
                address,
                forecast: forecastData
            });
          })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: '404',
        name: 'Harisanker'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        title: '404',
        name: 'Harisanker'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})