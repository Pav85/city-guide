const publicHolidayApi = {
  getPublicHoliday: async (countryCode) => {
    const result = await $.ajax({
      async: true,
      crossDomain: true,
      url: `https://public-holiday.p.rapidapi.com/2023/${countryCode}`,
      method: "GET",
      headers: {
        "X-RapidAPI-Key": config.xRapidApiKey,
        "X-RapidAPI-Host": config.xRapidHolidayApiHost,
      },
    });

    return result;
  },
};
