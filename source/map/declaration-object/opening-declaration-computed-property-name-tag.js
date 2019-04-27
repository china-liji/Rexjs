import { OpeningComputedPropertyNameTag } from "../property-name/opening-computed-property-name-tag";
import { ClosingDeclarationComputedPropertyNameTag } from "./closing-declaration-computed-property-name-tag";

export let OpeningDeclarationComputedPropertyNameTag = function(closingDeclarationComputedPropertyNameTag){
	/**
	 * 起始计算式属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningDeclarationComputedPropertyNameTag extends OpeningComputedPropertyNameTag {
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return closingDeclarationComputedPropertyNameTag;
		};
	};
}(
    // closingDeclarationComputedPropertyNameTag
    new ClosingDeclarationComputedPropertyNameTag()
);