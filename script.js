let loc = select(".location"),
  currentTemp = select(".current-temp"),
  minTemp = select(".min-temp"),
  maxTemp = select(".max-temp"),
  weather = select(".weather"),
  icon = select(".icon"),
  cloud = select(".cloud .value"),
  humidity = select(".humidity .value"),
  wind = select(".wind .value"),
  form = select("form");

getData(localStorage.getItem("city"));

setInterval(() => {
  getData(localStorage.getItem("city"));
}, 1000 * 30);

form.addEventListener("submit", e => {
  e.preventDefault();
  localStorage.setItem("city", form.city.value);
  getData(form.city.value);
  form.reset();
});

function select(el) {
  return document.querySelector(el);
}

function getData(cityCode = "Silchar") {
  const baseURL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "8796a327bb73a0360ec025153ce7b207";
  const unit = "metric";
  const city = cityCode;
  let url = `${baseURL}?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=${unit}`;

  fetch(url)
    .then(res => res.json())
    .then(res => {
      let data = res;
      console.log(data.name);
      loc.innerText = `${data.name}, ${data.sys.country}`;
      currentTemp.innerText = `${data.main.temp.toFixed(0)}°C`;
      minTemp.innerText = `Min ${data.main.temp_min.toFixed(0)}°C`;
      maxTemp.innerText = `Max ${data.main.temp_max.toFixed(0)}°C`;
      weather.innerText = data.weather[0].description;
      cloud.innerText = `${data.clouds.all}%`;
      humidity.innerText = `${data.main.humidity}%`;
      wind.innerText = `${data.wind.speed} m/s`;
      icon.src = `https://openweathermap.org/img/wn/${
        data.weather[0].icon
      }@2x.png`;
    });
}
