// JSX 子节点相关
!function(LineTerminatorTag){

this.JSXTextExpression = function(QOUTE_REGEXP){
	/**
	 * JSX 文本表达式
	 * @param {Context} context - 标签上下文
	 */
	function JSXTextExpression(context){
		Expression.call(this, context);
	};
	JSXTextExpression = new Rexjs(JSXTextExpression, Expression);

	JSXTextExpression.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, _anotherBuilder){
			var context = this.context;

			// 如果需要编译 jsx
			if(config.jsx){
				var childrenBuilder = contentBuilder, content = context.content.trim();

				contentBuilder = _anotherBuilder;

				// 如果没有内容
				if(content.length === 0){
					return;
				}

				var result = childrenBuilder.result;

				// 如果有内容，说明当前的文本不是第一个，可能还有其他已换行的文本
				if(childrenBuilder.result.length > 0){
					// 追加空格
					childrenBuilder.appendString(" ");
				}

				// 追加文本内容
				childrenBuilder.appendString(
					// 转义双引号
					content.replace(QOUTE_REGEXP, '\\"')
				);
				return;
			}
			
			// 追加文本内容
			contentBuilder.appendContext(context);
		}
	});

	return JSXTextExpression;
}(
	// QOUTE_REGEXP
	/"/g
);

this.JSXLineTerminatorExpression = function(JSXTextExpression){
	/**
	 * JSX 换行符表达式
	 * @param {Context} context - 标签上下文
	 */
	function JSXLineTerminatorExpression(context){
		JSXTextExpression.call(this, context);
	};
	JSXLineTerminatorExpression = new Rexjs(JSXLineTerminatorExpression, JSXTextExpression);

	JSXLineTerminatorExpression.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译 jsx
			if(config.jsx){
				return;
			}

			// 追加内容
			contentBuilder.appendContext(this.context);
		}
	});

	return JSXLineTerminatorExpression;
}(
	this.JSXTextExpression
);

this.JSXTextChildTag = function(LiteralTag, JSXTextExpression){
	/**
	 * JSX 文本子节点标签
	 * @param {Number} _type - 标签类型
	 */
	function JSXTextChildTag(_type){
		LiteralTag.call(this, _type);
	};
	JSXTextChildTag = new Rexjs(JSXTextChildTag, LiteralTag);

	JSXTextChildTag.props({
		order: ECMAScriptOrders.JSX_TEXT,
		regexp: /[^{<\r\n\u2028\u2029]+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.jsxChildTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 给 JSXExpression 添加子节点
			statement.expression.children.add(
				new JSXTextExpression(context)
			);
		}
	});

	return JSXTextChildTag;
}(
	this.LiteralTag,
	this.JSXTextExpression
);

this.JSXLineTerminatorTag = function(JSXLineTerminatorExpression, visitor){
	/**
	 * JSX 子节点中的换行符标签
	 * @param {Number} _type - 标签类型
	 */
	function JSXLineTerminatorTag(_type){
		LineTerminatorTag.call(this, _type);
	};
	JSXLineTerminatorTag = new Rexjs(JSXLineTerminatorTag, LineTerminatorTag);

	JSXLineTerminatorTag.props({
		order: ECMAScriptOrders.JSX_LINE_TERMINATOR,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 给 JSXExpression 添加子节点
			statement.expression.children.add(
				new JSXLineTerminatorExpression(context)
			);

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return JSXLineTerminatorTag;
}(
	this.JSXLineTerminatorExpression,
	LineTerminatorTag.prototype.visitor
);

}.call(
	this,
	Rexjs.LineTerminatorTag
);