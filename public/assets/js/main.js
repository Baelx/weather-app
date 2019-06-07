const weatherForm = document.querySelector('form');
const geoButton = document.querySelector('.geo-button');
const search = document.querySelector('input');
const forecastElm = document.querySelector('.forecast');


const searchButton = document.querySelector('.search-button');

const errorField = document.querySelector('.help');
const fieldDanger = document.querySelector('.field-danger');

if ("geolocation" in navigator) {
  console.log("Geolocation available ");
  document.querySelector('.geo').classList.toggle('hide');
} else {
  console.log("Geolocation not available");
}

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchButton.classList.toggle('is-loading');

  errorField.textContent = "";

  fetch(`http://localhost:3001/weather?address=${search.value}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        searchButton.classList.toggle('is-loading');
        // fieldDanger.classList.toggle('is-danger');
        errorField.textContent = data.error;
      } else {
        searchButton.classList.toggle('is-loading');
        fieldDanger.classList.toggle('is-danger');
        forecastElm.textContent = data.forecast;
        console.log(data);
      }

    })
  })
})

geoButton.addEventListener('submit', (e) => {
  e.preventDefault();
});
