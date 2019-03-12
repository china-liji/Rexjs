import { OpeningComputedPropertyNameTag } from "./opening-computed-property-name-tag";
import { ClosingComputedMethodNameTag } from "./closing-computed-method-name-tag";

export let OpeningComputedMethodNameTag = function(closingComputedPropertyNameTag){
	/**
	 * 起始计算式方法名标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningComputedMethodNameTag extends OpeningComputedPropertyNameTag {
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return closingComputedPropertyNameTag;
		};
	};
}(
	// closingComputedPropertyNameTag
	new ClosingComputedMethodNameTag()
);