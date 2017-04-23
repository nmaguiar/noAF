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

log("Init");
log("Loading test library...");
ow.loadTest();

ow.test.test("Print test", function() {
  print(123);
  print("123");

  printErr(123);
  printErr("123");
});

ow.test.test("Stringify", function() {
  var a = { a: 1, b: 2, c: 3 };

  sprint(a);
});

ow.test.test("ZIP: reading and writing", function() {
  var z = new ZIP();
  z.loadFile("lib/commons-io-2.5.jar");
  print(Object.keys(z.list()).length);
  z.streamPutFile("test/autoTest.zip", "a.txt", z.getFile("META-INF/maven/commons-io/commons-io/pom.properties"));
});

log("Tests passed: " + ow.test.getCountPass());
log("Tests failed: " + ow.test.getCountFail());
log("Total       : " + ow.test.getCountTotal());

log("Done");



