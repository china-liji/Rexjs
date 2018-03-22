// 语句块相关
!function(Statements){

this.ECMAScriptVariableCollections = function(VariableCollections, VariableCollection){
	/**
	 * 变量名收集器集合
	 * @param {VariableIndex} index - 变量名索引
	 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
	 */
	function ECMAScriptVariableCollections(index, _prevCollections){
		VariableCollections.call(this, index);

		this.initBlackList(_prevCollections);
		this.initConst(_prevCollections);
		this.initDeclaration(_prevCollections);
		this.initRex(_prevCollections);
	};
	ECMAScriptVariableCollections = new Rexjs(ECMAScriptVariableCollections, VariableCollections);

	ECMAScriptVariableCollections.$({
		blacklist: NULL,
		const: NULL,
		declaration: NULL,
		/**
		 * 生成一个临时变量名，并记搜集到 rex 变量名集合中
		 */
		generate: function(){
			var variable = this.provide();

			this.rex.collect(variable);
			return variable;
		},
		/**
		 * 初始化黑名单变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initBlackList: function(){
			this.blacklist = new VariableCollection();
		},
		/**
		 * 初始化常量变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initConst: function(){
			this.const = new VariableCollection();
		},
		/**
		 * 初始化声明变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initDeclaration: function(){
			this.declaration = new VariableCollection();
		},
		/**
		 * 初始化 rex 临时变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initRex: function(){
			this.rex = new VariableCollection();
		},
		rex: NULL
	});

	return ECMAScriptVariableCollections;
}(
	Rexjs.VariableCollections,
	Rexjs.VariableCollection
);

this.ECMAScriptStatements = function(ECMAScriptStatement, extractTo){
	/**
	 * ECMAScript 语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 * @param {ECMAScriptVariableCollections} collections - 变量名收集器集合
	 */
	function ECMAScriptStatements(target, collections){
		Statements.call(this, target);

		// 初始化变量名集合
		this.collections = collections;
	};
	ECMAScriptStatements = new Rexjs(ECMAScriptStatements, Statements);

	ECMAScriptStatements.$({
		closure: NULL,
		collections: NULL,
		/**
		 * 获取当前上下文中的生成器
		 */
		get contextGenerator(){
			var closure = this.closure;

			// 如果闭包存在，则返回 contextGenerator
			return closure ? closure.contextGenerator : NULL;
		},
		/**
		 * 获取当前上下文中需要编译的生成器
		 */
		get contextGeneratorIfNeedCompile(){
			var closure = this.closure;

			// 如果闭包存在，则返回 contextGeneratorIfNeedCompile
			return closure ? closure.contextGeneratorIfNeedCompile : NULL;
		},
		/**
		 * 声明变量名
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		declareTo: function(contentBuilder){
			// 添加临时变量名
			contentBuilder.appendString(
				this.collections.rex.toString("var ", ",", ";")
			);
		},
		/**
		 * 提取语句块文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 插入变量名
			this.declareTo(contentBuilder);
			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new ECMAScriptStatement(this);
		},
		/**
		 * 获取当前上下文中严格意义上的生成器
		 */
		get strictContextGenerator(){
			return this.contextGenerator;
		}
	});

	return ECMAScriptStatements;
}(
	this.ECMAScriptStatement,
	Statements.prototype.extractTo
);

this.GlobalStatements = function(ECMAScriptStatements, ECMAScriptVariableCollections, VariableIndex){
	/**
	 * 全局语句块
	 */
	function GlobalStatements(){
		ECMAScriptStatements.call(
			this,
			NULL,
			new ECMAScriptVariableCollections(
				new VariableIndex()
			)
		);
	};
	GlobalStatements = new Rexjs(GlobalStatements, ECMAScriptStatements);

	GlobalStatements.$({
		/**
		 * 获取当前上下文中的生成器
		 */
		get contextGenerator(){
			return NULL;
		},
		/**
		 * 获取当前上下文中需要编译的生成器
		 */
		get contextGeneratorIfNeedCompile(){
			return NULL;
		}
	});

	return GlobalStatements;
}(
	this.ECMAScriptStatements,
	this.ECMAScriptVariableCollections,
	Rexjs.VariableIndex
);

}.call(
	this,
	Rexjs.Statements
);