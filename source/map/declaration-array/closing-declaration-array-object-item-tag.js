import { ClosingDeclarationObjectTag } from "../declaration-object/closing-declaration-object-tag";

export let ClosingDeclarationArrayObjectItemTag = function(){
    /**
	 * 对象声明数组项（即数组声明解构中，所嵌套的对象解构）结束标签
	 * @param {Number} _type - 标签类型
	 */
    return class ClosingDeclarationArrayObjectItemTag extends ClosingDeclarationObjectTag {
        /**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
         * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.declarationArrayItemSeparatorTags;
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