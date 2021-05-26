import getForecast from './weather';

const home = () => {
  const create = document.createElement.bind(document)

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
    getForecast(city).then(response => {console.log(response)})
    // add error handling
  });

  return searchForm
}

export { home as default};
