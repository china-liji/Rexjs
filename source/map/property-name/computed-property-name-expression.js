import { PartnerExpression } from "../core";

export let ComputedPropertyNameExpression = function(){
	/**
	 * 属性计算式表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	return class ComputedPropertyNameExpression extends PartnerExpression {
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		compileTo(contentBuilder){
			this.extractTo(contentBuilder);
		};

		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		defineTo(contentBuilder){
			// 追加起始小括号，防止 inner 里面是逗号表达式，会出现意外
			contentBuilder.appendString("(");
			// 提取 inner
			this.inner.extractTo(contentBuilder);
			// 追加结束小括号
			contentBuilder.appendString(")");
		};
	};
}();