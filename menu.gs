function onOpen(e) {
  SpreadsheetApp.getUi()
    .createAddonMenu()
    .addItem('Manage keys', 'showKeyPage')
    .addItem('New advertisement', 'showNewAdvPage')
    .addItem('View records', 'showRecordDetails')
    .addToUi();
}


function onInstall(e) {
  onOpen(e);
}


function showNewAdvPage() {   
  var ui = HtmlService.createTemplateFromFile('newAdvPageHtml')
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setTitle('New advertisement');
  SpreadsheetApp.getUi().showSidebar(ui);
}


function showAdvancePriceDialog() {
  var html = HtmlService.createHtmlOutputFromFile('advancePriceDialog')
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, 'Advance Price Setting');
}


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
}



