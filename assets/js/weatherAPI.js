function cityWeather() {
  var city = $("#searchInput").val();
  $('#searchInput').val("");

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

    var cityName = $("<h2>").text(city);
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
    var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    $("<h2>").attr("src", iconURL);

    var iconImage = $("<img src=" + iconURL + ">");
    // cityName.prepend(iconImage);

    var weatherCard = $("#card-body");

    weatherCard.empty();
    weatherCard.append(cityName, iconImage, cityTemp, cityWind, cityHumidity);
  });
}