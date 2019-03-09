import { ArgumentExpression } from "./argument-expression";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";

export let ArgumentRestValueExpression = function(){
	return class ArgumentRestValueExpression extends ArgumentExpression {
		/**
		 * 参数名上下文
		 * @type {Context}
		 */
		name = null;

		/**
		 * 省略参数的索引值，标识着是第几个参数
		 * @type {Number}
		 */
		index = 0;

		/**
		 * 省略参数表达式
		 * @param {Context} context - 拓展符语法标签上下文
		 * @param {Number} index - 省略参数位于参数列表中的索引
		 */
		constructor(context, index){
			super(context);

			this.index = index;
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @returns {void}
		 */
		extractTo(contentBuilder, anotherBuilder){
			// 如果需要编译
			if(ECMAScriptConfig.es6Base){
				// 将默认参数名追加至临时生成器
				anotherBuilder.appendContext(this.name);
				// 将赋值运算追加至临时生成器
				anotherBuilder.appendString("=Rexjs.toArray(arguments," + this.index + ");");
			}
			else {
				// 直接正式添加省略符
				contentBuilder.appendContext(this.context);
			}

			// 正式的追加参数名
			contentBuilder.appendContext(this.name);
		};
	};
}();