const weatherApi = {
  getForecast: async (cityName) => {
    const queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&appid=" +
      config.weatherApiKey +
      "&units=metric";

    const result = await $.ajax({
      async: true,
      crossDomain: true,
      url: queryURL,
      method: "GET",
    });

    return result;
  },
};
