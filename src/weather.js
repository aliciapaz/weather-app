const get = document.querySelector.bind(document)

const filterForecast = (data) => {
  console.log(data)
  const {name: city } = data
  console.log(city)
  const {country} = data.sys
  const {
    temp,
    temp_max,
    temp_min,
    feels_like,
    humidity,
  } = data.main;
  const { main, description } = data.weather[0]
  return {
    city, 
    country,
    temp,
    temp_max,
    temp_min,
    feels_like,
    humidity,
    main,
    description,
  }
}

const displayForecast = (data) => {
  const location = get('.location')
  const mainT = get('.main-temp')
  const maxT = get('.max-temp')
  const minT = get('.min-temp')
  const feel = get('.feel')
  const humidity = get('.humidity')
  const imgFeel = get('.img-container')

  location.innerHTML = `${data.city}, ${data.country}`
  mainT.innerHTML = data.temp
  maxT.innerHTML = `Max: ${data.temp_max} °C`
  minT.innerHTML = `Min: ${data.temp_min} °C`
  feel.innerHTML = `Feels like: ${data.feels_like} °C`
  humidity.innerHTML = `Humidity: ${data.humidity}%`
}

const displayError = (error) => {
  const errors = document.getElementById('error-container')
  errors.innerHTML = error
  errors.style.display = 'block'
  setTimeout(function() {errors.style.display = 'none'}, 3000)
}

async function getForecast(location) {
  const key = '1c4c5f09770cdd1d906978e968853e59'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error (response.statusText)
    }
    const forecast = await response.json()
    displayForecast(filterForecast(forecast))
    return forecast
  } catch (error) {
    displayError(error)
    return error
  }
}

export { getForecast as default };