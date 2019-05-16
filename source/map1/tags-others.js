// 其他标签列表
!function(ECMAScriptTags, ExpressionTags, ExpressionContextTags, MistakableTags, StatementTags, StatementEndTags, IllegalTags){

this.ArgumentNameContextTags = function(ArgumentAssignmentTag){
	/**
	 * 参数名上下文标签列表
	 */
	function ArgumentNameContextTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new ArgumentAssignmentTag()
		);
	};
	ArgumentNameContextTags = new Rexjs(ArgumentNameContextTags, ECMAScriptTags);

	return ArgumentNameContextTags;
}(
	this.ArgumentAssignmentTag
);

this.ArrowContextTags = function(OpeningArrowFunctionBodyTag){
	/**
	 * 箭头上下文标签
	 */
	function ArrowContextTags(){
		ExpressionTags.call(this);

		this.register(
			new OpeningArrowFunctionBodyTag()
		);
	};
	ArrowContextTags = new Rexjs(ArrowContextTags, ExpressionTags);

	return ArrowContextTags;
}(
	this.OpeningArrowFunctionBodyTag
);


this.BlockTags = function(OpeningBlockTag){
	/**
	 * 语句块标签列表
	 */
	function BlockTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpeningBlockTag()
		);
	};
	BlockTags = new Rexjs(BlockTags, IllegalTags);

	return BlockTags;
}(
	this.OpeningBlockTag
);

this.CatchedExceptionTags = function(OpeningCatchedExceptionTag){
	/**
	 * 被捕获的异常标签列表
	 */
	function CatchedExceptionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpeningCatchedExceptionTag()
		);
	};
	CatchedExceptionTags = new Rexjs(CatchedExceptionTags, IllegalTags);
	
	return CatchedExceptionTags;
}(
	this.OpeningCatchedExceptionTag
);

this.ClassContextTags = function(ClassNameTag, ExtendsTag, OpeningClassBodyTag){
	/**
	 * 类关键字上下文标签列表
	 */
	function ClassContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new ClassNameTag(),
			new ExtendsTag(),
			new OpeningClassBodyTag()
		);
	};
	ClassContextTags = new Rexjs(ClassContextTags, IllegalTags);

	return ClassContextTags;
}(
	this.ClassNameTag,
	this.ExtendsTag,
	this.OpeningClassBodyTag
);

this.ClassIdentifierPropertyNameContextTags = function(ClassPropertyInitializerTag, OpeningShorthandMethodArgumentsTag){
	/**
	 * 类标识符属性名上下文标签列表
	 */
	function ClassIdentifierPropertyNameContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new ClassPropertyInitializerTag(),
			new OpeningShorthandMethodArgumentsTag()
		);
	};
	ClassIdentifierPropertyNameContextTags = new Rexjs(ClassIdentifierPropertyNameContextTags, IllegalTags);

	return ClassIdentifierPropertyNameContextTags;
}(
	this.ClassPropertyInitializerTag,
	this.OpeningShorthandMethodArgumentsTag
);

this.ClassNameContextTags = function(ExtendsTag, OpeningClassBodyTag){
	/**
	 * 类关键字上下文标签列表
	 */
	function ClassNameContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new ExtendsTag(),
			new OpeningClassBodyTag()
		);
	};
	ClassNameContextTags = new Rexjs(ClassNameContextTags, IllegalTags);

	return ClassNameContextTags;
}(
	this.ExtendsTag,
	this.OpeningClassBodyTag
);

this.ClassPropertyNameTags = function(list){
	/**
	 * 类属性名标签列表
	 */
	function ClassPropertyNameTags(){
		IllegalTags.call(this);
		
		this.delegate(list);
	};
	ClassPropertyNameTags = new Rexjs(ClassPropertyNameTags, IllegalTags);

	return ClassPropertyNameTags;
}(
	// list
	[
		this.ClosingClassBodyTag,
		this.ClassPropertyPlaceholderTag,
		this.ShorthandGeneratorTag,
		this.ConstructorTag,
		this.GetDescriptorTag,
		this.SetDescriptorTag,
		this.ClassIdentifierPropertyNameTag,
		this.ClassNumberPropertyNameTag,
		this.ClassBinaryNumberPropertyNameTag,
		this.ClassOctalNumberPropertyNameTag,
		this.ClassStringPropertyNameTag,
		this.OpeningClassComputedPropertyNameTag
	]
);

this.ClassVariableTags = function(ClassVariableTag){
	/**
	 * 类变量标签列表
	 */
	function ClassVariableTags(){
		IllegalTags.call(this);

		this.register(
			new ClassVariableTag()
		);
	};
	ClassVariableTags = new Rexjs(ClassVariableTags, IllegalTags);

	return ClassVariableTags;
}(
	this.ClassVariableTag
);

this.ClosingArrowFunctionBodyContextTags = function(CommaTag, LastStatementEndTag, StatementBreakTag, StatementEndTag, ExpressionBreakTag, filter){
	/**
	 * 结束箭头函数主体上下文标签列表
	 */
	function ClosingArrowFunctionBodyContextTags(){
		ExpressionContextTags.call(this);
	};
	ClosingArrowFunctionBodyContextTags = new Rexjs(ClosingArrowFunctionBodyContextTags, ExpressionContextTags);
	
	ClosingArrowFunctionBodyContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是表达式上下文标签
			if(tag.class.expressionContext){
				switch(true){
					// 如果是逗号标签
					case tag instanceof CommaTag:
					// 如果是末语句结束标签
					case tag instanceof LastStatementEndTag:
					// 如果语句换行标签
					case tag instanceof StatementBreakTag:
					// 如果是表达式换行标签
					case tag instanceof ExpressionBreakTag:
						// 设置类型为可误解的
						tag.type = new TagType(TYPE_MISTAKABLE);
						break;

					default:
						// 设置类型为未捕获的
						tag.type = new TagType(TYPE_UNEXPECTED);
						break;
				}

				return false;
			}

			return filter.call(this, tag);
		}
	});

	return ClosingArrowFunctionBodyContextTags;
}(
	this.CommaTag,
	this.LastStatementEndTag,
	this.StatementBreakTag,
	this.StatementEndTag,
	this.ExpressionBreakTag,
	ExpressionContextTags.prototype.filter
);

this.ClosingCatchedExceptionTags = function(ClosingCatchedExceptionTag){
	/**
	 * 被捕获的异常结束标签标签列表
	 */
	function ClosingCatchedExceptionTags(){
		IllegalTags.call(this);
		
		this.register(
			new ClosingCatchedExceptionTag()
		);
	};
	ClosingCatchedExceptionTags = new Rexjs(ClosingCatchedExceptionTags, IllegalTags);
	
	return ClosingCatchedExceptionTags;
}(
	this.ClosingCatchedExceptionTag
);

this.ClosingJSXMatchedElementContextTags = function(OpeningJSXAdjacentElementTag){
	/**
	 * 结束 JSX 闭合元素上下文标签列表
	 */
	function ClosingJSXMatchedElementContextTags(){
		ExpressionContextTags.call(this);
		
		this.register(
			new OpeningJSXAdjacentElementTag()
		);
	};
	ClosingJSXMatchedElementContextTags = new Rexjs(ClosingJSXMatchedElementContextTags, ExpressionContextTags);
	
	return ClosingJSXMatchedElementContextTags;
}(
	this.OpeningJSXAdjacentElementTag
);

this.ClosureVariableContextTags = function(VarDeclarationBreakTag, BasicAssignmentTag, CommaTag){
	/**
	 * 闭包内变量上下文标签列表
	 */
	function ClosureVariableContextTags(){
		StatementEndTags.call(this);

		this.register(
			new VarDeclarationBreakTag()
		);
	};
	ClosureVariableContextTags = new Rexjs(ClosureVariableContextTags, StatementEndTags);

	ClosureVariableContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是赋值标签
			if(tag instanceof BasicAssignmentTag){
				// 设置为可匹配
				tag.type = new TagType(TYPE_MATCHABLE);
			}
			// 如果是逗号标签
			else if(tag instanceof CommaTag){
				// 设置为可误解的
				tag.type = new TagType(TYPE_MISTAKABLE);
			}
			
			return false;
		}
	});
	
	return ClosureVariableContextTags;
}(
	this.VarDeclarationBreakTag,
	this.BasicAssignmentTag,
	this.CommaTag
);

this.VariableDeclarationTags = function(OpeningDeclarationArrayTag, OpeningDeclarationObjectTag){
	/**
	 * 变量声明标签列表
	 */
	function VariableDeclarationTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpeningDeclarationArrayTag(),
			new OpeningDeclarationObjectTag()
		);
	};
	VariableDeclarationTags = new Rexjs(VariableDeclarationTags, IllegalTags);

	return VariableDeclarationTags;
}(
	this.OpeningDeclarationArrayTag,
	this.OpeningDeclarationObjectTag
);

this.ConstContextTags = function(VariableDeclarationTags, ConstantVariableTag){
	/**
	 * const 关键字上下文标签列表
	 */
	function ConstContextTags(){
		VariableDeclarationTags.call(this);
		
		this.register(
			new ConstantVariableTag()
		);
	};
	ConstContextTags = new Rexjs(ConstContextTags, VariableDeclarationTags);

	return ConstContextTags;
}(
	this.VariableDeclarationTags,
	this.ConstantVariableTag
);

this.ConstructorArgumentsTags = function(OpeningConstructorArgumentsTag){
	/**
	 * 类的构造函数参数标签列表
	 */
	function ConstructorArgumentsTags(){
		IllegalTags.call(this);

		this.register(
			new OpeningConstructorArgumentsTag()
		);
	};
	ConstructorArgumentsTags = new Rexjs(ConstructorArgumentsTags, IllegalTags);

	return ConstructorArgumentsTags;
}(
	this.OpeningConstructorArgumentsTag
);

this.ConstructorBodyTags = function(OpeningConstructorBodyTag){
	/**
	 * 类的构造函数主体标签列表
	 */
	function ConstructorBodyTags(){
		IllegalTags.call(this);

		this.register(
			new OpeningConstructorBodyTag()
		);
	};
	ConstructorBodyTags = new Rexjs(ConstructorBodyTags, IllegalTags);

	return ConstructorBodyTags;
}(
	this.OpeningConstructorBodyTag
);

this.DeclarationArrayItemSeparatorTags = function(DeclarationArrayItemSeparatorTag, ClosingDeclarationArrayTag){
	/**
	 * 变量声明数组项分隔符列表
	 */
	function DeclarationArrayItemSeparatorTags(){
		IllegalTags.call(this);
		
		this.register(
			new DeclarationArrayItemSeparatorTag(),
			new ClosingDeclarationArrayTag()
		);
	};
	DeclarationArrayItemSeparatorTags = new Rexjs(DeclarationArrayItemSeparatorTags, IllegalTags);

	return DeclarationArrayItemSeparatorTags; 
}(
	this.DeclarationArrayItemSeparatorTag,
	this.ClosingDeclarationArrayTag
);

this.DeclarationArrayItemContextTags = function(DeclarationArrayItemSeparatorTags, DeclarationArrayItemAssignmentTag){
	/**
	 * 变量声明数组项上下文标签列表
	 */
	function DeclarationArrayItemContextTags(){
		DeclarationArrayItemSeparatorTags.call(this);
		
		this.register(
			new DeclarationArrayItemAssignmentTag()
		);
	};
	DeclarationArrayItemContextTags = new Rexjs(DeclarationArrayItemContextTags, DeclarationArrayItemSeparatorTags);

	return DeclarationArrayItemContextTags; 
}(
	this.DeclarationArrayItemSeparatorTags,
	this.DeclarationArrayItemAssignmentTag
);

this.DeclarationArrayRestItemContextTags = function(DeclarationArrayItemSeparatorTags, DeclarationRestItemSeparatorTag){
	/**
	 * 变量声明数组省略项上下文标签列表
	 */
	function DeclarationArrayRestItemContextTags(){
		DeclarationArrayItemSeparatorTags.call(this);
		
		this.register(
			new DeclarationRestItemSeparatorTag()
		);
	};
	DeclarationArrayRestItemContextTags = new Rexjs(DeclarationArrayRestItemContextTags, DeclarationArrayItemSeparatorTags);

	return DeclarationArrayRestItemContextTags; 
}(
	this.DeclarationArrayItemSeparatorTags,
	this.DeclarationRestItemSeparatorTag
);

this.DeclarationArrayRestItemTags = function(DeclarationArrayRestItemTag){
	/**
	 * 变量声明数组省略项标签列表
	 */
	function DeclarationArrayRestItemTags(){
		IllegalTags.call(this);

		this.register(
			new DeclarationArrayRestItemTag()
		);
	};
	DeclarationArrayRestItemTags = new Rexjs(DeclarationArrayRestItemTags, IllegalTags);

	return DeclarationArrayRestItemTags;
}(
	this.DeclarationArrayRestItemTag
);

this.DeclarationPropertyNameSeparatorTags = function(DeclarationPropertyNameSeparatorTag){
	/**
	 * 变量声明属性名分隔符标签列表
	 */
	function DeclarationPropertyNameSeparatorTags(){
		IllegalTags.call(this);

		this.register(
			new DeclarationPropertyNameSeparatorTag()
		);
	};
	DeclarationPropertyNameSeparatorTags = new Rexjs(DeclarationPropertyNameSeparatorTags, IllegalTags);

	return DeclarationPropertyNameSeparatorTags; 
}(
	this.DeclarationPropertyNameSeparatorTag
);

this.DeclarationPropertyNameTags = function(list){
	/**
	 * 变量声明属性名标签列表
	 */
	function DeclarationPropertyNameTags(){
		IllegalTags.call(this);

		this.delegate(list);
	};
	DeclarationPropertyNameTags = new Rexjs(DeclarationPropertyNameTags, IllegalTags);

	return DeclarationPropertyNameTags;
}(
	// list
	[
		this.DeclarationIdentifierPropertyNameTag,
		this.DeclarationNumberPropertyNameTag,
		this.DeclarationBinaryNumberPropertyNameTag,
		this.DeclarationOctalNumberPropertyNameTag,
		this.DeclarationWordPropertyNameTag,
		this.DeclarationStringPropertyNameTag,
		this.OpeningDeclarationComputedPropertyNameTag,
		this.DeclarationPropertyRestTag,
		this.ClosingDeclarationObjectTag
	]
);

this.DeclarationPropertyRestItemTags = function(DeclarationPropertyRestItemTag){
	/**
	 * 变量声明对象属性省略项标签列表
	 */
	function DeclarationPropertyRestItemTags(){
		IllegalTags.call(this);

		this.register(
			new DeclarationPropertyRestItemTag()
		);
	};
	DeclarationPropertyRestItemTags = new Rexjs(DeclarationPropertyRestItemTags, IllegalTags);

	return DeclarationPropertyRestItemTags;
}(
	this.DeclarationPropertyRestItemTag
);

this.DeclarationPropertySeparatorTags = function(DeclarationPropertySeparatorTag, ClosingDeclarationObjectTag){
	/**
	 * 变量声明属性分隔符标签列表
	 */
	function DeclarationPropertySeparatorTags(){
		IllegalTags.call(this);

		this.register(
			new DeclarationPropertySeparatorTag(),
			new ClosingDeclarationObjectTag()
		);
	};
	DeclarationPropertySeparatorTags = new Rexjs(DeclarationPropertySeparatorTags, IllegalTags);

	return DeclarationPropertySeparatorTags;
}(
	this.DeclarationPropertySeparatorTag,
	this.ClosingDeclarationObjectTag
);

this.DeclarationPropertyRestItemContextTags = function(DeclarationPropertySeparatorTags, DeclarationRestItemSeparatorTag){
	/**
	 * 变量声明对象属性省略项上下文标签列表
	 */
	function DeclarationPropertyRestItemContextTags(){
		DeclarationPropertySeparatorTags.call(this);
		
		this.register(
			new DeclarationRestItemSeparatorTag()
		);
	};
	DeclarationPropertyRestItemContextTags = new Rexjs(DeclarationPropertyRestItemContextTags, DeclarationPropertySeparatorTags);

	return DeclarationPropertyRestItemContextTags; 
}(
	this.DeclarationPropertySeparatorTags,
	this.DeclarationRestItemSeparatorTag
);

this.DeclarationPropertyValueContextTags = function(DeclarationPropertySeparatorTags, DeclarationPropertyValueInitializerTag){
	/**
	 * 变量声明属性值上下文标签列表
	 */
	function DeclarationPropertyValueContextTags(){
		DeclarationPropertySeparatorTags.call(this);

		this.register(
			new DeclarationPropertyValueInitializerTag()
		);
	};
	DeclarationPropertyValueContextTags = new Rexjs(DeclarationPropertyValueContextTags, DeclarationPropertySeparatorTags);

	return DeclarationPropertyValueContextTags;
}(
	this.DeclarationPropertySeparatorTags,
	this.DeclarationPropertyValueInitializerTag
);

this.DeclarationPropertyValueTags = function(DeclarationPropertyValueTag, OpeningDeclarationArrayPropertyValueTag, OpeningDeclarationObjectPropertyValueTag){
	/**
	 * 变量声明属性值标签列表
	 */
	function DeclarationPropertyValueTags(){
		IllegalTags.call(this);

		this.register(
			new DeclarationPropertyValueTag(),
			new OpeningDeclarationArrayPropertyValueTag(),
			new OpeningDeclarationObjectPropertyValueTag()
		);
	};
	DeclarationPropertyValueTags = new Rexjs(DeclarationPropertyValueTags, IllegalTags);

	return DeclarationPropertyValueTags;
}(
	this.DeclarationPropertyValueTag,
	this.OpeningDeclarationArrayPropertyValueTag,
	this.OpeningDeclarationObjectPropertyValueTag
);

this.DestructibleExpressionContextTags = function(DestructuringAssignmentTag){
	/**
	 * 可解构表达式上下文标签列表
	 */
	function DestructibleExpressionContextTags(){
		ExpressionContextTags.call(this);
		
		this.register(
			new DestructuringAssignmentTag()
		);
	};
	DestructibleExpressionContextTags = new Rexjs(DestructibleExpressionContextTags, ExpressionContextTags);
	
	return DestructibleExpressionContextTags;
}(
	this.DestructuringAssignmentTag
);

this.DestructuringAssignmentTags = function(DestructuringAssignmentTag){
	/**
	 * 解构赋值标签列表
	 */
	function DestructuringAssignmentTags(){
		IllegalTags.call(this);

		this.register(
			new DestructuringAssignmentTag()
		);
	};
	DestructuringAssignmentTags = new Rexjs(DestructuringAssignmentTags, IllegalTags);

	return DestructuringAssignmentTags;
}(
	this.DestructuringAssignmentTag
);

this.DoWhileConditionTags = function(OpeningDoWhileConditionTag){
	/**
	 * do while 条件标签列表
	 */
	function DoWhileConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpeningDoWhileConditionTag()
		);
	};
	DoWhileConditionTags = new Rexjs(DoWhileConditionTags, IllegalTags);
	
	return DoWhileConditionTags;
}(
	this.OpeningDoWhileConditionTag
);

this.DotAccessorContextTags = function(PropertyNameTag){
	/**
	 * 点属性访问器上下文标签列表
	 */
	function DotAccessorContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new PropertyNameTag()
		);
	};
	DotAccessorContextTags = new Rexjs(DotAccessorContextTags, IllegalTags);
	
	return DotAccessorContextTags;
}(
	this.PropertyNameTag
);

this.ExceptionVariableTags = function(ExceptionVariableTag){
	/**
	 * catch 语句异常变量标签列表
	 */
	function ExceptionVariableTags(){
		IllegalTags.call(this);
		
		this.register(
			new ExceptionVariableTag()
		);
	};
	ExceptionVariableTags = new Rexjs(ExceptionVariableTags, IllegalTags);

	return ExceptionVariableTags;
}(
	this.ExceptionVariableTag
);

this.ExportContextTags = function(list){
	/**
	 * export 关键字上下文标签列表
	 */
	function ExportContextTags(){
		IllegalTags.call(this);

		this.delegate(list);
	};
	ExportContextTags = new Rexjs(ExportContextTags, IllegalTags);

	return ExportContextTags;
}(
	// list
	[
		this.VarTag,
		this.LetTag,
		this.ConstTag,
		this.FunctionDeclarationTag,
		this.ClassDeclarationTag,
		this.DefaultExportTag,
		this.OpeningExportMultipleMembersTag,
		this.ExportAllMembersTag
	]
);

this.ExtendsContextTags = function(UnaryTag, ExecTag, filter){
	/**
	 * extends 关键字上下文标签列表
	 */
	function ExtendsContextTags(){
		ExpressionTags.call(this);
	};
	ExtendsContextTags = new Rexjs(ExtendsContextTags, ExpressionTags);

	ExtendsContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是一元标签
			if(tag instanceof UnaryTag){
				// 如果是执行标签
				if(tag instanceof ExecTag){
					// 设置为可匹配
					tag.type = new TagType(TYPE_MATCHABLE);
				}
				
				return false;
			}
			
			return filter.call(this, tag);
		}
	});

	return ExtendsContextTags;
}(
	this.UnaryTag,
	this.ExecTag,
	ExpressionTags.prototype.filter
);

this.FileStartTags = function(FileStartTag){
	/**
	 * 文件起始标签列表
	 */
	function FileStartTags(){
		IllegalTags.call(this);
		
		this.register(
			new FileStartTag()
		);
	};
	FileStartTags = new Rexjs(FileStartTags, IllegalTags);
	
	FileStartTags.props({
		entrance: true
	});
	
	return FileStartTags;
}(
	this.FileStartTag
);

this.ForConditionTags = function(OpeningForConditionTag){
	/**
	 * for 条件标签列表
	 */
	function ForConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpeningForConditionTag()
		);
	};
	ForConditionTags = new Rexjs(ForConditionTags, IllegalTags);

	return ForConditionTags;
}(
	this.OpeningForConditionTag
);

this.ForConditionContextTags = function(VarTag, filter){
	/**
	 * for 条件上下文标签列表
	 */
	function ForConditionContextTags(){
		ExpressionTags.call(this);
	};
	ForConditionContextTags = new Rexjs(ForConditionContextTags, ExpressionTags);

	ForConditionContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是语句标签
			if(tag instanceof VarTag){
				// 设置为可匹配
				tag.type = new TagType(TYPE_MATCHABLE);
				return false;
			}

			// 调用父类方法
			return filter.call(this, tag);
		}
	});
	
	return ForConditionContextTags;
}(
	this.VarTag,
	ExpressionTags.prototype.filter
);

this.FunctionArgumentTags = function(OpeningArgumentsTag){
	/**
	 * 函数参数标签列表
	 */
	function FunctionArgumentTags(){
		IllegalTags.call(this);

		this.register(
			new OpeningArgumentsTag()
		);
	};
	FunctionArgumentTags = new Rexjs(FunctionArgumentTags, IllegalTags);

	return FunctionArgumentTags;
}(
	this.OpeningArgumentsTag
);

this.FunctionBodyTags = function(OpeningFunctionBodyTag){
	/**
	 * 函数主体标签列表
	 */
	function FunctionBodyTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpeningFunctionBodyTag()
		);
	};
	FunctionBodyTags = new Rexjs(FunctionBodyTags, IllegalTags);

	return FunctionBodyTags;
}(
	this.OpeningFunctionBodyTag
);

this.StarContextTags = function(FunctionNameTag, OpeningArgumentsTag){
	/**
	 * 生成器星号上下文标签列表
	 */
	function StarContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new FunctionNameTag(),
			new OpeningArgumentsTag()
		);
	};
	StarContextTags = new Rexjs(StarContextTags, IllegalTags);

	return StarContextTags;
}(
	this.FunctionNameTag,
	this.OpeningArgumentsTag
);

this.FunctionDeclarationStarContextTags = function(FunctionVariableTag){
	/**
	 * 生成器声明上下文标签列表
	 */
	function FunctionDeclarationStarContextTags(){
		IllegalTags.call(this);

		this.register(
			new FunctionVariableTag()
		);
	};
	FunctionDeclarationStarContextTags = new Rexjs(FunctionDeclarationStarContextTags, IllegalTags);

	return FunctionDeclarationStarContextTags;
}(
	this.FunctionVariableTag
);

this.FunctionContextTags = function(StarContextTags, GeneratorTag){
	/**
	 * 函数关键字上下文标签列表
	 */
	function FunctionContextTags(){
		StarContextTags.call(this);
		
		this.register(
			new GeneratorTag()
		);
	};
	FunctionContextTags = new Rexjs(FunctionContextTags, StarContextTags);

	return FunctionContextTags;
}(
	this.StarContextTags,
	this.GeneratorTag
);

this.FunctionDeclarationContextTags = function(FunctionDeclarationStarContextTags, GeneratorDeclarationTag){
	/**
	 * 函数声明上下文标签列表
	 */
	function FunctionDeclarationContextTags(){
		FunctionDeclarationStarContextTags.call(this);

		this.register(
			new GeneratorDeclarationTag()
		);
	};
	FunctionDeclarationContextTags = new Rexjs(FunctionDeclarationContextTags, FunctionDeclarationStarContextTags);

	return FunctionDeclarationContextTags;
}(
	this.FunctionDeclarationStarContextTags,
	this.GeneratorDeclarationTag
);

this.IfConditionTags = function(OpeningIfConditionTag){
	/**
	 * if 条件标签列表
	 */
	function IfConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpeningIfConditionTag()
		);
	};
	IfConditionTags = new Rexjs(IfConditionTags, IllegalTags);

	return IfConditionTags;
}(
	this.OpeningIfConditionTag
);

this.JSXTypeContextTags = function(JSXAttributeNameTag, OpeningJSXSpreadPlaceHolderTag, SelfClosingJSXBackslashTag, ClosingJSXElementTag){
	/**
	 * JSX 类型名称上下文标签列表
	 */
	function JSXTypeContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new JSXAttributeNameTag(),
			new OpeningJSXSpreadPlaceHolderTag(),
			new SelfClosingJSXBackslashTag(),
			new ClosingJSXElementTag(TYPE_UNEXPECTED)
		);
	};
	JSXTypeContextTags = new Rexjs(JSXTypeContextTags, IllegalTags);

	return JSXTypeContextTags;
}(
	this.JSXAttributeNameTag,
	this.OpeningJSXSpreadPlaceHolderTag,
	this.SelfClosingJSXBackslashTag,
	this.ClosingJSXElementTag
);

this.JSXAttributeAssginmentContextTags = function(JSXStringTag, OpeningJSXAttributePlaceHolderTag){
	/**
	 * JSX 名称上下文标签列表
	 */
	function JSXAttributeAssginmentContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new JSXStringTag(),
			new OpeningJSXAttributePlaceHolderTag()
		);
	};
	JSXAttributeAssginmentContextTags = new Rexjs(JSXAttributeAssginmentContextTags, IllegalTags);

	return JSXAttributeAssginmentContextTags;
}(
	this.JSXStringTag,
	this.OpeningJSXAttributePlaceHolderTag
);

this.JSXAttributeNameContextTags = function(JSXTypeContextTags, JSXAttributeAssginmentTag){
	/**
	 * JSX 属性名上下文标签列表
	 */
	function JSXAttributeNameContextTags(){
		JSXTypeContextTags.call(this);

		this.register(
			new JSXAttributeAssginmentTag()
		);
	};
	JSXAttributeNameContextTags = new Rexjs(JSXAttributeNameContextTags, JSXTypeContextTags);

	return JSXAttributeNameContextTags;
}(
	this.JSXTypeContextTags,
	this.JSXAttributeAssginmentTag
);

this.JSXChildTags = function(OpeningJSXElementTag, JSXTextChildTag, OpeningJSXPlaceHolderTag, JSXLineTerminatorTag, OpeningJSXMatchedElementTag){
	/**
	 * JSX 子节点标签列表
	 */
	function JSXChildTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpeningJSXElementTag(null, true),
			new JSXTextChildTag(),
			new OpeningJSXPlaceHolderTag(),
			new JSXLineTerminatorTag(),
			new OpeningJSXMatchedElementTag()
		);
	};
	JSXChildTags = new Rexjs(JSXChildTags, IllegalTags);

	return JSXChildTags;
}(
	this.OpeningJSXElementTag,
	this.JSXTextChildTag,
	this.OpeningJSXPlaceHolderTag,
	this.JSXLineTerminatorTag,
	this.OpeningJSXMatchedElementTag
);

this.JSXMatchedBackslashTags = function(JSXMatchedBackslashTag){
	/**
	 * JSX 元素闭合的反斜杠标签列表
	 */
	function JSXMatchedBackslashTags(){
		IllegalTags.call(this);
		
		this.register(
			new JSXMatchedBackslashTag()
		);
	};
	JSXMatchedBackslashTags = new Rexjs(JSXMatchedBackslashTags, IllegalTags);

	return JSXMatchedBackslashTags;
}(
	this.JSXMatchedBackslashTag
);

this.JSXIdentifierContextTags = function(JSXTypeContextTags, JSXMemberAccessorTag){
	/**
	 * JSX 名称标识符上下文标签列表
	 */
	function JSXIdentifierContextTags(){
		JSXTypeContextTags.call(this);
		
		this.register(
			new JSXMemberAccessorTag()
		);
	};
	JSXIdentifierContextTags = new Rexjs(JSXIdentifierContextTags, JSXTypeContextTags);

	return JSXIdentifierContextTags;
}(
	this.JSXTypeContextTags,
	this.JSXMemberAccessorTag
);

this.JSXPropertyNameTags = function(JSXPropertyNameTag){
	/**
	 * JSX 类型属性标签列表
	 */
	function JSXPropertyNameTags(){
		IllegalTags.call(this);
		
		this.register(
			new JSXPropertyNameTag()
		);
	};
	JSXPropertyNameTags = new Rexjs(JSXPropertyNameTags, IllegalTags);

	return JSXPropertyNameTags;
}(
	this.JSXPropertyNameTag
);

this.JSXSelfClosingBackslashContextTags = function(SelfClosingJSXElementTag){
	/**
	 * JSX 斜杠上下文标签列表
	 */
	function JSXSelfClosingBackslashContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new SelfClosingJSXElementTag()
		);
	};
	JSXSelfClosingBackslashContextTags = new Rexjs(JSXSelfClosingBackslashContextTags, IllegalTags);

	return JSXSelfClosingBackslashContextTags;
}(
	this.SelfClosingJSXElementTag
);

this.JSXSpreadTags = function(JSXSpreadTag){
	/**
	 * JSX 拓展符标签列表
	 */
	function JSXSpreadTags(){
		IllegalTags.call(this);
		
		this.register(
			new JSXSpreadTag()
		);
	};
	JSXSpreadTags = new Rexjs(JSXSpreadTags, IllegalTags);

	return JSXSpreadTags;
}(
	this.JSXSpreadTag
);

this.LabelContextTags = function(LabelColonTag){
	/**
	 * 标记标签上下文列表
	 */
	function LabelContextTags(){
		ExpressionContextTags.call(this);
		
		this.register(
			new LabelColonTag()
		);
	};
	LabelContextTags = new Rexjs(LabelContextTags, ExpressionContextTags);

	return LabelContextTags;
}(
	this.LabelColonTag
);

this.LetContextTags = function(VariableDeclarationTags, LocalVariableTag){
	/**
	 * let 关键字上下文标签列表
	 */
	function LetContextTags(){
		VariableDeclarationTags.call(this);
		
		this.register(
			new LocalVariableTag()
		);
	};
	LetContextTags = new Rexjs(LetContextTags, VariableDeclarationTags);

	return LetContextTags;
}(
	this.VariableDeclarationTags,
	this.LocalVariableTag
);

this.MemberAliasVariableTags = function(MemberAliasVariableTag){
	/**
	 * 模块成员分隔符上下文标签列表
	 */
	function MemberAliasVariableTags(){
		IllegalTags.call(this);

		this.register(
			new MemberAliasVariableTag()
		);
	};
	MemberAliasVariableTags = new Rexjs(MemberAliasVariableTags, IllegalTags);

	return MemberAliasVariableTags;
}(
	this.MemberAliasVariableTag
);

this.MemberContextTags = function(MemberAliasTag, MultipleMembersSeparatorTag){
	/**
	 * 模块成员上下文标签列表
	 */
	function MemberContextTags(){
		ECMAScriptTags.call(this);

		this.register(
			new MemberAliasTag(),
			new MultipleMembersSeparatorTag()
		);
	};
	MemberContextTags = new Rexjs(MemberContextTags, ECMAScriptTags);

	return MemberContextTags;
}(
	this.MemberAliasTag,
	this.MultipleMembersSeparatorTag
);

this.MemberSeparatorContextTags = function(DefaultMemberTag, AllMembersTag, OpeningMultipleMembersTag){
	/**
	 * 模块成员分隔符上下文标签列表
	 */
	function MemberSeparatorContextTags(){
		IllegalTags.call(this);

		this.register(
			new DefaultMemberTag(),
			new AllMembersTag(),
			new OpeningMultipleMembersTag()
		);
	};
	MemberSeparatorContextTags = new Rexjs(MemberSeparatorContextTags, IllegalTags);

	return MemberSeparatorContextTags;
}(
	this.DefaultMemberTag,
	this.AllMembersTag,
	this.OpeningMultipleMembersTag
);

this.IdentifierDeclarationPropertyNameContextTags = function(DeclarationPropertySeparatorTags, DeclarationPropertyNameInitializerTag, DeclarationPropertyNameSeparatorTag){
	/**
	 * 可声明的标识符属性名上下文标签列表
	 */
	function IdentifierDeclarationPropertyNameContextTags(){
		DeclarationPropertySeparatorTags.call(this);

		this.register(
			new DeclarationPropertyNameInitializerTag(),
			new DeclarationPropertyNameSeparatorTag()
		);
	};
	IdentifierDeclarationPropertyNameContextTags = new Rexjs(IdentifierDeclarationPropertyNameContextTags, DeclarationPropertySeparatorTags);

	return IdentifierDeclarationPropertyNameContextTags;
}(
	this.DeclarationPropertySeparatorTags,
	this.DeclarationPropertyNameInitializerTag,
	this.DeclarationPropertyNameSeparatorTag
);

this.ImportContextTags = function(MemberSeparatorContextTags, ModuleNameTag){
	function ImportContextTags(){
		MemberSeparatorContextTags.call(this);

		this.register(
			new ModuleNameTag()
		);
	};
	ImportContextTags = new Rexjs(ImportContextTags, MemberSeparatorContextTags);

	return ImportContextTags;
}(
	this.MemberSeparatorContextTags,
	this.ModuleNameTag
);

this.MemberSeparatorTags = function(MemberSeparatorTag, FromTag){
	/**
	 * 模块成员分隔符标签列表
	 */
	function MemberSeparatorTags(){
		IllegalTags.call(this);

		this.register(
			new MemberSeparatorTag(),
			new FromTag()
		);
	};
	MemberSeparatorTags = new Rexjs(MemberSeparatorTags, IllegalTags);

	return MemberSeparatorTags;
}(
	this.MemberSeparatorTag,
	this.FromTag
);

this.MemberVariableTags = function(MemberVariableTag){
	/**
	 * 模块成员标签列表
	 */
	function MemberVariableTags(){
		ECMAScriptTags.call(this);

		this.register(
			new MemberVariableTag()
		);
	};
	MemberVariableTags = new Rexjs(MemberVariableTags, ECMAScriptTags);

	return MemberVariableTags;
}(
	this.MemberVariableTag
);

this.ModuleAliasTags = function(ModuleAliasTag){
	/**
	 * as 标签列表
	 */
	function ModuleAliasTags(){
		IllegalTags.call(this);
		
		this.register(
			new ModuleAliasTag()
		);
	};
	ModuleAliasTags = new Rexjs(ModuleAliasTags, IllegalTags);

	return ModuleAliasTags;
}(
	this.ModuleAliasTag
);

this.ModuleNameTags = function(ModuleNameTag){
	/**
	 * 模块名称标签列表
	 */
	function ModuleNameTags(){
		IllegalTags.call(this);
		
		this.register(
			new ModuleNameTag()
		);
	};
	ModuleNameTags = new Rexjs(ModuleNameTags, IllegalTags);

	return ModuleNameTags;
}(
	this.ModuleNameTag
);

this.ModuleVariableTags = function(ModuleVariableTag){
	/**
	 * 模块变量名标签列表
	 */
	function ModuleVariableTags(){
		IllegalTags.call(this);
		
		this.register(
			new ModuleVariableTag()
		);
	};
	ModuleVariableTags = new Rexjs(ModuleVariableTags, IllegalTags);

	return ModuleVariableTags;
}(
	this.ModuleVariableTag
);

this.NegationContextTags = function(NegationSiblingTag, DecrementSiblingTag){
	/**
	 * 正号上下文标签列表
	 */
	function NegationContextTags(){
		ExpressionTags.call(this);
		
		this.register(
			new NegationSiblingTag(),
			new DecrementSiblingTag()
		);
	};
	NegationContextTags = new Rexjs(NegationContextTags, ExpressionTags);

	return NegationContextTags;
}(
	this.NegationSiblingTag,
	this.DecrementSiblingTag
);

this.NewContextTags = function(ExtendsContextTags, TargetAccessorTag, SuperTag, filter){
	/**
	 * new 关键字上下文标签列表
	 */
	function NewContextTags(){
		ExtendsContextTags.call(this);

		this.register(
			new TargetAccessorTag()
		);
	};
	NewContextTags = new Rexjs(NewContextTags, ExtendsContextTags);

	NewContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是 super 标签，则不修改 type，因为 new 后面不能接 super 关键字
			if(tag instanceof SuperTag){
				return false;
			}

			// 调用父类方法
			filter.call(this, tag);
		}
	});
	
	return NewContextTags;
}(
	this.ExtendsContextTags,
	this.TargetAccessorTag,
	this.SuperTag,
	this.ExtendsContextTags.prototype.filter
);

this.OpeningArgumentsContextTags = function(ArgumentNameTag, OpeningArgumentObjectDestructuringTag, OpeningArgumentArrayDestructuringTag, ArgumentRestOperatorTag, ClosingArgumentsTag){
	/**
	 * 起始参数上下文标签列表
	 */
	function OpeningArgumentsContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new ArgumentNameTag(),
			new OpeningArgumentObjectDestructuringTag(),
			new OpeningArgumentArrayDestructuringTag(),
			new ArgumentRestOperatorTag(),
			new ClosingArgumentsTag()
		);
	};
	OpeningArgumentsContextTags = new Rexjs(OpeningArgumentsContextTags, IllegalTags);

	return OpeningArgumentsContextTags;
}(
	this.ArgumentNameTag,
	this.OpeningArgumentObjectDestructuringTag,
	this.OpeningArgumentArrayDestructuringTag,
	this.ArgumentRestOperatorTag,
	this.ClosingArgumentsTag
);

this.OpeningArrayContextTags = function(ArraySpreadTag){
	/**
	 * 起始数组上下文标签列表
	 */
	function OpeningArrayContextTags(){
		ExpressionTags.call(this);

		this.register(
			new ArraySpreadTag()
		);
	};
	OpeningArrayContextTags = new Rexjs(OpeningArrayContextTags, ExpressionTags);

	return OpeningArrayContextTags;
}(
	this.ArraySpreadTag
);

this.OpeningMultiLineCommentContextTags = function(CommentContentTag, ClosingBlockCommentTag){
	/**
	 * 起始多行注释上下文标签列表
	 */
	function OpeningMultiLineCommentContextTags(){
		IllegalTags.call(this);

		this.register(
			new CommentContentTag(),
			new ClosingBlockCommentTag()
		);
	};
	OpeningMultiLineCommentContextTags = new Rexjs(OpeningMultiLineCommentContextTags, IllegalTags);

	return OpeningMultiLineCommentContextTags;
}(
	this.CommentContentTag,
	this.ClosingBlockCommentTag
);

this.OpeningGroupingContextTags = function(ArgumentIllegibleRestOperatorTag){
	/**
	 * 起始分组小括号上下文标签列表
	 */
	function OpeningGroupingContextTags(){
		ExpressionTags.call(this);

		this.register(
			new ArgumentIllegibleRestOperatorTag()
		);
	};
	OpeningGroupingContextTags = new Rexjs(OpeningGroupingContextTags, ExpressionTags);

	return OpeningGroupingContextTags;
}(
	this.ArgumentIllegibleRestOperatorTag
);

this.OpeningJsxContextTags = function(JSXIdentifierTag){
	/**
	 * 起始 JSX 上下文标签列表
	 */
	function OpeningJsxContextTags(){
		IllegalTags.call(this);

		this.register(
			new JSXIdentifierTag()
		);
	};
	OpeningJsxContextTags = new Rexjs(OpeningJsxContextTags, IllegalTags);

	return OpeningJsxContextTags;
}(
	this.JSXIdentifierTag
);

this.OpeningRestrictedCommentContextTags = function(OpeningMultiLineCommentContextTags, CommentBreakTag){
	/**
	 * 起始多行注释上下文标签列表
	 */
	function OpeningRestrictedCommentContextTags(){
		OpeningMultiLineCommentContextTags.call(this);

		this.register(
			new CommentBreakTag()
		);
	};
	OpeningRestrictedCommentContextTags = new Rexjs(OpeningRestrictedCommentContextTags, OpeningMultiLineCommentContextTags);

	return OpeningRestrictedCommentContextTags;
}(
	this.OpeningMultiLineCommentContextTags,
	this.CommentBreakTag
);

this.OpeningSwitchBodyContextTags = function(CaseTag, DefaultTag, ClosingSwitchBodyTag){
	/**
	 * switch 语句块起始上下文标签列表
	 */
	function OpeningSwitchBodyContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new CaseTag(),
			new DefaultTag(),
			new ClosingSwitchBodyTag()
		);
	};
	OpeningSwitchBodyContextTags = new Rexjs(OpeningSwitchBodyContextTags, IllegalTags);

	return OpeningSwitchBodyContextTags;
}(
	this.CaseTag,
	this.DefaultTag,
	this.ClosingSwitchBodyTag
);

this.OpeningDeclarationArrayContextTags = function(DeclarationArrayItemSeparatorTags, list){
	/**
	 * 起始变量声明数组上下文标签列表
	 */
	function OpeningDeclarationArrayContextTags(){
		DeclarationArrayItemSeparatorTags.call(this);

		this.delegate(list);
	};
	OpeningDeclarationArrayContextTags = new Rexjs(OpeningDeclarationArrayContextTags, DeclarationArrayItemSeparatorTags);

	return OpeningDeclarationArrayContextTags; 
}(
	this.DeclarationArrayItemSeparatorTags,
	// list
	[
		this.DeclarationArrayItemTag,
		this.DeclarationArrayRestTag,
		this.OpeningDeclarationNestedArrayItemTag,
		this.OpeningDeclarationArrayObjectItemTag
	]
);

this.ParameterTags = function(SpreadTag){
	/**
	 * 函数调用参数标签列表
	 */
	function ParameterTags(){
		ExpressionTags.call(this);
		
		this.register(
			new SpreadTag()
		);
	};
	ParameterTags = new Rexjs(ParameterTags, ExpressionTags);

	return ParameterTags;
}(
	this.SpreadTag
);

this.PlusContextTags = function(PlusSiblingTag, IncrementSiblingTag){
	/**
	 * 正号上下文标签列表
	 */
	function PlusContextTags(){
		ExpressionTags.call(this);
		
		this.register(
			new PlusSiblingTag(),
			new IncrementSiblingTag()
		);
	};
	PlusContextTags = new Rexjs(PlusContextTags, ExpressionTags);

	return PlusContextTags;
}(
	this.PlusSiblingTag,
	this.IncrementSiblingTag
);

this.PropertyNameContextTags = function(OpeningShorthandMethodArgumentsTag, PropertyNameSeparatorTag, ClosingObjectTag, ClosingBraceTag){
	/**
	 * 对象名称上下文标签列表
	 */
	function PropertyNameContextTags(){
		ECMAScriptTags.call(this);

		this.register(
			new OpeningShorthandMethodArgumentsTag(),
			new PropertyNameSeparatorTag(),
			new ClosingObjectTag(TYPE_ILLEGAL)
		);
	};
	PropertyNameContextTags = new Rexjs(PropertyNameContextTags, ECMAScriptTags);

	PropertyNameContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是结束大括号
			if(tag instanceof ClosingBraceTag){
				// 如果是结束对象大括号，则不过滤，否则其他都过滤
				return !(tag instanceof ClosingObjectTag);
			}
			
			return false;
		}
	});

	return PropertyNameContextTags;
}(
	this.OpeningShorthandMethodArgumentsTag,
	this.PropertyNameSeparatorTag,
	this.ClosingObjectTag,
	this.ClosingBraceTag
);

this.IdentifierPropertyNameContextTags = function(PropertyNameContextTags, PropertySeparatorTag, PropertyInitializerTag, ClosingObjectTag){
	/**
	 * 对象标识符名称上下文标签列表
	 */
	function IdentifierPropertyNameContextTags(){
		PropertyNameContextTags.call(this);

		this.register(
			new PropertySeparatorTag(),
			new PropertyInitializerTag(),
			new ClosingObjectTag(TYPE_UNEXPECTED)
		);
	};
	IdentifierPropertyNameContextTags = new Rexjs(IdentifierPropertyNameContextTags, PropertyNameContextTags);

	return IdentifierPropertyNameContextTags;
}(
	this.PropertyNameContextTags,
	this.PropertySeparatorTag,
	this.PropertyInitializerTag,
	this.ClosingObjectTag
);

this.OpeningClassBodyContextTags = function(ClassPropertyNameTags, StaticModifierTag){
	/**
	 * 类主体起始上下文标签列表
	 */
	function OpeningClassBodyContextTags(){
		ClassPropertyNameTags.call(this);

		this.register(
			new StaticModifierTag()
		);
	};
	OpeningClassBodyContextTags = new Rexjs(OpeningClassBodyContextTags, ClassPropertyNameTags);

	return OpeningClassBodyContextTags;
}(
	this.ClassPropertyNameTags,
	this.StaticModifierTag
);

this.PropertyNameTags = function(list){
	/**
	 * 对象属性名称标签列表
	 */
	function PropertyNameTags(){
		IllegalTags.call(this);

		this.delegate(list);
	};
	PropertyNameTags = new Rexjs(PropertyNameTags, IllegalTags);

	return PropertyNameTags;
}(
	// list
	[
		this.ClosingObjectTag,
		this.IdentifierPropertyNameTag,
		this.ConstantPropertyNameTag,
		this.NumberPropertyNameTag,
		this.BinaryNumberPropertyNameTag,
		this.OctalNumberPropertyNameTag,
		this.KeywordPropertyNameTag,
		this.StringPropertyNameTag,
		this.OpeningComputedPropertyNameTag,
		this.GetTag,
		this.SetTag,
		this.ShorthandGeneratorTag,
		this.SpreadPropertyTag
	]
);

this.PropertySeparatorTags = function(PropertySeparatorTag){
	/**
	 * 属性分隔符标签列表
	 */
	function PropertySeparatorTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new PropertySeparatorTag()
		);
	};
	PropertySeparatorTags = new Rexjs(PropertySeparatorTags, ECMAScriptTags);

	return PropertySeparatorTags;
}(
	this.PropertySeparatorTag
);

this.ArgumentRestNameTags = function(ArgumentRestNameTag){
	/**
	 * 省略参数名标签列表
	 */
	function ArgumentRestNameTags(){
		IllegalTags.call(this);
		
		this.register(
			new ArgumentRestNameTag()
		);
	};
	ArgumentRestNameTags = new Rexjs(ArgumentRestNameTags, IllegalTags);

	return ArgumentRestNameTags;
}(
	this.ArgumentRestNameTag
);

this.ArgumentRestNameContextTags = function(ArgumentRestValueSeparatorTag){
	/**
	 * 省略参数名上下文标签列表
	 */
	function ArgumentRestNameContextTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new ArgumentRestValueSeparatorTag()
		);
	};
	ArgumentRestNameContextTags = new Rexjs(ArgumentRestNameContextTags, ECMAScriptTags);

	return ArgumentRestNameContextTags;
}(
	this.ArgumentRestValueSeparatorTag
);

this.ReturnContextTags = function(OnlyStatementEndTags){
	/**
	 * return 上下文标签列表
	 */
	function ReturnContextTags(){
		ExpressionTags.call(this);
		
		this.register(
			new OnlyStatementEndTags()
		);
	};
	ReturnContextTags = new Rexjs(ReturnContextTags, ExpressionTags);

	return ReturnContextTags;
}(
	this.OnlyStatementEndTags
);

this.ShorthandMethodArgumentsTags = function(OpeningShorthandMethodArgumentsTag){
	/**
	 * 简写方法参数标签列表
	 */
	function ShorthandMethodArgumentsTags(){
		IllegalTags.call(this);

		this.register(
			new OpeningShorthandMethodArgumentsTag()
		);
	};
	ShorthandMethodArgumentsTags = new Rexjs(ShorthandMethodArgumentsTags, IllegalTags);

	return ShorthandMethodArgumentsTags;
}(
	this.OpeningShorthandMethodArgumentsTag
);

this.ShorthandMethodBodyTags = function(OpeningShorthandMethodBodyTag){
	/**
	 * 简写方法主体标签列表
	 */
	function ShorthandMethodBodyTags(){
		IllegalTags.call(this);

		this.register(
			new OpeningShorthandMethodBodyTag()
		);
	};
	ShorthandMethodBodyTags = new Rexjs(ShorthandMethodBodyTags, IllegalTags);

	return ShorthandMethodBodyTags;
}(
	this.OpeningShorthandMethodBodyTag
);

this.ShorthandMethodNameTags = function(list){
	/**
	 * 简写方法名标签列表
	 */
	function ShorthandMethodNameTags(){
		IllegalTags.call(this);
		
		this.delegate(list);
	};
	ShorthandMethodNameTags = new Rexjs(ShorthandMethodNameTags, IllegalTags);

	return ShorthandMethodNameTags;
}(
	// list
	[
		this.ClosingObjectTag,
		this.IdentifierMethodNameTag,
		this.NumberMethodNameTag,
		this.BinaryNumberMethodNameTag,
		this.OctalNumberMethodNameTag,
		this.StringMethodNameTag,
		this.OpeningComputedMethodNameTag
	]
);

this.AccessorDescriptorContextTags = function(ShorthandMethodNameTags, ConstructorTag, ClassPropertyInitializerTag, OpeningShorthandMethodArgumentsTag, PropertyAccessorTag){
	/**
	 * 访问器描述符上下文签列表
	 */
	function AccessorDescriptorContextTags(){
		ShorthandMethodNameTags.call(this);

		this.register(
			new ConstructorTag(),
			new ClassPropertyInitializerTag(),
			new OpeningShorthandMethodArgumentsTag()
		);
	};
	AccessorDescriptorContextTags = new Rexjs(AccessorDescriptorContextTags, ShorthandMethodNameTags);

	AccessorDescriptorContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			return tag instanceof PropertyAccessorTag;
		}
	});

	return AccessorDescriptorContextTags;
}(
	this.ShorthandMethodNameTags,
	this.ConstructorTag,
	this.ClassPropertyInitializerTag,
	this.OpeningShorthandMethodArgumentsTag,
	this.PropertyAccessorTag
);

this.PropertyAccessorContextTags = function(ShorthandMethodNameTags, OpeningShorthandMethodArgumentsTag, PropertyNameSeparatorTag, PropertySeparatorTag){
	/**
	 * 属性访问器上下文标签列表
	 */
	function PropertyAccessorContextTags(){
		ShorthandMethodNameTags.call(this);
		
		this.register(
			new OpeningShorthandMethodArgumentsTag(),
			new PropertyNameSeparatorTag(),
			new PropertySeparatorTag()
		);
	};
	PropertyAccessorContextTags = new Rexjs(PropertyAccessorContextTags, ShorthandMethodNameTags);

	return PropertyAccessorContextTags;
}(
	this.ShorthandMethodNameTags,
	this.OpeningShorthandMethodArgumentsTag,
	this.PropertyNameSeparatorTag,
	this.PropertySeparatorTag
);

this.StaticModifierContextTags = function(ClassPropertyNameTags, ClassStaticIdentifierPropertyNameTag, ClassPropertyInitializerTag, OpeningShorthandMethodArgumentsTag, ClassIdentifierPropertyNameTag, ConstructorTag, ClosingObjectTag, ClassPropertyPlaceholderTag){
	/**
	 * return 上下文标签列表
	 */
	function StaticModifierContextTags(){
		ClassPropertyNameTags.call(this);
		
		this.register(
			new ClassStaticIdentifierPropertyNameTag(),
			new ClassPropertyInitializerTag(),
			new OpeningShorthandMethodArgumentsTag()
		);
	};
	StaticModifierContextTags = new Rexjs(StaticModifierContextTags, ClassPropertyNameTags);

	StaticModifierContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是类的静态标识符属性名
			if(tag instanceof ClassStaticIdentifierPropertyNameTag){
				return false;
			}

			return (
				// 如果是类标识符属性名
				tag instanceof ClassIdentifierPropertyNameTag ||
				// 如果是构造函数
				tag instanceof ConstructorTag ||
				// 如果是结束大括号
				tag instanceof ClosingObjectTag ||
				// 如果是分号
				tag instanceof ClassPropertyPlaceholderTag
			);
		}
	})
	
	return StaticModifierContextTags;
}(
	this.ClassPropertyNameTags,
	this.ClassStaticIdentifierPropertyNameTag,
	this.ClassPropertyInitializerTag,
	this.OpeningShorthandMethodArgumentsTag,
	this.ClassIdentifierPropertyNameTag,
	this.ConstructorTag,
	this.ClosingObjectTag,
	this.ClassPropertyPlaceholderTag
);

this.SuperAccessorContextTags = function(list){
	/**
	 * 父类属性名上下文标签列表
	 */
	function SuperAccessorContextTags(){
		ExpressionContextTags.call(this);
		
		// 注册标签
		this.delegate(list);
	};
	SuperAccessorContextTags = new Rexjs(SuperAccessorContextTags, ExpressionContextTags);

	return SuperAccessorContextTags;
}(
	// list
	[
		this.OpeningSuperMethodCallTag,
		this.SuperPropertyBasicAssignmentTag,
		this.SuperPropertyShorthandAssignmentTag,
		this.SuperPropertyPostfixIncrementTag,
		this.SuperPropertyPostfixDecrementTag
	]
);

this.SuperContextTags = function(OpeningSuperCallTag, SuperDotAccessorTag, OpeningSuperBracketAccessorTag){
	/**
	 * super 关键字上下文标签列表
	 */
	function SuperContextTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new OpeningSuperCallTag(),
			new SuperDotAccessorTag(),
			new OpeningSuperBracketAccessorTag()
		);
	};
	SuperContextTags = new Rexjs(SuperContextTags, ECMAScriptTags);

	return SuperContextTags;
}(
	this.OpeningSuperCallTag,
	this.SuperDotAccessorTag,
	this.OpeningSuperBracketAccessorTag
);

this.SuperPropertyNameTags = function(SuperPropertyNameTag){
	/**
	 * 父类属性名标签列表
	 */
	function SuperPropertyNameTags(){
		IllegalTags.call(this);
		
		this.register(
			new SuperPropertyNameTag()
		);
	};
	SuperPropertyNameTags = new Rexjs(SuperPropertyNameTags, IllegalTags);

	return SuperPropertyNameTags;
}(
	this.SuperPropertyNameTag
);

this.SwitchBlockTags = function(OpeningSwitchBodyTag){
	/**
	 * switch 语句块标签列表
	 */
	function SwitchBlockTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpeningSwitchBodyTag()
		);
	};
	SwitchBlockTags = new Rexjs(SwitchBlockTags, IllegalTags);

	return SwitchBlockTags;
}(
	this.OpeningSwitchBodyTag
);

this.SwitchConditionTags = function(OpeningSwitchConditionTag){
	/**
	 * switch 条件标签列表
	 */
	function SwitchConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpeningSwitchConditionTag()
		);
	};
	SwitchConditionTags = new Rexjs(SwitchConditionTags, IllegalTags);

	return SwitchConditionTags;
}(
	this.OpeningSwitchConditionTag
);

this.TargetAccessorContextTags = function(TargetTag){
	/**
	 * new.target 属性访问器上下文标签列表
	 */
	function TargetAccessorContextTags(){
		IllegalTags.call(this);

		this.register(
			new TargetTag()
		);
	};
	TargetAccessorContextTags = new Rexjs(TargetAccessorContextTags, IllegalTags);

	return TargetAccessorContextTags;
}(
	this.TargetTag
);

this.TemplateContentTags = function(TemplateContentTag, OpeningPlaceHolderTag, TemplateLineTerminatorTag, TemplateQouteTag, ClosingTemplateTag){
	/**
	 * 模板内容上下文标签列表
	 */
	function TemplateContentTags(){
		ECMAScriptTags.call(this);

		this.register(
			new TemplateContentTag(),
			new OpeningPlaceHolderTag(),
			new TemplateLineTerminatorTag(TemplateLineTerminatorTag.CARRIAGE_RETURN),
			new TemplateLineTerminatorTag(TemplateLineTerminatorTag.LINE_SEPARATOR),
			new TemplateLineTerminatorTag(TemplateLineTerminatorTag.LINEFEED),
			new TemplateLineTerminatorTag(TemplateLineTerminatorTag.PARAGRAPH_SEPARATOR),
			new TemplateQouteTag(),
			new ClosingTemplateTag()
		);
	};
	TemplateContentTags = new Rexjs(TemplateContentTags, ECMAScriptTags);

	return TemplateContentTags;
}(
	this.TemplateContentTag,
	this.OpeningPlaceHolderTag,
	this.TemplateLineTerminatorTag,
	this.TemplateQouteTag,
	this.ClosingTemplateTag
);

this.TerminatedBranchFlowContextTags = function(LabelledIdentifierTag){
	/**
	 * 中断分支流上下文标签列表
	 */
	function TerminatedBranchFlowContextTags(){
		StatementEndTags.call(this);
		
		this.register(
			new LabelledIdentifierTag()
		);
	};
	TerminatedBranchFlowContextTags = new Rexjs(TerminatedBranchFlowContextTags, StatementEndTags);

	return TerminatedBranchFlowContextTags;
}(
	this.LabelledIdentifierTag
);

this.ThrowContextTags = function(ThrowContextLineTerminatorTag){
	/**
	 * throw 关键字上下文标签
	 */
	function ThrowContextTags(){
		ExpressionTags.call(this);
		
		this.register(
			new ThrowContextLineTerminatorTag()
		);
	};
	ThrowContextTags = new Rexjs(ThrowContextTags, ExpressionTags);

	return ThrowContextTags;
}(
	this.ThrowContextLineTerminatorTag
);

this.TryContextTags = function(ExtendsContextTags, OpeningBlockTag, filter){
	/**
	 * try 关键字上下文标签
	 */
	function TryContextTags(){
		ExtendsContextTags.call(this);
		
		this.register(
			new OpeningBlockTag()
		);
	};
	TryContextTags = new Rexjs(TryContextTags, ExtendsContextTags);

	TryContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			var value = filter.call(this, tag);

			// 如果是表达式标签
			if(tag.class.expression){
				// 如果是可以匹配的
				if(tag.type.matchable){
					// 设置为可匹配
					tag.type = new TagType(TYPE_MISTAKABLE);
				}
			}
			
			return value;
		}
	});
	
	return TryContextTags;
}(
	this.ExtendsContextTags,
	this.OpeningBlockTag,
	this.ExtendsContextTags.prototype.filter
);

this.UnexpectedTags = function(){
	/**
	 * 未捕获的标签列表
	 */
	function UnexpectedTags(){
		ECMAScriptTags.call(this);
	};
	UnexpectedTags = new Rexjs(UnexpectedTags, ECMAScriptTags);

	return UnexpectedTags;
}();

this.VarContextTags = function(VariableDeclarationTags, ClosureVariableTag){
	/**
	 * var 关键字上下文标签列表
	 */
	function VarContextTags(){
		VariableDeclarationTags.call(this);
		
		this.register(
			new ClosureVariableTag()
		);
	};
	VarContextTags = new Rexjs(VarContextTags, VariableDeclarationTags);

	return VarContextTags;
}(
	this.VariableDeclarationTags,
	this.ClosureVariableTag
);

this.VarDeclarationBreakContextTags = function(ClosureVariableContextTags, SpecialLineTerminatorTag, filter){
	/**
	 * var 语句变量声明换行符上下文标签列表
	 */
	function VarDeclarationBreakContextTags(){
		ClosureVariableContextTags.call(this);
	};
	VarDeclarationBreakContextTags = new Rexjs(VarDeclarationBreakContextTags, ClosureVariableContextTags);

	VarDeclarationBreakContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是特殊的换行符
			if(tag instanceof SpecialLineTerminatorTag){
				// 过滤掉
				return true;
			}

			// 如果是语句标签
			if(tag.class.statementBegin){
				// 设置类型
				tag.type = new TagType(TYPE_MISTAKABLE);
				return false;
			}
			
			// 调用父类方法
			return filter.call(this, tag);
		}
	});

	return VarDeclarationBreakContextTags;
}(
	this.ClosureVariableContextTags,
	this.SpecialLineTerminatorTag,
	this.ClosureVariableContextTags.prototype.filter
);

this.WhileConditionTags = function(OpeningWhileConditionTag){
	/**
	 * while 条件标签列表
	 */
	function WhileConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpeningWhileConditionTag()
		);
	};
	WhileConditionTags = new Rexjs(WhileConditionTags, IllegalTags);

	return WhileConditionTags;
}(
	this.OpeningWhileConditionTag
);

}.call(
	this,
	this.ECMAScriptTags,
	this.ExpressionTags,
	this.ExpressionContextTags,
	this.MistakableTags,
	this.StatementTags,
	this.StatementEndTags,
	this.IllegalTags
);