import { AssignmentTag } from "./assignment-tag";

export let BasicAssignmentTag = function(){
	/**
	 * 二元基础赋值运算符“等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	return class BasicAssignmentTag extends AssignmentTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /=/;
	};
}();