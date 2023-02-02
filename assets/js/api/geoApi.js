const geoApi = {
  getCity: async (cityName) => {
    const result = await $.ajax({
      async: true,
      crossDomain: true,
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=1&namePrefix=${cityName}&sort=-population`,
      method: "GET",
      headers: {
        "X-RapidAPI-Key": config.xRapidAPIKey,
        "X-RapidAPI-Host": config.xRapidAPIHost,
      },
    });

    return result;
  },
};
