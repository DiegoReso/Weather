const apiKey = '3dedf0e6c5a1ec0020d3bd43423350c8'



const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement= document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const humidityElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')
const divweatherData = document.querySelector('#weather-data')
const container = document.querySelector('#container')

const getWeatherData = async(city) =>{
  
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherUrl)
    const data = await res.json()

    return data
} 

const showWeatherData = async (city) =>{
  const data = await getWeatherData(city)


    if (data.cod == 404){
      
      alert(`Cidade ${cityInput.value} não encontrada`)
    
    }else{
      divweatherData.classList.remove('hide')
      cityElement.innerHTML = data.name
      tempElement.innerHTML = parseInt(data.main.temp)
      descElement.innerHTML = data.weather[0].description
      weatherIconElement.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
      countryElement.setAttribute('src', `https://flagsapi.com/${data.sys.country}/flat/32.png`)
      humidityElement.innerHTML = data.main.humidity
      windElement.innerHTML = `${data.wind.speed} km/h`
    
      cityInput.value = ''
      

    }
  
}

searchBtn.addEventListener('click', function(e){
  e.preventDefault()

  const city = cityInput.value
  
  showWeatherData(city)
})




cityInput.addEventListener('keyup', (e) =>{

  if(e.code === 'Enter'){

    const city = e.target.value
    showWeatherData(city)
  }

})