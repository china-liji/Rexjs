// 父类属性赋值相关
!function(BinaryExpression){

this.SuperPropertyBasicAssignmentExpression = function(extractTo){
	/**
	 * 二元表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} left - 该二元表达式左侧运算的表达式
	 */
	function SuperPropertyBasicAssignmentExpression(context, left){
		BinaryExpression.call(this, context, left);
	};
	SuperPropertyBasicAssignmentExpression = new Rexjs(SuperPropertyBasicAssignmentExpression);

	SuperPropertyBasicAssignmentExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				var left = this.left;

				// 追加设置父类属性方法的起始代码
				contentBuilder.appendString("(Rexjs.Super.setProperty(");
				// 提取 super 表达式
				left.object.extractTo(contentBuilder);
				// 追加当前环境的 this 指向
				contentBuilder.appendString("," + left.closureReference + ",");
				// 编译属性名
				left.compilePropertyTo(contentBuilder);
				// 追加参数分隔符
				contentBuilder.appendString(",");
				// 追加属性值
				this.right.extractTo(contentBuilder);
				// 追加一系列结束小括号
				contentBuilder.appendString("))");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});
	
	return SuperPropertyBasicAssignmentExpression;
}(
	BinaryExpression.prototype.extractTo
);

this.SuperPropertyBasicAssignmentTag = function(BasicAssignmentTag, SuperPropertyBasicAssignmentExpression){
	/**
	 * 父类属性基础赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperPropertyBasicAssignmentTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	SuperPropertyBasicAssignmentTag = new Rexjs(SuperPropertyBasicAssignmentTag, BasicAssignmentTag);
	
	SuperPropertyBasicAssignmentTag.props({
		order: ECMAScriptOrders.SUPER_PROPERTY_ASSIGNMENT,
		/**
		 * 将该二元标签转换为二元表达式
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Expression} left - 该二元表达式左侧运算的表达式
		 */
		toExpression: function(context, left){
			return new SuperPropertyBasicAssignmentExpression(context, left);
		}
	});
	
	return SuperPropertyBasicAssignmentTag;
}(
	this.BasicAssignmentTag,
	this.SuperPropertyBasicAssignmentExpression
);

}.call(
	this,
	this.BinaryExpression
);