var container = $('#currency-container');
var currentCurrency = [];
var desireCurrency = [];
var amount = [];
var newAmount = $('#new-amount-input');
var convertCurrency = $('#convert-currency');

// When convert currency button is clicked run ajax and display the new amount. 
convertCurrency.on("click", function (event) {
    event.preventDefault();

    // Will delete the previous input 
    amount.shift();
    currentCurrency.shift();
    desireCurrency.shift();

    // Push the input user to the form on HTML 
    var currency = $('#currency-input').val().trim();
    var amountToDisplay = $('#amount-input').val().trim();
    var newCurrency = $('#new-currency-input').val().trim();

    currentCurrency.push(currency);
    desireCurrency.push(newCurrency);
    amount.push(amountToDisplay);

    console.log(currentCurrency);
    console.log(newCurrency);
    console.log(amountToDisplay);

    // currency convert URL
    var queryURL = "https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=" + currentCurrency + "&want=" + desireCurrency + "&amount=" + amount;
    console.log(queryURL);
    // Ajax function
    $.ajax({
        async: true,
        crossDomain: true,
        url: queryURL,
        method: "GET",
        headers: {
            "X-RapidAPI-Key": rapidApiKey,
            "X-RapidAPI-Host": "currency-converter-by-api-ninjas.p.rapidapi.com"
        }
    }).then(function (response) {
        console.log(response);

        // Will display the new amount on a readonly input
        var amountToDisplay = response.new_amount;
        console.log(amountToDisplay);

        // Set the value the response of ajax
        newAmount.attr('value', amountToDisplay);


    });

})