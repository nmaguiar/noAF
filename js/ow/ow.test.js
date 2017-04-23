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

OW.test.prototype.resetCounters = function() {
 	this.__countTotal = 0;
  	this.__countPass  = 0;
	this.__countFail  = 0;
}

OW.test.prototype.reset = function() { return this.resetCounters(); } 
OW.test.prototype.getCountTotal = function() { return this.__countTotal; };
OW.test.prototype.getCountTest  = function() { return this.__countTest;  };
OW.test.prototype.getCountPass  = function() { return this.__countPass;  };
OW.test.prototype.getCountFail  = function() { return this.__countFail;  };

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
