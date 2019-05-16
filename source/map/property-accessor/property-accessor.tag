import { WordPropertyNameTag } from "../property-name/word-property-name.tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";
import { FunctionExpression } from "../function/function.expr";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";

export let PropertyAccessorTag = function(){
	/**
	 * 对象属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	return class PropertyAccessorTag extends WordPropertyNameTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.ACCESSOR_PROPERTY_NAME;

		/**
		 * 常量声明时的错误类型
		 * @type {String}
		 */
		errorType = "";

		/**
		 * 最大参数长度
		 * @type {Number}
		 */
		maxArgs = 0;

		/**
		 * 最小参数长度
		 * @type {Number}
		 */
		minArgs = 0;

		/**
		 * 核对表达式是否为满足条件的函数表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Expression} expression - 需要核对的表达式
		 * @param {Context} context- 当前解析内容的上下文
		 * @returns {Boolean}
		 */
		checkFunction(parser, expression, context){
			// 如果是函数表达式
			if(expression instanceof FunctionExpression){
				let { length } = expression.arguments.inner;
				
				switch(true){
					// 如果长度小于最小参数长度
					case length < this.minArgs:
						// 报错
						parser.error(
							(
								expression.arguments.inner[this.minArgs] || expression.arguments
							)
							.context,
							ECMAScriptErrors[this.errorType]
						);
						break;

					// 如果长度大于最大参数长度
					case length > this.maxArgs:
						// 报错
						parser.error(
							(
								expression.arguments.inner[this.maxArgs] || expression.arguments
							)
							.context,
							ECMAScriptErrors[this.errorType]
						);
						break;

					default:
						return true;
				}
			}
			else {
				// 报错
				parser.error(context);
			}
			
			return false;
		};
		
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.propertyAccessorContextTags;
		};

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			// 设置表达式的 accessor 属性，记录 context
			statement.expression.accessor = context;

			// 调用父类方法
			super.visitor(parser, context, statement, statements);
		};
	};
}();