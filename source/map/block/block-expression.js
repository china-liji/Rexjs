import { PartnerExpression, STATE_STATEMENT_ENDED } from "../core";

export let BlockExpression = function(){
	return class BlockExpression extends PartnerExpression {
		/**
		 * 上下文需要编译的生成器
		 * @type {Generator}
		 */
		contextGeneratorIfNeedCompile = null;

		/**
		 * 语句块表达式
		 * @param {Context} opening - 起始标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		constructor(opening, statements){
			super(opening);

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
				// 直接提取 inner
				this.inner.extractTo(contentBuilder);
				return;
			}

			// 调用父类方法
			super.extractTo(contentBuilder);
		};


		/**
		 * 获取状态
		 * @returns {Number}
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		};

		/**
		 * 设置表达式状态
		 * @returns {Number}
		 */
		set state(value){};
	};
}();