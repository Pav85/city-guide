function makeCalls() {
  $.ajax({
    async: true,
    crossDomain: true,
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=1&namePrefix=London&sort=-population",
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2870710a70mshb9dfd7b0cc1c38ap18047cjsn644f8c604a16",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  }).done(function (res1) {
    console.log("From geoDb", res1);
    console.log(res1.data[0].city);
    $.ajax({
      async: true,
      crossDomain: true,
      url: `https://restcountries.com/v3.1/alpha/${res1.data[0].countryCode}`,
      method: "GET",
    }).done(function (res2) {
      console.log("From restCountries", res2);
      $.ajax({
        async: true,
        crossDomain: true,
        url: `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=London&origin=*`,
        method: "GET",
      }).done(function (res3) {
        const pageId = Object.keys(res3.query.pages);
        $("#info").append(res3.query.pages[pageId].extract);
      });
    });
  });
}

// const button = $("#search").click(makeCalls, cityWeather, publicHolidays); // I added function here - Pawel
const button = $("#search").click(makeCalls, weatherAndPublicHolidays); // I added function here)
