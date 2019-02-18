import { Expression } from "../core/index";

export let GenerableExpression = function(){
	return class GenerableExpression extends Expression {
		/**
		 * 需要编译的生成器
		 * @type {Generator}
		 */
		contextGeneratorIfNeedCompile = null;

		/**
		 * 可生成的表达式，即在生成器内部，随着生成器需要一起编译的表达式
		 * @param {Context} context - 语法标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		constructor(context, statements){
			super(context);

			this.contextGeneratorIfNeedCompile = statements.contextGeneratorIfNeedCompile;
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 如果存在需要编译的生成器
			if(this.contextGeneratorIfNeedCompile){
				// 以生成器形式的提取表达式文本内容
				this.generateTo(contentBuilder);
				return;
			}

			// 以常规形式的提取表达式文本内容
			this.normalizeTo(contentBuilder);
		};

		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		generateTo(){};

		/**
		 * 以常规形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		normalizeTo(){};
	};
}();