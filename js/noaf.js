/*
 *  Copyright 2018 Nuno Aguiar <nuno@aguiar.name>
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
 * <key>sprintnl(aStr)</key>
 * "Stringifies" and prints the aStr to the stdout (without adding a new line on the end) (example: sprintnl("hello world!"))
 * </odoc>
 */
function sprintnl(str, delim) { delim = (isUnDef(delim) ? "  " : delim); return printnl(stringify(str, undefined, delim)); }

/**
 * <odoc>
 * <key>sprintErr(aStr)</key>
 * "Stringifies" and prints the aStr to the stderr (with a new line on the end) (example: sprintErr("Hupps!! A problem!"))
 * </odoc>
 */
function sprintErr(str, delim) { delim = (isUnDef(delim) ? "  " : delim); return printErr(stringify(str, undefined, delim)); }

/**
 * <odoc>
 * <key>sprintErrnl(aStr)</key>
 * "Stringifies" and prints the aStr to the stderr (without adding a new line on the end) (example: sprintErrnl("Hupps!! A problem!"))
 * </odoc>
 */
function sprintErrnl(str, delim) { delim = (isUnDef(delim) ? "  " : delim); return printErrnl(stringify(str, undefined, delim)); }


/**
 * <odoc>
 * <key>printErr(aText)</key>
 * Outputs to the current stderr aText
 * </odoc>
 */
function printErr(aText) {
   java.lang.System.err.println(aText);
}

/**
 * <odoc>
 * <key>printErrnl(aStr)</key>
 * Prints the aStr to the stderr (without adding a new line on the end) (example: printErrnl("Hupps!! A problem!"))
 * </odoc>
 */
function printErrnl(str) {
	java.lang.System.err.print(str);
}

/**
 * <odoc>
 * <key>cprint(aStr)</key>
 * "Stringifies" in ANSI color and prints the aStr to the stdout (with a new line on the end) (example: cprint("hello world!"))
 * </odoc>
 */
function cprint(str, delim) { ansiStart(); print(colorify(str)); ansiStop(); }

/**
 * <odoc>
 * <key>cprintErr(aStr)</key>
 * "Stringifies" in ANSI color and prints the aStr to the stderr (with a new line on the end) (example: cprintErr("Hupps!! A problem!"))
 * </odoc>
 */
function cprintErr(str) { ansiStart(); printErr(colorify(str)); ansiStop(); }

/**
 * <odoc>
 * <key>printnl(aStr)</key>
 * Prints the aStr to the stdout (without adding a new line on the end) (example: printnl("hello world!"))
 * </odoc>
 */
function printnl(str) {
	java.lang.System.err.print(str);
}

/**
 * <odoc>
 * <key>tprintln(aTemplateString, someData)</key>
 * Using Handlebars and the functionality provided in ow.template, will use the aTemplateString as a Handlebars template
 * and print, withouth a new line, the parsed output. Optionally you can provide someData as data for the Handlebars template 
 * otherwise the current scope will be used.\
 * \
 * Example:\
 * \
 * var someText = "Hello World!";\
 * tprintln("Hi, {{someText}}"); // Hi, Hello World!
 * </odoc>
 */
function tprintnl(aTemplateString, someData) {
	someData = (isUnDef(someData)) ? this : someData;
	printnl(templify(aTemplateString, someData));
}

/**
 * <odoc>
 * <key>tprint(aTemplateString, someData)</key>
 * Using Handlebars and the functionality provided in ow.template, will use the aTemplateString as a Handlebars template
 * and print the parsed output. Optionally you can provide someData as data for the Handlebars template 
 * otherwise the current scope will be used.\
 * \
 * Example:\
 * \
 * var someText = "Hello World!";\
 * tprint("Hi, {{someText}}"); // Hi, Hello World!
 * </odoc>
 */
function tprint(aTemplateString, someData) {
	tprintnl(aTemplateString + "\n", someData);
}

/**
 * <odoc>
 * <key>tprintErrnl(aTemplateString, someData)</key>
 * Using Handlebars and the functionality provided in ow.template, will use the aTemplateString as a Handlebars template
 * and print, to the stderr without new line, the parsed output. Optionally you can provide someData as data for the Handlebars template 
 * otherwise the current scope will be used.\
 * \
 * Example:\
 * \
 * var someText = "Hello World!";\
 * tprintErrnl("Hi, {{someText}}"); // Hi, Hello World!
 * </odoc>
 */
function tprintErrnl(aTemplateString, someData) {
	someData = (isUnDef(someData)) ? this : someData;
	printErrnl(templify(aTemplateString, someData));
}

/**
 * <odoc>
 * <key>tprintErr(aTemplateString, someData)</key>
 * Using Handlebars and the functionality provided in ow.template, will use the aTemplateString as a Handlebars template
 * and print, to the stderr, the parsed output. Optionally you can provide someData as data for the Handlebars template 
 * otherwise the current scope will be used.\
 * \
 * Example:\
 * \
 * var someText = "Hello World!";\
 * tprintErr("Hi, {{someText}}"); // Hi, Hello World!
 * </odoc>
 */
function tprintErr(aTemplateString, someData) {
	tprintErrnl(aTemplateString + "\n", someData);
}

/**
 * <odoc>
 * <key>printTable(anArrayOfEntries, aWidthLimit, displayCount, useAnsi) : String</key>
 * Returns a ASCII table representation of anArrayOfEntries where each entry is a Map with the same keys.
 * Optionally you can specify aWidthLimit and useAnsi.
 * If you want to include a count of rows just use displayCount = true.
 * </odoc>
 */
function printTable(anArrayOfEntries, aWidthLimit, displayCount, useAnsi) {
	var count = 0;
	var maxsize = {};
	var output = "";

	if (!Array.isArray(anArrayOfEntries)) return "";
	if (isUnDef(aWidthLimit)) aWidthLimit = -1;
	
	// Find sizes
	anArrayOfEntries.forEach(function(row) {
		var cols = Object.keys(row);
		cols.forEach(function(col) {
			if (isUnDef(maxsize[col])) 
				maxsize[String(col)] = col.length;
			if (maxsize[String(col)] < String(row[String(col)]).length) maxsize[String(col)] = String(row[String(col)]).length;
		});
	});

	// Produce table
	anArrayOfEntries.forEach(function(row) {
		var lineSize = 0;
		var outOfWidth = false;
		var cols = Object.keys(row);
		if (count == 0) {
			output += (useAnsi ? ansiColor("bold", "|") : "|"); lineSize = 1; outOfWidth = false;
			cols.forEach(function(col) {
				if (outOfWidth) return;
				lineSize += maxsize[String(col)] + 1;
				if (aWidthLimit > 0 && lineSize > (aWidthLimit+3)) {
					output += (useAnsi ? ansiColor("bold", "...") : "..."); outOfWidth = true;
				} else {
					output += (useAnsi ? ansiColor("bold", String(col)) : String(col)) + repeat(maxsize[String(col)] - String(col).length, ' ') + (useAnsi ? ansiColor("bold", "|") : "|");
				}
			});
			output += "\n";
			output += (useAnsi ? ansiColor("bold", "+") : "+"); lineSize = 1; outOfWidth = false;
			cols.forEach(function(col) {
				if (outOfWidth) return;
				lineSize += maxsize[String(col)] + 1;
				if (aWidthLimit > 0 && lineSize > (aWidthLimit+3)) {
					output += (useAnsi ? ansiColor("bold", "...") : "...");outOfWidth = true;
				} else
					output += (useAnsi ? ansiColor("bold", repeat(maxsize[String(col)], '-')) : repeat(maxsize[String(col)], '-')) + (useAnsi ? ansiColor("bold", "+") : "+");
			});
			output += "\n";
		};

		output += (useAnsi ? ansiColor("bold", "|") : "|"); lineSize = 1; outOfWidth = false;
		cols.forEach(function(col) {
			if (outOfWidth) return;
			lineSize += maxsize[String(col)] + 1;
			if (aWidthLimit > 0 && lineSize > (aWidthLimit+3)) {
				output += "..."; outOfWidth = true;
			} else			
				output += String(row[String(col)]) + repeat(maxsize[String(col)] - String(row[String(col)]).length, ' ') + (useAnsi ? ansiColor("bold", "|") : "|");
		});
		output += "\n";
		count++;
	});

	if (displayCount) {
		var summary = "[#" + count + " " + ((count <= 1) ? "row" : "rows") + "]";
		output += (useAnsi ? ansiColor("bold", summary) : summary);
	}
	
	return output;
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

/**
 * <odoc>
 * <key>compare(X, Y) : Boolean</key>
 * Compares a X object to a Y object at the content level. If they are equal the function will return true
 * otherwise it will return false.
 * </odoc>
 */
function compare(x, y) {
	'use strict';

	if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
	if (x.constructor !== y.constructor) { return false; }
	if (x instanceof Function) { return x === y; }
	if (x instanceof RegExp) { return x === y; }
	if (x === y || x.valueOf() === y.valueOf()) { return true; }
	if (Array.isArray(x) && x.length !== y.length) { return false; }
	if (x instanceof Date) { return false; }
	if (!(x instanceof Object)) { return false; }
	if (!(y instanceof Object)) { return false; }

	var p = Object.keys(x);
	return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
	p.every(function (i) { return compare(x[i], y[i]); });
}

/**
 * <odoc>
 * <key>jsonParse(aString) : Map</key>
 * Shorcut for the native JSON.parse that returns an empty map if aString is not defined, empty or unparsable.
 * </odoc>
 */
function jsonParse(astring) {
	if (isDef(astring) && String(astring).length > 0) {
		try {
			var a = JSON.parse(astring);
			return a;
		} catch(e) {
			return astring;
		}
	} else {
		return {};
	}
}

/**
 * <odoc>
 * <key>templify(aTemplateString, someData) : String</key>
 * Using Handlebars and the functionality provided in ow.template, will use the aTemplateString as a Handlebars template
 * and return the parsed output. Optionally you can provide someData as data for the Handlebars template 
 * otherwise the current scope will be used.\
 * \
 * Example:\
 * \
 * var someText = "Hello World!";\
 * var retText = templify("Hi, {{someText}}"); // Hi, Hello World!
 * </odoc>
 */
function templify(aTemplateString, someData) {
	someData = (isUnDef(someData)) ? this : someData;
	return ow.loadTemplate().parse(aTemplateString, someData);
}

/**
 * <odoc>
 * <key>sleep(millis)</key>
 * Shortcut for af.sleep function. Will pause execution for a given period of time expressed in milliseconds.
 * </odoc>
 */
function sleep(millis) {
	java.util.concurrent.TimeUnit.MILLISECONDS.sleep(millis);			
}

/**
 * <odoc>
 * <key>getUUID() : String</key>
 * Generates and returns an UUID using a javascript algorithm (if needed you can refer to the 
 * AF operation AF.KeyGenerator.GenerateUUID).
 * </odoc>
 */
function genUUID() {
	// Internal generate UUID
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	};
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	s4() + '-' + s4() + s4() + s4();
}

/**
 * <odoc>
 * <key>listFilesRecursive(aPath) : Map</key>
 * Performs the io.listFiles function recursively given aPath. The returned map will be equivalent to
 * the io.listFiles function (see more in io.listFiles). 
 * </odoc>
 */
function listFilesRecursive(aPath) {
	if (isUnDef(aPath)) return [];

	var files = io.listFiles(aPath);
	if(isUnDef(files)) return [];
	var ret = [];
	files = files.files;
	if (isUnDef(files)) return [];
	ret = files.concat(ret);

	for(var i in files) {
		if (files[i].isDirectory) {
			ret = ret.concat(listFilesRecursive(files[i].filepath));
		}
	}

	return ret;
}

/**
 * <odoc>
 * <key>beep()</key>
 * Tries to produce a beep sound.
 * </odoc>
 */
function beep() {
	Packages.java.awt.Toolkit.getDefaultToolkit().beep();
}

/**
 * <odoc>
 * <key>quickSort(items, aCompareFunction) : Array</key>
 * Performs a quick sort algorithm on the items array provided. Optionally aCompareFunction can be
 * provided. The sorted array will be returned.
 * </odoc>
 */
function quickSort(items, aCompareFunction) {
	function swap(items, firstIndex, secondIndex){
		var temp = items[firstIndex];
		items[firstIndex] = items[secondIndex];
		items[secondIndex] = temp;
	}

	function partition(items, left, right, aCompareFunction) {
		var pivot   = items[Math.floor((right + left) / 2)],
		i       = left,
		j       = right;

		while (i <= j) {
			while(aCompareFunction(items[i], pivot) < 0) {
				i++;
			}

			while(aCompareFunction(items[j], pivot) > 0) {
				j--;
			}

			if (i <= j) {
				swap(items, i, j);
				i++;
				j--;
			}
		}

		return i;
	}

	if (isUnDef(aCompareFunction)) {
		aCompareFunction = function(a, b) { return a - b; }
	}

	function qsort(items, aCompareFunction, left, right) {
		var index;
		if (items.length > 1) {
			index = partition(items, left, right, aCompareFunction);

			if (left < index - 1) {
				qsort(items, aCompareFunction, left, index - 1);
			}

			if (index < right) {
				qsort(items, aCompareFunction, index, right);
			}
		}
		return items;
	}

	return qsort(items, aCompareFunction, 0, items.length - 1);
}

/**
 * (extracted from)
 * jQuery JavaScript Library v2.0.3
 * http://jquery.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:30Z
 *
 * <odoc>
 * <key>extend([deep], target [, object1][, objectN]) : Object</key>
 * Merges the contents of two or more objects together into the first object (target). If deep is specified
 * the copy will be recursive. This function is equivalent to JQuery's extend function. See more in 
 * https://api.jquery.com/jquery.extend/
 * </odoc>
 */
function extend() {
	var class2type = {
			"[object Boolean]":   "boolean",
			"[object Number]":    "number",
			"[object String]":    "string",
			"[object Function]":  "function",
			"[object Array]":     "array",
			"[object Date]":      "date",
			"[object RegExp]":    "regexp",
			"[object Object]":    "object",
			"[object Error]":     "error"
	};

	var core_toString = class2type.toString,
	core_hasOwn   = class2type.hasOwnProperty;

	var jQuery = {};

	jQuery.isFunction = function( obj ) {
		return jQuery.type(obj) === "function";
	};

	jQuery.isArray = Array.isArray;

	jQuery.type = function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
				class2type[ core_toString.call(obj) ] || "object" :
					typeof obj;
	};

	jQuery.isPlainObject = function( obj ) {
		if ( jQuery.type( obj ) !== "object" || obj.nodeType ) {
			return false;
		}

		try {
			if ( obj.constructor && !core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}

		return true;
	};


	var options,
	name,
	src,
	copy,
	copyIsArray,
	clone,
	target = arguments[0] || {},
	i = 1,
	length = arguments.length,
	deep = false;

	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		i = 2;
	}

	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		if ( (options = arguments[ i ]) != null ) {
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				if ( target === copy ) {
					continue;
				}

				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					target[ name ] = extend( deep, clone, copy );

				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	return target;
}

/**
 * <odoc>
 * <key>exit(anExitCode)</key>
 * Immediately exits execution with the provided exit code
 * </odoc>
 */
function exit(exitCode) {
	if(isUnDef(exitCode)) exitCode = 0;

	java.lang.System.exit(exitCode);
}

/**
 * <odoc>
 * <key>clone(anObject) : aClonedObject</key>
 * Creates a new copy of a JavaScript object.
 * </odoc>
 */
function clone(aObject) {
	if (Array.isArray(aObject)) return aObject.slice(0);
 	return extend(true, {}, aObject);
}

/**
 * <odoc>
 * <key>merge(anObjectA, anObjectB) : aMergedObject</key>
 * Merges a JavaScript object A with a JavaScript object B a returns the result as a new object.
 * </odoc>
 */
function merge(aObjectA, aObjectB) {
	if (isObject(aObjectA) && isArray(aObjectB)) {
		for(var i in aObjectB) { aObjectB[i] = merge(aObjectB[i], clone(aObjectA)); }
		return aObjectB;
	}
	if (isObject(aObjectB) && isArray(aObjectA)) {
		for(var i in aObjectA) { aObjectA[i] = merge(aObjectA[i], clone(aObjectB)); }
		return aObjectA;
	}
	return extend(true, clone(aObjectA), aObjectB);
}

/**
 * <odoc>
 * <key>getPid() : String</key>
 * Tries to retrieve the current script execution operating system PID and returns it.
 * </odoc>
 */
function getPid() {
	return (Packages.java.lang.management.ManagementFactory.getRuntimeMXBean().getName() + "").replace(/(\d+).+/, "$1");
}

/**
 * <odoc>
 * <key>pidCheck(aPid) : Boolean</key>
 * Verifies if aPid is running (returning true) or not (returning false).
 * </odoc>
 */
function pidCheck(aPid) {
	
	try {
		if (java.lang.System.getProperty("os.name").match(/Windows/)) {
			if (af.sh("cmd /c tasklist /NH /FI \"PID eq " + aPid + "\"").match(aPid)) {
				return true;
			} 
		} else {
			af.sh("kill -0 " + aPid);
			if (__exitcode == 0) {
				return true;
			} 
		}
	} catch(e) {
	}
	
	return false;
}

/**
 * <odoc>
 * <key>pidKill(aPidNumber, isForce) : boolean</key>
 * Tries to terminate a process with aPidNumber. If successful it will return true otherwise it will
 * return false. If necessary, a boolean true value on isForce, will force the termination of the process.
 * </odoc>
 */
function pidKill(aPidNumber, isForce) {
	try {
		var force = "";
		if (java.lang.System.getProperty("os.name").match(/Windows/)) {
			if (isForce) force = "/F";
			if (af.sh("cmd /c taskkill "+ force + " /PID " + aPidNumber)) {
				return true;
			}
		} else {
			force = (isForce) ? "-9" : "-2";
			af.sh("kill " + force + " " + aPidNumber);
			if (__exitcode == 0) {
				return true;
			}
		}
	} catch(e) {
	}

	return false;
}

/**
 * <odoc>
 * <key>pidCheckOut(aFilename) : boolean</key>
 * Removes the pid information from aFilename and deletes the file if possible. 
 * If successful returns true, if not returns false. 
 * </odoc>
 */
function pidCheckOut(aFilename) {
	try {
		io.writeFileString(aFilename, "");
		if (af.rm(aFilename)) {
			return true;
		}
	} catch(e) {
	}
	
	return false;
}

/**
 * <odoc>
 * <key>isObject(aObj) : boolean</key>
 * Returns true if aObj is an object, false otherwise;
 * </odoc>
 */
function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

/**
 * <odoc>
 * <key>isFunction(aObj) : boolean</key>
 * Returns true if aObj is a function, false otherwise;
 * </odoc>
 */
function isFunction(obj) {
    return typeof obj == 'function' || false;
};

/**
 * <odoc>
 * <key>isString(aObj) : boolean</key>
 * Returns true if aObj is a string, false otherwise
 * </odoc>
 */
function isString(obj) {
	return typeof obj == 'string' || false;
}

/**
 * <odoc>
 * <key>isNumber(aObj) : boolean</key>
 * Returns true if aObj is a number, false otherwise
 * </odoc>
 */
function isNumber(obj) {
	return !isNaN(parseFloat(obj)) && isFinite(obj);
}

/**
 * <odoc>
 * <key>isDate(aObj) : boolean</key>
 * Returns true if aObj is a date, false otherwise
 * </odoc>
 */
function isDate(obj) { 
	return (null != obj) && !isNaN(obj) && ("undefined" !== typeof obj.getDate); 
}

/**
 * <odoc>
 * <key>isJavaObject(aObj) : boolean</key>
 * Returns true if aObj is a Java object, false otherwise
 * </odoc>
 */
function isJavaObject(obj) {
	var s = Object.prototype.toString.call(obj);
	return (s === '[object JavaObject]' || s === '[object JavaArray]');
}

/**
 * <odoc>
 * <key>require(aScript) : Object</key>
 * Will try to load aScript from the directories specified in the loadRequire function (by default all opack directories
 * plus the current working directory). Returns the exports object manipulated in aScript (note: results are cached)
 * </odoc>
 */
function require(aScript, force) {
	var o, f, exports = {}, module = { id: aScript, uri: aScript, exports: exports };
	
	if (isUnDef(require.cache)) require.cache = {};

	if (!force && isFunction(require.cache[aScript])) {
		f = require.cache[aScript];
	} else {	
		if (aScript.match(/::/)) {
			var comps = aScript.match(/(.+)::(.+)/);
			plugin("ZIP");
			var zip = new ZIP();
			o = af.fromBytes2String(zip.streamGetFile(comps[1], comps[2]));
		} else {	
			o = io.readFileString(aScript);
		}
		
		var opackpaths = getOPackPaths();
		for(var opack in opackpaths) {
			o = io.readFileString(aScript);
		}
		
		f = new Function('require', 'exports', 'module', o);
		require.cache[aScript] = f;
	}

	f.call({}, require, exports, module);

	exports = module.exports || exports;
	
	return exports;
}

/**
 * <odoc>
 * <key>traverse(aObject, aFunction) : Map</key>
 * Traverses aObject executing aFunction for every single element. The aFunction will receive the arguments: aKey, aValue, aPath, aObject.
 * </odoc>
 */
function traverse(aObject, aFunction, aParent) {
	var keys = (isJavaObject(aObject)) ? [] : Object.keys(aObject);
	var parent = isUnDef(aParent) ? "" : aParent;

	for(var i in keys) {
		if (isObject(aObject[keys[i]])) {
			var newParent = parent + ((isNaN(Number(keys[i]))) ? 
							"." + keys[i] : 
							(isNumber(keys[i]) ? "[" + keys[i] + "]" : "[\"" + keys[i] + "\"]"));
			traverse(aObject[keys[i]], aFunction, newParent, aObject);
		}
		
		aFunction(keys[i], aObject[keys[i]], parent, aObject);
	}
}

/**
 * <odoc>
 * <key>searchKeys(aObject, aSearchKey, useCase) : Map</key>
 * Traverses aObject looking for key matches, ignoring case if useCase is true, of the regular expression aSearchKey.
 * Each element founf is added to the returned Map. The element key will represent the path from aObject to it.
 * </odoc>
 */
function searchKeys(aObject, aSearchKey, useCase) {
	var res = {};
	var usecase = useCase ? "" : "i";
	
	traverse(aObject, function(key, value, path) {
		if (key.match(new RegExp(aSearchKey, usecase))) {
			res[path + ((isNaN(Number(key))) ? "." + key : "[\"" + key + "\"]")] = (typeof value == 'object') ? clone(value) : value;
		}
	});
	return res;
}

/**
 * <odoc>
 * <key>searchValues(aObject, aSearchValue, useCase) : Map</key>
 * Traverse aObject looking for value matches, ignoring case if useCase is true, of the regular expression aSearchKey. 
 * Each value found is added to the returned Map linked to the path representation of where it was found.
 * </odoc>
 */
function searchValues(aObject, aSearchValue, useCase) {
	var res = {};
	var usecase = useCase ? "" : "i";
	
	traverse(aObject, function(key, value, path) {
		if ((value+"").match(new RegExp(aSearchValue, usecase))) {
			res[path + ((isNaN(Number(key))) ? "." + key : "[\"" + key + "\"]")] = (typeof value == 'object') ? clone(value) : value;
		}
	});
	return res;
}

/**
 * <odoc>
 * <key>searchArray(anArray, aPartialMap, useRegEx, ignoreCase, useParallel) : Array</key>
 * Shortcut to ow.obj.searchArray.
 * </odoc>
 */
function searchArray(anArray, aPartialMap, useRegEx, ignoreCase, useParallel) {
	return ow.loadObj.searhArray(anArray, aPartialMap, useRegEx, ignoreCase, useParallel);
}

/**
 * <odoc>
 * <key>flatten(aObject, noKeyValSeparation) : Array</key>
 * Given aObject it will traverse it and create an array where each element will have a key and a val(ue). The key will 
 * begin with a "." whenever it's a children key on aObject. This function is useful when trying to find specific keys
 * or values across a Map. Optionally you can specify that you don't want each array element with the key and the value
 * as separate elements but rather a directly as key and value.
  * </odoc>
 */
function flatten(aObject, noKeyValSeparation) {
	var f = []; 
	traverse(aObject, function(key, val, pat) { 
		var e = {};
		if (noKeyValSeparation) 
			e[pat + (pat.length > 0 ? "." : "") + key] = (typeof val =='object') ? clone(val) : val; 
		else
			e = { 
				"key": pat + (pat.length > 0 ? "." : "") + key,
				"val": (typeof val =='object') ? clone(val) : val
			};
		f.push(e); 
	});
	return f;
}

/**
 * <odoc>
 * <key>findRandomOpenPort() : number</key>
 * Tries to find a random open port on all network interfaces. Useful to start network servers on an available port. 
 * </odoc>
 */
function findRandomOpenPort() {
	try {
		var s = new java.net.ServerSocket(0);
		var port = s.getLocalPort();
		s.close();
		return port;
	} catch(e) {
		return -1;
	}
}

/**
 * <odoc>
 * <key>toEncoding(aString, anEncoding) : String</key>
 * Converts the provided aString to a different anEncoding (by default UTF-8).
 * </odoc>
 */
function toEncoding(aString, anEncoding) {
	if (isUnDef(anEncoding)) anEncoding = "UTF-8";
	return String(new java.lang.String(af.fromString2Bytes(aString), anEncoding));
}

/**
 * <odoc>
 * <key>utf8(aString) : String</key>
 * Converts the provided aString into UTF-8 encoding.
 * </odoc>
 */
function utf8(aString) {
	return toEncoding(aString, "UTF-8");
}

/**
 * <odoc>
 * <key>newJavaArray(aJavaClass, aSize) : JavaArrayClass</key>
 * Creates a new Java Array object for the aJavaClass type for a provided aSize.\
 * \
 * Examples:\
 * \
 * newJavaArray(java.lang.String, 5);\
 * newJavaArray(java.lang.Integer.TYPE, 2);\
 * \
 * </odoc>
 */
function newJavaArray(aJavaClass, aSize) {
	return java.lang.reflect.Array.newInstance(aJavaClass, aSize);
}

/**
 * <odoc>
 * <key>deleteFromArray(anArray, anIndex) : Array</key>
 * Deletes the array element at anIndex from the provided anArray. Returns the new array with the element removed.
 * </odoc>
 */
function deleteFromArray(anArray, anIndex) {
	anArray.splice(anIndex, 1);
	return anArray;
}

// Load libs
// ---------
load("js/io.js");
load("js/zip.js");

var io = new IO();

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
OW.prototype.loadTest = function() { loadLib("js/ow/ow.test.js"); ow.test = new OW.test(); return ow.test; };

