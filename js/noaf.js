/*
 *  Copyright 2017 Nuno Aguiar <nuno@aguiar.name>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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

