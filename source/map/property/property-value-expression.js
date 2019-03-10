import { Expression } from "../core";

export let PropertyValueExpression = function(){
	/**
	 * 对象属性值表达式
	 * @param {Context} context - 语法标签上下文
	 */
	return class PropertyValueExpression extends Expression {
		/**
		 * 该属性是否为解构项
		 * @type {Boolean}
		 */
		destructuringItem = false;

		/**
		 * 该属性访问器的操作对象
		 * @type {Expression}
		 */
		operand = null;

		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		defineTo(contentBuilder){
			this.extractTo(contentBuilder);
		};

		/**
		 * 以解构方式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @returns {void}
		 */
		destructTo(contentBuilder, anotherBuilder){
			// 如果是子解构项
			if(this.destructuringItem){
				// 提取操作对象
				this.operand.compileTo(contentBuilder, anotherBuilder);
				return;
			}

			// 追加表达式分隔符
			contentBuilder.appendString(",");
			// 提取操作对象
			this.operand.extractTo(contentBuilder);
			// 追加赋值操作表达式
			contentBuilder.appendString("=" + anotherBuilder.result);
		};

		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		compileTo(contentBuilder){
			// 追加赋值符号
			contentBuilder.appendString("=");
			// 提取属性值
			this.operand.extractTo(contentBuilder);
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 追加冒号分隔符
			contentBuilder.appendContext(this.context);
			// 提取属性值
			this.operand.extractTo(contentBuilder);
		};
	};
}();