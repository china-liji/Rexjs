import { STATE_STATEMENT_ENDED } from "../core/index";
import { GenerableExpression } from "./generable-expression";

export let ConditionalExpression = function(DEFAULT_INDEX){
	/**
	 * 带条件的表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	return class ConditionalExpression extends GenerableExpression {
		/**
		 * 其他辅助适配型索引
		 * @type {Number}
		 */
		adapterIndex = DEFAULT_INDEX;

		/**
		 * 分支语句流索引
		 * @type {Number}
		 */
		branchFlowIndex = DEFAULT_INDEX;

		/**
		 * 条件表达式
		 * @type {Expression}
		 */
		condition = null;
		
		/**
		 * 条件索引
		 * @type {Number}
		 */
		conditionIndex = DEFAULT_INDEX;

		/**
		 * 不成立条件索引
		 * @type {Number}
		 */
		negativeIndex = DEFAULT_INDEX;

		/**
		 * 主语句流索引
		 * @type {Number}
		 */
		mainFlowIndex = DEFAULT_INDEX;

		/**
		 * 成立条件索引
		 * @type {Number}
		 */
		positiveIndex = DEFAULT_INDEX;

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			let { contextGeneratorIfNeedCompile: generator } = this;

			// 如果存在需要编译的生成器
			if(generator){
				this.conditionIndex = this.branchFlowIndex = generator.nextIndex();
				this.positiveIndex = this.adapterIndex = generator.nextIndex();
				this.negativeIndex = this.mainFlowIndex = generator.nextIndex();

				// 以生成器形式的提取表达式文本内容
				this.generateTo(contentBuilder);
				return;
			}

			// 以常规形式的提取表达式文本内容
			this.normalizeTo(contentBuilder);
		};

		/**
		 * 以生成器形式去编译主体代码
		 * @param {Expression} body - 主体表达式
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {Boolean} _afterCase - 是否主体代码在相关 case 语句之后
		 * @returns {void}
		 */
		generateBodyTo(body, contentBuilder, _afterCase){
			// 如果是在相关 case 语句之后
			if(_afterCase){
				let { positiveIndex } = this;

				// 追加索引设置以及 case 表达式字符串
				contentBuilder.appendString(
					this.contextGeneratorIfNeedCompile.currentIndexString + "=" + positiveIndex + ";break;case " + positiveIndex + ":"
				);
			}

			// 提取主体内容
			body.extractTo(contentBuilder);

			// 判断主体表达式是否需要加分号
			if((body.state & STATE_STATEMENT_ENDED) !== STATE_STATEMENT_ENDED){
				// 追加分号
				contentBuilder.appendString(";");
			}

			// 设置表达式状态为已结束
			this.state = STATE_STATEMENT_ENDED;

			// 如果是在相关 case 语句之后
			if(_afterCase){
				return;
			}

			// 追加索引设置以及 case 表达式字符串
			contentBuilder.appendString(
				this.contextGeneratorIfNeedCompile.currentIndexString + "=" + this.branchFlowIndex + ";break;case " + this.mainFlowIndex + ":"
			);
		};

		/**
		 * 以生成器形式去编译条件代码
		 * @param {Expression} condition - 条件表达式
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		generateConditionTo(condition, contentBuilder){
			let { conditionIndex, contextGeneratorIfNeedCompile: { currentIndexString } } = this;

			// 追加设置条件索引字符串与 case 表达式
			contentBuilder.appendString(
				currentIndexString + "=" + conditionIndex + ";break;case " + conditionIndex + ":" + currentIndexString + "="
			);

			// 提取条件表达式
			condition.extractTo(contentBuilder);

			// 追加条件的三元判断字符串
			contentBuilder.appendString(
				"?" + this.positiveIndex + ":" + this.negativeIndex + ";break;case " + this.adapterIndex + ":"
			);
		};
	};
}(
	// DEFAULT_INDEX
	-1
);