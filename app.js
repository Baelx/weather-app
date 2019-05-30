const geoCode = require('./modules/geocode');
const weather = require('./modules/weather');

// HTTP query strings for custom responses
const query = {
  lang: {
    en: '?lang=en',
    fr: '?lang=fr'
  },
}

const askAddress = () => {
  let input = process.argv[2];
  if(input){
    return input;
  } else {
    console.log("Please enter valid address as an argument.");
    process.exit();
  }
}


//Geocoding
geoCode(askAddress(), (err, {lat, long, location}) => {
  if (err) {
    return console.log(err);
  }
  weather(lat, long, (err, forecast) => {
    if (err) {
      return console.log(err);
    }

    console.log(location);
    console.log(forecast);
  });

});
