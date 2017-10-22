// PUBLIC

function lbcCountries(){
 var response = lbcRequest_("none", "get", "/api/countrycodes/");
 var data = response.content.data.cc_list;
 writeArrayToColumn_(data,"Sheet7",1);
}

function lbcEquation(equation){
 var response = lbcRequest_("none", "get", "/equation/" + equation);
 Logger.log(response.content)
 return response.content
}

function lbcApiToSheet(apiMethods){
  var sheetMethods = [];
    Object.keys(apiMethods).forEach(function(method){
      sheetMethods.push({
        name: apiMethods[method]["name"],
        code: apiMethods[method]["code"],
        currencies: apiMethods[method]["currencies"],
        bank_name_choices: apiMethods[method]["bank_name_choices"]
      });
    });
  sortObjectByKey_(sheetMethods,"name")
  return writeJsonToArrays_(sheetMethods);
};

function lbcPaymentMethods(client){
  var response = lbcRequest_("none", "get", "/api/payment_methods/");
  var datas = response.content.data.methods;
  var apiMethods = {};
  Object.keys(datas).forEach(function(data){
    apiMethods[datas[data]["code"]] = datas[data];
  });
  return apiMethods;
}


function lbcCurrencies(){
  var response = lbcRequest_("none", "get", "/api/currencies/");
}

function lbcCountryCodes(){
  var response = lbcRequest_("none", "get", "/api/countrycodes/");
  return response.content.data.cc_list;
}

// ACCOUNT

function lbcMyself(){
  var response = lbcRequest_("read", "get", "/api/myself/");
  return JSON.stringify(response);
}

function advGet(id){
  var response = lbcRequest_("read", "get", "/api/ad-get/" + id + "/");
}

// MERCHANT

function lbcInvoices(){
  var response = lbcRequest_("read", "get", "/api/merchant/invoices/");
  return JSON.stringify(response);
}

function lbcInvoiceNew(currency, amount, description, internal, return_url){
  var payload = {
    currency: currency,
    amount: amount,
    description: description
  };
  if (internal) {payload.internal = internal};
  if (return_url) {payload.return_url = return_url};
  var response = lbcRequest_("read", "post", "/api/merchant/new_invoice/", payload);
  return JSON.stringify(response);
}

function lbcInvoiceId(invoice_id){
  var response = lbcRequest_("read", "get", "/api/merchant/invoice/" + invoice_id + "/");
  return JSON.stringify(response);
}

function lbcInvoiceDelete(invoice_id){
  var response = lbcRequest_("readwrite", "post", "/api/merchant/delete_invoice/" + invoice_id + "/");
  return JSON.stringify(response);
}





var lbc_baseUrl = "https://localbitcoins.com";

function getHmac_(scope) {
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
  
  var request = UrlFetchApp.fetch(lbc_baseUrl.concat(endpoint), options);
  
  // fetchLog_(request) ;
  
  var response = {
    statusCode: request.getResponseCode(),
    content: JSON.parse(request.getContentText())
  };
      
  if (response.statusCode === 200) {
  
    return response;
  
  }
  
  else {
    
    // Add the error to a sheet
  
  };
  
}