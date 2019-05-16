import { ForConditionSeparatorTag } from "./for-condition-separator.tag";
import { ForFinalConditionStatement } from "./for-final-condition.stmt";

export let ForLogicConditionSeparatorTag = function(){
	/**
	 * for 循环条件中逻辑语句的分号标签，即 for 循环条件的第二个分号标签
	 * @param {Number} _type - 标签类型
	 */
	return class ForLogicConditionSeparatorTag extends ForConditionSeparatorTag {
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {Statement}
		 */
		getBoundStatement(statements){
			return new ForFinalConditionStatement(statements);
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.expressionTags;
		};
	};
}();