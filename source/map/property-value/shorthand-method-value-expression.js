import { PropertyValueExpression } from "../property/property-value-expression";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";

export let ShorthandMethodValueExpression = function(complie){
	return class ShorthandMethodValueExpression extends PropertyValueExpression {
		/**
		 * 简写方法值表达式
		 */
		constructor(){
			super(null);
		};

		/**
		 * 以函数参数模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		argumentTo(contentBuilder){
			// 编译表达式
			complie(this, contentBuilder, "");
		};

		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		defineTo(contentBuilder){
			// 编译表达式
			complie(this, contentBuilder, ":");
		};

		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		compileTo(contentBuilder){
			// 编译表达式
			complie(this, contentBuilder, "=");
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 如果需要编译
			if(ECMAScriptConfig.es6Base){
				// 以定义属性的模式提取表达式文本内容
				this.defineTo(contentBuilder);
				return;
			}

			// 直接以简写形式提取表达式文本内容
			this.shortTo(contentBuilder);
		};

		/**
		 * 直接以简写形式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		shortTo(contentBuilder){
			// 提取属性值
			this.operand.extractTo(contentBuilder);
		};
	};
}(
	// complie
	(expression, contentBuilder, separator) => {
		// 追加 赋值等于号 和 函数头部
		contentBuilder.appendString(separator + "function");
		// 直接以简写形式提取表达式文本内容
		expression.shortTo(contentBuilder);
	}
);