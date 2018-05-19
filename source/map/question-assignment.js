// 疑问赋值表达式
!function(ShorthandAssignmentTag){

this.QuestionAssignmentExpression = function(BinaryExpression){
	/**
	 * 疑问赋值达式
	 * @param {Context} context - 语法标签上下文
	 * @param {String} variable - 临时变量名
	 */
	function QuestionAssignmentExpression(context, variable){
		BinaryExpression.call(this, context);

		this.variable = variable;
	};
	QuestionAssignmentExpression = new Rexjs(QuestionAssignmentExpression, BinaryExpression);

	QuestionAssignmentExpression.$({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var variable = this.variable;

			// 追加临时变量赋值操作
			contentBuilder.appendString("((" + variable + "=");
			// 提取右侧表达式，作为临时变量的值
			this.right.extractTo(contentBuilder);
			// 追加三元运算符的判断条件
			contentBuilder.appendString(")!==void 0?");
			// 在三元表达式的成立条件部分，提取左侧表达式
			this.left.extractTo(contentBuilder);
			// 在三元表达式的成立条件部分，给左侧表达式赋值；并在否定条件部分直接返回该临时变量
			contentBuilder.appendString("=" + variable + ":" + variable + ")");
		}
	});

	return QuestionAssignmentExpression;
}(
	this.BinaryExpression
);

this.QuestionAssignmentTag = function(QuestionAssignmentExpression, visitor){
	/**
	 * 疑问赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function QuestionAssignmentTag(_type){
		ShorthandAssignmentTag.call(this, _type);
	};
	QuestionAssignmentTag = new Rexjs(QuestionAssignmentTag, ShorthandAssignmentTag);

	QuestionAssignmentTag.$({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new QuestionAssignmentExpression(
				context,
				// 生成临时变量名
				statement.statements.collections.generate()
			);
		},
		regexp: /\?=/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果需要编译
			if(config.rexjs){
				// 调用父类方法
				visitor.call(this, parser, context, statement, statements);
				return;
			}

			// 报错
			parser.error(context);
		}
	});

	return QuestionAssignmentTag;
}(
	this.QuestionAssignmentExpression,
	ShorthandAssignmentTag.prototype.visitor
);

}.call(
	this,
	this.ShorthandAssignmentTag
);