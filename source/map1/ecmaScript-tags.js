// ECMAScript 标签列表相关
!function(){

this.ECMAScriptTags = function(DefaultTags, list){
	/**
	 * ECMAScript 标签列表
	 * @param {Number} _type - 该标签列表中，所有标签的初始化类型
	 */
	function ECMAScriptTags(_type){
		DefaultTags.call(this);

		// 注册标签
		this.delegate(list, _type || TYPE_UNEXPECTED);
	};
	ECMAScriptTags = new Rexjs(ECMAScriptTags, DefaultTags);

	ECMAScriptTags.static({
		mappable: true
	});
	
	return ECMAScriptTags;
}(
	Rexjs.DefaultTags,
	// list
	[
		this.ArgumentsTag,
		this.ArrowTag,
		this.BasicAssignmentTag,
		this.BinaryNumberTag,
		this.BitwiseANDTag,
		this.BitwiseNOTTag,
		this.BitwiseORTag,
		this.BitwiseXORTag,
		this.BooleanTag,
		this.BreakTag,
		this.CaseTag,
		this.CatchTag,
		this.ClassDeclarationTag,
		this.ClosingBraceTag,
		this.ClosingBracketTag,
		this.ClosingParenTag,
		this.ColonTag,
		this.CommaTag,
		this.ConstTag,
		this.ContinueTag,
		this.DebuggerTag,
		this.DefaultTag,
		this.DecrementTag,
		this.DeleteTag,
		this.DivisionTag,
		this.DoTag,
		this.DotTag,
		this.ElseTag,
		this.EmptyStatementTag,
		this.EqualityTag,
		this.ExponentiationTag,
		this.ExportTag,
		this.ExtendsTag,
		this.EvalTag,
		this.FileEndTag,
		this.FinallyTag,
		this.ForTag,
		this.FunctionDeclarationTag,
		this.GreaterThanOrEqualTag,
		this.GreaterThanTag,
		this.IdentityTag,
		this.IfTag,
		this.ImportTag,
		this.InTag,
		this.IncrementTag,
		this.InequalityTag,
		this.InstanceofTag,
		this.LabelTag,
		this.LeftShiftTag,
		this.LessThanOrEqualTag,
		this.LessThanTag,
		this.LetTag,
		this.LogicalANDTag,
		this.LogicalNOTTag,
		this.LogicalORTag,
		this.MultiplicationTag,
		this.NegationTag,
		this.NewTag,
		this.NonidentityTag,
		this.NullTag,
		this.NumberTag,
		this.OctalNumberTag,
		this.OpeningArrayTag,
		this.OpeningBlockTag,
		this.OpeningGroupingTag,
		this.OpeningJSXElementTag,
		this.OpeningMultiLineCommentTag,
		this.OpeningTemplateTag,
		this.PlusTag,
		this.QuestionAssignmentTag,
		this.QuestionTag,
		this.RegExpTag,
		this.RemainderTag,
		this.ReturnTag,
		this.RightShiftTag,
		this.ShorthandAssignmentTag,
		this.SingleLineCommentTag,
		this.SpreadTag,
		this.StaticTag,
		this.StringTag,
		this.SuperTag,
		this.SwitchTag,
		this.ThisTag,
		this.ThrowTag,
		this.TryTag,
		this.TypeofTag,
		this.ZeroFillRightShiftTag,
		this.VarTag,
		this.VoidTag,
		this.WhileTag,
		this.WithTag,
		this.YieldTag
	]
);
	
}.call(
	this
);