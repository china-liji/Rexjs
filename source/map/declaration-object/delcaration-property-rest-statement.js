import { SpreadStatement } from "../spread-operator/spread-statement";

export let DeclarationPropertyRestStatement = function(){
    /**
	 * 变量声明省略项拓展语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
    return class DeclarationPropertyRestStatement extends SpreadStatement {
        /**
		 * 跳出该语句
         * @returns {Expression}
		 */
		out(){
			return super.out(this).value;
		};
    };
}();