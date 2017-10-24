function getHmac_(scope) {
  var userProperties = PropertiesService.getUserProperties();
  var key = userProperties.getProperty("lbcHmac_key_" + scope);
  var secret = userProperties.getProperty("lbcHmac_secret_" + scope);
  return { key: key, secret: secret };     
}


function getPayloadEncoded_(payload){
  return Object.keys(payload).map(function(param) {
    return encodeURIComponent(param) + '=' + encodeURIComponent(payload[param]);
  }).join('&');
}


function hexdigest_(sign){
  return sign.map(function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('').toUpperCase();
}


function lbcRequest_(scope, method, endpoint, payload) {
  if (scope !== "none") {
    var hmac = getHmac_(scope);
    if (payload) {var payloadEncoded = getPayloadEncoded_(payload)}
    else {var payloadEncoded = ""};
    var nonce = (new Date).getTime().toString();
    var message = nonce.concat(hmac.key).concat(endpoint).concat(payloadEncoded);
    var sign = Utilities.computeHmacSha256Signature(message, hmac.secret, Utilities.Charset.UTF_8);
    var signature = hexdigest_(sign)
    var headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Apiauth-Key": hmac.key,
      "Apiauth-Nonce": nonce,
      "Apiauth-Signature": signature
    }
  }
  var options = {
    "muteHttpExceptions": true,
    "method": method,
    "headers": headers,
    "payload": payloadEncoded
  }
  var request = UrlFetchApp.fetch("https://localbitcoins.com".concat(endpoint), options); 
  var response = {
    statusCode: request.getResponseCode(),
    content: JSON.parse(request.getContentText()),
    pagination: JSON.parse(request.getContentText()).pagination
  };
  return response;
}


function returnSheetOrJson_(inputs,client){
  if (typeof client === 'undefined' || !isNaN(client)){
    var finals = ifSheet_(inputs);
  }
  else {
    var finals = ifJson_(inputs);
  };
  return finals
}


function ifJson_(inputs){
  var outputs = {};
  inputs.forEach(function(input){
    var key = input["data"][master_key]
    outputs[key.toString()] = input.data;
  });
  var outputs = sortObjectByKey_(outputs);
  return outputs;
}


function ifSheet_(inputs){
  var final = cleanSortedNormalizedArray(inputs)
  return writeJsonToArrays_(final)
}


function cleanSortedNormalizedArray(obj){
  var cleanObjects = cleanNullValuesInJson(obj);
  var keys = [], flattenObjects = [], sortedObjects = [];
  cleanObjects.forEach(function(cleanObject){
    var flattenObject = flatten(cleanObject["data"]);
    Object.keys(flattenObject).forEach(function(key){
      if (isNotInArray_(key, keys)) keys.push(key);
    });
    flattenObjects.push(flattenObject);
  });
  keys.sort();
  var len = keys.length;
  flattenObjects.forEach(function(flattenObject){
    var sortedObject = {}, i;
    for (i = 0; i < len; i++) {
      if (typeof flattenObject[keys[i]] === "undefined") sortedObject[keys[i]] = ""
      else sortedObject[keys[i]] = flattenObject[keys[i]];
    }
    sortedObjects.push(sortedObject);
  });
  return sortedObjects;
}


function replacer_(key,value) {
  if (value === null) return ""
  return value
}


function cleanNullValuesInJson(json){
  return JSON.parse(JSON.stringify(json, replacer_));
}


function writeJsonToArrays_(data){
  var results = [];
  var keys = [];
  var values = [];
  for (var i in data){
    for (var key in data[i]){
      if (i == 0) keys.push(key);
      values.push(data[i][key]);
    }
    if (i == 0){
      results.push(keys);
      keys = [];
    }
    results.push(values);
    values = [];
  }
  return results;
};