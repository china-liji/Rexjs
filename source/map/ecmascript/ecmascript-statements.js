import Rexjs from "../core/index";
import { ECMAScriptStatement } from "./ecmascript-statement";

export let ECMAScriptStatements = function(){
	return class ECMAScriptStatements extends Rexjs.Statements {
		/**
		 * 当前的闭包语句块
		 * @type {ECMAScriptStatements}
		 */
		closure = null;

		/**
		 * 变量名收集器
		 * @type {ECMAScriptVariableCollections}
		 */
		collections = null;
		
		/**
		 * ECMAScript 语句块
		 * @param {Statements} target - 目标语句块，即上一层语句块
		 * @param {ECMAScriptVariableCollections} collections - 变量名收集器集合
		 */
		constructor(target, collections){
			super(target);

			// 初始化变量名集合
			this.collections = collections;
		};

		/**
		 * 获取当前上下文中的生成器
		 * @returns {Generator}
		 */
		get contextGenerator(){
			let { closure } = this;

			// 如果闭包存在，则返回 contextGenerator
			return closure ? closure.contextGenerator : null;
		};

		/**
		 * 获取当前上下文中需要编译的生成器
		 * @returns {Generator}
		 */
		get contextGeneratorIfNeedCompile(){
			let { closure } = this;

			// 如果闭包存在，则返回 contextGeneratorIfNeedCompile
			return closure ? closure.contextGeneratorIfNeedCompile : null;
		};

		/**
		 * 声明变量名
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		declareTo(contentBuilder){
			// 添加临时变量名
			contentBuilder.appendString(
				this.collections.rex.toString("var ", ",", ";")
			);
		};

		/**
		 * 提取语句块文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 插入变量名
			this.declareTo(contentBuilder);
			// 调用父类方法
			super.extractTo(contentBuilder);
		};

		/**
		 * 初始化语句
		 * @returns {ECMAScriptStatement}
		 */
		initStatement(){
			return new ECMAScriptStatement(this);
		};
	};
}();