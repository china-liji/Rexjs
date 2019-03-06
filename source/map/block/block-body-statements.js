import { ECMAScriptStatements } from "../ecmascript/ecmascript-statements";
import { BlockVariableCollections } from "./block-variable-collections";
import { BraceBodyStatement } from "../brace/brace-body-statement";

export let BlockBodyStatements = function(){
	return class BlockBodyStatements extends ECMAScriptStatements {
		/**
		 * 闭包类型
		 */
		scope = ECMAScriptStatements.SCOPE_BLOCK;

		/**
		 * 语句块
		 * @param {Statements} target - 目标语句块，即上一层语句块
		 */
		constructor(target){
			super(
				target,
				new BlockVariableCollections(target.collections)
			);

			this.closure = target.closure;
		};

		/**
		 * 声明变量名
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		declareTo(){};

		/**
		 * 初始化语句
		 * @returns {ECMAScriptStatement}
		 */
		initStatement(){
			return new BraceBodyStatement(this);
		};
	};
}();