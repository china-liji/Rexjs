import { ExecExpression } from "../exec/exec-expression";
import { UnaryStatement } from "../unary/unary-statement";
import { ListExpression } from "../core";
import { BracketAccessorExpression } from "../accessor/bracket-acccessor-expression";
import { AccessorExpression } from "../accessor/accessor-expression";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";

export let CallExpression = function(){
	return class CallExpression extends ExecExpression {
		/**
		 * 函数调用时，所需传递的 this
		 * @type {String}
		 */
		boundThis = "void 0";

		/**
		 * 是否是实例化函数调用
		 * @type {Boolean}
		 */
		new = false;

		/**
		 * 调用对象
		 * @type {Expression}
		 */
		operand = null;

		/**
		 * 是否有拓展参数
		 * @type {Boolean}
		 */
		spread = false;

		/**
		 * 函数调用表达式
		 * @param {Context} opening - 起始标签上下文
		 * @param {ECMAScriptStatement} statement - 当前语句
		 */
		constructor(opening, statement){
			super(opening);

			this.operand = statement.expression;
			this.inner = new ListExpression(null, ",");

			// 如果是一元语句
			if(statement instanceof UnaryStatement){
				this.new = statement.target.expression.context.content === "new";
			}
		};

		/**
		 * 当拓展符存在时，以访问形式提取表达式内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		accessTo(contentBuilder){
			let { operand, boundThis } = this;

			// 追加临时变量名
			contentBuilder.appendString("(" + boundThis + "=");
			// 提取拥有此方法的对象
			operand.object.extractTo(contentBuilder);
			// 追加临时变量名的结束小括号
			contentBuilder.appendString(")");

			// 如果是中括号属性访问表达式
			if(operand instanceof BracketAccessorExpression){
				// 提取中括号
				operand.property.extractTo(contentBuilder);
			}
			else {
				// 提取点操作符
				contentBuilder.appendContext(operand.context);
				// 提取属性
				contentBuilder.appendContext(operand.property);
			}
			
			// 追加 apply 方法
			contentBuilder.appendString(".apply(" + boundThis + ",Rexjs.SpreadItem.combine");
			// 调用父类方法
			super.extractTo(contentBuilder);
			// 追加 apply 方法的结束小括号
			contentBuilder.appendString(")");
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 如果有拓展符且需要编译
			if(this.spread && ECMAScriptConfig.es6Base){
				switch(true){
					// 如果是 new 实例化
					case this.new:
						// 以实例化形式提取表达式内容
						this.newTo(contentBuilder);
						return;

					// 如果是对象方法的调用
					case this.operand instanceof AccessorExpression:
						// 以访问形式提取表达式内容
						this.accessTo(contentBuilder);
						return;

					default:
						// 以普通拓展符情况提取表达式内容
						this.spreadTo(contentBuilder);
						return;
				}
			}
			
			// 提取操作对象
			this.operand.extractTo(contentBuilder);
			// 调用父类方法
			super.extractTo(contentBuilder);
		};
		
		/**
		 * 当拓展符存在时，以实例化形式提取表达式内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		newTo(contentBuilder){
			// 追加 bind 方法
			contentBuilder.appendString("(Function.bind.apply(");
			// 提取该调用的方法
			this.operand.extractTo(contentBuilder);
			// 追加拓展符编译的方法
			contentBuilder.appendString(",Rexjs.SpreadItem.combine");
			// 追加函数调用的起始小括号
			contentBuilder.appendContext(this.opening);
			// 追加 bind 所指定的 this
			contentBuilder.appendString(this.boundThis + ",");
			// 提取函数调用参数
			this.inner.extractTo(contentBuilder);
			// 追加函数调用的结束小括号
			contentBuilder.appendContext(this.closing);
			// 追加 bind 方法的结束小括号和函数立即执行的小括号（注：bind 方法与 apply 不同，不具有立即执行效果）
			contentBuilder.appendString("))()");
		};

		/**
		 * 当匹配到拓展符时的处理逻辑
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		spreadMatched(statements){
			// 如果已经告知过
			if(this.spread){
				return;
			}

			// 如果操作对象是属性表达式
			if(this.operand instanceof AccessorExpression){
				// 生成变量名
				this.boundThis = statements.collections.generate();
			}

			this.spread = true;
		};
		
		/**
		 * 当拓展符存在时，以普通拓展符情况提取表达式内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		spreadTo(contentBuilder){
			// 追加 apply
			contentBuilder.appendString("(Function.apply.call(");
			// 提取操作对象
			this.operand.extractTo(contentBuilder);
			// 追加参数
			contentBuilder.appendString("," + this.boundThis + ",Rexjs.SpreadItem.combine");
			// 调用父类方法
			super.extractTo(contentBuilder);
			// 追加结束小括号
			contentBuilder.appendString("))");
		};
	};
}();