import { DestructibleExpression } from "../destructuring/destructible-expression";
import { AssignableExpression } from "../base-expression/assignable-expression";
import { DestructuringItemExpression } from "../destructuring/destructuring-item-expression";
import { EmptyExpression } from "../core";
import { BinaryExpression } from "../binary-operator/binary-expression";
import { BasicAssignmentTag } from "../assignment-operator/basic-assignment-tag";
import { DestructuringExpression } from "../destructuring/destructuring-expression";
import { DefaultDestructuringItemExpression } from "../destructuring/default-destructuring-item-expression";
import { SpreadExpression } from "../spread-operator/spread-expression";
import { ArrayDestructuringExpression } from "./array-destructuring-expression";
import { ArrayDestructuringItemExpression } from "./array-destructuring-item-expression";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";
import { ArrayRestDestructuringItemExpression } from "./array-rest-destructuring-item-expression";

export let ArrayExpression = function(){
	/**
	 * 数组表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	return class ArrayExpression extends DestructibleExpression {
		/**
		 * 是否为拓展解构项
		 * @type {Boolean}
		 */
		spread = false;

		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {VarTag} _varTag - 声明标签，一旦提供该参数，如果是声明解构且变量名没有被收集，那么会自动进行收集
		 * @returns {void}
		 */
		convert(parser, _varTag){
			let { inner } = this;

			// 遍历
			for(let i = inner.min, j = inner.length;i < j;i++){
				let expression = inner[i];

				switch(true){
					// 如果是可赋值的表达式，即 标识符 或 属性访问器
					case expression instanceof AssignableExpression:
						// 如果已经被收集到常量内
						if(this.collectedBy(parser, expression, _varTag)){
							return;
						}

						// 转化表达式
						expression = new DestructuringItemExpression(expression);
						break;

					// 如果是可解构的表达式
					case expression instanceof DestructibleExpression:
						expression = expression.toDestructuringItem(parser, _varTag);
						break;

					// 如果是空表达式
					case expression instanceof EmptyExpression:
						continue;
					
					// 如果是二元运算表达式
					case expression instanceof BinaryExpression:
						// 如果二元运算表达式的标签是赋值符号
						if(expression.context.tag instanceof BasicAssignmentTag){
							// 如果二元表达式左侧不是解构表达式
							if(expression.left instanceof DestructuringExpression === false){
								// 转化表达式
								expression = new DefaultDestructuringItemExpression(expression, parser.statements);
								break;
							}
						}

						// 报错
						this.throwError(parser, expression);
						return;

					// 如果是拓展表达式
					case expression instanceof SpreadExpression:
						// 如果不是数组最后一项
						if(i !== j - 1){
							// 报错
							this.throwError(parser, expression, "REST_ELEMENT");
							return;
						}

						// 如果是可赋值的表达式，即 标识符 或 属性访问器
						if(expression.operand instanceof AssignableExpression){
							// 如果已经被收集到常量内
							if(this.collectedBy(parser, expression.operand, _varTag)){
								return;
							}

							// 转化表达式
							expression = new ArrayRestDestructuringItemExpression(expression);
							break;
						}

						// 报错
						this.throwError(parser, expression.operand);
						return;

					default:
						// 报错
						this.throwError(parser, expression);
						return;
				}

				// 重新设置表达式
				inner[i] = inner.latest = expression;
			}
		};


		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 如果有拓展符且需要编译
			if(this.spread && ECMAScriptConfig.es6Base){
				// 追加拓展项合并方法字符串
				contentBuilder.appendString(
					"(Rexjs.SpreadItem.combineBy("
				);

				// 调用父类方法
				super.extractTo(contentBuilder);

				// // 追加拓展项合并方法的结束小括号
				contentBuilder.appendString(
					"))"
				);
				return;
			}

			// 调用父类方法
			super.extractTo(contentBuilder);
		};

		/**
		 * 转换为解构表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {VarTag} _varTag - 声明标签，一旦提供该参数，如果是声明解构且变量名没有被收集，那么会自动进行收集
		 * @returns {Expression}
		 */
		toDestructuring(parser, _varTag){
			// 转换内部表达式
			this.convert(parser, _varTag);
			return new ArrayDestructuringExpression(this);
		};
		
		/**
		 * 转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {VarTag} _varTag - 声明标签，一旦提供该参数，如果是声明解构且变量名没有被收集，那么会自动进行收集
		 * @returns {Expression}
		 */
		toDestructuringItem(parser, _varTag){
			let { inner } = this, expression = new ArrayDestructuringItemExpression(this);

			// 如果需要编译 而且 长度大于 1（长度为 0 不解析，长度为 1，只需取一次对象，所以都不需要生成变量名）
			if(ECMAScriptConfig.es6Base && inner.length > 1){
				// 设置变量名
				this.setVariableOf(expression, parser.statements);
			}

			// 转换内部表达式
			this.convert(parser, _varTag);
			return expression;
		};
	};
}();