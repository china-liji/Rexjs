// 类的属性名相关
(function(closeClassComputedPropertyNameTag, require){

this.ClassIdentifierPropertyNameTag = function(IdentifierPropertyNameTag){
	/**
	 * 类标识符属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassIdentifierPropertyNameTag(_type){
		IdentifierPropertyNameTag.call(this, _type);
	};
	ClassIdentifierPropertyNameTag = new Rexjs(ClassIdentifierPropertyNameTag, IdentifierPropertyNameTag);

	ClassIdentifierPropertyNameTag.$({
		regexp: new RegExp(IDENTIFIER_REGEXP_SOURCE),
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

	ClassNumberPropertyNameTag.$({
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

	ClassBinaryNumberPropertyNameTag.$({
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

	ClassOctalNumberPropertyNameTag.$({
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

	ClassStringPropertyNameTag.$({
		require: require
	});

	return ClassStringPropertyNameTag;
}(
	this.StringPropertyNameTag
);

this.OpenClassComputedPropertyNameTag = function(OpenComputedPropertyNameTag){
	/**
	 * 起始类计算式属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenClassComputedPropertyNameTag(context){
		OpenComputedPropertyNameTag.call(this, context);
	};
	OpenClassComputedPropertyNameTag = new Rexjs(OpenClassComputedPropertyNameTag, OpenComputedPropertyNameTag);

	OpenClassComputedPropertyNameTag.$({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeClassComputedPropertyNameTag;
		}
	});

	return OpenClassComputedPropertyNameTag;
}(
	this.OpenComputedPropertyNameTag
);

this.CloseClassComputedPropertyNameTag = function(CloseComputedPropertyNameTag){
	/**
	 * 结束类计算式方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseClassComputedPropertyNameTag(context){
		CloseComputedPropertyNameTag.call(this, context);
	};
	CloseClassComputedPropertyNameTag = new Rexjs(CloseClassComputedPropertyNameTag, CloseComputedPropertyNameTag);

	CloseClassComputedPropertyNameTag.$({
		require: require
	});

	return CloseClassComputedPropertyNameTag;
}(
	this.CloseComputedPropertyNameTag
);

closeClassComputedPropertyNameTag = new this.CloseClassComputedPropertyNameTag();

}.call(
	this,
	// closeClassComputedPropertyNameTag
	NULL,
	// require
	function(tagsMap){
		return tagsMap.classIdentifierPropertyNameContextTags;
	}
));