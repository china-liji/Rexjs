import { LocalVariableTag } from "./local-variable.tag";

export let ConstantVariableTag = function(){
	/**
	 * 局部内变量标签
	 * @param {Number} _type - 标签类型
	 */
	return  class ConstantVariableTag extends LocalVariableTag {
		/**
		 * 收集变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		collectTo(parser, context, statements){
			// 调用父类方法
			if(super.collectTo(parser, context, statements)){
				// 收集变量名
				statements.collections.const.collect(context.content);
				return true;
			}
			
			return false;
		}
	};
}();