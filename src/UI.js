import getForecast from './weather';

const home = () => {
  const create = document.createElement.bind(document)

  const element = create('div')
  element.className = 'main-container'

  const header = create('header')
  const title = create('h1')
  const subTitle = create('h2')
  title.innerHTML = 'Open Weather'
  subTitle.innerHTML = 'Free forecast for 200,000+ cities on Earth!'
  header.appendChild(title)
  header.appendChild(subTitle)

  const errorContainer = create('div')
  errorContainer.id = 'error-container'

  const forecastContainer = create('div')
  forecastContainer.className = 'forecast-container'

  const forecastHeader = create('div')
  forecastHeader.className = 'forecast-header'

  const location = create('div')
  location.className = 'location'
  forecastHeader.appendChild(location)

  const mainT = create('div')
  mainT.className = 'main-temp'
  forecastHeader.appendChild(mainT)

  const imgFeel = create('img')
  imgFeel.className = 'img-container'
  forecastHeader.appendChild(imgFeel)

  const description = create('div')
  description.className = 'description'
  forecastHeader.appendChild(description)

  forecastContainer.appendChild(forecastHeader)

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
    searchForm.elements.location.value = ''
    getForecast(city)
  });
  
  element.appendChild(header)
  element.appendChild(searchForm)
  element.appendChild(errorContainer)
  element.appendChild(forecastContainer)
  return element
}

export { home as default};
