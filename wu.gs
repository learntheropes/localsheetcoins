


function wuTest(){
  wuGetcookies(function(cookies){
    wuTracking("8369190583", cookies);
  });
}


function wuTracking(mtcn,cookies) {
  var payload = {
    "channel":{
      "name":"Western Union","type":"WEB","version":"9Z00"
    },
    "security": {
      "session":{
        "id":null
      },
      "client_ip":null
    },
    "money_transfer_control":{
      "mtcn":mtcn,
      "filterPIIData":true
    },
    "inquiry_type":"MONEY_TRANSFER",
    "login":false,
    "bashPath":"/us/en"
  };
  
  
  var headers = {
    "content-type": "application/json",
    "cookie": cookies
  };
  
  var options = {
    "muteHttpExceptions": true,
    "method": "post",
    "headers": headers,
    "payload": payload
  };
  
  var nonce = (new Date).getTime().toString();
  
  var uri = "https://www.westernunion.com/wuconnect/rest/api/v1.0/TransactionInquiry?timestamp=" + nonce;
  
  var request = UrlFetchApp.fetch(uri, options);  
  fetchLog(request);
}

function wuCreatesession(cookies, callback){
  var payload = {
    "device":{
      "id":"",
      "type":"WEB"
    },
    "channel":{
      "name":"Western Union",
      "type":"WEB",
      "version":"9Z00",
      "device_identifier":"RESPONSIVE_MOB",
      "is_responsive":"true"
    },
    "referral_site":null,
    "external_reference_no":"1",
    "locale":{
      "country_code":"us",
      "language_code":"en"
    },
    "security":{
      "black_box_data":{
        "data": null,
        "length": null
       },
       "client_ip":null
    },
    "bashPath":"/us/en"
  };
  var headers = {
    "content-type": "application/json",
    "cookie": cookies
  };
  
  var options = {
    "muteHttpExceptions": true,
    "method": "post",
    "headers": headers,
    "payload": payload
  };

  var nonce = (new Date).getTime().toString();
  var uri = "https://www.westernunion.com/wuconnect/rest/api/v1.0/CreateSession?timestamp=" + nonce;
  var request = UrlFetchApp.fetch(uri, options);
  fetchLog(request);
  callback();
}



function wuGetcookies(callback){
  var options = {
    "muteHttpExceptions": true,
    "method": "get"
  }
  var uri = "https://www.westernunion.com/us/en/self-service/app/tracktransfer";
  var request = UrlFetchApp.fetch(uri, options);  
  fetchLog(uri, request);
  var cookies = [];
  var setCookies = (request.getAllHeaders())["Set-Cookie"];
  setCookies.forEach(function(cookie){
    var cookie= cookie.substr(0, cookie.indexOf(';'));
    cookies.push(cookie);
  });
  cookies.join("; ");
  callback(cookies);
}