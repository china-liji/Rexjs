// ECMAScript 解析器相关
~function(SyntaxParser){

this.ECMAScriptTagsMap = function(SyntaxTagsMap, tagsArray){
	/**
	 * ECMAScript 标签列表映射，初始化该类是个耗性能过程，建议作为单例使用
	 */
	function ECMAScriptTagsMap(){
		SyntaxTagsMap.call(this);
		
		tagsArray.forEach(
			function(Tags){
				this.map(
					new Tags()
				);
			},
			this
		);
	};
	ECMAScriptTagsMap = new Rexjs(ECMAScriptTagsMap, SyntaxTagsMap);
	
	return ECMAScriptTagsMap;
}(
	Rexjs.SyntaxTagsMap,
	// tagsArray
	[
		// 基类标签列表
		this.ExpressionTags,
		this.ExpressionContextTags,
		this.MistakableTags,
		this.IllegalTags,
		this.StatementTags,
		this.StatementEndTags,
		// 其他标签列表
		this.AccessorDescriptorContextTags,
		this.ArgumentNameContextTags,
		this.ArgumentSeparatorContextTags,
		this.ArrowContextTags,
		this.BlockTags,
		this.CatchedExceptionTags,
		this.ClassContextTags,
		this.ClassNameContextTags,
		this.ClassPropertyNameTags,
		this.ClassVariableTags,
		this.CloseArrowFunctionBodyContextTags,
		this.CloseCatchedExceptionTags,
		this.ClosureVariableContextTags,
		this.ConstContextTags,
		this.ConstructorArgumentsTags,
		this.ConstructorBodyTags,
		this.DeclarationArrayItemContextTags,
		this.DeclarationArrayItemSeparatorTags,
		this.DeclarationPropertyNameSeparatorTags,
		this.DeclarationPropertyNameTags,
		this.DeclarationPropertySeparatorTags,
		this.DeclarationPropertyValueContextTags,
		this.DeclarationPropertyValueTags,
		this.DestructibleExpressionContextTags,
		this.DestructuringAssignmentTags,
		this.DoWhileConditionTags,
		this.DotAccessorContextTags,
		this.ExceptionVariableTags,
		this.ExecContextTags,
		this.ExportContextTags,
		this.ExtendsContextTags,
		this.FileStartTags,
		this.ForConditionTags,
		this.ForConditionContextTags,
		this.FunctionArgumentTags,
		this.FunctionBodyTags,
		this.FunctionContextTags,
		this.FunctionDeclarationContextTags,
		this.IdentifierPropertyNameContextTags,
		this.IfConditionTags,
		this.IdentifierDeclarationPropertyNameContextTags,
		this.ImportContextTags,
		this.LabelContextTags,
		this.LetContextTags,
		this.MemberAliasVariableTags,
		this.MemberContextTag,
		this.MemberSeparatorContextTags,
		this.MemberSeparatorTags,
		this.MemberVariableTags,
		this.ModuleAliasTags,
		this.ModuleNameTags,
		this.ModuleVariableTags,
		this.NegationContextTags,
		this.OpenArgumentsContextTags,
		this.OpenClassBodyContextTags,
		this.OpenMultiLineCommentContextTags,
		this.OpenGroupingContextTags,
		this.OpenRestrictedCommentContextTags,
		this.OpenSwitchBodyContextTags,
		this.OpenDeclarationArrayContextTags,
		this.ParameterTags,
		this.PlusContextTags,
		this.PropertyAccessorContextTags,
		this.PropertyNameTags,
		this.PropertyNameContextTags,
		this.PropertySeparatorTags,
		this.RestArgumentNameTags,
		this.RestArgumentNameContextTags,
		this.RestrictedExpressionContextTags,
		this.ReturnContextTags,
		this.ShorthandMethodArgumentsTags,
		this.ShorthandMethodBodyTags,
		this.ShorthandMethodNameTags,
		this.StaticModifierContextTags,
		this.SwitchBlockTags,
		this.SwitchConditionTags,
		this.TargetAccessorContextTags,
		this.TemplateContentTags,
		this.TerminatedBranchFlowContextTags,
		this.ThrowContextTags,
		this.TryContextTags,
		this.UnexpectedTags,
		this.VarContextTags,
		this.VariableDeclarationTags,
		this.WhileConditionTags
	]
);

this.ECMAScriptParser = function(ECMAScriptTagsMap, GlobalStatements, tagsMap, parse){
	/**
	 * ECMAScript 语法解析器
	 */
	function ECMAScriptParser(){
		SyntaxParser.call(this);

		this.deps = [];
	};
	ECMAScriptParser = new Rexjs(ECMAScriptParser, SyntaxParser);

	ECMAScriptParser.props({
		/**
		 * 将解析后的语法生成字符串
		 * @param {ContentBuilder} _contentBuilder - 内容生成器
		 */
		build: function(_contentBuilder){
			var contentBuilder = _contentBuilder || new ContentBuilder();
			
			// 追加闭包函数起始部分
			contentBuilder.appendString("~function(){");
			// 创建新行
			contentBuilder.newline();
			// 追加严格表达式字符串
			contentBuilder.appendString('"use strict";');
			// 创建新行
			contentBuilder.newline();

			// 提取语法列表内容
			this.statements.extractTo(contentBuilder);
			
			// 创建新行
			contentBuilder.newline();
			// 追加闭包函数结束部分
			contentBuilder.appendString("}();");

			return contentBuilder.complete();
		},
		defaultExported: false,
		deps: null,
		/**
		 * 开始解析
		 * @param {File} file - 文件信息
		 */
		parse: function(file){
			parse.call(
				this,
				file,
				/*
					如果 tagsMap 没有初始化，则初始化，
					在这里初始化的目的是为了：
					1. 当不使用 ECMAScriptParser 时，不会耗性能
					2. 就算多次使用 ECMAScriptParser，也不会多次初始化 ECMAScriptTagsMap
				*/
				tagsMap || (tagsMap = new ECMAScriptTagsMap()),
				new GlobalStatements()
			);
		}
	});

	return ECMAScriptParser;
}(
	this.ECMAScriptTagsMap,
	this.GlobalStatements,
	// tagsMap
	null,
	SyntaxParser.prototype.parse
);
	
}.call(
	this,
	Rexjs.SyntaxParser
);