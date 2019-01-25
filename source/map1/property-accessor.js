// 对象属性访问器相关
!function(WordPropertyNameTag){

this.PropertyAccessorTag = function(FunctionExpression, AccessorStatement, visitor){
	/**
	 * 对象属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertyAccessorTag(_type){
		WordPropertyNameTag.call(this, _type);
	};
	PropertyAccessorTag = new Rexjs(PropertyAccessorTag, WordPropertyNameTag);

	PropertyAccessorTag.props({
		order: ECMAScriptOrders.ACCESSOR_PROPERTY_NAME,
		/**
		 * 核对表达式是否为满足条件的函数表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Expression} expression - 需要核对的表达式
		 * @param {Context} context- 当前解析内容的上下文
		 */
		checkFunction: function(parser, expression, context){
			// 如果是函数表达式
			if(expression instanceof FunctionExpression){
				var length = expression.arguments.inner.length;
				
				switch(true){
					// 如果长度小于最小参数长度
					case length < this.minArgs:
						// 报错
						parser.error(
							(
								expression.arguments.inner[this.minArgs] || expression.arguments
							)
							.context,
							ECMAScriptErrors[this.errorType]
						);
						break;

					// 如果长度大于最大参数长度
					case length > this.maxArgs:
						// 报错
						parser.error(
							(
								expression.arguments.inner[this.maxArgs] || expression.arguments
							)
							.context,
							ECMAScriptErrors[this.errorType]
						);
						break;

					default:
						return true;
				}
			}
			else {
				// 报错
				parser.error(context);
			}
			
			return false;
		},
		errorType: "",
		maxArgs: 0,
		minArgs: 0,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertyAccessorContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 accessor 属性，记录 context
			statement.expression.accessor = context;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return PropertyAccessorTag;
}(
	this.FunctionExpression,
	this.AccessorStatement,
	WordPropertyNameTag.prototype.visitor
);

this.GetTag = function(PropertyAccessorTag){
	/**
	 * 对象属性访问器 get 标签
	 * @param {Number} _type - 标签类型
	 */
	function GetTag(_type){
		PropertyAccessorTag.call(this, _type);
	};
	GetTag = new Rexjs(GetTag, PropertyAccessorTag);

	GetTag.props({
		errorType: "GETTER",
		regexp: /get/
	});

	return GetTag;
}(
	this.PropertyAccessorTag
);

this.SetTag = function(PropertyAccessorTag){
	/**
	 * 对象属性访问器 set 标签
	 * @param {Number} _type - 标签类型
	 */
	function SetTag(_type){
		PropertyAccessorTag.call(this, _type);
	};
	SetTag = new Rexjs(SetTag, PropertyAccessorTag);

	SetTag.props({
		errorType: "SETTER",
		maxArgs: 1,
		minArgs: 1,
		regexp: /set/
	});

	return SetTag;
}(
	this.PropertyAccessorTag
);

}.call(
	this,
	this.WordPropertyNameTag
);