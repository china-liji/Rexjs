export let ParserConfig = function(){
	/**
	 * 解析器配置，用于管理是否编译指定表达式
	 */
	return class ParserConfig {
		/**
		 * es6 基础语法是否编译
		 * @type {Boolean}
		 */
		es6Base = true;

		/**
		 * es6 基础语法是否编译
		 * @type {Boolean}
		 */
		es6Module = true;

		/**
		 * es6 基础语法是否编译
		 * @type {Boolean}
		 */
		rexjs = true;

		/**
		 * es6 基础语法是否编译
		 * @type {Boolean}
		 */
		jsx = true;
	};
}();