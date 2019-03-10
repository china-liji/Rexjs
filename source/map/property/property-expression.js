import { BinaryExpression } from "../binary-operator/binary-expression";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";

export let PropertyExpression = function(){
	return class PropertyExpression extends BinaryExpression {
		/**
		 * 属性访符上下文
		 * @type {Context}
		 */
		accessor = null;

		/**
		 * 属性名称
		 * @type {Expression}
		 */
		name = null;

		/**
		 * 属性生成器的星号上下文
		 * @type {Context}
		 */
		star = null;

		/**
		 * 属性值
		 * @type {Expression}
		 */
		value = null;

		/**
		 * 对象属性表达式
		 */
		constructor(){
			super(null, null);
		};

		/**
		 * 获取该属性是否为访问器属性
		 * @returns {Boolean}
		 */
		get accessible(){
			return this.named(this.accessor);
		};
		
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @returns {void}
		 */
		compileTo(contentBuilder, anotherBuilder){
			// 如果是访问器
			if(this.accessible){
				// 追加 defineProperty 的调用
				contentBuilder.appendString("Object.defineProperty(" + anotherBuilder.result + ",");
				// 提取属性名
				this.name.defineTo(contentBuilder);
				// 追加属性描述符
				contentBuilder.appendString(",{configurable:true,enumerable:true,");
				// 追加访问器内容
				contentBuilder.appendString(this.accessor.content);
				// 提取属性值
				this.value.defineTo(contentBuilder);
				// 追加结束调用
				contentBuilder.appendString("}),");
				return;
			}

			// 追加临时变量名
			contentBuilder.appendString(anotherBuilder.result);
			// 编译属性名
			this.name.compileTo(contentBuilder);
			// 编译属性值
			this.value.compileTo(contentBuilder);
			// 追加表达式分隔符逗号
			contentBuilder.appendString(",");
		};
		
		/**
		 * 获取标签上下文
		 * @returns {Context}
		 */
		get context(){
			return this.value.context;
		};


		/**
		 * 设置标签上下文
		 * @parma {Context} value - 标签上下文
		 * @returns {Context}
		 */
		set context(value){};
		
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			let { name, value } = this;

			// 如果是访问器
			if(this.accessible){
				// 追加访问器
				contentBuilder.appendContext(this.accessor);
				// 追加空格
				contentBuilder.appendSpace();
				// 提取属性名称
				name.extractTo(contentBuilder);
				// 直接以简写形式提取表达式文本内容
				value.shortTo(contentBuilder);
				return;
			}

			// 如果存在星号，说明是生成器属性
			if(this.star){
				// 如果需要编译
				if(ECMAScriptConfig.es6Base){
					// 提取属性名称
					name.extractTo(contentBuilder);
					// 以定义属性的模式提取表达式文本内容
					value.defineTo(contentBuilder);
					return;
				}

				// 设置生成器属性的属性名称
				value.operand.name = this.name;
				
				// 提取属性值
				value.extractTo(contentBuilder);
				return;
			}

			// 提取属性名称
			name.extractTo(contentBuilder);
			// 提取属性值
			value.extractTo(contentBuilder);
		};

		/**
		 * 获取该二元表达式所关联的最后一个二元表达式
		 * @returns {Expression}
		 */
		get last(){
			return this;
		};

		/**
		 * 设置该二元表达式所关联的最后一个二元表达式
		 * @param {BinaryExpression} value - 二元表达式
		 * @returns {Expression}
		 */
		set last(value){};

		/**
		 * 获取该二元表达式的左侧表达式
		 * @returns {Expression}
		 */
		get left(){
			return this.name;
		};
		
		/**
		 * 设置该二元表达式的左侧表达式
		 * @parma {Expression} value - 左侧表达式
		 * @returns {Expression}
		 */
		set left(value){};
		
		/**
		 * 判断非属性名标签上下文是否已经用于属性名
		 * @param {Context} context - 需要判断的指定标签
		 * @returns {Boolean}
		 */
		named(context){
			switch(context){
				// 如果 context 不存在
				case null:
					break;

				// 如果 context 仅仅是属性名
				case this.name.context:
					break;

				default:
					return true;
			}

			return false;
		};

		/**
		 * 请求获取相关对象表达式的临时变量名，如果没有，则先生成变量名
		 * @param {Statements} statements - 对象表达式所处的语句块
		 * @param {ObjectExpression} objectExpression - 对象表达式
		 * @returns {String}
		 */
		requestVariableOf(statements, objectExpression){
			let { variable } = objectExpression;

			// 如果对象变量不存在
			if(!variable){
				// 给对象表达式生成并记录变量名
				objectExpression.variable = variable = statements.collections.generate();
			}

			return variable;
		};

		/**
		 * 获取该二元表达式的右侧表达式
		 * @returns {Expression}
		 */
		get right(){
			return this.value.operand;
		};

		/**
		 * 设置该二元表达式的右侧表达式
		 * @param {Expression} value - 左侧表达式
		 * @returns {Expression}
		 */
		set right(value){};
		
		/**
		 * 给相关对象表达式设置编译时所需使用的临时变量名
		 * @param {Statements} statements - 对象表达式所处的语句块
		 * @param {ObjectExpression} objectExpression - 对象表达式
		 * @returns {void}
		 */
		setCompiledVariableTo(statements, objectExpression){
			// 请求获取相关对象表达式的临时变量名
			this.requestVariableOf(statements, objectExpression);

			// 将对象表达式设置为需要编译
			objectExpression.needCompile = true;
		};
	};
}();