function weatherAndPublicHolidays() {
  cityWeather();
  publicHolidays();
}
// weather card

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
  var city = $("#city-input").val();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIkey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var countryCode = response.city.country;

    var year = moment().format("YYYY");

    var settings = {
      async: true,
      crossDomain: true,
      url: "https://public-holiday.p.rapidapi.com/" + year + "/" + countryCode,
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "60da9e0779msh9ab89e49522ec4cp1a7516jsnda11e8862453",
        "X-RapidAPI-Host": "public-holiday.p.rapidapi.com",
      },
    };

    $.ajax(settings).done(function (response) {
      for (var i = 0; i < response.length; i++) {
        var holidayDate = response[i].date;

        var holidayCard = $("#public-holidays-card");
        holidayCard.empty();

        for (var j = 0; j <= holidayDate.length; j++) {
          holidayCard.append(
            response[j].date.replace("2023-", "") +
              " " +
              response[j].name +
              "<br>"
          );
        }
      }
    });
  });
}
