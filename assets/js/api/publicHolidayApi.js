const publicHolidayApi = {
  getPublicHoliday: async (countryCode) => {
    const result = await $.ajax({
      async: true,
      crossDomain: true,
      url: `https://public-holiday.p.rapidapi.com/2023/${countryCode}`,
      method: "GET",
      headers: {
        "X-RapidAPI-Key": config.xRapidAPIKey,
        "X-RapidAPI-Host": config.xRapidAPIHost,
      },
    });

    return result;
  },
};
