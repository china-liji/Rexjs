import { ArgumentExpression } from "./argument-expression";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";

export let ArgumentDefaultValueExpression = function(){
	/**
	 * 省略参数表达式
	 * @param {Context} context - 语法标签上下文
	 */
	return class ArgumentDefaultValueExpression extends ArgumentExpression {
		/**
		 * 赋值表达式
		 * @type {Expression}
		 */
		assignment = null;

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @returns {void}
		 */
		extractTo(contentBuilder, anotherBuilder){
			// 如果需要编译
			if(ECMAScriptConfig.es6Base){
				let { context } = this;

				// 追加参数名至 contentBuilder
				contentBuilder.appendContext(context);

				// 追加参数名至 anotherBuilder
				anotherBuilder.appendContext(context);
				// 判断是否为 undefined
				anotherBuilder.appendString("===void 0&&(");

				// 将赋值表达式提取至临时生成器
				this.assignment.extractTo(anotherBuilder);
				// 再对临时生成器添加分号
				anotherBuilder.appendString(");");
				return;
			}

			// 直接正式提取赋值表达式
			this.assignment.extractTo(contentBuilder);
		};
	};
}();