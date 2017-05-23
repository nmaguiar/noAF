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

OW.test = function() {
 	this.resetCounters();
	return ow.test;
}

/**
 * <odoc>
 * <key>ow.test.resetCounters()</key>
 * Resets the internal counters for the current test.
 * </odoc>
 */
OW.test.prototype.resetCounters = function() {
 	this.__countTotal = 0;
  	this.__countPass  = 0;
	this.__countFail  = 0;
}

OW.test.prototype.reset = function() { return this.resetCounters(); } 
/**
 * <odoc>
 * <key>ow.test.getCountTotal() : Number</key>
 * Obtains the current total count of tests performed.
 * </odoc>
 */
OW.test.prototype.getCountTotal = function() { return this.__countTotal; };
OW.test.prototype.getCountTest  = function() { return this.__countTest;  };
/**
 * <odoc>
 * <key>ow.test.getCountPass() : Number</key>
 * Obtains the current total count of tests performed that passed successfully.
 * </odoc>
 */
OW.test.prototype.getCountPass  = function() { return this.__countPass;  };
/**
 * <odoc>
 * <key>ow.test.getCountFail() : Number</key>
 * Obtains the current total count of tests performed that failed.
 * </odoc>
 */
OW.test.prototype.getCountFail  = function() { return this.__countFail;  };

OW.test.prototype.assert = function(aResult, aCheckValue, aErrorMessage, dontShowDiff) {
	if (!compare(aResult, aCheckValue)) {
		throw aErrorMessage + ((dontShowDiff) ? "" : " (result " + stringify(aResult) + " but expected " + stringify(aCheckValue) + ")");
	}
};

/**
 * <odoc>
 * <key>ow.test.test(aTestName, aFunction) : Object</key>
 * Tries to execute aFunction under aTestName. If successfully it will return the function result.
 * The internal test counters will be updated accordingly. 
 * </odoc>
 */
OW.test.prototype.test = function(aTestName, aFunction) {
	try {
		this.__countTotal++;
		var res = aFunction();
		this.__countPass++;

		log("PASS | " + aTestName);
		return res;
	} catch(e) {
		this.__countFail++;
		logErr("FAIL | " + aTestName + " | " + e);
	} 
}
