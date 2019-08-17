let loc = select(".location");
let currentTemp = select(".current-temp");
let minTemp = select(".min-temp");
let maxTemp = select(".max-temp");
let weather = select(".weather");
let icon = select(".icon");
let cloud = select(".cloud .value");
let humidity = select(".humidity .value");
let wind = select(".wind .value");

getData(localStorage.getItem("city"));

setInterval(() => {
  getData(localStorage.getItem("city"));
}, 1000 * 30);

loc.addEventListener("change", e => {
  e.preventDefault();
  localStorage.setItem("city", loc.value);
  getData(loc.value);
  loc.value = "";
});

function getData(cityCode) {
  const baseURL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "8796a327bb73a0360ec025153ce7b207";
  const unit = "metric";
  const city = encodeURIComponent(cityCode || "hailakandi");
  let url = `${baseURL}?q=${city}&appid=${API_KEY}&units=${unit}`;

  fetch(url)
    .then(res => res.json())
    .then(updateData);
}

function updateData(res) {
  if (res.cod == 200) {
    loc.value = `${res.name}, ${res.sys.country}`;
    currentTemp.innerText = `${res.main.temp.toFixed(0)}°C`;
    minTemp.innerText = `Min ${res.main.temp_min.toFixed(0)}°C`;
    maxTemp.innerText = `Max ${res.main.temp_max.toFixed(0)}°C`;
    weather.innerText = res.weather[0].description;
    cloud.innerText = `${res.clouds.all}%`;
    humidity.innerText = `${res.main.humidity}%`;
    wind.innerText = `${res.wind.speed} m/s`;
    icon.src = `./icons/${res.weather[0].icon}.svg`;
    showElements();
  } else {
    loc.value = "Oops.." + res.message;
    hideElements();
  }
}

// HELPER FUNCTIONS
function select(el) {
  let elements = document.querySelectorAll(el);
  if (elements.length == 1) return elements[0];
  else return elements;
}

function hideElements() {
  select(".location ~ *").forEach(i => {
    i.style.opacity = "0";
  });
}

function showElements() {
  select(".location ~ *").forEach(i => {
    i.style.opacity = "1";
  });
}
