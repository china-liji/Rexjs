import { FunctionTag } from "../function/function.tag";
import { CLASS_STATEMENT_BEGIN, EmptyExpression } from "../core";
import { FunctionDeclarationExpression } from "./function-declaration.expr";
import { BoxStatement } from "../base-statement/box.stmt";

export let FunctionDeclarationTag = function(){
	/**
	 * 函数声明标签
	 * @param {Number} _type - 标签类型
	 */
	return class FunctionDeclarationTag extends FunctionTag {
		/**
		 * 标签类型分类
		 * @type {Number}
		 */
		$class = CLASS_STATEMENT_BEGIN;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.functionDeclarationContextTags;
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
			let functionDeclarationExpression = new FunctionDeclarationExpression(context), generator = statements.contextGeneratorIfNeedCompile;

			// 如果存在需要编译的生成器
			if(generator){
				// 如果处于当前闭包语句块层级，说明要变量提升
				if(statements === statements.closure){
					// 设置当前表达式为空表达式
					statement.expression = new EmptyExpression(null);

					(
						// 设置当前语句
						statements.statement = new BoxStatement(statements)
					)
					// 设置盒语句的表达式
					.expression = functionDeclarationExpression;

					// 记录变量提升表达式
					generator.hoistings.push(functionDeclarationExpression);
					return;
				}
			}

			// 设置当前表达式
			statement.expression = functionDeclarationExpression;
		};
	};
}();