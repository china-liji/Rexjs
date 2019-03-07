import { SpreadExpression } from "../spread-operator/spread-expression";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";

export let ArraySpreadItemExpression = function(){
	/**
	 * 数组拓展项表达式
	 * @param {Context} context - 标签上下文
	 */
	return class ArraySpreadItemExpression extends SpreadExpression {
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 如果需要编译
			if(ECMAScriptConfig.es6Base){
				// 追加初始化拓展项
				contentBuilder.appendString("new Rexjs.SpreadItem(");
				// 提取操作对象
				this.operand.extractTo(contentBuilder);
				// 追加初始化拓展项的结束小括号
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