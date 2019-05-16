import { PropertyAccessorTag } from "./property-accessor.tag";

export let GetTag = function(){
	/**
	 * 对象属性访问器 get 标签
	 * @param {Number} _type - 标签类型
	 */
	return class GetTag extends PropertyAccessorTag {
		/**
		 * 常量声明时的错误类型
		 * @type {String}
		 */
		errorType = "GETTER";

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /get/;
	};
}();