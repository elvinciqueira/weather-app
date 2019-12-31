const key = 'feAQPnfkmX1AqHesxGRjAjFn0tEzWPBn';

getCity('são paulo').then(data => {
  return getWeather(data.Key);
}).then(data => {
  console.log(data)
}).catch(err => console.log(err));


  
//get city information
async function getCity(city) {
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`;
  
  const response = await fetch(base + query);
  const data = await response.json();
  
  return data[0];
}

//get weather information
async function getWeather(id) {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
}
