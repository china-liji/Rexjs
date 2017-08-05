// 语法配置相关
~function(){

this.ECMAScript6Config = function(configs, forEach, every, defineProperty){
	/**
	 * ECMAScript6 语法配置
	 */
	function ECMAScript6Config(){
		SyntaxConfig.call(this);
	};
	ECMAScript6Config = new Rexjs(ECMAScript6Config, SyntaxConfig);

	ECMAScript6Config.static({
		/**
		 * 获取是否全部表达式都需要编译
		 */
		get all(){
			return every(
				this,
				function(value){
					return value;
				}
			);
		},
		/**
		 * 设置是否全部表达式都需要编译
		 * @param {Boolean} value - 是否都需要编译
		 */
		set all(value){
			forEach(
				this,
				function(oldValue, name){
					this[name] = value;
				},
				this
			);
		}
	});

	// 遍历所有配置
	forEach(
		configs,
		function(config){
			// 遍历单个配置项
			forEach(config, this, config);
		},
		function(value, name){
			var config = this;

			// 定义静态属性
			defineProperty(
				ECMAScript6Config,
				name,
				{
					// 获取
					get: function(){
						return config[name];
					},
					// 设置
					set: function(value){
						config[name] = value;
					},
					enumerable: true,
					configurable: true
				}
			);
		}
	);
	
	return ECMAScript6Config;
}(
	// configs
	[
		"Call",
		"Destructuring",
		"Exponentiation",
		"Export",
		"For",
		"Function",
		"Import",
		"Literal",
		"Object",
		"Property",
		"Template",
		"TryFunction",
		"Var"
	]
	.map(
		function(prefix){
			return this[prefix + "Expression"].config;
		},
		this
	),
	Rexjs.forEach,
	Rexjs.every,
	Object.defineProperty
);

}.call(
	this
);