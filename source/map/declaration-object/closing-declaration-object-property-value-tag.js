import { ClosingDeclarationObjectTag } from "./closing-declaration-object-tag";

export let ClosingDeclarationObjectPropertyValueTag = function(){
    /**
	 * 对象声明属性值（即：对象解构中所嵌套的对象解构）结束标签
	 * @param {Number} _type - 标签类型
	 */
    return class ClosingDeclarationObjectPropertyValueTag extends ClosingDeclarationObjectTag {
        /**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
         * @returns {SyntaxTag}
		 */
		require(tagsMap){
			return tagsMap.declarationPropertySeparatorTags;
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
			// 调用父类访问器
			super.visitor(parser, context, statement, statements);

			// 将表达式转化为解构项
			statement.expression = statement.expression.toDestructuringItem(parser);
		};
    };
}();