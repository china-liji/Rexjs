test.unit(
	[],
	function(){
		var str;

		this.group("let 关键字测试");

		this.true("最简单的 let 语句", "let a");
		this.true("let 与 函数表达式共存", "var fn = function a(){};let a;");
		this.true("let 在函数参数名之前定义", "let x, y, z;var fn = function a(x, y, z){};");
		this.true("let 在函数参数名之后定义", "var fn = function a(x, y, z){};let x, y, z;");
		this.true("函数内外重新使用 let 定义不影响", "let a = 1;!function(){ let a = 2; }");
		this.true("函数内使用 var 重复定义", "let a;!function(){ var a = 1; }");

		/*
		* 由于 let 继承 var， var 测过过的就不再测试
		* 本文件主要测试失败，即变量名的重复声明
		*/

		/*
			在这里，官方是允许这样写的，毕竟我们不解析 let 的原理，所以最好这样保护，
			但是，由于良好的代码习惯，也最好不要在一个块级作用域下，定义外部同名变量
		*/
		this.false(
			"语句块内外重复使用 let ",
			str = "let a = 1;{let a}",
			function(parser, err){
				return err.context.content !== "a";
			},
			function(parser, err){
				return err.context.position.column !== str.length - 2;
			}
		);

		this.false(
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

		this.false(
			"自己定义两个同名变量",
			str = "let a, a",
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

		this.false(
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

		this.false(
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

		this.false(
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

		this.false(
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

		this.groupEnd();
	}
);