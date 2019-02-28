import { BinaryExpression } from "../binary-operator";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";

export let ExponentiationExpression = function(){
	/**
	 * 幂运算表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} left - 左侧表达式
	 */
	return class ExponentiationExpression extends BinaryExpression {
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 如果需要编译
			if(ECMAScriptConfig.es6Base){
				// 追加算数方法
				contentBuilder.appendString("(Math.pow(");
				// 提取左侧的算数底值
				this.left.extractTo(contentBuilder);
				// 追加参数分隔符
				contentBuilder.appendString(",");
				// 提取幂
				this.right.extractTo(contentBuilder);
				// 追加方法结束小括号
				contentBuilder.appendString("))");
				return;
			}

			// 调用父类方法
			super.extractTo(contentBuilder);
		};
	};
}();