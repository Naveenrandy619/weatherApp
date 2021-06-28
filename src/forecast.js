const request = require('request')

const forecast = (latitude,longitude,callback)=>{
const url = "http://api.weatherstack.com/current?access_key=faa7ecc7ec248808c2d364508781acc1&query="+latitude+","+longitude+"&units=f"
request({url, json:true},(error,response)=>{
    if(error){
        callback('Unable to connect', undefined)
    }
    else if(response.body.error){
        callback("Unable to find location", undefined)
    }
    else{
        callback(undefined,"It is "+response.body.current.temperature+" degress out")
    }
})

}

module.exports = forecast