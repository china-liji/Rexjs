// 算数标签相关
!function(){

this.MathematicalNumberTag = function(NumberTag){
	/**
	 * 算数数字标签
	 * @param {Number} _type - 标签类型
	 */
	function MathematicalNumberTag(_type){
		NumberTag.call(this, _type);
	};
	MathematicalNumberTag = new Rexjs(MathematicalNumberTag, NumberTag);
	
	MathematicalNumberTag.$({
		/**
		 * 提取文本内容，空函数，不做任何处理
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加字符串内容
			contentBuilder.appendString(
				// 如果需要编译
				config.es6Base ?
					// 转换为指定基数的数字
					'(parseInt("' + content.substring(2) + '",' + this.radix + "))" :
					content
			);
		},
		order: ECMAScriptOrders.MATHEMATICAL_NUMBER,
		radix: "10"
	});
	
	return MathematicalNumberTag;
}(
	this.NumberTag
);

this.BinaryNumberTag = function(MathematicalNumberTag){
	/**
	 * 二进制数字标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryNumberTag(_type){
		MathematicalNumberTag.call(this, _type);
	};
	BinaryNumberTag = new Rexjs(BinaryNumberTag, MathematicalNumberTag);
	
	BinaryNumberTag.$({
		radix: "2",
		regexp: /0[bB][01]+/
	});
	
	return BinaryNumberTag;
}(
	this.MathematicalNumberTag
);

this.OctalNumberTag = function(MathematicalNumberTag){
	/**
	 * 八进制数字标签
	 * @param {Number} _type - 标签类型
	 */
	function OctalNumberTag(_type){
		MathematicalNumberTag.call(this, _type);
	};
	OctalNumberTag = new Rexjs(OctalNumberTag, MathematicalNumberTag);
	
	OctalNumberTag.$({
		radix: "8",
		regexp: /0[oO][0-7]+/
	});
	
	return OctalNumberTag;
}(
	this.MathematicalNumberTag
);

}.call(
	this
);