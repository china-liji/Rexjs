import { GenerableExpression } from "../base-expression/generable-expression";
import { ListExpression } from "../core";

export let VarExpression = function(){
	return class VarExpression extends GenerableExpression {
		/**
		 * 是否为声明形式
		 * @type {Boolean}
		 */
		declaration = true;

		/**
		 * 变量名列表
		 * @type {ListExpression}
		 */
		list = null;

		/**
		 * 变量名声明区间
		 * @type {CollectionRange}
		 */
		range = null;

		/**
		 * var 表达式
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前所处环境的变量收集器集合
		 */
		constructor(context, statements){
			let generator, range = statements.collections.declaration.range();

			super(context, statements);

			this.list = new ListExpression(null, ",");
			this.range = range;

			generator = this.contextGeneratorIfNeedCompile;
			
			// 如果需要编译的生成器存在
			if(generator){
				// 添加变量收集器范围
				generator.ranges.push(range);
			}
		};

		
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		generateTo(contentBuilder){
			// 提取变量列表
			this.list.extractTo(contentBuilder);
		};

		/**
		 * 以常规形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		normalizeTo(contentBuilder){
			// 提取关键字
			contentBuilder.appendContext(this.context);
			// 添加空格
			contentBuilder.appendSpace();

			// 提取变量列表
			this.list.extractTo(contentBuilder);
		};
	};
}();