import { VariableTag } from "./variable.tag";
import { ECMAScriptStatements } from "../ecmascript/ecmascript.stmts";

export let VariableDeclarationTag = function(SCOPE_CLOSURE){
	/**
	 * 变量声明标签
	 * @param {Number} _type - 标签类型
	 */
	return class VariableDeclarationTag extends VariableTag {
		/**
		 * 常量声明时的错误类型
		 * @type {String}
		 */
		errorType = "REDECLARATION";

		/**
		 * 判断该变量名是否还能被定义
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 * @returns {Boolean}
		 */
		collectTo(parser, context, statements){
			let { content } = context;

			// 如果已被收集
			if(this.collected(parser, context, statements)){
				return false;
			}
			
			// 收集变量名
			statements.collections.declaration.collect(content);
			return true;
		};

		/**
		 * 判断变量名，是否包含于指定收集器内
		 * @param {String} variable - 需要判断的变量名
		 * @param {ECMAScriptVariableCollections} collections - 指定的变量名集合
		 * @returns {Array}
		 */
		containsBy(variable, collections){
			return collections.blacklist.contains(variable);
		};

		/**
		 * 获取下一个语句块
		 * @params {ECMAScriptStatements} statements - 当前语句块
		 * @returns {ECMAScriptStatements}
		 */
		nextStatementsOf(statements){
			// 如果当前语句块是闭包，那么返回 null（因为不同闭包内，可以多次声明同一变量），否则返回 target
			return (statements.scope & SCOPE_CLOSURE) === SCOPE_CLOSURE ? null : statements.target;
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
			// 收集变量名
			this.collectTo(parser, context, statements);
			// 调用父类方法
			super.visitor(parser, context, statement, statements);
		}
	};
}(
	ECMAScriptStatements.SCOPE_CLOSURE
);