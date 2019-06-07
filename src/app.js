const express = require('express')
const path = require('path')
const geoCode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()
const port = 8888
const hbs = require('hbs')

app.use(express.static(path.join(__dirname, "../public")))
app.set('view engine', 'hbs')

app.get('/weather', (req, res) => {
    if (!req.query.address){
      return res.send({
        error: "Please enter valid address as an argument."
      })
  }

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

})

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})


app.listen(port, () => console.log(`App listening on port ${port}!`))



// HTTP query strings for custom responses
const query = {
  lang: {
    en: '?lang=en',
    fr: '?lang=fr'
  },
}
