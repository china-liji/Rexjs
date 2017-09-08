// yield 表达式相关
!function(TerminatedFlowExpression, SingleStatement, ReturnTag, config){

this.YieldTag = function(visitor){
	/**
	 * yield 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function YieldTag(_type){
		ReturnTag.call(this, _type);
	};
	YieldTag = new Rexjs(YieldTag, ReturnTag);

	YieldTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(config.value ? "return" : content);
		},
		/**
		 * 从相关生成器中获取当前所需使用的生成器索引值
		 * @param {GeneratorExpression} generatorExpression - 相关生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 */
		getCurrentIndexBy: function(generatorExpression){
			return generatorExpression.nextIndex();
		},
		/**
		 * 从相关生成器中获取下一次所需使用的生成器索引值
		 * @param {GeneratorExpression} generatorExpression - 相关生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 */
		getNextIndexBy: function(generatorExpression){
			return generatorExpression.index;
		},
		regexp: /yield/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果在生成器内
			if(statements.contextGenerator){
				// 调用父类方法
				visitor.call(this, parser, context, statement, statements);
				return;
			}

			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("ILLEGAL_STATEMENT", context.content)
			);
		}
	});

	return YieldTag;
}(
	ReturnTag.prototype.visitor
);

}.call(
	this,
	this.TerminatedFlowExpression,
	this.SingleStatement,
	this.ReturnTag,
	// config
	ECMAScriptConfig.generator
);