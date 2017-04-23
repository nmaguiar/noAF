// noAF main functionality
// author: nmaguiar@gmail.com

// Shortcuts
// ---------
function isUnDef(aObject) {
   return (typeof aObject == 'undefined') ? true : false;
}

function isDef(aObject) {
   return (!isUnDef(aObject));
}

var __loadedLibs = {};
function loadLib(aLibrary, forceReload, aFunctionOnSuccess) {
   if (forceReload ||
       isUnDef(__loadedLibs[aLibrary.toLowerCase()]) ||
       __loadedLibs[aLibrary.toLowerCase()] == false) {
      load(aLibrary);
      __loadedLibs[aLibrary.toLowerCase()] = true;
      if (isDef(aFunctionOnSuccess)) aFunctionOnSuccess();
      return true;
   }

   return false;
}

// Enhanced printing
// -----------------
function sprint(aObject, aDelimiter) {
   aDelimiter = (isUnDef(aDelimiter) ? "  " : aDelimiter);

   print(stringify(aObject, undefined, aDelimiter)); 
}

function printErr(aText) {
   java.lang.System.err.println(aText);
}

// To text
// -------
function stringify(aObject, aReplacer, aSpace) {
   if (isUnDef(aSpace)) aSpace = " ";

   return JSON.stringify(aObject, aReplacer, aSpace);
}

function log(aMessage) {
   var d = new Date();
   print(String(d) + " INFO | " + aMessage);
}

function logErr(aMessage) {
   var d = new Date();
   printErr(String(d) + " ERROR | " + aMessage);
}

// Load libs
// ---------
var OW;
if (isUnDef(OW)) OW = function() {};

var ow;
if (isUnDef(ow)) { ow = new OW(); }

OW.prototype.loadTest = function() { loadLib("js/ow/ow.test.js"); ow.test = new OW.test(); return ow.test; }

