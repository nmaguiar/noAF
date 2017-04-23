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

log("Tests passed: " + ow.test.getCountPass());
log("Tests failed: " + ow.test.getCountFail());
log("Total       : " + ow.test.getCountTotal());

log("Done");
