// 特殊的二元标签
!function(BinaryTag, AssignableExpression, IdentifierExpression, VariableDeclarationTag){

this.AssignmentTag = function(BinaryExpression, BinaryStatement, isSeparator, assignable){
	/**
	 * 二元赋值运算符标签
	 * @param {Number} _type - 标签类型
	 */
	function AssignmentTag(_type){
		BinaryTag.call(this, _type);
	};
	AssignmentTag = new Rexjs(AssignmentTag, BinaryTag);

	AssignmentTag.props({
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 */
		isSeparator: function(context){
			// 如果是父类确定的分隔符，但不是箭头符号，那么它就是赋值标签所认定的分隔符
			return isSeparator.call(this, context) && context.content !== "=>";
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			switch(true){
				// 如果可赋值
				case assignable(parser, expression):
					var binaryExpression = this.toExpression(context, expression);

					// 设置当前表达式并将最后的二元表达式为自己
					statement.expression = binaryExpression.last = binaryExpression;
					break;

				// 如果表达式是二元表达式
				case expression instanceof BinaryExpression:
					var last = expression.last, right = last.right;

					// 如果该二元表达式是“赋值表达式”，而且其值也是“可赋值表达式”
					if(last.context.tag.precedence === 0 && assignable(parser, right)){
						// 设置右侧表达式及记录为最后一个二元表达式
						last.right = expression.last = this.toExpression(context, right);
						break;
					}

				default:
					// 报错
					parser.error(context, ECMAScriptErrors.ASSIGNMENT, true);
					return;
			}

			// 设置当前语句
			statements.statement = new BinaryStatement(statements);
		}
	});
	
	return AssignmentTag;
}(
	this.BinaryExpression,
	this.BinaryStatement,
	BinaryTag.prototype.isSeparator,
	// assignable
	function(parser, expression){
		// 如果是赋值表达式
		if(expression instanceof AssignableExpression){
			// 如果是标识符表达式，那么需要验证是否为常量赋值
			if(expression instanceof IdentifierExpression){
				var ctx = expression.context, tag = ctx.tag;

				switch(true){
					// 如果当前是声明变量名标签，则不判断是否被收集，因为在声明中，已经判断，再判断的话，100% 由于重复定义，而报错
					case tag instanceof VariableDeclarationTag:
						break;

					// 如果已经被收集，会导致报错
					case tag.collected(parser, ctx, parser.statements):
						return false;
				}
			}

			return true;
		}

		return false;
	}
);

this.BinaryKeywordTag = function(){
	/**
	 * 二元关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryKeywordTag(_type){
		BinaryTag.call(this, _type);
	};
	BinaryKeywordTag = new Rexjs(BinaryKeywordTag, BinaryTag);

	BinaryKeywordTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
			// 追加空格
			contentBuilder.appendSpace();
		}
	});
	
	return BinaryKeywordTag;
}();

}.call(
	this,
	this.BinaryTag,
	this.AssignableExpression,
	this.IdentifierExpression,
	this.VariableDeclarationTag
);