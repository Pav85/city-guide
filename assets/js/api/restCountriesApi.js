const restCountriesApi = {
  getCountry: async (countryCode) => {
    const result = await $.ajax({
      async: true,
      crossDomain: true,
      url: `https://restcountries.com/v3.1/alpha/${countryCode}`,
      method: "GET",
    });

    return result;
  },
};
