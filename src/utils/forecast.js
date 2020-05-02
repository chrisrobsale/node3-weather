const request = require('request')

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=3cc9e08d13388f0c4c6e35878631264d&query="+lat+","+long //14.8620175,120.4420545

    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback("Unable to connect to weather service!",undefined)
        }else if(body.error === 0){
            callback("Unable to find location",undefined)
        }else{
            callback(undefined,{
                temperature : body.current.temperature,
                feelslike: body.current.feelslike,
                description: body.current.weather_descriptions[0]
            })
        }
    })

}

module.exports = forecast