import { IncrementTag } from "./increment-tag";

export let IncrementSiblingTag = function(){
	/**
	 * 相邻的前置递增标签
	 * @param {Number} _type - 标签类型
	 */
	return class IncrementSiblingTag extends IncrementTag {
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 * @returns {void}
		 */
		extractTo(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		};
	};
}();