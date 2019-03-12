import { PropertyValueExpression } from "../property/property-value-expression";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";

export let PropertyInitializerExpression = function(toTernary){
	return class PropertyInitializerExpression extends PropertyValueExpression {
		/**
		 * 对象简写属性所对应的变量名
		 * @type {Expression}
		 */
		variable = null;

		/**
		 * 属性初始值表达式
		 * @param {Context} context - 语法标签上下文
		 * @param {Expression} variable - 对象简写属性所对应的变量名
		 */
		constructor(context, variable){
			super(context);

			this.variable = variable;
		};

		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		compileTo(contentBuilder){
			// 以三元表达式的形式追加
			toTernary(contentBuilder, this, "=");
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 如果需要编译
			if(ECMAScriptConfig.rexjs){
				// 以三元表达式的形式追加
				toTernary(contentBuilder, this, ":");
				return;
			}

			// 调用父类方法
			super.extractTo(contentBuilder);
		};
	};
}(
	// toTernary
	(contentBuilder, expression, assignment) => {
		let { content } = expression.variable.context;
			
		// 追加 undefined 判断
		contentBuilder.appendString(
			assignment + content + "===void 0?"
		);

		// 提取属性值
		expression.operand.extractTo(contentBuilder);

		// 追加三元运算的否定结果表达式
		contentBuilder.appendString(
			":" + content
		);
	}
);