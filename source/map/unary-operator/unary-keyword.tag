import { UnaryTag } from "./unary.tag";

export let UnaryKeywordTag = function(){
	/**
	 * 一元关键字标签
	 * @param {Number} _type - 标签类型
	 */
	return class UnaryKeywordTag extends UnaryTag {
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 * @returns {void}
		 */
		extractTo(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(content);
			// 追加空格
			contentBuilder.appendSpace();
		};
	};
}();