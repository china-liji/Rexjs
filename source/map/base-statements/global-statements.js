import Rexjs from "../core/index";
import { ECMAScriptStatements } from "../ecmascript/ecmascript-statements";
import { ECMAScriptVariableCollections } from "../ecmascript/ecmascript-variable-collections";

export let GlobalStatements = function({ VariableIndex }){
	return class GlobalStatements extends ECMAScriptStatements {
		/**
		 * 全局语句块
		 */
		constructor(){
			super(
				null,
				new ECMAScriptVariableCollections(
					new VariableIndex()
				)
			);
		};

		/**
		 * 获取当前上下文中的生成器
		 * @returns {Generator}
		 */
		get contextGenerator(){
			return null;
		};

		/**
		 * 获取当前上下文中需要编译的生成器
		 * @returns {Generator}
		 */
		get contextGeneratorIfNeedCompile(){
			return null;
		};
	};
}(
	Rexjs
);