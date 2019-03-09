import Rexjs, { Expression, ContentBuilder, DefaultExpression } from "../core";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";

export let FunctionExpression = function(appendVariable, appendHoisting, compileBody){
	/**
	 * 函数表达式
	 * @param {Context} context - 语法标签上下文
	 */
	return class FunctionExpression extends Expression {
		/**
		 * 函数参数表达式
		 * @type {Expression}
		 */
		arguments = null;

		/**
		 * 函数主体表达式
		 * @type {Expression}
		 */
		body = null;

		/**
		 * 函数头部表达式
		 * @type {Expression}
		 */
		head = null;

		/**
		 * 需要提升优先级的变量名列表
		 * @type {Array}
		 */
		hoistings = null;

		/**
		 * 表示函数迭代器的索引值
		 * @type {Number}
		 */
		index = 0;

		/**
		 * 函数名称表达式
		 * @type {Expression}
		 */
		name = new DefaultExpression();

		/**
		 * 生成器内部的变量名声明列表
		 * @type {Array}
		 */
		ranges = null;

		/**
		 * 迭代器符号上下文
		 * @type {Context}
		 */
		star = null;

		/**
		 * 临时变量名
		 * @type {String}
		 */
		variable = "";

		/**
		 * 获取当前索引字符串
		 * @returns {String}
		 */
		get currentIndexString(){
			return this.variable + ".index.current";
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			let defaultArgumentBuilder = new ContentBuilder();

			// 提取函数头部
			this.head.extractTo(contentBuilder);

			// 如果存在星号，说明是生成器
			if(this.star){
				// 如果需要编译
				if(ECMAScriptConfig.es6Base){
					let {
						body: {
							inner,
							inner: {
								collections
							}
						},
						ranges
					} = this;

					this.variable = collections.generate();

					// 提取函数名称
					this.name.extractTo(contentBuilder);
					// 提取函数参数
					this.arguments.extractTo(contentBuilder, defaultArgumentBuilder);

					// 追加临时变量名的声明
					contentBuilder.appendString(
						"{var " + collections.rex.toString("", ",", "")
					);

					// 追加生成器内部的变量名声明
					for(let i = 0, j = ranges.length;i < j;i++){
						ranges[i].forEach(appendVariable, contentBuilder);
					}
					
					// 追加声明语句的分号
					contentBuilder.appendString(";");
					// 追加变量提升表达式
					this.hoistings.forEach(appendHoisting, contentBuilder);

					// 编译主体代码
					compileBody(this, defaultArgumentBuilder, inner, contentBuilder);
					return;
				}

				// 追加星号上下文
				contentBuilder.appendContext(this.star);
			}
			
			// 提取函数名称
			this.name.extractTo(contentBuilder);
			// 提取函数参数
			this.arguments.extractTo(contentBuilder, defaultArgumentBuilder);
			// 提取函数主体
			this.body.extractTo(contentBuilder, defaultArgumentBuilder);
		};
		
		/**
		 * 设置迭代器的下一个索引
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {Number}
		 */
		nextIndex(contentBuilder){
			return ++this.index;
		};

		/**
		 * 转化为生成器
		 * @param {Context} star - 生成器星号上下文
		 * @returns {void}
		 */
		toGenerator(star){
			this.star = star;
			this.ranges = [];
			this.hoistings = [];
		};
	};
}(
	// appendVariable
	(variable, contentBuilder) => {
		contentBuilder.appendString("," + variable);
	},
	// appendHoisting
	function(hoisting){
		hoisting.extractTo(this);
	},
	// compileBody
	(expression, defaultArgumentBuilder, inner, contentBuilder) => {
		let { variable, currentIndexString } = expression;

		// 追加迭代器代码
		contentBuilder.appendString(
			defaultArgumentBuilder.result +
			variable +
			"=new Rexjs.FunctionIterator(function(){for(;;){switch(" +
			currentIndexString +
			"){case " +
			expression.index +
			":"
		);

		// 提取函数主体
		Rexjs.Statements.prototype.extractTo.call(inner, contentBuilder);
		
		// 追加迭代器结束代码及生成器代码
		contentBuilder.appendString(
			"default:" +
			currentIndexString +
			"=NaN;return void 0;}}},this,arguments);return new Rexjs.Generator(" +
			variable +
			");}"
		);
	}
);