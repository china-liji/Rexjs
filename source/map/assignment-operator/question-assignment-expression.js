import { BinaryExpression } from "../binary-operator/binary-expression";

export let QuestionAssignmentExpression = function(){
	return class QuestionAssignmentExpression extends BinaryExpression {
		/**
		 * 赋值成立条件
		 * @type {String}
		 */
		condition = "!==void 0";

		/**
		 * 临时变量名
		 * @type {String}
		 */
		variable = "";

		/**
		 * 疑问赋值达式
		 * @param {Context} context - 语法标签上下文
		 * @param {String} variable - 临时变量名
		 */
		constructor(context, variable){
			super(context);

			this.variable = variable;
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			let { variable } = this;

			// 追加临时变量赋值操作
			contentBuilder.appendString("((" + variable + "=");
			// 提取右侧表达式，作为临时变量的值
			this.right.extractTo(contentBuilder);
			// 追加三元运算符的判断条件
			contentBuilder.appendString(")" + this.condition +"?");
			// 在三元表达式的成立条件部分，提取左侧表达式
			this.left.extractTo(contentBuilder);
			// 在三元表达式的成立条件部分，给左侧表达式赋值；并在否定条件部分直接返回该临时变量
			contentBuilder.appendString("=" + variable + ":" + variable + ")");
		};
	};
}();