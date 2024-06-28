const apikey = "b7dc5ca8c1ebca2f9a7ae020c1a4c600"

const search_box = document.querySelector('.search-box');
search_box.addEventListener('keypress', setQuery);

getResults('Puri');
function setQuery(e) {
  if (e.key == 'Enter') {
    getResults(search_box.value);
  }
}

function getResults(query) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${apikey}`)
    .then(weather => {
      return weather.json();
    }).then(display_result);
}

function display_result(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = set_date(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let current_weather = document.querySelector('.current .weather');
  current_weather.innerText = weather.weather[0].main;

  let hi_low_temp = document.querySelector('.hi-low');
  hi_low_temp.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function set_date(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}