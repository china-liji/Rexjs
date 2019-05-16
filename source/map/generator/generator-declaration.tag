import { GeneratorTag } from "./generator.tag";

export let GeneratorDeclarationTag = function(){
	/**
	 * 生成器声明标签
	 * @param {Number} _type - 标签类型
	 */
	return class GeneratorDeclarationTag extends GeneratorTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.functionDeclarationStarContextTags;
		};
	};
}();