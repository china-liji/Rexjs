import { CommaTag } from "../comma/comma-tag";
import { PropertyStatement } from "../property/property-statement";

export let PropertySeparatorTag = function(){
	/**
	 * 对象属性的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	return class PropertySeparatorTag extends CommaTag {
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement(statements){
			return new PropertyStatement(statements);
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.propertyNameTags;
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
			// 设置当前语句
			context.setStatementOf(statements);
		};
	};
}();