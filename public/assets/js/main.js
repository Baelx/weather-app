const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const forecastElm = document.querySelector('.forecast');

const searchButton = document.querySelector('.search-button');

const errorField = document.querySelector('.help');
const fieldDanger = document.querySelector('.field-danger');

const toggleAnimate = () => {
  document.querySelector('.search-loader').classList.toggle('hide');
  document.querySelector('.search-button-text').classList.toggle('hide');
}

if ("geolocation" in navigator) {
  console.log("Geolocation available ");
  document.querySelector('.geo').classList.toggle('hide-elm');
} else {
  console.log("Geolocation not available");
}

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("Searching...");
  errorField.textContent = "";
  // toggleAnimate();

  fetch(`http://localhost:3001/weather?address=${search.value}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        // toggleAnimate();
        fieldDanger.classList.toggle('is-danger');
        errorField.textContent = data.error;
      } else {
        // toggleAnimate();
        fieldDanger.classList.toggle('is-danger');

        forecastElm.textContent = data.forecast;
        console.log(data);
      }

    })
  })
})
