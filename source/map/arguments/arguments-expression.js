import { PartnerExpression, ListExpression } from "../core";
import { ECMAScriptVariableCollections } from "../ecmascript/ecmascript-variable-collections";

export let ArgumentsExpression = function(extractRange){
	return class ArgumentsExpression extends PartnerExpression {
		/**
		 * 变量名收集器集合
		 * @type {VariableCollections}
		 */
		collections = null;

		/**
		 * 变量名收集器区域
		 * @type {CollectionRange}
		 */
		ranges = null;

		/**
		 * 函数参数列表表达式
		 * @param {Context} opening - 起始标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		constructor(opening, statements){
			super(opening);
		
			this.collections = new ECMAScriptVariableCollections(
				statements.collections.index
			);

			this.inner = new ListExpression(null, ",");
			this.ranges = new ListExpression(null, ",");
		};

		/**
		 * 获取声明变量名收集器
		 * @returns {VariableCollection}
		 */
		get collection(){
			return this.collections.declaration;
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @returns {void}
		 */
		extractTo(contentBuilder, anotherBuilder){
			// 遍历变量名收集器区域
			this.ranges.forEach(extractRange, anotherBuilder);

			// 如果有变量名
			if(anotherBuilder.result.length > 0){
				// 追加分号
				anotherBuilder.appendString(";");
			}

			// 调用父类方法
			super.extractTo(contentBuilder, anotherBuilder);
		}
	};
}(
	// extractRange
	(range, anotherBuilder) => {
		let variableString = range.toString("", ",", "");

		// 如果没有变量
		if(variableString.length === 0){
			return;
		}

		// 如果已经有内容
		if(anotherBuilder.result.length > 0){
			// 追加变量分号
			anotherBuilder.appendString(",");
		}
		else {
			// 追加 var 声明
			anotherBuilder.appendString("var ");
		}

		// 追加变量名
		anotherBuilder.appendString(variableString);
	}
);