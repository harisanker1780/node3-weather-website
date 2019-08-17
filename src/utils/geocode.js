const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaGFyaXNhbmtlciIsImEiOiJjanoxaDd3bzMwbGE0M2dsazNvYzlvOXduIn0.H0furMoC2DpJb0TbJ7j7qA&limit=1';
    const json = true
    request({url, json}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location service!', undefined);
        }
        else if(body.features.length == 0) {
            callback('Unable to find location, try another search.', undefined);
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                lattitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode