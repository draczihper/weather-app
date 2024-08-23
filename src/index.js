import "./styles.css";

const form = document.querySelector("[data-search-form]");
const searchInput = document.querySelector("[data-search-input]");
const searchButton = document.querySelector("[data-search-button]");

const API_KEY = "DRV9JB4KZUH55EDM462M3HS4D";

// Let's get back some basic forecast (sun, rain, wind, temperature) for now
async function getForecastData() {
  let location;
  location = searchInput.value.replace(/ /g, "%20");
  let URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&elements=datetime%2Cname%2Caddress%2CresolvedAddress%2Clatitude%2Clongitude%2Ctempmax%2Ctemp%2Cfeelslike%2Cdew%2Chumidity%2Cprecip%2Cprecipprob%2Cpreciptype%2Csnow%2Cwindspeed%2Cwinddir%2Cpressure%2Ccloudcover%2Cuvindex%2Csunrise%2Csunset%2Cmoonphase%2Cconditions%2Cdescription%2Cicon%2Csource&include=fcst%2Cdays%2Chours&key=${API_KEY}&contentType=json`;
  console.log(location);
  console.log(URL);
  try {
    const response = await fetch(URL);
    const forecastData = await response.json();
    console.log(forecastData);
  } catch (error) {
    console.log(error);
  }
}

searchButton.addEventListener("click", () => {
  getForecastData();
});
