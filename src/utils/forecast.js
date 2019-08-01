const request=require('request')

const forecast=(latitude,longitude,callback)=>{
 const url='https://api.darksky.net/forecast/918d578ae17e404c403fe7fc3e47d942/'+latitude+','+longitude+'?units=si'
 request({url,json:true},(error,{body})=>{
   if(error){
     callback("Unable to connect to Web Service!",undefined)
   }
   else if(body.error){
     callback("Doesn't exist, try another value",undefined)
   }
   else{
     callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability*100 + '% chance of rain.')
  }
})
}

module.exports=forecast
