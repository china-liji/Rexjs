// 属性访问器相关
!function(){

this.AccessorExpression = function(AssignableExpression){
	/**
	 * 属性访问器表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} object - 拥有该属性的对象
	 */
	function AccessorExpression(context, object){
		AssignableExpression.call(this, context);

		this.object = object;
	};
	AccessorExpression = new Rexjs(AccessorExpression, AssignableExpression);
	
	AccessorExpression.$({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取对象表达式
			this.object.extractTo(contentBuilder);
			
			// 追加点
			contentBuilder.appendContext(this.context);
			// 追加属性
			contentBuilder.appendContext(this.property);
		},
		/**
		 * 可无实质性的提升表达式（可提升就提升，不可提升则不处理），即将其脱离当前语句流，但需保留其结构语法
		 * @param {ListExpression} list - 记录提升表达式的列表
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		hoist: function(list, statements){
			// 实质性的提升表达式
			this.hoisting(list, statements);
			return true;
		},
		object: NULL,
		property: NULL
	});
	
	return AccessorExpression;
}(
	this.AssignableExpression
);

}.call(
	this
);