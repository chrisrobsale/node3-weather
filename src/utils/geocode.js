const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiY2hyaXNyb2JzYWxlIiwiYSI6ImNrOWIzZmQ3bzJhNnIzaW15Y3F6MWQ5NGoifQ.U3WxZ1x86zcuVmbya4ahkg"

    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback("Unable to connect to location service!",undefined)
        }else if(body.features.length === 0){
            callback("Unable to find location",undefined)
        }else{
            callback(undefined,{
                lat : body.features[0].center[0],
                long: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode