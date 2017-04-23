//Test library
//author: nmaguiar@gmail.com

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
