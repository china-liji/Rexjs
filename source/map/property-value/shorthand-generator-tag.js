import { GeneratorTag } from "../generator/generator-tag";

export let ShorthandGeneratorTag = function(){
	/**
	 * 函数声明星号标签
	 * @param {Number} _type - 标签类型
	 */
	return class ShorthandGeneratorTag extends GeneratorTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.shorthandMethodNameTags;
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
			// 设置属性表达式的星号
			statement.expression.star = context;
		};
	};
}();