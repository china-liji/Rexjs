import { ArgumentsExpression } from "../arguments/arguments-expression";
import { ArgumentExpression } from "../argument/argument-expression";

export let SingleArgumentExpression = function(){
	return class SingleArgumentExpression extends ArgumentsExpression {
		/**
		 * 单参数表达式
		 * @param {Context} argumentContext - 参数上下文
		 * @param {Statements} statements - 当前语句块
		 */
		constructor(argumentContext, statements){
			super(null, statements);

			// 添加参数表达式
			this.inner.add(
				new ArgumentExpression(argumentContext)
			);

			// 收集参数名
			this.collection.collect(argumentContext.content);
		};

		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		compileTo(contentBuilder){
			// 追加参数起始小括号
			contentBuilder.appendString("(");
			// 提取参数名
			this.inner.extractTo(contentBuilder);
			// 追加参数结束小括号
			contentBuilder.appendString(")");
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 提取参数名
			this.inner.extractTo(contentBuilder);
		};
	};
}();