function makeCall() {
  //   $.ajax({
  //     async: true,
  //     crossDomain: true,
  //     url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=1&namePrefix=London&sort=-population",
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "2870710a70mshb9dfd7b0cc1c38ap18047cjsn644f8c604a16",
  //       "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  //     },
  //   }).done(function (res1) {
  //     console.log('From geoDb', res1);
  //     console.log(res1.data[0].city);
  //     $.ajax({
  //       async: true,
  //       crossDomain: true,
  //       url: `https://restcountries.com/v3.1/alpha/${res1.data[0].countryCode}`,
  //       method: "GET",
  //     }).done(function (res2) {
  //       console.log("From restCountries", res2);
  $.ajax({
    async: true,
    crossDomain: true,
    url: `https://en.wikipedia.org/w/rest.php/v1/page/London/html`,
    method: "GET",
  }).done(function (res2) {
    console.log("From wikimedia idQ84", res2);
  });
  //     });
  //   });
}

const button = $("<button>").text("renderResponses").click(makeCall);
$(".container").append(button);
