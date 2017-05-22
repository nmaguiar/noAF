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

/**
 * <odoc>
 * <key>ZIP.ZIP(anArrayOfBytes) : ZIP</key>
 * Creates a ZIP object instance. If anArrayOfBytes is provided it will read it as a ZIP compressed contents into
 * the ZIP object.
 * </odoc>
 */
var ZIP = function(aData) {
	this.clean();
	if (isDef(aData)) load(aData);
}

/**
 * <odoc>
 * <key>ZIP.clean()</key>
 * Will clean all internal data regarding any previously ZIP contents handled by this object.
 * </odoc>
 */
ZIP.prototype.clean = function() {
	this.__zipData = new java.util.concurrent.ConcurrentHashMap();
	this.__zipEntries = new java.util.concurrent.ConcurrentHashMap();
}

/**
 * <odoc>
 * <key>ZIP.load(anArrayOfBytes)</key>
 * Loads anArrayOfBytes ZIP contents into the internal object structures.
 * </odoc>
 */
ZIP.prototype.load = function(aData) {
	this.clean();
	
	var bais = new java.io.ByteArrayInputStream(aData);
	var zis = new java.util.zip.ZipInputStream(bais);
	var ze;
	
	while((ze = zis.getNextEntry()) != null) {
		this.__zipEntries.put(ze.getName(), ze);
		this.__zipData.put(ze.getName(), org.apache.commons.io.IOUtils.toByteArray(zis));
	}
	
	return this;
} 

/**
 * <odoc>
 * <key>ZIP.close()</key>
 * Will close the ZIP file associated with this object.
 * </odoc>
 */
ZIP.prototype.close = function() {
	this.clean();
	if (isDef(this.__zipFile)) this.__zipFile.close();
}

/**
 * <odoc>
 * <key>ZIP.getFile(aFilename) : anArrayOfBytes</key>
 * Will uncompress the corresponding aFilename from the ZIP contents into an arrays of bytes.
 * </odoc>
 */
ZIP.prototype.getFile = function(aName) {
	if (this.__zipData.containsKey(aName)) {
		return this.__zipData.get(aName);
	} else {
		return org.apache.commons.io.IOUtils.toByteArray(this.__zipFile.getInputStream(this.__zipEntries.get(aName)));
	}
}

/**
 * <odoc>
 * <key>ZIP.putFile(aFilename, anArrayOfBytes)</key>
 * Will add anArrayOfBytes to the ZIP contents as aFilename.
 * </odoc>
 */
ZIP.prototype.putFile = function(aName, aData) {
	var bytes;

	if (aData instanceof Java.type("byte[]")) {
		bytes = aData;
	} else {
		bytes = new java.lang.String(String(aData)).getBytes();
	}
	
	var e = new java.util.zip.ZipEntry(aName);
	this.__zipEntries.put(aName, e);
	this.__zipData.put(aName, bytes);
}

/**
 * <odoc>
 * <key>ZIP.remove(aFilename)</key>
 * Will remove aFilename from the ZIP contents.
 * </odoc>
 */
ZIP.prototype.remove = function(aName) {
	this.__zipEntries.remove(aName);
	this.__zipData.remove(aName);
	
	return this;
}

/**
 * <odoc>
 * <key>ZIP.streamGetFile(aFilePath, aName) : anArrayOfBytes</key>
 * Retrieves aName file from aFilePath zip file without loading the zip file contents into memory returning the 
 * file contents as an array of bytes.
 * </odoc>
 */
ZIP.prototype.streamGetFile = function(aFilePath, aName) {
	var ne;
	var zis = new java.util.zip.ZipInputStream(new java.io.FileInputStream(aFilePath));
	
	try {
		do {
			ne = zis.getNextEntry();
			if (ne.getName().equals(aName)) {
				var zipFile = new java.util.zip.ZipFile(aFilePath);
	
				try {
					return org.apache.commons.io.IOUtils.toByteArray(zipFile.getInputStream(ne));
				} catch(e) {
					throw e;
				} finally {
					zipFile.close();
				}
			}
		} while(ne != null);
	} catch(e) {
		throw e;
	} finally {
		zis.close();
	}
	
	return null;
}

/**
 * <odoc>
 * <key>ZIP.streamGetFileStream(aFilePath, aName) : JavaInputStream</key>
 * Retrieves aName file from aFilePath zip file without loading the zip file contents into memory returning a 
 * Java InputStream.
 * </odoc>
 */
ZIP.prototype.streamGetFileStream = function(aFilePath, aName) {
	var ne;
	var zis = new java.util.zip.ZipInputStream(new java.io.FileInputStream(aFilePath));
	
	try {
		do {
			ne = zis.getNextEntry();
			if (ne.getName().equals(aName)) {
				var zipFile = new java.util.zip.ZipFile(aFilePath);
				try {
					return zipFile.getInputStream(ne);
				} catch(e) {
					throw e;
				} 
			}
		} while(ne != null);
	} catch(e) {
		throw e;
	} finally {
		zis.close();
	}
	
	return null;
}

/**
 * <odoc>
 * <key>ZIP.streamPutFile(aFilePath, aName, anArrayOfBytes)</key>
 * Sets a aName file on the aFilePath ZIP provided with the anArrayOfBytes provided. All missing directories
 * will be created.
 * </odoc>
 */
ZIP.prototype.streamPutFile = function(aFilePath, aName, aData) {
	var path = java.nio.file.Paths.get(aFilePath);
	var uri = java.net.URI.create("jar:" + path.toUri());
	var env = new java.util.HashMap();
	
	env.put("create", "true");
	
	try {
		var fs = java.nio.file.FileSystems.newFileSystem(uri, env);
		var nf = fs.getPath(aName, [ "" ]);
		
		try {
			if (nf.getParent() != null && java.nio.file.Files.notExists(nf.getParent())) {
				java.nio.file.Files.createDirectories(nf.getParent());
			}
			
			if (!java.nio.file.Files.isDirectory(nf)) {
				java.nio.file.Files.write(nf, aData, [
					java.nio.file.StandardOpenOption.CREATE,
					java.nio.file.StandardOpenOption.TRUNCATE_EXISTING,
					java.nio.file.StandardOpenOption.WRITE
				]);
			} else {
				if (java.nio.file.Files.notExists(nf))
					java.nio.file.Files.createDirectory(nf);
			}
			
			fs.close();
		} catch(e) {
			if (!(e instanceof java.nio.file.NoSuchFileException)) throw e;
		}
	} catch(e) {
		throw e;
	}
}

/**
 * <odoc>
 * <key>ZIP.load(anArrayOfBytes)</key>
 * Loads anArrayOfBytes ZIP contents into the internal object structures.
 * </odoc>
 */
ZIP.prototype.load = function(aData) {
	this.clean();

	var bais = new java.io.ByteArrayInputStream(aData);
	var zis = new java.util.zip.ZipInputStream(bais);
	var ze;
	
	while((ze = zis.getNextEntry()) != null) {
		this.__zipEntries.put(ze.getName(), ze);
		this.__zipData.put(ze.getName(), org.apache.commons.io.IOUtils.toByteArray(zis));
	}
	
	return this;
}

/**
 * <odoc>
 * <key>ZIP.loadFile(aFilename)</key>
 * Will load a ZIP file aFilename into the ZIP object internal structure.
 * </odoc>
 */
ZIP.prototype.loadFile = function(aFilename) {
	this.clean();

	this.__zipFile = new java.util.zip.ZipFile(aFilename);
	var ze;
	var e = this.__zipFile.entries();
	
	while(e.hasMoreElements()) {
		ze = e.nextElement();
		this.__zipEntries.put(ze.getName(), ze);
	}
	
	return this;
}

/**
 * <odoc>
 * <key>ZIP.list() : Map</key>
 * Will list all files and folders of the loaded ZIP contents into a Map with name, size, compressedSize, comment,
 * crc and time.
 * </odoc>
 */
ZIP.prototype.list = function(aFilePath) {
	var names = {};
	var zes = new java.util.HashMap();

	if (isDef(aFilePath)) {
		var _zis = new java.util.zip.ZipInputStream(new java.io.FileInputStream(String(aFilePath)));
		var _ze;
		do {
			_ze = _zis.getNextEntry();
			if (_ze != null) zes.put(_ze.getName(), _ze);
		} while(_ze != null);
	} else {
		zes = this.__zipEntries;
	}

	var entries = Java.from(zes.keySet());
	for(var ze in entries) {
		names[zes.get(entries[ze]).getName()] = {
		   "name": zes.get(entries[ze]).getName(),
		   "size": zes.get(entries[ze]).getSize(),
		   "compressedSize": zes.get(entries[ze]).getCompressedSize(),
		   "comment": zes.get(entries[ze]).getComment(),
		   "crc": zes.get(entries[ze]).getCrc(),
		   "time": zes.get(entries[ze]).getTime()
		};
	}
	
	return names;
}

/**
 * <odoc>
 * <key>ZIP.generate(aMapOfOptions, dontReload) : anArrayOfBytes</key>
 * Will generate a ZIP anArrayOfBytes contents (that can then by saved into a file) given the provided options (a map
 * where you can specify the compressionLevel as a number). If dontReload = true then the internal ZIP object contents
 * won't be reloaded after generating. Example:\
 * \
 * plugin("ZIP");\
 * var zip = new ZIP();\
 * var text = new java.lang.String("Some example test to zip into a zip file");\
 * var openaf = io.readFileBytes("c:\\apps\\OpenAF\\openaf.jar");\
 * zip.putFile("text.txt", text.getBytes());\
 * zip.putFile("openaf.jar", openaf);\
 * var newZip = zip.generate({"compressionLevel": 9});\
 * var zip = new ZIP(newZip);\
 * print(beautifier(zip.list()));\
 * \
 * </odoc>
 */
ZIP.prototype.generate = function(options, dontReload) {
	var baos = java.io.ByteArrayOutputStream();
	var zos = java.util.zip.ZipOutputStream(baos);
	
	if (isDef(options)) {
		if (isDef(options.compressionLevel))
			zos.setLevel(options.compressionLevel);
	}
	
	var entries = Java.from(this.__zipEntries.keySet());
	for(var ze in entries) {
		var newZe = new java.util.zip.ZipEntry(this.__zipEntries.get(entries[ze]).getName());
		zos.putNextEntry(newZe);
		if (this.__zipData.containsKey(newZe.getName()))
			org.apache.commons.io.IOUtils.write(this.__zipData.get(this.__zipEntries.get(ze).getName()), zos);
		else
			if (!newZe.isDirectory()) 
				org.apache.commons.io.IOUtils.copy(this.__zipFile.getInputStream(newZe), zos);
		
		zos.closeEntry();
	}
	
	zos.flush();
	zos.finish();
	zos.close();
	baos.flush();
	baos.close();
	
	if (!dontReload) this.load(baos.toByteArray());
	
	return baos.toByteArray();
}
