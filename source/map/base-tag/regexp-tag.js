import { LiteralTag } from "../literal/literal-tag";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";

export let RegExpTag = function(){
	/**
	 * as 标签
	 * @param {Number} _type - 标签类型
	 */
	return class RegExpTag extends LiteralTag {
		/**
		 * 标签正则
		 * 主体分三部分：
		 * 1. 反斜杠 + 非换行符，如：\/
		 * 2. 中括号内容，又分两部分：
		 * 2.1 被转义的非换行符，如：\]
		 * 2.2 非换行符、转义符（/）、结束中括号（]）
		 * 3. 除了 转义符（/）、斜杠（\）、起始中括号（[）、换行符 之外的其他字符
		 * @type {RegExp}
		 */
		regexp = /\/(?:\\[^\r\n\u2028\u2029]|\[(?:\\[^\r\n\u2028\u2029]|[^\\\]\r\n\u2028\u2029])*\]|[^/\\[\r\n\u2028\u2029])+\/[imguy]*/;

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			let i = 0, m = 0, g = 0, u = 0, y = 0, count = 0, content = context.content;
			
			// 遍历正则标记
			flags:
			for(let n = content.length - 1;n > -1;n--){
				// 判断当前标记
				switch(content[n]){
					case "/":
						break flags;

					case "i":
						count = ++i;
						break;
						
					case "m":
						count = ++m;
						break;
						
					case "g":
						count = ++g;
						break;
						
					case "u":
						count = ++u;
						break;
						
					case "y":
						count = ++y;
						break;
						
					default:
						count = 2;
						break;
				}
				
				// 如果对应标记出现过 2 次
				if(count > 1){
					// 报错
					parser.error(context, ECMAScriptErrors.REGEXP_FLAGS);
					return;
				}
			}
			
			// 调用父类方法
			super.visitor(parser, context, statement, statements);
		}
	};
}();