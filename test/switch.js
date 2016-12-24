void function(SimpleTest, test){

test.group("switch 语句");

test.true("最简单的 switch 语句", "switch(true){}");
test.true("无换行且连续的 switch 语句", "switch(true){}switch(true){}");
test.true("switch case 语句", "switch(true){case 1:}");
test.true("单语句 case", "switch(true){case 1:;}");
test.true("带 break 的 switch 语句", "switch(true){case 1:break;}");
test.true("多语句 case", "switch(true){case 1:var a = 1;a = 100;break;}");
test.true("连续的空 case 语句", "switch(true){ case 1:case 2:case 3: }");
test.true("带 defualt 的 switch 语句", "switch(true){ default: }");
test.true("带 case 与 defualt 的 switch 语句", "switch(true){ case 1:default:case 2: }");
test.true("带换行的 case 与 defualt 的 switch 语句", "switch(true){ case 1:1\ndefault:break\ncase 2:;case 4: }");
test.true("赋值条件的 switch 语句", "switch(a += 3){}");
test.true("赋值运算的 case 值", "switch(a += 3){ case a += 6: }");
test.true("带中断流标记的 switch 语句", "a:b:if(true){switch(a += 3){ case a += 6:break a }}");

test.true(
	"测试结果",
	SimpleTest.innerContentOf(function(){
		a = 100

		switch(
			1 + 3 / 3 * 4 - 5
		){
			case 1:
				a += 1

			case 2:
				a += 3

			case 0: {
				a -= 100
				
				break
			}

			if(
				a > 100
			){
				a = 10000
			}

			default:
				throw "错误的测试"
		}

		if(
			a !== 0
		){
			throw "计算结果错误";
		}
	}),
	true
);

test.false(
	"缺少值的 switch case 语句",
	"switch(true){case :}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.ColonTag ? "" : "没有正确的捕获冒号";
	}
);

test.false(
	"缺少冒号的 switch case 语句",
	"switch(true){case 1}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有正确的捕获结束大括号";
	}
);

test.false(
	"缺少冒号的 switch default 语句",
	"switch(true){default}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有正确的捕获结束大括号";
	}
);

test.false(
	"多个 default",
	"switch(true){ default:break;default:break }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.DefaultTag ? "" : "没有正确捕获 default 关键字";
	},
	function(parser, err){
		return err.context.position.column === 28 ? "" : "没有正确的捕获到 default 关键字的位置";
	}
);

test.false(
	"带语句的条件",
	"switch(if){}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.IfTag ? "" : "没有正确的捕获 if 关键字";
	}
);

test.false(
	"带其他语句的 case 语句",
	"switch(true){ case if: }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.IfTag ? "" : "没有正确的捕获 if 关键字";
	}
);

test.false(
	"缺少换行的 switch 语句",
	"switch(true){ case 1:1 default: }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.DefaultTag ? "" : "没有正确的捕获 default 关键字";
	}
);

test.false(
	"带 continue 的 switch 语句",
	"switch(true){ case 1:continue }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.ContinueTag ? "" : "没有正确的捕获 continue 关键字";
	}
);


test.groupEnd();

}(
	Rexjs.SimpleTest,
	test
);