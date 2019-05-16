import { VariableDeclarationTag } from "../variable/variable-declaration.tag";
import { Expression } from "../core";

export let ExceptionVariableTag = function(){
	/**
	 * 异常变量标签
	 * @param {Number} _type - 标签类型
	 */
	return class ExceptionVariableTag extends VariableDeclarationTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.closingCatchedExceptionTags;
		};

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor(parser, context, statement, statements){
			let { expression } = statement.target, { contextGeneratorIfNeedCompile: generator } = expression;

			// 如果存在需要编译的生成器
			if(generator){
				let range = statements.collections.declaration.range();

				// 添加变量名收集器范围
				generator.ranges.push(range);
				// 收集变量名
				this.collectTo(parser, context, statements);
				// 范围结束
				range.close();
			}
			else {
				// 仅仅只收集变量名
				this.collectTo(parser, context, statements);
			}

			// 设置 inner
			expression.exception.inner = new Expression(context);
		}
	};
}();