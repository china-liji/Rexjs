// 解构赋值表达式相关
!function(BinaryExpression, ArrayExpression, ObjectExpression, ObjectDestructuringExpression, BasicAssignmentTag, config){

this.DestructuringAssignmentExpression = function(extractTo, extractRight){
	/**
	 * 解构赋值表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} left - 左侧表达式
	 */
	function DestructuringAssignmentExpression(context, left){
		BinaryExpression.call(this, context, left);
	};
	DestructuringAssignmentExpression = new Rexjs(DestructuringAssignmentExpression, BinaryExpression);

	DestructuringAssignmentExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译解构赋值
			if(config.value){
				var variable = this.variable, left = this.left, builder = new ContentBuilder();

				// 用新的生成器记录临时变量名
				builder.appendString(variable);

				// 如果是声明形式的解构赋值
				if(left.origin.declaration){
					// 追加变量名
					contentBuilder.appendString(variable);
					// 追加等于号上下文
					contentBuilder.appendContext(this.context);
					// 提取右侧表达式
					extractRight(left, this.right, contentBuilder);
					// 提取并编译表达式文本内容
					left.compileTo(contentBuilder, builder);
					return;
				}

				// 起始小括号与追加变量名
				contentBuilder.appendString("(" + variable);
				// 追加等于号上下文
				contentBuilder.appendContext(this.context);
				// 提取右侧表达式
				extractRight(left, this.right, contentBuilder);
				// 提取并编译表达式文本内容
				left.compileTo(contentBuilder, builder);
				// 追加逗号与变量名及结束小括号
				contentBuilder.appendString("," + variable + ")");
				return;
			}

			extractTo.call(this, contentBuilder);
		},
		variable: ""
	});

	return DestructuringAssignmentExpression;
}(
	BinaryExpression.prototype.extractTo,
	// extractRight
	function(left, right, contentBuilder){
		// 如果是对象解构
		if(left instanceof ObjectDestructuringExpression){
			// 追加初始化解构目标起始代码
			contentBuilder.appendString("new Rexjs.ObjectDestructuringTarget((");
			// 提取右侧表达式
			right.extractTo(contentBuilder);
			// 追加初始化解构目标结束代码
			contentBuilder.appendString("))");
			return;
		}
		
		// 提取右侧表达式
		right.extractTo(contentBuilder);
	}
);

this.DestructuringAssignmentTag = function(DestructuringAssignmentExpression, visitor, destructible, setVariable){
	/**
	 * 解构赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function DestructuringAssignmentTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	DestructuringAssignmentTag = new Rexjs(DestructuringAssignmentTag, BasicAssignmentTag);

	DestructuringAssignmentTag.props({
		// 防止与 BasicAssignmentTag 冲突
		order: ECMAScriptOrders.DESTRUCTURING_ASSIGNMENT,
		/**
		 * 将该二元标签转换为二元表达式
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Expression} left - 该二元表达式左侧运算的表达式
		 */
		toExpression: function(context, left){
			return new DestructuringAssignmentExpression(context, left);
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

			// 如果是二元表达式
			if(expression instanceof BinaryExpression){
				var last = expression.last, right = last.right;

				// 判断最后一个二元表达式的右侧表达式是否满足解构条件
				if(destructible(right)){
					// 重新设置右侧表达式为解构表达式
					last.right = right.toDestructuring(parser);
				}
			}
			// 判断当前表达式的右侧表达式是否满足解构条件
			else if(destructible(expression)){
				// 重新当前表达式为解构表达式
				statement.expression = expression.toDestructuring(parser);
			}

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 如果需要解析解构赋值
			if(config.value){
				// 给刚生成的解构赋值表达式设置变量名
				setVariable(statement.expression.last, statements.collections);
			}
		}
	});

	return DestructuringAssignmentTag;
}(
	this.DestructuringAssignmentExpression,
	BasicAssignmentTag.prototype.visitor,
	// destructible
	function(expression){
		return expression instanceof ArrayExpression || expression instanceof ObjectExpression;
	},
	// setVariable
	function(destructuringAssignmentExpression, collections){
		// 给刚生成的解构赋值表达式设置变量名
		destructuringAssignmentExpression.variable = (
			// 如果是声明形式的解构赋值
			destructuringAssignmentExpression.left.origin.declaration ?
				// 只需提供，不用在语句块进行定义
				collections.provide() :
				// 需要提供并定义
				collections.generate()
		);
	}
);

}.call(
	this,
	this.BinaryExpression,
	this.ArrayExpression,
	this.ObjectExpression,
	this.ObjectDestructuringExpression,
	this.BasicAssignmentTag,
	// config
	ECMAScriptConfig.destructuring
);