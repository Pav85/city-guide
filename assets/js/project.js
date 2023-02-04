console.log('hello world');

function cityWeather(city) {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey + "&units=metric";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var cityName = $("<h2>").text(moment().format("MM/DD/YYYY"));
        var cityTemp = $("<p>").text("Temp: " + response.list[0].main.temp.toFixed(0) + " °C");
        var cityWind = $("<p>").text("Wind: " + response.list[0].wind.speed + " KPH");
        var cityHumidity = $("<p>").text("Humidity: " + response.list[0].main.humidity + "%");

    })
}