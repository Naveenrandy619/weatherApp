const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./geocode')
const forecast = require('./forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const globalPort = process.env.PORT || 3000
//Directories
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views')
const partialsPath = path.join(__dirname,'../partials')

//HandleBar engines
app.set('view engine', '.hbs')
app.set('views',viewsPath)   
hbs.registerPartials(partialsPath)

//Static directory - MustOne
app.use(express.static(publicPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: "Millionaire's Weather Report"
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Millionaire Help'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About Millionaire"
    })
})

app.get('/weather',(req,res)=>{
     if(!req.query.address){
        return res.send({
            error: 'Please provide valid address'
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location: req.query.address
            })
        })
    })
})

app.get('*',(req,res)=>{
    res.send('<h1>Oops! 404 ErrorPage Not Found</h1>')
})

app.listen(globalPort, ()=>{
    console.log('Server started...')
})