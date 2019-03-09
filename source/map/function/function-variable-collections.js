import { ECMAScriptVariableCollections } from "../ecmascript/ecmascript-variable-collections";

export let FunctionVariableCollections = function(){
	return class FunctionVariableCollections extends ECMAScriptVariableCollections {
		/**
		 * 函数变量名收集器集合
		 * @param {ECMAScriptVariableCollections} prevCollections - 可参考上一个收集器集合
		 */
		constructor(prevCollections){
			super(prevCollections.index, prevCollections);
		};

		/**
		 * 初始化声明变量名
		 * @param {ECMAScriptVariableCollections} prevCollections - 可参考上一个收集器集合
		 * @returns {void}
		 */
		initDeclaration(prevCollections){
			this.declaration = prevCollections.declaration;
		};
	};
}();