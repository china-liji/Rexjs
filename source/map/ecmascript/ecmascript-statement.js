import Rexjs from "../core/index";

export let ECMAScriptStatement = function(){
	/**
	 * ECMAScript 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	return class ECMAScriptStatement extends Rexjs.Statement {};
}();