// 模块多成员表达式相关
!function(multipleMembersSeparatorTag, closingMultipleMembersTag){

this.MultipleMembersExpression = function(importMember, exportMember, exportMemberAs){
	/**
	 * 多成员导入表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	function MultipleMembersExpression(opening){
		PartnerExpression.call(this, opening);

		this.inner = new ListExpression(null, ",");
	};
	MultipleMembersExpression = new Rexjs(MultipleMembersExpression, PartnerExpression);

	MultipleMembersExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var inner = this.inner;

			// 如果是导入
			if(this.import){
				// 执行成员导入项连接
				inner.execJoin(importMember, contentBuilder, anotherBuilder);
				return;
			}

			var result = anotherBuilder.result, endingString = ")";

			// 追加提取方法
			contentBuilder.appendString("Rexjs.Module.exportAs(");
			// 追加对象起始大括号
			contentBuilder.appendContext(this.opening);

			// 如果长度大于 0，则说明是 export from 表达式
			if(result.length > 0){
				// 执行成员输出项连接
				inner.execJoin(exportMemberAs, contentBuilder, anotherBuilder);

				// 添加模块名称
				endingString = "," + result + endingString;
			}
			else {
				// 执行成员输出项连接
				inner.execJoin(exportMember, contentBuilder);
			}

			// 追加对象结束大括号
			contentBuilder.appendContext(this.closing);
			// 追加提取方法结束小括号
			contentBuilder.appendString(endingString);
		},
		import: true
	});

	return MultipleMembersExpression;
}(
	// importMember
	function(member, contentBuilder, anotherBuilder){
		member.importTo(contentBuilder, anotherBuilder);
	},
	// exportMember
	function(member, contentBuilder, anotherBuilder){
		member.exportTo(contentBuilder, anotherBuilder);
	},
	// exportMemberAs
	function(member, contentBuilder, anotherBuilder){
		member.exportAsTo(contentBuilder, anotherBuilder);
	}
);

this.MemberExpression = function(){
	/**
	 * 模块成员表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function MemberExpression(context){
		Expression.call(this, context);
	};
	MemberExpression = new Rexjs(MemberExpression, Expression);

	MemberExpression.props({
		/**
		 * 以输出形式提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		exportAsTo: function(contentBuilder, anotherBuilder){
			// 追加属性名
			contentBuilder.appendContext(this.variable);
			// 追加属性值
			contentBuilder.appendString(':"' + this.context.content + '"');
		},
		/**
		 * 以输出形式提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		exportTo: function(contentBuilder, anotherBuilder){
			// 追加属性名
			contentBuilder.appendContext(this.variable);
			// 追加属性值
			contentBuilder.appendString(":" + this.context.content);
		},
		/**
		 * 以导入形式提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		importTo: function(contentBuilder, anotherBuilder){
			var result = anotherBuilder.result;

			// 追加成员变量赋值字符串
			contentBuilder.appendString(
				this.variable.content + "=" + 'Rexjs.Module.memberOf("' +
					this.context.content + '"' + (result.length > 0 ? "," : "") +
					result +
				")"
			);
		},
		/**
		 * 获取模块成员变量名
		 */
		get variable(){
			return this.context;
		}
	});

	return MemberExpression;
}();

this.MemberAliasExpression = function(MemberExpression){
	/**
	 * 模块成员别名表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function MemberAliasExpression(context){
		MemberExpression.call(this, context);
	};
	MemberAliasExpression = new Rexjs(MemberAliasExpression, MemberExpression);

	MemberAliasExpression.props({
		alias: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加原名称
			contentBuilder.appendContext(this.context);
			// 追加空格
			contentBuilder.appendSpace();
			// 追加 as
			contentBuilder.appendContext(this.alias);
			// 追加空格
			contentBuilder.appendSpace();
			// 追加别名变量名
			contentBuilder.appendContext(this.variable);
		},
		variable: null
	});

	return MemberAliasExpression;
}(
	this.MemberExpression
);

this.MultipleMembersStatement = function(out){
	/**
	 * 模板语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function MultipleMembersStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	MultipleMembersStatement = new Rexjs(MultipleMembersStatement, ECMAScriptStatement);

	MultipleMembersStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是结束大括号
			if(context.content !== "}"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句
			out(parser, this, true);
			return this.bindingOf();
		},
		collectVariables: true,
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句
			out(parser, this, false);
			return this.tagOf().separator;
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.members.latest.opening.tag;
		}
	});

	return MultipleMembersStatement;
}(
	// out
	function(parser, statement, fromCatch){
		var expression = statement.expression, importExpression = statement.out(), inner = importExpression.members.latest.inner;

		// 如果来自 catch 方法
		if(fromCatch){
			// 如果设置失败，则说明 expression 是默认表达式
			if(!inner.set(expression)){
				return;
			}
		}
		else {
			// 添加表达式
			inner.add(expression);
		}

		// 收集变量名
		importExpression.context.tag.collectVariables(parser, expression.variable);
	}
);

this.OpeningMultipleMembersTag = function(OpeningBraceTag, MultipleMembersExpression, MultipleMembersStatement){
	/**
	 * 多成员导入起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningMultipleMembersTag(_type){
		OpeningBraceTag.call(this, _type);
	};
	OpeningMultipleMembersTag = new Rexjs(OpeningMultipleMembersTag, OpeningBraceTag);

	OpeningMultipleMembersTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingMultipleMembersTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return multipleMembersSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 添加成员
			statement.expression.members.add(
				new MultipleMembersExpression(context)
			);

			// 设置当前语句
			statements.statement = new MultipleMembersStatement(statements);
		}
	});

	return OpeningMultipleMembersTag;
}(
	this.OpeningBraceTag,
	this.MultipleMembersExpression,
	this.MultipleMembersStatement
);

this.MemberVariableTag = function(ConstantVariableTag, MemberExpression){
	/**
	 * 模块成员变量名标签
	 * @param {Number} _type - 标签类型
	 */
	function MemberVariableTag(_type){
		ConstantVariableTag.call(this, _type);
	};
	MemberVariableTag = new Rexjs(MemberVariableTag, ConstantVariableTag);

	MemberVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 import 表达式的 clean 属性
			statement.target.expression.clean = false;
			// 设置当前表达式
			statement.expression = new MemberExpression(context);
		}
	});
	
	return MemberVariableTag;
}(
	this.ConstantVariableTag,
	this.MemberExpression
);

this.MemberAliasVariableTag = function(MemberVariableTag){
	/**
	 * 模块成员变量名标签
	 * @param {Number} _type - 标签类型
	 */
	function MemberAliasVariableTag(_type){
		MemberVariableTag.call(this, _type);
	};
	MemberAliasVariableTag = new Rexjs(MemberAliasVariableTag, MemberVariableTag);

	MemberAliasVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 MemberAliasExpression 表达式的 variable 属性
			statement.expression.variable = context;
		}
	});
	
	return MemberAliasVariableTag;
}(
	this.MemberVariableTag
);

this.MemberAliasTag = function(AsTag, MemberAliasExpression){
	/**
	 * 模块成员标签
	 * @param {Number} _type - 标签类型
	 */
	function MemberAliasTag(_type){
		AsTag.call(this, _type);
	};
	MemberAliasTag = new Rexjs(MemberAliasTag, AsTag);

	MemberAliasTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberAliasVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			(
				// 设置当前表达式
				statement.expression = new MemberAliasExpression(statement.expression.context)
			)
			// 设置 alias 属性
			.alias = context;
		}
	});

	return MemberAliasTag;
}(
	this.AsTag,
	this.MemberAliasExpression
);

this.MultipleMembersSeparatorTag = function(MemberSeparatorTag, MultipleMembersStatement){
	/**
	 * 多成员导入分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function MultipleMembersSeparatorTag(_type){
		MemberSeparatorTag.call(this, _type);
	};
	MultipleMembersSeparatorTag = new Rexjs(MultipleMembersSeparatorTag, MemberSeparatorTag);

	MultipleMembersSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new MultipleMembersStatement(statements);
		}
	});

	return MultipleMembersSeparatorTag;
}(
	this.MemberSeparatorTag,
	this.MultipleMembersStatement
);

this.ClosingMultipleMembersTag = function(ClosingBraceTag){
	/**
	 * 多成员导入结束标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingMultipleMembersTag(_type){
		ClosingBraceTag.call(this, _type);
	};
	ClosingMultipleMembersTag = new Rexjs(ClosingMultipleMembersTag, ClosingBraceTag);

	ClosingMultipleMembersTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberSeparatorTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 MultipleMembersExpression 的 closing 属性
			statement.expression.members.latest.closing = context;
		}
	});

	return ClosingMultipleMembersTag;
}(
	this.ClosingBraceTag
);

multipleMembersSeparatorTag = new this.MultipleMembersSeparatorTag();
closingMultipleMembersTag = new this.ClosingMultipleMembersTag();

}.call(
	this,
	// multipleMembersSeparatorTag
	null,
	// closingMultipleMembersTag
	null
);