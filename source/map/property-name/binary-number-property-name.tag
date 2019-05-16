import { BinaryNumberTag } from "../mathematical-number/binary-number.tag";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";
import { LiteralPropertyNameExpression } from "./literal-property-name.expr";

export let BinaryNumberPropertyNameTag = function(){
	/**
	 * 二进制数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	return class BinaryNumberPropertyNameTag extends BinaryNumberTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.propertyNameContextTags;
		};

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			// 如果需要编译
			if(ECMAScriptConfig.es6Base){
				// 给对象表达式设置临时变量名
				statement.expression.setCompiledVariableTo(
					statements,
					statement.target.expression
				);
			}
			
			// 调用 visitor 方法
			statement.expression.name = new LiteralPropertyNameExpression(context);
		};
	};
}();