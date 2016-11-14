void function(SimpleTest, test){

test.group("try catch 语句测试");

test.true("最简单的 try catch 语句", "try{}catch(e){}");
test.true("最简单的 try finally 语句", "try{}finally{}");
test.true("最简单的 try catch finally 语句", "try{}catch(e){}finally{}");

test.true(
	"复杂的测试",
	SimpleTest.innerContentOf(function(){
		var a = 1

		try {
			a += 2
		}
		catch(e){}
		finally {
			a += 100

			try {
				throw 999
			}
			catch(e){
				a += e;
			}
			finally {
				a += 1
			}

			try {
				a += 2
			}
			finally {
				a -= 2
			}
		}
		
		if(
			a !== 1103
		){
			throw "计算结果有误."
		}
	}),
	true
);

test.false(
	"try 关键字后面缺少大括号",
	"try 123;catch(e){}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.NumberTag ? "" : "没有识别出数字";
	}
);

test.false(
	"catch 关键字后面缺少大括号",
	"try{}catch(e)123;",
	function(parser, err){
		return err.context.tag instanceof Rexjs.NumberTag ? "" : "没有识别出数字";
	}
);

test.false(
	"finally 关键字后面缺少大括号",
	"try{}finally 123;",
	function(parser, err){
		return err.context.tag instanceof Rexjs.NumberTag ? "" : "没有识别出数字";
	}
);

test.false(
	"缺少 catch 或 finally",
	"try{}123;;",
	function(parser, err){
		return err.context.tag instanceof Rexjs.NumberTag ? "" : "没有识别出数字";
	}
);

test.false(
	"缺少的异常变量",
	"try{}catch(){}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseParenTag ? "" : "没有识别出结束小括号";
	}
);

test.false(
	"过多的异常变量",
	"try{}catch(e, b){}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有识别出逗号";
	}
);

test.groupEnd();

}(
	Rexjs.SimpleTest,
	test
);