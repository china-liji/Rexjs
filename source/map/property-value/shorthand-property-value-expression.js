import { PropertyValueExpression } from "../property/property-value-expression";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";

export let ShorthandPropertyValueExpression = function(){
	/**
	 * 简写属性值表达式
	 * @param {Context} context - 语法标签上下文
	 */
	return class ShorthandPropertyValueExpression extends PropertyValueExpression {
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		compileTo(contentBuilder){
			// 追加冒号和变量名
			contentBuilder.appendString("=" + this.context.content);
		};

		/**
		 * 以解构方式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @returns {void}
		 */
		destructTo(contentBuilder, anotherBuilder){
			// 追加逗号表达式分隔符
			contentBuilder.appendString(",");
			// 追加变量名
			contentBuilder.appendContext(this.context);
			// 追加赋值表达式
			contentBuilder.appendString("=" + anotherBuilder.result);
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 如果需要编译
			if(ECMAScriptConfig.es6Base){
				// 追加冒号和变量名
				contentBuilder.appendString(":" + this.context.content);
			}
		};
	};
}();