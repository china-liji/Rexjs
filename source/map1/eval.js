// eval 标识符相关
!function(){

this.EvalTag = function(EnvConstantTag){
	/**
	 * eval 标签
	 * @param {Number} _type - 标签类型
	 */
	function EvalTag(_type){
		EnvConstantTag.call(this, _type);
	};
	EvalTag = new Rexjs(EvalTag, EnvConstantTag);

	EvalTag.props({
		regexp: /eval/
	});

	return EvalTag;
}(
	this.EnvConstantTag
);

}.call(
	this
);