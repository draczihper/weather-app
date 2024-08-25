import "./styles.css";

const form = document.querySelector("[data-search-form]");
const searchInput = document.querySelector("[data-search-input]");
const searchButton = document.querySelector("[data-search-button]");
const displayForecastContainer = document.querySelector("[data-display-forecast-container]");


const API_KEY = "DRV9JB4KZUH55EDM462M3HS4D";

let forecastData;

// Let's get back some basic forecast (sun, rain, wind, temperature) for now
async function getForecastData() {
  const location = searchInput.value.replace(/ /g, "%20");
  const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&elements=datetime%2Cname%2Caddress%2CresolvedAddress%2Clatitude%2Clongitude%2Ctempmax%2Ctemp%2Cfeelslike%2Cdew%2Chumidity%2Cprecip%2Cprecipprob%2Cpreciptype%2Csnow%2Cwindspeed%2Cwinddir%2Cpressure%2Ccloudcover%2Cuvindex%2Csunrise%2Csunset%2Cmoonphase%2Cconditions%2Cdescription%2Cicon%2Csource&include=fcst%2Cdays&key=${API_KEY}&contentType=json`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    forecastData = data;
    console.log(forecastData);
  } catch (error) {
    console.log(error);
  }
  domDisplay();  
}

searchButton.addEventListener("click", () => {
  displayForecastContainer.innerHTML = "";
  getForecastData();
});


function CreateElement(tag, attributeName = "", attributeValue = "", content = "", parent = null) {
  this.element = document.createElement(tag);
  
  if (attributeName && attributeValue) {
    this.element.setAttribute(attributeName, attributeValue);
  }
  
  if (content) {
    this.element.textContent = content;
  }

  if (parent && typeof parent.appendChild === 'function') {
    parent.appendChild(this.element);
  }

    return this.element;
}

    function domDisplay() {
      const addressSection = new CreateElement("section", "class", "address", "", displayForecastContainer);
      const addressDiv = new CreateElement("div", "id", "address", "", addressSection);
      const addressH3 = new CreateElement("h3", "", "", forecastData.address, addressDiv);
      const resolvedAddressH5 = new CreateElement("h5", "", "", forecastData.resolvedAddress, addressDiv);

      const lat_longDiv = new CreateElement("div", "id", "lat-long", "", addressSection);
      const latP = new CreateElement("p", "", "", forecastData.latitude, lat_longDiv);
      const longP = new CreateElement("p", "", "", forecastData.longitude, lat_longDiv);
      const timezoneP = new CreateElement("p", "", "", forecastData.timezone, lat_longDiv);

      const descriptionDiv = new CreateElement("div", "id", "description", "", addressDiv);
      const descriptionP = new CreateElement("p", "", "", forecastData.description, descriptionDiv);

      const forecastSection = new CreateElement("section", "class", "forecast", "", displayForecastContainer);
      const table = new CreateElement("table", "", "", "", forecastSection);

      const weatherElements = forecastData.days[0];
      Object.keys(weatherElements).forEach((key) => {
        const row = new CreateElement("tr", "data-value", key, "", table);
        const rowHead = new CreateElement("th", "", "", key.charAt(0).toUpperCase() + key.slice(1), row);
      });

      const tableRows = document.querySelectorAll('tr');
      console.log(tableRows)

      for (let i = 0; i < forecastData.days.length - 8; i++) {
        const weatherDay = forecastData.days[i];
        console.log(i, weatherDay);

        Object.entries(weatherDay).forEach(([key, value]) => {
          for (let j = 0; j < tableRows.length; j++) {
            if (key === tableRows[j].dataset.value) {
            const tableData = new CreateElement("td", "", "", `${value}`, tableRows[j]);
            }
          }
        });
      }






      return displayForecastContainer;
    }