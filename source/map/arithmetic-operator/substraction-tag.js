import { BinaryTag } from "../binary-operator/binary-tag";

export let SubtractionTag = function(){
	/**
	 * 二元运算符“减号”标签
	 * @param {Number} _type - 标签类型
	 */
	return class SubtractionTag extends BinaryTag {
		/**
		 * 该二元表达式的运算优先级
		 * @type {Number}
		 */
		precedence = 9;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /-/;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntagTags}
		 */
		require(tagsMap){
			return tagsMap.negationContextTags;
		};
	};
}();