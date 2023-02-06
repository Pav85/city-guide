async function makeCalls() {
  const cityName = $("#searchInput").val();

  const resGeoApi = await geoApi.getCity(cityName);
  const resWikiApi = await wikipediaApi.getArticle(cityName);
  const resCountryApi = await restCountriesApi.getCountry(
    resGeoApi.data[0].countryCode
  );

  // Name of country
  const countryName = $("<p>").text(`Country: ${resCountryApi[0].name.common}`);
  // flag
  const flagOfCountry = $("<p>").text(`Flag: ${resCountryApi[0].flag}`);
  // language
  const lng = Object.keys(resCountryApi[0].languages)[0];
  const languageOfCountry = $("<p>").text(
    `Language: ${resCountryApi[0].languages[lng]}`
  );
  // currency
  const curr = Object.keys(resCountryApi[0].currencies)[0];
  const currencyOfCountry = $("<p>").text(`Currency: ${curr}`);

  const pageId = Object.keys(resWikiApi.query.pages);
  $("#info").html(resWikiApi.query.pages[pageId].extract);
  $("#city").html("<h2>").text(`${cityName}`);
  $("#lang").html(countryName);
  $("#lang").append(flagOfCountry, languageOfCountry, currencyOfCountry);
}

const button = $("#search").click(makeCalls, cityWeather);
