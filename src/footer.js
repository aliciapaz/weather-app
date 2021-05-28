const footer = () => {
  const create = document.createElement.bind(document)

  const footer = create('footer')
  const span = create('span')
  const spanInfo = create('span')
  
  span.innerHTML = 'Created by ' + '<a href="http://aliciarojas.me" target="_blank" >Alicia Rojas</a>' + ' © 2021'
  spanInfo.innerHTML = 'Powered by ' +  '<a href="https://openweathermap.org/api" target="_blank" >OpenWeather API</a>'

  footer.appendChild(span)
  footer.appendChild(spanInfo)

  return footer
}

export {footer as default}