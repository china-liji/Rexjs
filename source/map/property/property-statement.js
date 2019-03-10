import { ECMAScriptStatement } from "../ecmascript/ecmascript-statement";
import { PropertyExpression } from "./property-expression";

export let PropertyStatement = function(ifComma){
	return class PropertyStatement extends ECMAScriptStatement {
		/**
		 * 该属性是否已被赋值
		 * @type {Boolean}
		 */
		assigned = false;
		
		/**
		 * 对象属性语句
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		constructor(statements){
			super(statements);

			this.initExpression();
		};

		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTags}
		 */
		catch(parser, context){
			// 如果不是结束大括号
			if(context.content !== "}"){
				// 报错
				parser.error(context);
				return null;
			}

			let { expression } = this, objectExpression = this.out();

			switch(true){
				// 如果名称不存在，说明表达式是空项
				case !expression.name:
					break;

				// 如果可能是访问器
				case expression.accessible:
					// 核对访问器函数
					expression.accessor.tag.checkFunction(parser, expression.value.operand, context);

				default:
					// 跳出语句并添加表达式
					objectExpression.inner.add(expression);
					break;
			}

			return this.bindingOf();
		};

		/**
		 * 初始化该语句的表达式
		 * @returns {Expression}
		 */
		initExpression(){
			this.expression = new PropertyExpression();
		};

		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTags}
		 */
		try(parser, context){
			switch(context.content){
				// 如果是冒号
				case ":":
				// 如果是等于号
				case "=":
					// 如果已经赋值过，即 键值对值 或 属性默认值
					if(this.assigned){
						break;
					}

					this.assigned = true;
					return null;

				// 如果是逗号
				case ",":
					return ifComma(parser, this, this.expression, context);
			}

			// 报错
			parser.error(context);
		};
	};
}(
	// ifComma
	(parser, statement, expression, context) => {
		// 如果是属性访问器
		if(expression.accessible){
			// 核对访问器函数
			expression.accessor.tag.checkFunction(
				parser,
				expression.value.operand,
				context
			);
		}

		// 跳出语句并
		statement.out().inner.add(expression);
		// 返回分隔符标签
		return statement.tagOf().separator;
	}
);