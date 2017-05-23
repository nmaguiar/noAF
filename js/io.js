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

var IO = function() {
}

/**
 * <odoc>
 * <key>io.getFileEncoding(aFile)</key>
 * Tries to determine the file encoding of a given file and returns the same.
 * </odoc>
 */
IO.prototype.getFileEncoding = function(aFile) {
	var ByteArray = Java.type("byte[]");
  	var buf = new ByteArray(4096);

	var fis = new java.io.FileInputStream(aFile);
  	var UniversalDetector = Java.type("org.mozilla.universalchardet.UniversalDetector");
        var detector = new UniversalDetector(null);
	
	var nread;
	while ((nread = fis.read(buf)) > 0 && !detector.isDone()) {
		detector.handleData(buf, 0, nread);
        }
	detector.dataEnd();
	var encoding = detector.getDetectedCharset();
	detector.reset();
	fis.close();
	
	return encoding;
}

/**
 * <odoc>
 * <key>io.getDefaultEncoding()</key>
 * Returns the current default encoding used.
 * </odoc>
 */
IO.prototype.getDefaultEncoding = function() {
	return java.lang.System.getProperty("file.encoding");
}

/**
 * <odoc>
 * <key>io.convertFileToEncoding(aOriginalFile, aNewFile, anEncoding)</key>
 * Converts an original file into a new file using the provided enconding.
 * </odoc>
 */
IO.prototype.convertFileToEncoding = function(aOrigFile, aNewFile, aEncoding) {
	if (aEncoding == null || aEncoding.equals("undefined")) aEncoding = io.getDefaultEncoding();
	var FileUtils = Java.type("org.apache.commons.io.FileUtils");
        var fe = io.getFileEncoding(aOrigFile);
	FileUtils.writeStringToFile(new java.io.File(aNewFile), FileUtils.readFileToString(new java.io.File(aOrigFile), ((fe == null) ? io.getDefaultEncoding() : fe)), aEncoding);
}
