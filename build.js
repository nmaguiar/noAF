function buildClasspath(args) {
    var classpath = "";
    var smallclasspath = "";
    
    var listfiles = io.listFiles(global.lib);
    
    for(var i in listfiles.files) {
      // Don't include jars for now
      if (!listfiles.files[i].filename.match("\.jar$")) continue;

      log("Including " + listfiles.files[i].filename);
      classpath += listfiles.files[i].filepath;
      smallclasspath += " " + listfiles.files[i].filename + "";

      if (i < (listfiles.files.length - 1)) classpath += global.sep;
    }

    // word pad on smallclasspath 
    var tmp = smallclasspath;
	for (var i = 0; i <= Math.floor(smallclasspath.length / 70); i++) {
		tmp = tmp.substr(0, i * 70) + "\n " + tmp.substr(i * 70, tmp.length);
	}
    smallclasspath = tmp;

    return { classpath: String(classpath), smallclasspath: String(smallclasspath) };
}

function buildSource(args) {
    var sourcePath = "";
    log("Finding sources...");
    var arrayList = $from(listFilesRecursive(global.src))
                    .equals("isFile", true)
                    .ends("filename", ".java")
                    .select((r) => { return r.canonicalPath; });
    log("Found #" + arrayList.length + " java sources.");
    sourcePath = arrayList.join(" ");

    return sourcePath;
}