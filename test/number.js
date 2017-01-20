void function(test, callback1, callback2){

test.group("数字测试");

test.true("整数", "1");
test.true("带点的整数", "1.");
test.true("浮点数", "3.14");
test.true("省略0的浮点数", ".14");
test.true("小写二进制数字", "0b10");
test.true("大写二进制数字", "0B10");
test.true("小写八进制数字", "0o12345670");
test.true("大写八进制数字", "0O12345670");
test.true("小写十六进制数字", "0x1234567890abcdef");
test.true("大写十六进制数字", "0X1234567890ABCDEF");
test.true("整数指数幂", "1e1");
test.true("整数正指数幂", "1e+1");
test.true("整数负指数幂", "1e-1");
test.true("带点的整数指数幂", "3.e1");
test.true("带点的整数正指数幂", "3.e+1");
test.true("带点的整数负指数幂", "3.e-1");
test.true("浮点数指数幂", "3.14e1");
test.true("浮点数正指数幂", "3.14e+1");
test.true("浮点数负指数幂", "3.14e-1");
test.true("省略0的浮点数指数幂", ".14e1");
test.true("省略0的浮点数正指数幂", ".14e+1");
test.true("省略0的浮点数负指数幂", ".14e-1");

test.false(
	"错误的浮点数",
	"3.14.15",
	function(parser, err){
		return err.context.tag instanceof Rexjs.NumberTag ? "" : "没有解析出两个连续的数字";
	},
	function(parser, err){
		return err.context.content === "15" ? "" : "没有正确的分离数字";
	}
);

test.false("错误的二进制数字 - 非0、1数字", "0b2", callback1, callback2);
test.false("错误的二进制数字 - 带字母", "0ba", callback1, callback2);
test.false("错误的八进制数字 - 非0-7数字", "0o8", callback1, callback2);
test.false("错误的八进制数字 - 带字母", "0oa", callback1, callback2);
test.false("错误的十六进制数字 - 非0-9且非A-F", "0xg", callback1, callback2);

test.false(
	"错误的指数幂",
	".e1",
	function(parser, err){
		return err.context.tag instanceof Rexjs.DotTag ? "" : "没有正确的识别出点符号";
	}
);

test.groupEnd("数字测试");

}(
	test,
	// callback1
	function(parser, err){
		return err.context.tag instanceof Rexjs.IdentifierTag ? "" : "没有解析出数字后面的标识符";
	},
	// callback2
	function(parser, err){
		return err.context.content === err.file.source.substring(1) ? "" : "没有正确的分离出标识符";
	}
);