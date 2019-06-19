// Forms and buttons
const weatherForm = document.querySelector('form'),
geoButton = document.querySelector('.geo-button'),
search = document.querySelector('input')
searchButton = document.querySelector('.search-button');

// Where weather details go
const humArea = document.querySelector('.humidity'),
uvArea = document.querySelector('.uv-index'),
windArea = document.querySelector('.wind'),
preArea = document.querySelector('.precip'),
tempArea = document.querySelector('.temp'),
forecastElm = document.querySelector('.forecast'),
locationDisplay = document.querySelector('.location'),
requestTime = document.querySelector('.last-request--time'),
waTitle = document.querySelector('.wa-title'),
waDesc = document.querySelector('.wa-desc'),
waURI = document.querySelector('.wa-uri');

// Create an instance to stop fetch req
const controller = new AbortController()
const signal = controller.signal

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', e => {
    card.classList.toggle('is-flipped')
  })
});

document.addEventListener('keyup', (e) => {
  if(e.key === "Escape") {
    // write your logic here.
    console.log('Now aborting');
    // Abort.
    controller.abort()
  }
})


function abortFetching() {
  console.log('Now aborting');
  // Abort.
  controller.abort()
}

// Fields to indicate and display errors
const errorField = document.querySelector('.help'),
fieldDanger = document.querySelector('.field-danger');

// Is the geolocation API available in this browser?
"geolocation" in navigator ? document.querySelector('.geo').classList.toggle('hide') : console.log("Geolocation not available");


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchButton.classList.add('is-loading');
  fieldDanger.classList.remove('is-danger');

  errorField.textContent = "";

  fetch(`http://localhost:3001/weather?address=${search.value}`, {signal}).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        searchButton.classList.remove('is-loading');
        fieldDanger.classList.toggle('is-danger');
        errorField.textContent = data.error;
      } else {
        searchButton.classList.remove('is-loading');
        forecastElm.textContent = data.forecast.summary;
        humArea.textContent = data.forecast.humidity;
        uvArea.textContent = data.forecast.uv;
        windArea.textContent = data.forecast.wind;
        preArea.textContent = data.forecast.precip;
        tempArea.textContent = `${data.forecast['temp'].toFixed(0)}${String.fromCharCode(176)}`;
        requestTime.textContent = data.forecast.time;
        locationDisplay.textContent = data.location;

        console.log(data);
      }

    })
  })
})

geoButton.addEventListener('click', (e) => {
  geoButton.classList.toggle('is-loading');
  navigator.geolocation.getCurrentPosition(position => {

    fetch(`http://localhost:3001/weather?lat=${position.coords.latitude}&long=${position.coords.longitude}`, {signal}).then((res) => {
      res.json().then((data) => {

        if (data.error) {
          geoButton.classList.toggle('is-loading');
          fieldDanger.classList.toggle('is-danger');
          errorField.textContent = data.error;
        } else {

        const date = new Date(data.forecast.time);
          geoButton.classList.toggle('is-loading');
          forecastElm.textContent = data.forecast.summary;
          humArea.textContent = data.forecast.humidity;
          uvArea.textContent = data.forecast.uv;
          windArea.textContent = data.forecast.wind;
          preArea.textContent = data.forecast.precip;
          tempArea.textContent = `${data.forecast['temp'].toFixed(0)}${String.fromCharCode(176)}`;
          requestTime.textContent = date;
          locationDisplay.textContent = data.location;


          console.log(data);
        }

      })
    })
  });
});
