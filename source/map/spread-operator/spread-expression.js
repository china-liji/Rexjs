import { Expression } from "../core";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";

export let SpreadExpression = function(){
	/**
	 * 拓展参数表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	return class SpreadExpression extends Expression {
		/**
		 * 拓展符的操作对象
		 * @type {Expression}
		 */
		operand = null;

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 如果需要编译
			if(ECMAScriptConfig.es6Base){
				// 追加编译拓展符方法
				contentBuilder.appendString("new Rexjs.SpreadItem(");
				// 提取参数
				this.operand.extractTo(contentBuilder);
				// 追加拓展符方法的结束小括号
				contentBuilder.appendString(")");
				return;
			}

			// 追加拓展符上下文
			contentBuilder.appendContext(this.context);
			// 提取参数
			this.operand.extractTo(contentBuilder);
		};
	};
}();