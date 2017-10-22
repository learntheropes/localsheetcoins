/**
 * Opens a sidebar. The sidebar structure is described in the keysPageHtml.html
 * project file.
 */
function showKeyPage() {   
  var ui = HtmlService.createTemplateFromFile('keysPageHtml')
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setTitle('Manage keys');
  SpreadsheetApp.getUi().showSidebar(ui);
}

var userProperties = PropertiesService.getUserProperties();

function saveHmacKey(scope,key,secret) {
  userProperties.setProperty("lbcHmac_key_" + scope, key);
  userProperties.setProperty("lbcHmac_secret_" + scope, secret);
}