void function(SimpleTest, test){

var str;

test.group("let 关键字测试");

test.true("最简单的 let 语句", "let a");
test.true("let 与 函数表达式共存", "var fn = function a(){};let a;");
test.true("let 在函数参数名之前定义", "let x, y, z;var fn = function a(x, y, z){};");

/*
 * 由于 let 继承 var， var 测过过的就不再测试
 * 本文件主要测试失败，即变量名的重复声明
*/

test.false(
	"let 使用时，变量名已经被 var 定义",
	str = "var a;let x, y = 1, z = 100 + 99, a",
	function(parser, err){
		return err.context.tag instanceof Rexjs.VariableDeclarationTag ? "" : "没有识别出重复定义的变量";
	},
	function(parser, err){
		return err.context.content === "a" ? "" : "没有识别出 a 变量";
	},
	function(parser, err){
		return err.context.position.column === str.length - 1 ? "" : "没有识别出变量 a 的位置";
	}
);

test.false(
	"变量名已经被 let 定义过",
	str = "let x, y, z; var a = 100, z",
	function(parser, err){
		return err.context.tag instanceof Rexjs.VariableDeclarationTag ? "" : "没有识别出重复定义的变量";
	},
	function(parser, err){
		return err.context.content === "z" ? "" : "没有识别出 z 变量";
	},
	function(parser, err){
		return err.context.position.column === str.length - 1 ? "" : "没有识别出变量 z 的位置";
	}
);

test.false(
	"let 使用时，变量名已经被 function 定义",
	str = "function a(){};let x, y = 1, z = 100 + 99, a",
	function(parser, err){
		return err.context.tag instanceof Rexjs.VariableDeclarationTag ? "" : "没有识别出重复定义的变量";
	},
	function(parser, err){
		return err.context.content === "a" ? "" : "没有识别出 a 变量";
	},
	function(parser, err){
		return err.context.position.column === str.length - 1 ? "" : "没有识别出变量 a 的位置";
	}
);

test.false(
	"函数名已经被 let 定义过",
	str = "let x, y, z; function z(){}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.VariableDeclarationTag ? "" : "没有识别出重复定义的变量";
	},
	function(parser, err){
		return err.context.content === "z" ? "" : "没有识别出 z 变量";
	},
	function(parser, err){
		return err.context.position.column === str.length - 5 ? "" : "没有识别出变量 z 的位置";
	}
);

test.false(
	"let 在函数参数名之后定义",
	str = "function fn(x, y, z){ let a, b, z }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.VariableDeclarationTag ? "" : "没有识别出重复定义的变量";
	},
	function(parser, err){
		return err.context.content === "z" ? "" : "没有识别出 z 变量";
	},
	function(parser, err){
		return err.context.position.column === str.length - 3 ? "" : "没有识别出变量 z 的位置";
	}
);

test.groupEnd();

}(
	Rexjs.SimpleTest,
	test
);