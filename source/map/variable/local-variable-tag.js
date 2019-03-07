import { ClosureVariableTag } from "./closure-variable-tag";

export let LocalVariableTag = function(){
	/**
	 * 局部内变量标签
	 * @param {Number} _type - 标签类型
	 */
	return class LocalVariableTag extends ClosureVariableTag {
		/**
		 * 收集变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		collectTo(parser, context, statements){
			// 调用父类方法
			if(super.collectTo(parser, context, statements)){
				// 收集变量名
				statements.collections.blacklist.collect(context.content);
				return true;
			}
			
			return false;
		};

		/**
		 * 判断变量名，是否包含于指定收集器内
		 * @param {String} variable - 需要判断的变量名
		 * @param {ECMAScriptVariableCollections} collections - 指定的变量名集合
		 * @returns {Booelan}
		 */
		containsBy(variable, collections){
			return collections.declaration.contains(variable);
		};
	};
}();