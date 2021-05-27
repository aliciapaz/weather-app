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
  const { main, description, icon } = data.weather[0]
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
    icon
  }
}

const displayForecast = (data) => {
  const get = document.querySelector.bind(document)

  const location = get('.location')
  const mainT = get('.main-temp')

  location.innerHTML = data.city
  mainT.innerHTML = data.temp
  

}


async function getForecast(location) {
  const key = '1c4c5f09770cdd1d906978e968853e59'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      return 'Something went wrong :('
    }
    const forecast = await response.json()
    displayForecast(filterForecast(forecast))
    return forecast
  } catch (error) {
    console.log(error)
    return error
  }
}

export { getForecast as default };

// base: "stations"
// clouds: {all: 0}
// cod: 200
// coord: {lon: -70.6483, lat: -33.4569}
// dt: 1622150978
// id: 3871336
// main:
// feels_like: 18.82
// humidity: 34
// pressure: 1016
// temp: 19.89
// temp_max: 21.23
// temp_min: 18.81
// __proto__: Object
// name: "Santiago"
// sys: {type: 1, id: 8506, country: "CL", sunrise: 1622115328, sunset: 1622151867}
// timezone: -14400
// visibility: 7000
// weather: Array(1)
// 0: {id: 800, main: "Clear", description: "clear sky", icon: "01d"}
// length: 1
// __proto__: Array(0)
// wind: {speed: 1.54, deg: 220}
// __proto__: Object