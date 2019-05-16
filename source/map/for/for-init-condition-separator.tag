import { ForConditionSeparatorTag } from "./for-condition-separator.tag";
import { ForLogicConditionStatement } from "./for-logic-condition.stmt";

export let ForInitConditionSeparatorTag = function(){
	/**
	 * for 循环条件中初始化语句的分隔符标签，即 for 循环条件的第一个分号标签
	 * @param {Number} _type - 标签类型
	 */
	return class ForInitConditionSeparatorTag extends ForConditionSeparatorTag {
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {Statement}
		 */
		getBoundStatement(statements){
			return new ForLogicConditionStatement(statements);
		};
	};
}();