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


    // currency convert URL
    var queryURL = "https://api.apilayer.com/fixer/convert?to=" + desireCurrency + "&from=" + currentCurrency + "&amount=" + amount;

    // Ajax function
    $.ajax({
        url: queryURL,
        method: "GET",
        redirect: "follow",
        headers: {
            apikey: currencyApiKey,
        }
    }).then(function (response) {

        // Will display the new amount on a readonly input
        var amountToDisplay = response.result;

        // Set the value the response of ajax
        newAmount.attr('value', amountToDisplay.toFixed(2));


    });

})

