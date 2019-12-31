const cityForm = document.querySelector('form');

cityForm.addEventListener('submit', event => {
  //prevent default action
  event.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the ui with new city
  updateCity(city)
    .then(data => console.log(data))
    .catch(err => console.log(err));
});

async function updateCity(city) {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return { cityDetails, weather };
}