const selectionGroup = document.getElementById("selection-group");
const textBox = document.getElementById("text-box");
const submitBtn = document.getElementById("search-icon");
const apiKey = "e5a9acb7dd5ee7202d9a0dd5416972e4";

selectionGroup.addEventListener("change", function () {
  const selectedOption = selectionGroup.options[selectionGroup.selectedIndex];
  if (selectedOption.id === "zip-code__categ") {
    (textBox.type = "number"), (textBox.min = "1");
  } else if (selectedOption.id === "city-name__categ") {
    textBox.type = "search";
  } else if (selectedOption.id === "city__categ") {
    textBox.type = "text";
  }
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const location = textBox.value;
  if (location === "") {
    document.getElementById("weather-forecasts").innerText =
      "* This field is required.";
    document.getElementById("weather-forecasts").style.color = "white";
    document.getElementById("weather-forecasts").style.background = "red";
    document.getElementById("weather-forecasts").style.fontSize = "1.2rem";
  } else {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("weather-forecasts").innerText = data;
        const forecastData = data.list;
        const forecastContainer = document.getElementById("weather-forecasts");
        forecastContainer.innerHTML = "";

        forecastData.forEach((forecast) => {
          const date = new Date(forecast.dt * 1000);
          const dayOfWeek = date.toLocaleDateString(undefined, {
            weekday: "long",
          });
          const timeOfDay = date.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          });
          const temperature = forecast.main.temp;
          const weatherDescription = forecast.weather[0].description;
          const forecastCard = document.createElement("div");
          forecastCard.classList.add("forecast-card");
          forecastCard.innerHTML = `
          <table class="weather-info">
        <tr>
          <th>${dayOfWeek}</th>
          <th>${timeOfDay}</th>
        </tr>
        <tr>
          <td colspan="2">Temperature: ${temperature} &deg;C</td>
        </tr>
        <tr>
          <td colspan="2">${weatherDescription}</td>
        </tr>
      </table>
            `;
          forecastContainer.appendChild(forecastCard);
        });
      })
      .catch(
        (error) =>
          (document.getElementById("weather-forecasts").innerText =
            "Error 404 Not Found")
      );
  }
});
