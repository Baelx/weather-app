const express = require('express')
const path = require('path')
const geoCode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()
const port = 3001
const hbs = require('hbs')

app.use(express.static(path.join(__dirname, "../public")))
app.set('view engine', 'hbs')

app.get('/weather', (req, res) => {
  if (1 === 3){

console.log("pay attention to me");
    //Geocoding
    geoCode(req.query.address, (err, {lat, long, location} = {}) => {
      if (err) return res.send({ error: err });

      weather(lat, long, (err, forecast) => {
        if (err) return res.send({ err });

        res.send({
          location,
          forecast,
          address: req.query.address
        })

      });

    });
  } else if (true){
    console.log(req.query.lat, req.query.long);
    weather(req.query.lat, req.query.long, (err, forecast) => {
      if (err) return res.send({ err });

      res.send({
        forecast
      })

    });
  } else {
    return res.send({
      error: "Please enter valid address as an argument."
    })
  }

})



app.get('/', function (req, res) {
  res.render('index', { title: 'Weather App' })
})


app.listen(port, () => console.log(`App listening on port ${port}!`))
