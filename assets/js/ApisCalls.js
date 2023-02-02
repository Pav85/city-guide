async function makeCalls() {
  const cityName = $("#searchInput").val();

  const resGeoApi = await geoApi.getCity(cityName);
  const resWikiApi = await wikipediaApi.getArticle(cityName);
  const resCountryApi = await restCountriesApi.getCountry(
    resGeoApi.data[0].countryCode
  );

  const pageId = Object.keys(resWikiApi.query.pages);
  $("#info").append(resWikiApi.query.pages[pageId].extract);
}

const button = $("#search").click(makeCalls);
