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

function getPayloadDecoded_(string){
  if (string. indexOf("?") >= 0) var string = string.split("?")[1];
  var string = decodeURIComponent(string);
  var string = JSON.parse('{"' + decodeURI(string).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
  var payload = {}
  Object.keys(string).forEach(function(key){
    payload[key] = encodeURIComponent(string[key]);
  });
  return payload;
}


function hexdigest_(sign){
  return sign.map(function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('').toUpperCase();
}


function lbcRequest_(scope, method, endpoint, payload) {
  var payload = payload || {};
  var payloadEncoded = getPayloadEncoded_(payload)
  if (scope !== "none") {
    var hmac = getHmac_(scope);
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
  var request = UrlFetchApp.fetch("https://localbitcoins.com".concat(endpoint).concat("?" + payloadEncoded), options);
  if (request.getResponseCode() === 200) {
    var response = JSON.parse(request.getContentText("UTF-8"));
    return response
  }
  else{
    fetchLog_(request);
  }
}


function returnSheetOrJson_(inputs,isNext){
  if (typeof client === 'undefined' || !isNaN(client)){
    var finals = ifSheet_(inputs,isNext);
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


function ifSheet_(inputs,isNext){
  var final = cleanSortedNormalizedArray(inputs)
  writeToSheet_("Trades Released",final,next);
}

function writeToSheet_(sheet_name,array,isNext){
  if (typeof isNext === "undefined"){  
    var keysRow = Object.keys(array[0]);
    writeToRow_(sheet_name,keysRow);
  } 
  array.forEach(function(object){
    var valuesRow = [];
    Object.keys(object).forEach(function(key){
      valuesRow.push(object[key])
    });
    writeToRow_(sheet_name,valuesRow);
  });
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