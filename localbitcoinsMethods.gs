/**
 * PUBLIC api methods.
 */
function lbcCountries(){
 var response = lbcRequest_("none", "get", "/api/countrycodes/");
 var data = response.content.data.cc_list;
 writeArrayToColumn_(data,"Sheet7",1);
}

function lbcEquation(equation){
 var response = lbcRequest_("none", "get", "/equation/" + equation);
 return response.content
}


function lbcCurrencies(){
  var response = lbcRequest_("none", "get", "/api/currencies/");
}


function lbcCountryCodes(){
  var response = lbcRequest_("none", "get", "/api/countrycodes/");
  return response.content.data.cc_list;
}

/**
 * ADVERTISEMENTS api methods.
 */
function lbcMyAds(client){
  var response = lbcRequest_("read", "get", "/api/ads/").content.data.ad_list;
  var outputs = returnSheetOrJson_(response,client);
  return outputs;
}

function lbcConact(contact_id){
var contact_id = "2580931"
  var response = lbcRequest_("read", "get", "/api/contact_info/" + contact_id + "/").content.data;
  var temp = JSON.stringify(response, replacer);
var response = JSON.parse(temp)

}


/**
 * ACCOUNT api methods.
 */
function lbcMyself(){
  var response = lbcRequest_("read", "get", "/api/myself/");
  return JSON.stringify(response);
}

function advGet(id){
  var response = lbcRequest_("read", "get", "/api/ad-get/" + id + "/");
}

function lbcReleased(client){
  var response = lbcRequest_("read", "get", "/api/dashboard/released/").content.data.contact_list;
  var outputs = returnSheetOrJson_(response);
  return outputs;
}


/**
 * MERCHANT api methods.
 */
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


