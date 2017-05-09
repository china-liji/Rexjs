test.unit(
	[ "module/source.js" ],
	function(source){
		this.group("模块测试");

		this.true("导入模块", 'import "index.js"');
		this.true("默认成员导入", 'import a from "index.js"');
		this.true("所有成员导入", 'import * as All from "index.js"');
		this.true("多成员导入", 'import { a as b, c as d, e } from "index.js"');
		this.true("多类型成员导入", 'import x, { a as b, c as d }, * as All, { i as k } from "index.js"');
		this.true("多成员输出", "export { a, b as c, d, e as f, i as k, x, y, z }");
		this.true("输出 var 语句", "export var a = 1, b, c");
		this.true("输出 let 语句", "export let a = 1, b, c");
		this.true("输出 const 语句", "export const a = 1, b = 2, c = 3");
		this.true("默认输出表达式", "export default 1 + 2 + 3");
		this.true("输出默认函数", "export default function(){}");
		this.true("输出默认函数声明", "export default function fn(){}");
		this.true("输出默认类", "export default class {}");
		this.true("输出默认类声明", "export default class Car {}");
		this.true("输出其他模块成员", 'export { a, b as c, d } from "index.js"');
		this.true("输出其他模块所有成员", 'export * from "index.js"');

		this.true("复杂的测试", source, true);

		this.false(
			"不规范的模块名称",
			"import 123",
			function(parser, err){
				return err.context.content === "123" ? "" : "没有识别出 123";
			}
		);

		this.false(
			"不完整的 import 语句",
			"import",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有识别出文件结束符";
			}
		);

		this.false(
			"错误的字符串变量名",
			'import 123 from "index.js"',
			function(parser, err){
				return err.context.content === "123" ? "" : "没有识别出错误的数字";
			}
		);

		this.false(
			"缺少 from",
			'import a "index.js"',
			function(parser, err){
				return err.context.tag instanceof Rexjs.StringTag ? "" : "没有识别出错误的字符串";
			}
		);

		this.false(
			"具有别名的默认成员别名",
			'import a as b from "index.js"',
			function(parser, err){
				return err.context.content === "as" ? "" : "没有识别出 as";
			}
		);

		this.false(
			"错误的表达式上下文标签",
			'import a from "index.js" / 1',
			function(parser, err){
				return err.context.content === "/" ? "" : "没有识别出除号";
			}
		);
		
		this.false(
			"import 语句后面在不带分号的情况下接其他语句",
			'import a from "index.js" var b;',
			function(parser, err){
				return err.context.content === "var" ? "" : "没有识别 var 关键字";
 			}
		);

		this.false(
			"默认导入变量与 let 重复定义",
			'let a;import a from "index.js";',
			function(parser, err){
				return err.context.tag instanceof Rexjs.DefaultMemberTag ? "" : "没有识别出默认成员标签";
			}
		);

		this.false(
			"var 变量与默认导入变量重复定义",
			'import a from "index.js";var a;',
			function(parser, err){
				return err.context.tag instanceof Rexjs.DefaultMemberTag === false ? "" : "没有识别出变量名";
			}
		);

		this.false(
			"给成员变量重新赋值",
			'import a from "index.js"\na = 1',
			function(parser, err){
				return err.context.content === "a" ? "" : "没有识别出错误的变量名";
			},
			function(parser, err){
				return err.context.position.line === 1 ? "" : "变量名识别位置错误";
			}
		);

		this.false(
			"所有成员导入缺少 as 子表达式",
			'import * from "index.js"',
			function(parser, err){
				return err.context.content === "from" ? "" : "没有识别出 from";
			}
		);

		this.false(
			"错误的数字别名",
			'import * 123 from "index.js"',
			function(parser, err){
				return err.context.content === "123" ? "" : "没有识别出数字";
			}
		);

		this.false(
			"所有成员导入缺少别名",
			'import * as from "index.js"',
			function(parser, err){
				return err.context.content === '"index.js"' ? "" : "没有识别出字符串";
			}
		);

		this.false(
			"多成员导入中使用冒号",
			'import { a : b } from "index.js"',
			function(parser, err){
				return err.context.content === ":" ? "" : "没有识别出冒号";
			}
		);

		this.false(
			"多成员导入多属性间逗号缺少",
			'import { a as b  c as d } from "index.js"',
			function(parser, err){
				return err.context.content === "c" ? "" : "没有识别出 c";
			}
		);

		this.false(
			"多成员导入多属性间逗号太多",
			'import { a as b,     ,c as d } from "index.js"',
			function(parser, err){
				return err.context.content === "," ? "" : "没有识别出逗号";
			},
			function(parser, err){
				return err.context.position.column === 'import { a as b,     ,'.length - 1 ? "" : "没有准确找到指定错误的逗号";
			}
		);

		this.false(
			"关键字变量名",
			'import { var } from "index.js"',
			function(parser, err){
				return err.context.content === "var" ? "" : "没有检测到 var";
			}
		);

		this.false(
			"关键字别名",
			'import { a as var } from "index.js"',
			function(parser, err){
				return err.context.content === "var" ? "" : "没有检测到 var";
			}
		);

		this.false(
			"成员输出语句后面接 from",
			"export let a from '123'",
			function(parser, err){
				return err.context.content === "from" ? "" : "没有识别出 from";
			}
		);

		this.false(
			"多成员输出中使用冒号",
			'export { a : b }',
			function(parser, err){
				return err.context.content === ":" ? "" : "没有识别出冒号";
			}
		);

		this.false(
			"多成员输出多属性间逗号缺少",
			'export { a as b  c as d }',
			function(parser, err){
				return err.context.content === "c" ? "" : "没有识别出 c";
			}
		);

		this.false(
			"多成员输出多属性间逗号太多",
			'import { a as b,     ,c as d } from "index.js"',
			function(parser, err){
				return err.context.content === "," ? "" : "没有识别出逗号";
			},
			function(parser, err){
				return err.context.position.column === 'import { a as b,     ,'.length - 1 ? "" : "没有准确找到指定错误的逗号";
			}
		);

		this.groupEnd();
	}
);