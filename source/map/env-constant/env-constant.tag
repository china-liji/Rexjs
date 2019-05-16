import { SyntaxTag, CLASS_EXPRESSION } from "../core";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";
import { EnvConstantExpression } from "./env-constant.expr";

export let EnvConstantTag = function(){
	/**
	 * 运行环境常量标签
	 * @param {Number} _type - 标签类型
	 */
	return class EnvConstantTag extends SyntaxTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_EXPRESSION;

		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.ENV_CONSTANT;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 上一个标签所需匹配的标签列表
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.expressionContextTags;
		};

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement){
			// 设置表达式
			statement.expression = new EnvConstantExpression(context);
		};
	};
}();