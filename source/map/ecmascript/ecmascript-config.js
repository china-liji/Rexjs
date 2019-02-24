export let ECMAScriptConfig = function(){
	/**
	 * ECMAScript 的编译配置，用于管理是否编译指定表达式
	 */
	return class ECMAScriptConfig {
		/**
		 * es6 基础语法是否编译
		 * @type {Boolean}
		 */
		static es6Base = true;

		/**
		 * es6 模块语法是否编译
		 * @type {Boolean}
		 */
		static es6Module = true;

		/**
		 * rexjs 特殊语法是否编译
		 * @type {Boolean}
		 */
		static rexjs = true;

		/**
		 * jsx 语法是否编译
		 * @type {Boolean}
		 */
		static jsx = true;
	};
}();