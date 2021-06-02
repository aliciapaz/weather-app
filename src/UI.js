import getForecast from './weather';

const home = () => {
  const create = document.createElement.bind(document);

  const element = create('div');
  element.className = 'main-container';

  const header = create('header');
  const title = create('h1');
  const subTitle = create('h2');
  title.innerHTML = 'Open Weather';
  subTitle.innerHTML = 'Free forecast for 200,000+ cities on Earth!';
  header.appendChild(title);
  header.appendChild(subTitle);

  const errorContainer = create('div');
  errorContainer.id = 'error-container';

  const forecastContainer = create('div');
  forecastContainer.className = 'forecast-container';

  const forecastHeader = create('div');
  forecastHeader.className = 'forecast-header';

  const location = create('div');
  location.className = 'location';
  forecastHeader.appendChild(location);

  const mainT = create('div');
  mainT.className = 'main-temp';
  forecastHeader.appendChild(mainT);

  const imgFeel = create('img');
  imgFeel.className = 'img-container';
  forecastHeader.appendChild(imgFeel);

  const description = create('div');
  description.className = 'description';
  forecastHeader.appendChild(description);

  forecastContainer.appendChild(forecastHeader);

  const forecastDetails = create('div');
  forecastDetails.className = 'forecast-details';

  const maxT = create('div');
  maxT.className = 'max-temp';
  forecastDetails.appendChild(maxT);

  const feel = create('div');
  feel.className = 'feel';
  forecastDetails.appendChild(feel);

  const minT = create('div');
  minT.className = 'min-temp';
  forecastDetails.appendChild(minT);

  const humidity = create('div');
  humidity.className = 'humidity';
  forecastDetails.appendChild(humidity);

  forecastContainer.appendChild(forecastDetails);

  const searchForm = create('form');

  const searchBar = create('input');
  searchBar.setAttribute('type', 'text');
  searchBar.setAttribute('name', 'location');
  searchBar.setAttribute('placeholder', 'Enter a city');
  searchBar.setAttribute('maxlength', '50');

  const unitLabel = create('label');
  unitLabel.className = 'toggle';

  const unitToggle = create('input');
  unitToggle.id = 'cToggle';
  unitToggle.setAttribute('type', 'checkbox');
  unitToggle.setAttribute('name', 'unit');

  const toggleUnits = (weather) => {
    const {
      units, temp, tempMax, tempMin, feelsLike,
    } = weather;
    const degree = unitToggle.checked ? '°F' : '°C';

    const toFahr = (celDeg) => Math.round(celDeg * 1.8 + 32);
    const toCels = (fahrDeg) => Math.round((fahrDeg - 32) / 1.8);

    if (units === 'metric') {
      mainT.innerHTML = `${unitToggle.checked ? toFahr(temp) : Math.round(temp)}${degree}`;
      maxT.innerHTML = `Max: ${unitToggle.checked ? toFahr(tempMax) : Math.round(temp)}${degree}`;
      minT.innerHTML = `Min: ${unitToggle.checked ? toFahr(tempMin) : Math.round(tempMin)}${degree}`;
      feel.innerHTML = `Feels like: ${unitToggle.checked ? toFahr(feelsLike) : Math.round(feelsLike)}${degree}`;
    } else {
      mainT.innerHTML = `${!unitToggle.checked ? toCels(temp) : Math.round(temp)}${degree}`;
      maxT.innerHTML = `Max: ${!unitToggle.checked ? toCels(tempMax) : Math.round(temp)}${degree}`;
      minT.innerHTML = `Min: ${!unitToggle.checked ? toCels(tempMin) : Math.round(tempMin)}${degree}`;
      feel.innerHTML = `Feels like: ${!unitToggle.checked ? toCels(feelsLike) : Math.round(feelsLike)}${degree}`;
    }
  };

  const getWeather = () => {
    const weather = JSON.parse(localStorage.getItem('weather'));
    return weather;
  };

  unitToggle.addEventListener('click', () => {
    if (localStorage.getItem('weather') !== null) {
      toggleUnits(getWeather());
    }
  });

  const span = create('span');
  span.className = 'slider';

  unitLabel.appendChild(unitToggle);
  unitLabel.appendChild(span);

  const submitBtn = create('input');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.setAttribute('value', 'Go');

  searchForm.appendChild(searchBar);
  searchForm.appendChild(unitLabel);
  searchForm.appendChild(submitBtn);

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = searchForm.elements.location.value;
    const unit = searchForm.elements.unit.checked ? 'imperial' : 'metric';
    searchForm.elements.location.value = '';
    getForecast(city, unit);
  });

  element.appendChild(header);
  element.appendChild(searchForm);
  element.appendChild(errorContainer);
  element.appendChild(forecastContainer);
  return element;
};

export { home as default };
