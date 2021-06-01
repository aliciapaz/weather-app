const get = document.querySelector.bind(document);

const filterForecast = (data) => {
  const { name: city } = data;
  const { country } = data.sys;
  const {
    temp,
    temp_max: tempMax,
    temp_min: tempMin,
    feels_like: feelsLike,
    humidity,
  } = data.main;
  const { main, description, icon } = data.weather[0];
  return {
    city,
    country,
    temp,
    tempMax,
    tempMin,
    feelsLike,
    humidity,
    main,
    description,
    icon,
  };
};

const titleize = (str) => str.replace(
  /\w\S*/g,
  (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
);

const changeBackground = (weather) => {
  const images = {
    thunderstorm: 'thunderstorm.jpg',
    drizzle: 'drizzle.jpg',
    rain: 'rain.jpg',
    snow: 'snow.jpg',
    mist: 'mist.jpg',
    clear: 'clear.jpeg',
    clouds: 'clouds.jpg',
  };
  if (weather === 'Clear') {
    document.body.style.backgroundImage = `url("../src/img/${images.clear}")`;
  }
  if (weather === 'Thunderstorm') {
    document.body.style.backgroundImage = `url("../src/img/${images.thunderstorm}")`;
  }
  if (weather === 'Drizzle') {
    document.body.style.backgroundImage = `url("../src/img/${images.drizzle}")`;
  }
  if (weather === 'Rain') {
    document.body.style.backgroundImage = `url("../src/img/${images.rain}")`;
  }
  if (weather === 'Snow') {
    document.body.style.backgroundImage = `url("../src/img/${images.snow}")`;
  }
  if (weather === 'Mist') {
    document.body.style.backgroundImage = `url("../src/img/${images.mist}")`;
  }
  if (weather === 'Clouds') {
    document.body.style.backgroundImage = `url("../src/img/${images.clouds}")`;
  }
};

const storeWeather = (forecast, unit) => {
  forecast.units = unit;
  localStorage.setItem('weather', JSON.stringify(forecast));
};

async function displayForecast(data, unit) {
  const location = get('.location');
  const description = get('.description');
  const mainT = get('.main-temp');
  const maxT = get('.max-temp');
  const minT = get('.min-temp');
  const feel = get('.feel');
  const humidity = get('.humidity');
  const imgFeel = get('.img-container');

  const degree = (units) => (units === 'metric' ? ' °C' : '°F');

  location.innerHTML = `${data.city}, ${data.country}`;
  description.innerHTML = titleize(data.description);
  mainT.innerHTML = `${Math.round(data.temp)}${degree(unit)}`;
  maxT.innerHTML = `Max: ${Math.round(data.tempMax)}${degree(unit)}`;
  minT.innerHTML = `Min: ${Math.round(data.tempMin)}${degree(unit)}`;
  feel.innerHTML = `Feels like: ${Math.round(data.feelsLike)}${degree(unit)}`;
  humidity.innerHTML = `Humidity: ${data.humidity}%`;
  imgFeel.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
  changeBackground(data.main);
}

const displayError = (error) => {
  const errors = document.getElementById('error-container');
  errors.innerHTML = error;
  errors.style.display = 'block';
  setTimeout(() => { errors.style.display = 'none'; }, 3000);
};

async function getForecast(location, unit) {
  const key = '1c4c5f09770cdd1d906978e968853e59'; // enter API key provided
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=${unit}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const forecast = await response.json();
    displayForecast(filterForecast(forecast), unit);
    storeWeather(filterForecast(forecast), unit);
    return forecast;
  } catch (error) {
    displayError(error);
    return error;
  }
}

export { getForecast as default };