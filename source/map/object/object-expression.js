import { DestructibleExpression } from "../destructuring/destructible-expression";
import { LiteralPropertyNameExpression } from "../property-name/literal-property-name-expression";
import { PropertyInitializerExpression } from "../property-value/property-initializer-expression";
import { PropertyDefaultDestructuringItemExpression } from "../property-destructuring/property-default-destructuring-item-expression";
import { PropertyDestructuringItemExpression } from "../property-destructuring/property-destructuring-item-expression";
import { ComputedPropertyNameExpression } from "../property-name/computed-property-name-expression";
import { AssignableExpression } from "../base-expression/assignable-expression";
import { BinaryExpression } from "../binary-operator/binary-expression";
import { BasicAssignmentTag } from "../assignment-operator/basic-assignment-tag";
import { DestructuringExpression } from "../destructuring/destructuring-expression";
import { ShorthandMethodExpression } from "../property-name/shorthand-method-expression";
import { SpreadExpression } from "../spread-operator/spread-expression";
import { PropertyRestDestructuringItemExpression } from "../property-destructuring/property-rest-destructuring-item-expression";
import { ContentBuilder } from "../core";
import { ObjectDestructuringExpression } from "./object-destructuring-expression";
import { ObjectDestructuringItemExpression } from "./object-destructuring-item-expression";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";

export let ObjectExpression = function(compileItem){
	/**
	 * 对象表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	return class ObjectExpression extends DestructibleExpression {
		/**
		 * 是否需要进一步编译该对象表达式
		 * @type {Boolean}
		 */
		needCompile = false;

		/**
		 * 临时变量名
		 * @type {String}
		 */
		variable = "";

		/**
		 * 将对象每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {VarTag} _varTag - 声明标签，一旦提供该参数，如果是声明解构且变量名没有被收集，那么会自动进行收集
		 * @returns {void}
		 */
		convert(parser, _varTag){
			let { inner } = this;

			// 遍历
			for(let i = inner.min, j = inner.length;i < j;i++){
				let expression = inner[i], { name, value } = expression, { operand } = value;

				// 判断属性名
				switch(true){
					// 如果是字面量属性名
					case name instanceof LiteralPropertyNameExpression:
						// 如果是简写属性 或者 如果是简写属性默认值表达式
						if(!operand || value instanceof PropertyInitializerExpression){
							// 如果已经被收集到常量内
							if(this.collectedBy(parser, name, _varTag, true)){
								return;
							}

							// 转化表达式
							expression = (
								operand ?
									new PropertyDefaultDestructuringItemExpression(expression, expression, parser.statements) :
									new PropertyDestructuringItemExpression(expression)
							);
							break;
						}

					// 如果是计算式属性名
					case name instanceof ComputedPropertyNameExpression:
						// 判断属性值，这里一定会对应上面的属性名判断，因为在匹配标签上下文的时候，就已经保护了表达式的正确性
						switch(true){
							// 如果是可赋值的属性值
							case operand instanceof AssignableExpression:
								// 如果已经被收集到常量内
								if(this.collectedBy(parser, operand, _varTag)){
									return;
								}

								// 转化表达式
								expression = new PropertyDestructuringItemExpression(expression);
								break;

							// 如果是二元表达式
							case operand instanceof BinaryExpression:
								// 如果二元运算表达式的标签是赋值符号
								if(operand.context.tag instanceof BasicAssignmentTag){
									// 如果二元表达式左侧不是解构表达式
									if(!(operand.left instanceof DestructuringExpression)){
										// 转化表达式
										expression = new PropertyDefaultDestructuringItemExpression(expression, operand, parser.statements);
										break;
									}
								}

								// 报错
								this.throwError(parser, operand);
								return;

							// 如果是可解构的表达式
							case operand instanceof DestructibleExpression:
								// 表明是嵌套解构子项
								value.destructuringItem = true;
								// 转化为解构子项
								value.operand = operand.toDestructuringItem(parser, _varTag);

								// 转化表达式
								expression = new PropertyDestructuringItemExpression(expression);
								break;

							// 如果是简写表达式
							case operand instanceof ShorthandMethodExpression:
								// 报错
								this.throwError(parser, expression.accessible ? name : operand.arguments);
								return;

							default:
								// 报错
								this.throwError(parser, operand);
								return;
						}

						break;

					// 如果是拓展表达式
					case value instanceof SpreadExpression:
						// 如果不是对象最后一项
						if(i !== j - 1){
							// 报错
							this.throwError(parser, expression, "REST_ELEMENT");
							return;
						}

						// 如果是可赋值的属性值
						if(operand instanceof AssignableExpression){
							// 如果已经被收集到常量内
							if(this.collectedBy(parser, operand, _varTag)){
								return;
							}

							// 转化表达式
							expression = new PropertyRestDestructuringItemExpression(expression);
							break;
						}

						// 报错
						this.throwError(parser, operand);
						return;

					default:
						// 报错
						this.throwError(parser, name);
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
			let { variable } = this;

			// 如果存在变量名，说明需要分步设置属性
			if(this.needCompile){
				let anotherBuilder = new ContentBuilder();

				// 追加临时变量名
				anotherBuilder.appendString(variable);
				// 追加临时变量名赋值代码
				contentBuilder.appendString("(" + variable + "={},");
				// 编译内容
				this.inner.forEach(compileItem, contentBuilder, anotherBuilder);
				// 追加结束小括号
				contentBuilder.appendString(variable + ")");
				return;
			}

			// 如果要将该对象用临时变量名记录
			if(variable){
				// 追加变量名赋值代码
				contentBuilder.appendString("(" + variable + "=");
				// 调用父类方法
				super.extractTo(contentBuilder);
				// 追加结束小括号
				contentBuilder.appendString(")");
				return;
			}

			// 调用父类方法
			super.extractTo(contentBuilder);
		};
		
		/**
		 * 转换为解构表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @returns {Expression}
		 */
		toDestructuring(parser, _varTag){
			// 转换内部表达式
			this.convert(parser, _varTag);
			return new ObjectDestructuringExpression(this);
		};

		/**
		 * 转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @returns {Expression}
		 */
		toDestructuringItem(parser, _varTag){
			let { inner } = this, expression = new ObjectDestructuringItemExpression(this);

			// 如果需要解析 而且 长度大于 1（长度为 0 不解析，长度为 1，只需取一次对象，所以都不需要生成变量名）
			if(ECMAScriptConfig.es6Base && inner.length > 1){
				// 设置变量名
				this.setVariableOf(expression, parser.statements);
			}

			// 转换内部表达式
			this.convert(parser, _varTag);
			return expression;
		};
	};
}(
	// compileItem
	(item, contentBuilder, anotherBuilder) => {
		item.compileTo(contentBuilder, anotherBuilder);
	}
);