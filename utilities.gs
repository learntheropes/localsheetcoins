function fetchLog_(request){
  Logger.log("Function: " + getCaller_());
  Logger.log("Code: " + request.getResponseCode());
  Logger.log("Headers: " + request.getAllHeaders().toSource());
  Logger.log("Content: " + request.getContentText());
}

function activeCellA1(){
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveCell().getA1Notation();
}

function isNotInArray_(value, array) {
  return array.indexOf(value) === -1;
}

function saveToRow_(sheet_name,array){
 var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet_name);
 sheet.appendRow(array);
}

function writeArrayToColumn_(array,sheet,column){
  var array2d = [];
  array.forEach(function(el){array2d.push([el])});
  SpreadsheetApp.getActive().getSheetByName(sheet).getRange(2,column,array.length,1).setValues(array2d);
}

function elementHash(input, callback){
  var output = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, JSON.stringify(input));
  callback(hexdigest_(output));
}

function sortObjectByKey_(object){
  const ordered = {};
  Object.keys(object).sort().forEach(function(key) {
      ordered[key] = object[key];
  });
  return ordered
}

function sortArrayByKey_(array,key){
  array.sort(function(a, b){
    var keyA = a[key.toString()];
    var keyB = b[key.toString()];
    if (keyA < keyB) return -1 
    if (keyA > keyB) return 1
    return 0
  })
}


function getCaller_(){
  var stack; var ret = [];
  try { throw new Error("Whoops!"); } 
  catch(e){ stack = e.stack; }
  finally{
    var matchArr = stack.match(/\(.*\)/g);
    if (matchArr.length > 2){
      tmp = matchArr[2];
      ret = matchArr.slice(2).map(function(caller) { return caller.slice(1, caller.length - 1) + "()"});
    }
    return ret.reverse();
  }
}
