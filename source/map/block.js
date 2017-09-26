// 语句块相关
!function(closeBlockTag){

this.BlockVariableCollections = function(ECMAScriptVariableCollections){
	/**
	 * 块级区域变量名收集器集合
	 * @param {ECMAScriptVariableCollections} prevCollections - 可参考上一个收集器集合
	 */
	function BlockVariableCollections(prevCollections){
		ECMAScriptVariableCollections.call(this, prevCollections.index, prevCollections);
	};
	BlockVariableCollections = new Rexjs(BlockVariableCollections, ECMAScriptVariableCollections);

	BlockVariableCollections.props({
		/**
		 * 初始化 rex 临时变量名
		 * @param {ECMAScriptVariableCollections} prevCollections - 可参考上一个收集器集合
		 */
		initRex: function(prevCollections){
			this.rex = prevCollections.rex;
		}
	});

	return BlockVariableCollections;
}(
	this.ECMAScriptVariableCollections
);

this.BlockExpression = function(extractTo){
	/**
	 * 语句块表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function BlockExpression(open, statements){
		PartnerExpression.call(this, open);

		this.contextGeneratorIfNeedCompile = statements.contextGeneratorIfNeedCompile;
	};
	BlockExpression = new Rexjs(BlockExpression, PartnerExpression);
	
	BlockExpression.props({
		contextGeneratorIfNeedCompile: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果存在需要编译的生成器
			if(this.contextGeneratorIfNeedCompile){
				// 直接提取 inner
				this.inner.extractTo(contentBuilder);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置表达式状态
		 */
		set state(value){}
	});
	
	return BlockExpression;
}(
	PartnerExpression.prototype.extractTo
);

this.BlockBodyStatements = function(ECMAScriptStatements, BraceBodyStatement, BlockVariableCollections){
	/**
	 * 语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 */
	function BlockBodyStatements(target){
		ECMAScriptStatements.call(
			this,
			target,
			new BlockVariableCollections(target.collections)
		);

		this.closure = target.closure;
	};
	BlockBodyStatements = new Rexjs(BlockBodyStatements, ECMAScriptStatements);
	
	BlockBodyStatements.props({
		/**
		 * 声明变量名
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		declareTo: function(){},
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new BraceBodyStatement(this);
		},
		scope: ECMAScriptStatements.SCOPE_BLOCK
	});
	
	return BlockBodyStatements;
}(
	this.ECMAScriptStatements,
	this.BraceBodyStatement,
	this.BlockVariableCollections
);

this.OpenBlockTag = function(OpenBraceTag, BlockExpression, BlockBodyStatements, BlockVariableCollections){
	/**
	 * 起始语句块标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenBlockTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenBlockTag = new Rexjs(OpenBlockTag, OpenBraceTag);
	
	OpenBlockTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeBlockTag;
		},
		/**
		 * 获取绑定的语句块，一般在子类使用父类逻辑，而不使用父类语句块的情况下使用
		 * @param {Statements} statements - 当前语句块
		 */
		getBoundStatements: function(statements){
			return new BlockBodyStatements(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式
			statement.expression = new BlockExpression(context, statements);
			// 设置当前语句块
			parser.statements = this.getBoundStatements(statements);
		}
	});
	
	return OpenBlockTag;
}(
	this.OpenBraceTag,
	this.BlockExpression,
	this.BlockBodyStatements,
	this.BlockVariableCollections
);

this.CloseBlockTag = function(CloseBraceTag){
	/**
	 * 结束语句块标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseBlockTag(_type){
		CloseBraceTag.call(this, _type);
	};
	CloseBlockTag = new Rexjs(CloseBlockTag, CloseBraceTag);
	
	CloseBlockTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 close
			statement.expression.close = context;
		}
	});
	
	return CloseBlockTag;
}(
	this.CloseBraceTag
);

closeBlockTag = new this.CloseBlockTag();

}.call(
	this,
	// closeBlockTag
	null
);