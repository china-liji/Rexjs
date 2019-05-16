import { BinaryKeywordTag } from "../binary-operator/binary-keyword.tag";
import { IterationStatement } from "./iterator.stmt";
import { ECMAScriptMethod } from "../ecmascript/ecmascript-method";

export let IteratorTag = function(){
	/**
	 * for 循环迭代符标签
	 * @param {Number} _type - 标签类型
	 */
	return class IteratorTag extends BinaryKeywordTag {
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {Statement}
		 */
		getBoundStatement(statements){
			return new IterationStatement(statements);
		};

		/**
		 * 判断编译时是否需要临时变量名
		 * @param {Statements} statements - 当前语句块
		 * @returns {Boolean}
		 */
		hasVariable(statements){
			return statements.contextGeneratorIfNeedCompile !== null;
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
			let { expression, target: { expression: forExpression } } = statement;

			// 设置 for 表达式的 iterator 属性
			forExpression.iterator = context.content;

			// 如果需要编译
			if(this.hasVariable(statements)){
				// 生成并记录临时变量名
				forExpression.variable = statements.collections.generate();
			}

			// 调用公共访问器方法
			ECMAScriptMethod.visitor(parser, context, statement, statements);
			
			// 设置当前表达式的左侧表达式
			statement.expression.left  = expression;
		};
	};
}();