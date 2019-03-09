import { PartnerExpression, ContentBuilder } from "../core";

export let FunctionBodyExpression = function(insertDefaults){
	/**
	 * 函数主体语句块表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	return class FunctionBodyExpression extends PartnerExpression {
		/**
		 * 表达式状态
		 * @type {Number}
		 */
		state = PartnerExpression.STATE_NONE;

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} defaultArgumentBuilder - 默认参数生成器
		 */
		extractTo(contentBuilder, defaultArgumentBuilder){
			let { result } = defaultArgumentBuilder;

			// 如果没有默认或省略参数
			if(result.length === 0){
				// 直接提取函数主体
				super.extractTo(contentBuilder);
				return;
			}
			
			// 插入默认参数
			insertDefaults(contentBuilder, this, result);
		};
	};
}(
	// insertDefaults
	(contentBuilder, expression, defaults) => {
		let { inner } = expression, builder = new ContentBuilder();
		
		// 追加起始大括号
		contentBuilder.appendContext(expression.opening);
		// 提取第一个表达式至临时生成器
		inner[0].expression.extractTo(builder);

		// 判断临时生成器内容
		switch(builder.result){
			// 如果是 'use strict'
			case "'use strict'":
			// 如果是 "use strict"
			case '"use strict"':
				// 正式提取第一个语句
				inner[0].extractTo(contentBuilder);
				// 追加分号
				contentBuilder.appendString(";");

				// 设置 inner 的最小解析索引为 1，即不再解析第一个语句，从第二语句开始
				inner.min = 1;
				break;
		}

		// 提取默认参数
		contentBuilder.appendString(defaults);
		// 提取函数内部语句
		expression.inner.extractTo(contentBuilder);
		// 追加结束大括号
		contentBuilder.appendContext(expression.closing);
	}
);