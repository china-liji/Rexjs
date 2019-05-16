import { CommaTag } from "../comma/comma.tag";
import { ForInitConditionSeparatorStatement } from "./for-init-condition-separator.stmt";

export let ForInitConditionItemSeparatorTag = function(){
	/**
	 * for 循环初始化条件项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	return class ForInitConditionItemSeparatorTag extends CommaTag {
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {Statement}
		 */
		getBoundStatement(statements){
			return new ForInitConditionSeparatorStatement(statements);
		};
	};
}();