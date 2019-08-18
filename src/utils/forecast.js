const request = require('request')

const forecast = (longitude, lattitude, callback) => {
    const url = 'https://api.darksky.net/forecast/edc9c4bb00c0ce11ba75e041fa21ed8d/' + lattitude + ',' +  longitude + '?units=si'
    const json = true
    request({url, json}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.error) {
            callback('Unable to find the location', undefined)
        }
        else {
            console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.'
            + ' The high temprature today is ' + body.daily.data[0].temperatureHigh  + ' with low ' + body.daily.data[0].temperatureLow);
        }
    })
}

module.exports = forecast