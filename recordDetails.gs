/**
 * Opens a sidebar. The sidebar structure is described in the showRecordDetailsHtml.html
 * project file.
 */
function showRecordDetails() {
  var ui = HtmlService.createTemplateFromFile('Sidebar')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle(SIDEBAR_TITLE);
  SpreadsheetApp.getUi().showSidebar(ui);
}

/**
 * Returns the active row.
 *
 * @return {Object[]} The headers & values of all cells in row.
 */
 
 
 /*
function getRecord() {
  // Retrieve and return the information requested by the sidebar.
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var rowNum = sheet.getActiveCell().getRow();
  if (rowNum > data.length) return [];
  var record = [];
  for (var col=0;col<headers.length;col++) {
    var cellval = data[rowNum-1][col];
    // Dates must be passed as strings - use a fixed format for now
    if (typeof cellval == "object") {
      cellval = Utilities.formatDate(cellval, Session.getScriptTimeZone() , "M/d/yyyy");
    }
    // TODO: Format all cell values using SheetConverter library
    record.push({ heading: headers[col],cellval:cellval });
  }
  return record;
}

*/