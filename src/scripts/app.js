const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const forecast = new Forecast();

cityForm.addEventListener('submit', event => {
  //prevent default action
  event.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the ui with new city
  forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  //set local storage
  localStorage.setItem('city', city);

});


if(localStorage.getItem('city')) {
  forecast.updateCity(localStorage.getItem('city'))
          .then(data => updateUI(data))
          .catch(err => console.log(err));
}


function updateUI(data) {
  const { cityDetails, weather } = data;

  //update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  //update night/day & icon images
  const iconSrc = `/src/img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = weather.IsDayTime ? '/src/img/day.svg' : '/src/img/night.svg';
  time.setAttribute('src', timeSrc);

  //remove d-none class if present
  if(card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
}