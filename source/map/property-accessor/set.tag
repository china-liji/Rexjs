import { PropertyAccessorTag } from "./property-accessor.tag";

export let SetTag = function(){
	/**
	 * 对象属性访问器 set 标签
	 * @param {Number} _type - 标签类型
	 */
	return class SetTag extends PropertyAccessorTag {
		/**
		 * 常量声明时的错误类型
		 * @type {String}
		 */
		errorType = "SETTER";

		/**
		 * 最大参数长度
		 * @type {Number}
		 */
		maxArgs = 1;

		/**
		 * 最小参数长度
		 * @type {Number}
		 */
		minArgs = 1;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /set/;
	};
}();