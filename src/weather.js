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

async function displayForecast(data) {
  const location = get('.location');
  const description = get('.description');
  const mainT = get('.main-temp');
  const maxT = get('.max-temp');
  const minT = get('.min-temp');
  const feel = get('.feel');
  const humidity = get('.humidity');
  const imgFeel = get('.img-container');

  location.innerHTML = `${data.city}, ${data.country}`;
  description.innerHTML = titleize(data.description);
  mainT.innerHTML = `${Math.round(data.temp)} °C`;
  maxT.innerHTML = `Max: ${Math.round(data.tempMax)} °C`;
  minT.innerHTML = `Min: ${Math.round(data.tempMin)} °C`;
  feel.innerHTML = `Feels like: ${Math.round(data.feelsLike)} °C`;
  humidity.innerHTML = `Humidity: ${data.humidity}%`;
  imgFeel.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
}

const displayError = (error) => {
  const errors = document.getElementById('error-container');
  errors.innerHTML = error;
  errors.style.display = 'block';
  setTimeout(() => { errors.style.display = 'none'; }, 3000);
};

async function getForecast(location) {
  const key = ''; // enter API key provided
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const forecast = await response.json();
    displayForecast(filterForecast(forecast));
    return forecast;
  } catch (error) {
    displayError(error);
    return error;
  }
}

export { getForecast as default };