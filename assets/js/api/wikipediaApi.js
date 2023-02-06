const wikipediaApi = {
  getArticle: async (cityName) => {
    const result = await $.ajax({
      async: true,
      crossDomain: true,
      url: `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${cityName}&origin=*`,
      method: "GET",
    });

    return result;
  },
};

