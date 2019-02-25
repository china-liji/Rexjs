import { UnaryKeywordTag } from "../unary-operator/unary-keyword-tag";
import { ExecExpression } from "./exec-expression";

export let ExecTag = function(){
	/**
	 * 执行函数关键字（如：new、try 等）标签
	 * @param {Number} _type - 标签类型
	 */
	return class ExecTag extends UnaryKeywordTag {
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 * @param {Expression} operand - 该一元表达式所操作的对象
		 */
		isSeparator(context, operand){
			/*
				该 isSeparator 是由 try 方法进入，
				而只有 CLASS_EXPRESSION_CONTEXT 标签才能进入 try
			*/
			return operand instanceof ExecExpression || super.isSeparator(context);
		};
	};
}();