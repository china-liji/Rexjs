import { DestructuringItemExpression } from "./destructuring-item-expression";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";
import { ContentBuilder } from "../core";

export let DestructuringDefaultItemExpression = function(){
	return class DestructuringDefaultItemExpression extends DestructuringItemExpression {
		/**
		 * 解构默认项表达式
		 * @param {Expression} origin - 解构赋值源表达式
		 * @param {Statements} statements - 该表达式所处的语句块
		 */
		constructor(origin, statements){
			super(origin);

			// 如果需要编译
			if(ECMAScriptConfig.es6Base){
				// 给刚生成的解构赋值表达式设置变量名
				this.variable = statements.collections.generate();
			}
		};

		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @returns {void}
		 */
		compileTo(contentBuilder, anotherBuilder){
			// 将默认值表达式转换为三元表达式
			this.toTernary(this.origin, contentBuilder, anotherBuilder);
		};

		/**
		 * 将默认值表达式转换为三元表达式
		 * @param {BinaryExpression} expression - 默认值二元表达式
		 * @param {ContentBuilder} contentBuilder - 主内容生成器
		 * @param {ContentBuilder} valueBuilder - 属性值生成器
		 * @returns {void}
		 */
		toTernary(expression, contentBuilder, valueBuilder){
			let { variable } = this, leftBuilder = new ContentBuilder(), rightBuilder = new ContentBuilder();

			// 提取左侧表达式到临时内容生成器
			expression.left.extractTo(leftBuilder);
			// 提取右侧表达式到临时内容生成器
			expression.right.extractTo(rightBuilder);

			// 追加赋值操作
			contentBuilder.appendString(
				"," + leftBuilder.result + "=(" +
					variable + "=" + valueBuilder.result + "," +
					// 三元表达式，判断是否为 undefined
					variable + "===void 0?" +
						rightBuilder.result +
						":" + variable +
				")"
			);
		};
	};
}();