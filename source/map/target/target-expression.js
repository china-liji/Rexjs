import { AccessorExpression } from "../accessor/accessor-expression";

export let TargetExpression = function(){
	return class TargetExpression extends AccessorExpression {
		/**
		 * new.target 表达式
		 * @param {Context} context - 语法标签上下文
		 */
		constructor(context){
			super(context, null);
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 追加 new 关键字
			contentBuilder.appendString("new");
			// 追加点
			contentBuilder.appendContext(this.context);
			// 追加属性
			contentBuilder.appendContext(this.property);
		};
	};
}();