// 类的属性名相关
(function(closingClassComputedPropertyNameTag, require){

this.ClassIdentifierPropertyNameTag = function(IdentifierPropertyNameTag){
	/**
	 * 类标识符属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassIdentifierPropertyNameTag(_type){
		IdentifierPropertyNameTag.call(this, _type);
	};
	ClassIdentifierPropertyNameTag = new Rexjs(ClassIdentifierPropertyNameTag, IdentifierPropertyNameTag);

	ClassIdentifierPropertyNameTag.props({
		regexp: new RegExp(IdentifierPropertyNameTag.REGEXP_SOURCE),
		require: require
	});

	return ClassIdentifierPropertyNameTag;
}(
	this.IdentifierPropertyNameTag
);

this.ClassNumberPropertyNameTag = function(NumberPropertyNameTag){
	/**
	 * 类数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassNumberPropertyNameTag(context){
		NumberPropertyNameTag.call(this, context);
	};
	ClassNumberPropertyNameTag = new Rexjs(ClassNumberPropertyNameTag, NumberPropertyNameTag);

	ClassNumberPropertyNameTag.props({
		require: require
	});

	return ClassNumberPropertyNameTag;
}(
	this.NumberPropertyNameTag
);

this.ClassBinaryNumberPropertyNameTag = function(BinaryNumberPropertyNameTag){
	/**
	 * 类二进制数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassBinaryNumberPropertyNameTag(context){
		BinaryNumberPropertyNameTag.call(this, context);
	};
	ClassBinaryNumberPropertyNameTag = new Rexjs(ClassBinaryNumberPropertyNameTag, BinaryNumberPropertyNameTag);

	ClassBinaryNumberPropertyNameTag.props({
		require: require
	});

	return ClassBinaryNumberPropertyNameTag;
}(
	this.BinaryNumberPropertyNameTag
);

this.ClassOctalNumberPropertyNameTag = function(OctalNumberPropertyNameTag){
	/**
	 * 类八进制数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassOctalNumberPropertyNameTag(context){
		OctalNumberPropertyNameTag.call(this, context);
	};
	ClassOctalNumberPropertyNameTag = new Rexjs(ClassOctalNumberPropertyNameTag, OctalNumberPropertyNameTag);

	ClassOctalNumberPropertyNameTag.props({
		require: require
	});

	return ClassOctalNumberPropertyNameTag;
}(
	this.OctalNumberPropertyNameTag
);

this.ClassStringPropertyNameTag = function(StringPropertyNameTag){
	/**
	 * 类字符串属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassStringPropertyNameTag(context){
		StringPropertyNameTag.call(this, context);
	};
	ClassStringPropertyNameTag = new Rexjs(ClassStringPropertyNameTag, StringPropertyNameTag);

	ClassStringPropertyNameTag.props({
		require: require
	});

	return ClassStringPropertyNameTag;
}(
	this.StringPropertyNameTag
);

this.OpeningClassComputedPropertyNameTag = function(OpeningComputedPropertyNameTag){
	/**
	 * 起始类计算式属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningClassComputedPropertyNameTag(context){
		OpeningComputedPropertyNameTag.call(this, context);
	};
	OpeningClassComputedPropertyNameTag = new Rexjs(OpeningClassComputedPropertyNameTag, OpeningComputedPropertyNameTag);

	OpeningClassComputedPropertyNameTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingClassComputedPropertyNameTag;
		}
	});

	return OpeningClassComputedPropertyNameTag;
}(
	this.OpeningComputedPropertyNameTag
);

this.ClosingClassComputedPropertyNameTag = function(ClosingComputedPropertyNameTag){
	/**
	 * 结束类计算式方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingClassComputedPropertyNameTag(context){
		ClosingComputedPropertyNameTag.call(this, context);
	};
	ClosingClassComputedPropertyNameTag = new Rexjs(ClosingClassComputedPropertyNameTag, ClosingComputedPropertyNameTag);

	ClosingClassComputedPropertyNameTag.props({
		require: require
	});

	return ClosingClassComputedPropertyNameTag;
}(
	this.ClosingComputedPropertyNameTag
);

closingClassComputedPropertyNameTag = new this.ClosingClassComputedPropertyNameTag();

}.call(
	this,
	// closingClassComputedPropertyNameTag
	null,
	// require
	function(tagsMap){
		return tagsMap.classIdentifierPropertyNameContextTags;
	}
));