import Rexjs from "../core";
import { GlobalStatements } from "../base-statements/global.stmts";

export let FileEndTag = function({ FilePositionTag, FileEndExpression }){
	/**
	 * 文件结束符标签
	 * @param {Number} _type - 标签类型
	 */
	return class FileEndTag extends FilePositionTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /$/;

		/**
		 * 异常时需要抛出的信息
		 * @type {String}
		 */
		throw = "end of input";

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			switch(false){
				// 如果不是全局语句块，说明不是最外层
				case statements instanceof GlobalStatements:
					break;

				// 如果不是最后一个语句，则说明语句没有完全跳出
				case statement === statements[statements.length - 1]:
					break;

				// 如果存在表达式，说明解析有问题，因为该标签是语句起始标签，而又有上面两点保证，所以当前表达式必定为 null，为了 100% 确保，还是判断一下
				case !statement.expression:
					break;

				default:
					// 设置当前表达式
					statement.expression = new FileEndExpression(context);
					
					// 终止解析
					parser.regexp.break();
					return;
			}

			// 报错
			parser.error(context);
		}
	};
}(
	Rexjs
);