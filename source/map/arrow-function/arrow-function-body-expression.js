import { FunctionBodyExpression } from "../function/function-body-expression";

export let ArrowFunctionBodyExpression = function(){
	return class ArrowFunctionBodyExpression extends FunctionBodyExpression {
		/**
		 * 箭头函数主体表达式
		 * @param {Expression} inner - 函数主体返回值表达式
		 */
		constructor(inner){
			super(null);

			this.inner = inner;
		};

		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} defaultArgumentBuilder - 默认参数生成器
		 * @returns {void}
		 */
		compileTo(contentBuilder, defaultArgumentBuilder){
			let { result } = defaultArgumentBuilder;

			// 追加函数主体起始大括号
			contentBuilder.appendString("{");

			// 如果没有默认或省略参数
			if(result.length > 0){
				// 插入默认参数
				contentBuilder.appendString(result);
			}

			// 追加 return 关键字
			contentBuilder.appendString("return ");
			// 提取函数主体返回值表达式
			this.inner.extractTo(contentBuilder);
			// 追加 表达式结束分号 与 函数主体结束大括号
			contentBuilder.appendString(";}");
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} defaultArgumentBuilder - 默认参数生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder, defaultArgumentBuilder){
			// 如果有默认参数
			if(defaultArgumentBuilder.result.length > 0){
				// 进行编译
				this.compileTo(contentBuilder, defaultArgumentBuilder);
				return;
			}

			// 直接提取函数主体返回值表达式
			this.inner.extractTo(contentBuilder);
		};
	};
}();