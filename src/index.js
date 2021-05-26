const city = 'Auckland'

async function getForecast(location) {
  const key = '1c4c5f09770cdd1d906978e968853e59'
  const units = 'metric'
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=${units}`)
  return response.json();
}

getForecast(city).then(response => {console.log(response)})