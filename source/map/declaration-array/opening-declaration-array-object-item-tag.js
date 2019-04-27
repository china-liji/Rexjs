import { OpeningDeclarationObjectTag } from "../declaration-object/opening-declaration-object-tag";
import { ClosingDeclarationArrayObjectItemTag } from "./closing-declaration-array-object-item-tag";

export let OpeningDeclarationArrayObjectItemTag = function(closingDeclarationArrayObjectItemTag){
    /**
	 * 对象声明数组项（即数组声明解构中，所嵌套的对象解构）起始标签
	 * @param {Number} _type - 标签类型
	 */
    return class OpeningDeclarationArrayObjectItemTag extends OpeningDeclarationObjectTag {
        /**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
         * @returns {SyntaxTag}
		 */
		get binding(){
			return closingDeclarationArrayObjectItemTag;
        };
        
		/**
		 * 获取拥有该对象的表达式
		 * @param {Statement} statement - 当前语句
         * @returns {Expression}
		 */
		getObjectOf(statement){
			return statement.target.expression.arrayOf;
		};
    };
}(
    // closingDeclarationArrayObjectItemTag
    new ClosingDeclarationArrayObjectItemTag()
);