void function(test){

test.group("一元操作符");

test.true("delete 操作符", "delete name");
test.true("void 操作符", "void null");
test.true("typeof 操作符", "typeof 123");
test.true("new 操作符", "new constructor;new b;new '';new true;new 123;");
test.true("逻辑否操作符", "!true");
test.true("二进制否操作符", "~666");
test.true("正号", "+a;+666;");
test.true("负号", "-b;-333");
test.true("多个一元表达式", "!+-~void typeof new constrcutor");
test.true("连续的正号", " + + + + + + + 2", true);
test.true("连续的负号", " - - - - - - - 2", true);
test.true("加号后面跟正号", "3 + + + 2", true);
test.true("减号后面跟负号", "3 - - - 2", true);
test.true("前置递增", "++b");
test.true("带正号的前置递增", "+ ++b");
test.true("前置递减", "--b");
test.true("带负号的前置递减", "- --b");

test.false("不完整的一元表达式", "!");
test.false("无空格且连续的正号", "+++++a");
test.false("无空格且连续的负号", "-----a");
test.false("new 后面接其他一元操作符字符", "new !b");
test.false("一元操作符后面不能接赋值操作", "void b += 2");

test.groupEnd();

}(
	test
);