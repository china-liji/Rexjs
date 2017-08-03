// 类属性访问器标签相关
~function(require){

this.GetDescriptorTag = function(GetTag){
	/**
	 * 类属性访问器 get 标签
	 * @param {Number} _type - 标签类型
	 */
	function GetDescriptorTag(context){
		GetTag.call(this, context);
	};
	GetDescriptorTag = new Rexjs(GetDescriptorTag, GetTag);

	GetDescriptorTag.props({
		require: require
	});

	return GetDescriptorTag;
}(
	this.GetTag
);

this.SetDescriptorTag = function(SetTag){
	/**
	 * 类属性访问器 set 标签
	 * @param {Number} _type - 标签类型
	 */
	function SetDescriptorTag(context){
		SetTag.call(this, context);
	};
	SetDescriptorTag = new Rexjs(SetDescriptorTag, SetTag);

	SetDescriptorTag.props({
		require: require
	});

	return SetDescriptorTag;
}(
	this.SetTag
);

}.call(
	this,
	// require
	function(tagsMap){
		return tagsMap.accessorDescriptorContextTags;
	}
);