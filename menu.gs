/**
 * Add-on menu on open and install.
 */
function onOpen(e) {
  SpreadsheetApp.getUi()
    .createAddonMenu()
    .addItem('Manage keys', 'showKeyPage')
    .addItem('New advertisement', 'showNewAdvPage')
    .addItem('View records', 'showRecordDetails')
    .addToUi();
};

function onInstall(e) {
  onOpen(e);
};


/**
 * HMAC related functions.
 * Open the HMAC settings sidebar. The sidebar structure is described in the HmacKeysPage.html project file.
 */
function showKeyPage() {   
  var ui = HtmlService.createTemplateFromFile('hmacKeysPage')
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setTitle('Manage keys');
  SpreadsheetApp.getUi().showSidebar(ui);
};

/**
 * Save HMAC keys and secrets in the user properties.
 */
function saveHmacKey(scope,key,secret) {
  var userProperties = PropertiesService.getUserProperties();
  UserProperties.setProperty("lbcHmac_key_" + scope, key);
  userProperties.setProperty("lbcHmac_secret_" + scope, secret);
};

/**
 * New advertisement related functions.
 * Open the new advertisement sidebar. The sidebar structure is described in the newAdvPage.html project file.
 */
function showNewAdvPage() {   
  var ui = HtmlService.createTemplateFromFile('newAdvPage')
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setTitle('New advertisement');
  SpreadsheetApp.getUi().showSidebar(ui);
};



/**
 * Localbitcoins advanced price equations related functions.
 * Open the localbitcoins advanced equation dialog. The dialog structure is described in the internalAdvancePriceDialog.html project file.
 */
function showAdvancePriceInternalDialog() {
  var html = HtmlService.createHtmlOutputFromFile('internalAdvancePriceDialog')
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, 'Advance Price Setting');
};

/**
 * Create the array of all the available exchanges and tickers.
 */
function makeAllTickers(){
  var exchanges = ["coincheckjpy","bitfinexusd","bitflyerjpy","gdaxusd","bitstampusd","zaifjpy","fiscojpy","korbitkrw","lakeusd","krakeneur","geminiusd","krakenusd","okcoincny","btcboxjpy","zyadoeur","coinsbankusd","oitbitusd","bitstampeur","coinsbankeur","coinbaseeur","cexusd","coinsbankgbp","wexusd","hitbtcusd","cexiousd","coinsbankrub","bitbaypln","coinbaseusd","okcoinusd","btcdeeur","bitxzar","remitanovnd","getbtcusd","btcoididr","coinfloorgbp","bitmarketpln","foxbitbrl"];
  var tickers = ["avg","low","bid","ask","close"];
  var all = [];
  exchanges.forEach(function(exchange){
    tickers.forEach(function(ticker){
      all.push(exchange + "_" + ticker)
    });
  });
  return all;
};



