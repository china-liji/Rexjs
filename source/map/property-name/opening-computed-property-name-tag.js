import { OpeningBracketTag } from "../bracket/opening-bracket-tag";
import { ComputedPropertyNameExpression } from "./computed-property-name-expression";
import { ComputedPropertyNameStatement } from "./computed-property-name-statement";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";
import { ClosingComputedPropertyNameTag } from "./closing-computed-property-name-tag";

export let OpeningComputedPropertyNameTag = function(closingComputedPropertyNameTag){
	/**
	 * 起始对象计算式属性名标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningComputedPropertyNameTag extends OpeningBracketTag {
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return closingComputedPropertyNameTag;
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.expressionTags;
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
			// 设置表达式的 name 属性
			statement.expression.name = new ComputedPropertyNameExpression(context);

			// 如果需要编译
			if(ECMAScriptConfig.es6Base){
				// 给对象表达式设置临时变量名
				statement.expression.setCompiledVariableTo(
					statements,
					statement.target.expression
				);
			}
			
			// 设置当前属性
			statements.statement = new ComputedPropertyNameStatement(statements);
		};
	};
}(
	// closingComputedPropertyNameTag
	new ClosingComputedPropertyNameTag()
);