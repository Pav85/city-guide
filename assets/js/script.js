const button = $("#search").click(getGeoAndRenderGeoData);

const cities = [];
showLocal();

async function getGeoAndRenderGeoData() {
  const cityName = $("#searchInput").val();
  $('#searchInput').val("");
  cities.push(cityName);

  addLocal();

  const showCards = $("#api-section"); // show cards section
  const showFooter = $(".footer-main"); // show footer section
  const showLargeJumbotron = $(".jumbotron-main"); // show large jumbotron section
  const showLatestSearches = $("#searches"); // show latest searches section
  showCards.removeClass("hide"); // show cards section
  showFooter.removeClass("footer-main"); // show footer section
  showLargeJumbotron.removeClass("jumbotron-main"); // show large jumbotron section
  showLatestSearches.removeClass("hide-searches"); // show latest searches section

  const resGeoApi = await geoApi.getCity(cityName);
  const resWikiApi = await wikipediaApi.getArticle(cityName);
  const resCountryApi = await restCountriesApi.getCountry(
    resGeoApi.data[0].countryCode
  );
  const resWeatherApi = await weatherApi.getForecast(cityName);
  const resPublicHolidayApi = await publicHolidayApi.getPublicHoliday(
    resGeoApi.data[0].countryCode
  );

  renderCountryCardAndCurrency(resCountryApi);
  renderCountryArticle(resWikiApi);
  renderWeatherCard(cityName, resWeatherApi);
  randerHolidayCard(resPublicHolidayApi);
}

function renderCountryCardAndCurrency(resCountryApi) {
  // country name
  const pWithName = $("<p>").text(`Country: ${resCountryApi[0].name.common}`);
  // flag
  const pWithFlag = $("<p>").text(`Flag: ${resCountryApi[0].flag}`);
  // language
  const lngKey = Object.keys(resCountryApi[0].languages)[0];
  const pWithLng = $("<p>").text(
    `Language: ${resCountryApi[0].languages[lngKey]}`
  );
  // currency
  const currencyKey = Object.keys(resCountryApi[0].currencies)[0];
  const pWithCurrency = $("<p>").text(`Currency: ${currencyKey}`);
  $("#new-currency-input").val(currencyKey);

  $("#lang").empty();
  $("#lang").append(pWithName, pWithFlag, pWithLng, pWithCurrency);
}

function renderCountryArticle(resWikiApi) {
  const pageId = Object.keys(resWikiApi.query.pages);
  $("#info").html(resWikiApi.query.pages[pageId].extract);
}

function renderWeatherCard(headerCity, resWeatherApi) {
  var headerCity = $("<h2>").text(headerCity);
  var pCityTemp = $("<p>").text(
    "Temp: " + resWeatherApi.list[0].main.temp.toFixed(0) + " °C"
  );
  var pCityWind = $("<p>").text(
    "Wind: " + (resWeatherApi.list[0].wind.speed * 3.6).toFixed(1) + " Km/h"
  );
  var pCityHumidity = $("<p>").text(
    "Humidity: " + resWeatherApi.list[0].main.humidity + "%"
  );

  var iconCode = resWeatherApi.list[0].weather[0].icon;
  var iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
  $("<h2>").attr("src", iconURL);

  var iconImage = $("<img src=" + iconURL + ">");
  var weatherCard = $("#card-body");

  weatherCard.empty();
  weatherCard.append(
    headerCity,
    iconImage,
    pCityTemp,
    pCityWind,
    pCityHumidity
  );
}

function randerHolidayCard(resPublicHolidayApi) {
  const holidays = $("#holidays");
  for (let i = 0; i < resPublicHolidayApi.length; i++) {
    const element = resPublicHolidayApi[i];
    const liHoliday = $("<li>").text(`${element.date} - ${element.name}`);
    holidays.append(liHoliday);
  }
}

function addLocal() {
  var local = localStorage.setItem("cities", cities);
}

function showLocal() {
  var displayLocal = localStorage.getItem('cities');

  var p = $("<p>");
  p.addClass("local-p");

  p.text(displayLocal);

  $("#latest-searches").append(p);
}
