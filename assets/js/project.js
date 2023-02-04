function cityWeather() {
  var city = $("#city-input").val();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIkey +
    "&units=metric";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    var cityName = $("<h2>").text(moment().format("MM/DD/YYYY"));
    var cityTemp = $("<p>").text(
      "Temp: " + response.list[0].main.temp.toFixed(0) + " °C"
    );
    var cityWind = $("<p>").text(
      "Wind: " + (response.list[0].wind.speed * 3.6).toFixed(1) + " Km/h"
    );
    var cityHumidity = $("<p>").text(
      "Humidity: " + response.list[0].main.humidity + "%"
    );

    var countryCode = response.city.country;
    console.log(countryCode);

    var iconCode = response.list[0].weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
    $("<h2>").attr("src", iconURL);

    var iconImage = $("<img src=" + iconURL + ">");
    cityName.prepend(iconImage);

    var weatherCard = $("#card-body");

    weatherCard.empty();
    weatherCard.append(cityName, cityTemp, cityWind, cityHumidity);
  });
}

function publicHolidays() {
  console.log("public holidays");
  var city = $("#city-input").val();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIkey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (answer) {
    console.log(answer);

    var countryCode = response.city.country;
    console.log(countryCode);
  });
}

// publicHolidays();
