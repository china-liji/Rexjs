// 标记标签相关
!function(){

this.LabelledExpression = function(){
	/**
	 * 标记表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function LabelledExpression(context){
		Expression.call(this, context);
	};
	LabelledExpression = new Rexjs(LabelledExpression, Expression);

	LabelledExpression.props({
		contextGeneratorIfNeedCompile: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果不存在需要编译的生成器
			if(this.contextGeneratorIfNeedCompile === null){
				// 追加标签名
				contentBuilder.appendContext(this.context);
				// 追加冒号
				contentBuilder.appendString(":");
			}
			
			// 提取语句表达式内容
			this.statementExpression.extractTo(contentBuilder);
		},
		statementExpression: null
	});
	
	return LabelledExpression;
}();

this.LabelledStatement = function(){
	/**
	 * 标记语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function LabelledStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	LabelledStatement = new Rexjs(LabelledStatement, ECMAScriptStatement);
	
	LabelledStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 statementExpression
			this.out().statementExpression = this.expression
		}
	});
	
	return LabelledStatement;
}();

this.LabelTag = function(VariableTag){
	/**
	 * 标记标签
	 * @param {Number} _type - 标签类型
	 */
	function LabelTag(_type){
		VariableTag.call(this, _type);
	};
	LabelTag = new Rexjs(LabelTag, VariableTag);
	
	LabelTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.labelContextTags;
		}
	});
	
	return LabelTag;
}(
	this.VariableTag
);

this.LabelColonTag = function(ColonTag, LabelledExpression, LabelledStatement){
	/**
	 * 标记冒号标签
	 * @param {Number} _type - 标签类型
	 */
	function LabelColonTag(_type){
		ColonTag.call(this, _type);
	};
	LabelColonTag = new Rexjs(LabelColonTag, ColonTag);
	
	LabelColonTag.props({
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
			statement.expression = new LabelledExpression(statement.expression.context);
			// 设置当前语句
			statements.statement = new LabelledStatement(statements);
		}
	});
	
	return LabelColonTag;
}(
	this.ColonTag,
	this.LabelledExpression,
	this.LabelledStatement
);

}.call(
	this
);