import Rexjs, { PartnerExpression, ListExpression } from "../core";
import { IdentifierExpression } from "../identifier/identifier-expression";
import { EnvConstantTag } from "../env-constant/env-constant-tag";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";

export let DestructibleExpression = function({ Context }){
	return class DestructibleExpression extends PartnerExpression {
		/**
		 * 是否为声明的解构
		 * @type {Boolean}
		 */
		declaration = false;

		/**
		 * 可解构的表达式
		 * @param {Context} opening - 起始标签上下文
		 */
		constructor(opening){
			super(opening);

			this.inner = new ListExpression(null, ",");
		};

		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @returns {void}
		 */
		convert(){};

		/**
		 * 判断表达式变量名是否已经被收集
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Expression} expression - 需要判断变量名的表达式
		 * @param {VarTag} _varTag - 声明标签，一旦提供该参数，如果是声明解构且变量名没有被收集，那么会自动进行收集
		 * @param {Boolean} _asIdentifier - 是否将表达式作为标识符表达式处理
		 * @returns {Boolean}
		 */
		collectedBy(parser, expression, _varTag, _asIdentifier){
			// 如果是标识符表达式
			if(_asIdentifier || expression instanceof IdentifierExpression){
				let { context } = expression;

				// 如果是环境常量
				if(context.tag instanceof EnvConstantTag){
					// 报错
					parser.error(context);
					return false;
				}

				// 如果是声明解构且提供了声明标签
				if(this.declaration && _varTag){
					// 初始化替代的标签上下文
					context = new Context(
						_varTag,
						context.content,
						context.position
					);

					// 返回是否收集成功的对立结果（如果当前被搜集成功，那么说明之前没有被搜集）
					return !_varTag.variable.collectTo(parser, context, parser.statements);
				}

				// 判断是否收集到常量中
				return context.tag.collected(parser, context, parser.statements);
			}

			return false;
		};

		/**
		 * 根据语句块上下文给指定表达式设置变量名
		 * @param {Expression} expression - 需要设置变量名的表达式
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		setVariableOf(expression, statements){
			let { collections } = statements;

			expression.variable = (
				// 如果是 声明形式的解构赋值 而且 不存在需要编译的生成器
				this.declaration && !statements.contextGeneratorIfNeedCompile ?
					// 只需提供，不用在语句块进行定义
					collections.provide() :
					// 需要提供并定义
					collections.generate()
			);
		};

		/**
		 * 抛出错误
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Expression} expression - 相关表达式
		 * @param {String} _errorName - 指定的错误名称
		 * @returns {void}
		 */
		throwError(parser, expression, _errorName){
			parser.error(
				expression.context,
				_errorName ? ECMAScriptErrors[_errorName] : null
			);
		};

		/**
		 * 转换为解构表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @returns {Expression}
		 */
		toDestructuring(){};

		/**
		 * 转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @returns {Expression}
		 */
		toDestructuringItem(){};
	};
}(
	Rexjs
);