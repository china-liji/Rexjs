import { ECMAScriptVariableCollections } from "../ecmascript/ecmascript-variable-collections";

export let BlockVariableCollections = function(){
	return class BlockVariableCollections extends ECMAScriptVariableCollections {
		/**
		 * 块级区域变量名收集器集合
		 * @param {ECMAScriptVariableCollections} prevCollections - 可参考上一个收集器集合
		 */
		constructor(prevCollections){
			super(prevCollections.index, prevCollections);
		};

		/**
		 * 初始化 rex 临时变量名
		 * @param {ECMAScriptVariableCollections} prevCollections - 可参考上一个收集器集合
		 * @returns {VariableCollection}
		 */
		initRex(prevCollections){
			this.rex = prevCollections.rex;
		};
	};
}();