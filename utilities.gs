function fetchLog_(request){
  Logger.log("Function: " + getCaller_());
  Logger.log("Code: " + request.getResponseCode());
  Logger.log("Headers: " + request.getAllHeaders().toSource());
  Logger.log("Content: " + request.getContentText());
}

function isCellOrNot(){
  var activeCell = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveCell().getA1Notation();
  Logger.log(JSON.stringify(activeCell))
  return JSON.stringify(activeCell);
}


function sortObjectByKey_(object,key){
  object.sort(function(a, b){
    var nameA=a[key].toLowerCase(), nameB=b[key].toLowerCase()
    if (nameA < nameB)
        return -1 
    if (nameA > nameB)
        return 1
    return 0
  })
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

function writeJsonToArrays_(data){
  var results = []; var keys = []; var values = [];
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
