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
/**
 * <odoc>
 * <key>isUnDef(aObject) : Boolean</key>
 * Determines if aObject is undefined (returning true) or not (returning false).
 * </odoc>
 */
function isUnDef(aObject) {
   return (typeof aObject == 'undefined') ? true : false;
}

/**
 * <odoc>
 * <key>isDef(aObject) : Boolean</key>
 * Determines if aObject is defined (returning true) or not (returning false).
 * </odoc>
 */
function isDef(aObject) {
   return (!isUnDef(aObject));
}

/**
 * <odoc>
 * <key>loadLib(aLibrary, forceReload, aFunctionOnSuccess) : Boolean</key>
 * Tries to load a javascript aLibrary only once. Subsequent calls to loadLib will to load
 * if the library has alread been loaded. This can be overriden with forceReload = true.
 * If the lib is loaded and successfully aFunctionOnSuccess will be executed with aLibrary and
 * forceReload as parameters.
 * </odoc>
 */
var __loadedLibs = {};
function loadLib(aLibrary, forceReload, aFunctionOnSuccess) {
   if (forceReload ||
       isUnDef(__loadedLibs[aLibrary.toLowerCase()]) ||
       __loadedLibs[aLibrary.toLowerCase()] == false) {
      load(aLibrary);
      __loadedLibs[aLibrary.toLowerCase()] = true;
      if (isDef(aFunctionOnSuccess)) aFunctionOnSuccess(aLibrary, forceReload);
      return true;
   }

   return false;
}

// Enhanced printing
// -----------------
/**
 * <odoc>
 * <key>sprint(aObject, aDelimiter)</key>
 * Outputs to the current stdout the stringify result of aObject. Optionally you can provide
 * aDelimiter (which is similar to stringify's aSpace parameter).
 * </odoc>
 */
function sprint(aObject, aDelimiter) {
   aDelimiter = (isUnDef(aDelimiter) ? "  " : aDelimiter);

   print(stringify(aObject, undefined, aDelimiter)); 
}

/**
 * <odoc>
 * <key>printErr(aText)</key>
 * Outputs to the current stderr aText
 * </odoc>
 */
function printErr(aText) {
   java.lang.System.err.println(aText);
}

// To text
// -------
/**
 * <odoc>
 * <key>stringify(aObject, aReplacer, aSpace) : String</key>
 * Returns a stringify version of aObject. Optionally you can provide aReplacer and aSpace as
 * used with the JSON.stringify function.
 * </odoc>
 */
function stringify(aObject, aReplacer, aSpace) {
   if (isUnDef(aSpace)) aSpace = " ";

   return JSON.stringify(aObject, aReplacer, aSpace);
}

/**
 * <odoc>
 * <key>log(aMessage)</key>
 * Logs aMessage as a INFO type occurrence with the current date.
 * </odoc>
 */
function log(aMessage) {
   var d = new Date();
   print(String(d) + " INFO | " + aMessage);
}

/**
 * <odoc>
 * <key>logErr(aMessage)</key>
 * Logs aMessage as an ERROR type occurrence with the current date.
 * </odoc>
 */
function logErr(aMessage) {
   var d = new Date();
   printErr(String(d) + " ERROR | " + aMessage);
}

/**
 * <odoc>
 * <key>logWarn(aMessage)</key>
 * Logs aMessage as a WARN type occurrence with the current date.
 * </odoc>
 */
function logWarn(aMessage) {
	var d = new Date();
	print(String(d) + " WARN | " + aMessage);
}

// Load libs
// ---------
var OW;
if (isUnDef(OW)) OW = function() {};

var ow;
if (isUnDef(ow)) { ow = new OW(); }

/**
 * <odoc>
 * <key>ow.loadTest() : Object</key>
 * Loads the ow.test library.
 * </odoc>
 */
OW.prototype.loadTest = function() { loadLib("js/ow/ow.test.js"); ow.test = new OW.test(); return ow.test; }

