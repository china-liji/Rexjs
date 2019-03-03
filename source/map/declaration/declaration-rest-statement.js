import { SpreadStatement } from "../spread-operator/spread-statement";

export let DeclarationRestStatement = function(){
	/**
	 * 变量声明省略项拓展语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	return class DeclarationRestStatement extends SpreadStatement {
		/**
		 * 跳出该语句
		 * @returns {Expression}
		 */
		out(){
			return super.out().origin;
		};
	};
}();