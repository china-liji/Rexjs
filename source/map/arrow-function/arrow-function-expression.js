import { FunctionExpression } from "../function/function-expression";
import { ContentBuilder } from "../core";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";

export let ArrowFunctionExpression = function(){
	return class ArrowFunctionExpression extends FunctionExpression {
		/**
		 * 箭头函数表达式
		 * @param {Context} context - 语法标签上下文
		 * @param {Expression} args - 函数参数列表表达式
		 */
		constructor(context, args){
			super(context);

			this.arguments = args;
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			let defaultArgumentBuilder = new ContentBuilder();

			// 如果需要编译
			if(ECMAScriptConfig.es6Base){
				/*
					这里有包括了两层函数，
					因为箭头函数里的 this 与 arguments 都是指向外层的，箭头函数自己没有 arguments
				*/

				let args = this.arguments;

				// 追加外层函数头部代码
				contentBuilder.appendString("(function");
				// 提取并编译函数参数
				args.compileTo(contentBuilder, defaultArgumentBuilder);
				// 追加内层函数头部代码 与 默认参数
				contentBuilder.appendString("{" + defaultArgumentBuilder.result + "return function()");

				/*
					设置默认参数为“连接所有参数名后的字符串”
					1. 因为默认参数在上面已经被追加至 contentBuilder 内
					2. 由于两层函数，但实际运行是内层函数，而函数参数是设置在外层函数上，
					所以运行时，设置 debugger，会无法获取参数信息，
					所以要在内层函数上引用一次所有参数，以方便 debugger
				*/
				defaultArgumentBuilder.result = args.collection.toString("", ",", ";");

				// 提取并编译函数主体
				this.body.compileTo(contentBuilder, defaultArgumentBuilder);
				// 追加两层函数的尾部代码
				contentBuilder.appendString(".apply(this[0],this[1]);}.bind([this, arguments]))");
				return;
			}
			
			// 提取参数
			this.arguments.extractTo(contentBuilder, defaultArgumentBuilder);
			// 追加箭头符号
			contentBuilder.appendContext(this.context);
			// 提取函数主体
			this.body.extractTo(contentBuilder, defaultArgumentBuilder);
		};
	};
}();