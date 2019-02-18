import Rexjs from "../core/index";

export let ECMAScriptVariableCollections = function({ VariableCollections, VariableCollection }){
	return class ECMAScriptVariableCollections extends VariableCollections {
		/**
		 * 变量名黑名单集合，存在该集合中的变量名，不允许重复声明
		 * @type {VariableCollection}
		 */
		blacklist = null;

		/**
		 * 常量集合，存在该集合中的变量名，不允许非初始化赋值操作
		 * @type {VariableCollection}
		 */
		const = null;

		/**
		 * 声明集合，应记录所有被声明的变量名
		 * @type {VariableCollection}
		 */
		declaration = null;

		/**
		 * 解析中临时使用所生成的变量名集合
		 * @type {VariableCollection}
		 */
		rex = null;

		/**
		 * 变量名收集器集合
		 * @param {VariableIndex} index - 变量名索引
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		constructor(index, _prevCollections){
			super(index);

			this.initBlackList(_prevCollections);
			this.initConst(_prevCollections);
			this.initDeclaration(_prevCollections);
			this.initRex(_prevCollections);
		};

		/**
		 * 生成一个临时变量名，并记搜集到 rex 变量名集合中
		 * @returns {String}
		 */
		generate(){
			let variable = this.provide();

			this.rex.collect(variable);
			return variable;
		};

		/**
		 * 初始化黑名单变量名，即使用 let、const 的声明变量，var 声明的不在此内，因为 var 可以重复声明
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 * @returns {void}
		 */
		initBlackList(){
			this.blacklist = new VariableCollection();
		};

		/**
		 * 初始化常量变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 * @returns {void}
		 */
		initConst(){
			this.const = new VariableCollection();
		};

		/**
		 * 初始化声明变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 * @returns {void}
		 */
		initDeclaration(){
			this.declaration = new VariableCollection();
		};

		/**
		 * 初始化 rex 临时变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 * @returns {void}
		 */
		initRex(){
			this.rex = new VariableCollection();
		};
	};
}(
	Rexjs
);