const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const forecastElm = document.querySelector('.forecast');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log("Searching...");

  fetch(`http://localhost:3001/weather?address=${search.value}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        forecastElm.textContent = data.error;
      } else {
        forecastElm.textContent = data.forecast;
        console.log(data);
      }

    })
  })
})
