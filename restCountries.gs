function getCountries(client) {
  var countriesArray = [];
  var countriesObj = {};
  var countryCodes = lbcCountryCodes();
  var countryCodesString = countryCodes.join(";")
  var request = UrlFetchApp.fetch("https://restcountries.eu/rest/v2/alpha?codes=" + countryCodesString);
  var response = JSON.parse(request.getContentText());
  response.forEach(function(country){
    var currencies = [];
    country.currencies.forEach(function(currency){
      if (currency.code !== null && currency.code !== "(none)"){currencies.push(currency.code);};
    })
    var timezones = [];
    country.timezones.forEach(function(timezone){
      if (timezone === "UTC"){var zone = "+00:00"}
      else {var zone = timezone.replace("UTC","")};
     timezones.push(zone);
    })
    if (typeof client === 'undefined'){var currencies = JSON.stringify(currencies); var timezones = JSON.stringify(timezones); }
    var info = {
      code: country.alpha2Code,
      name: country.name,
      currencies: currencies,
      timezones: timezones
    };
    countriesArray.push(info);
    countriesObj[country.alpha2Code] = info;
  });
  if (typeof client === 'undefined'){return writeJsonToArrays_(countriesArray)}
  else {return countriesObj}
}