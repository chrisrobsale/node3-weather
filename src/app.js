const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for Express config
const publicDirectorypath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory
app.use(express.static(publicDirectorypath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Christian',
        text: "Check the weather now!"
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Christian'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helptext: 'Help text!',
        title: 'Help page',
        name: 'Christian'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: "You must provide an address."
        })
    }
    geocode(address,(error,{lat, long, location} = {})=> {
        if(error){
            return res.send({error})
        }

        forecast(lat, long, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address
            })
            // console.log('Location:', location)
            // console.log(forecastData)
        })
    })
})


app.get('/help/*',(req,res) => {
    res.render('404',{
        title: 'Error',
        errortext: 'Help article not found',
        name: 'Christian'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: 'Error',
        errortext: '404 Page not found',
        name: 'Christian'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})