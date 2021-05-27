import getForecast from './weather';

const home = () => {
  const create = document.createElement.bind(document)

  const element = create('div')
  element.className = 'main-container'

  const forecastContainer = create('div')
  forecastContainer.className = 'forecast-container'

  const location = create('div')
  location.className = 'location'
  forecastContainer.appendChild(location)

  const mainT = create('div')
  mainT.className = 'main-temp'
  forecastContainer.appendChild(mainT)

  const maxT = create('div')
  maxT.className = 'max-temp'
  forecastContainer.appendChild(maxT)
  
  const minT = create('div')
  minT.className = 'min-temp'
  forecastContainer.appendChild(minT)
  
  const feel = create('div')
  feel.className = 'feel'
  forecastContainer.appendChild(feel)
  
  const humidity = create('div')
  humidity.className = 'humidity'
  forecastContainer.appendChild(humidity)
  
  const imgFeel = create('div')
  imgFeel.className = 'img-container'
  forecastContainer.appendChild(imgFeel)


  const searchForm = create('form')

  const searchBar = create('input');
  searchBar.setAttribute('type', 'text');
  searchBar.setAttribute('name', 'location');
  searchBar.setAttribute('placeholder', 'Enter a city');
  searchBar.setAttribute('maxlength', '50');

  const submitBtn = create('input');
  submitBtn.setAttribute('type', 'submit')
  submitBtn.setAttribute('value', 'Go');

  searchForm.appendChild(searchBar)
  searchForm.appendChild(submitBtn)

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = searchForm.elements.location.value;
    getForecast(city)
    // add error handling
  });

  element.appendChild(searchForm)
  element.appendChild(forecastContainer)
  return element
}

export { home as default};
