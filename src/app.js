const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')


const app=express()

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
   res.render('index',{
      title:'Weather App',
      name:'Jackson'
   })
})

app.get('/help',(req,res)=>{
   res.send({
     name:'Jackson',
     age:20
   })
})

app.get('/about',(req,res)=>{
   res.render('about',{
      name:'Jackson',
      title:'About me'
   })
})

app.get('/weather', (req, res) => {
   if (!req.query.address) {
       return res.send({
           error: 'You must provide an address!'
       })
   }

   geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
       if (error) {
           return res.send({ error })
       }

       forecast(latitude, longitude, (error, forecastData) => {
           if (error) {
               return res.send({ error })
           }

           res.send({
               forecast: forecastData,
               location,
               address: req.query.address
           })
       })
   })
})
app.get('/products',(req,res)=>{
   if(!req.query.search){
      return res.send({
         error:'You must provide a seacrh term'
      })
   }

   console.log(req.query)
   res.send({
      products:[]
   })
})


//*-> match anything that hasnt been matched till now
app.get('*',(req,res)=>{
   res.render('404',{
      title:400,
      name:'Jackson',
      errorMessage:'Page not found'
   })
})

app.listen(3000, ()=>{
  console.log('Server is up on port 3000.')
})