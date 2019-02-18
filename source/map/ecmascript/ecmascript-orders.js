export let ECMAScriptOrders = function(){
	/**
	 * ECMAScript 标签优先级顺序
	 */
	return class ECMAScriptOrders {
		/**
		 * 对象访问器属性名序列
		 * @returns {Number}
		 */
		static get ACCESSOR_PROPERTY_NAME(){
			return this.WORD_PROPERTY_NAME + 1;
		};

		/**
		 * 箭头 "=>" 符号序列
		 * @returns {Number}
		 */
		static get ARROW(){
			return this.GREATER_BINARY;
		};

		/**
		 * 二元符号序列
		 * @returns {Number}
		 */
		static get BINARY(){
			return 200;
		};
		
		/**
		 * 注释序列
		 * @returns {Number}
		 */
		static get COMMENT(){
			return 400;
		};
		
		/**
		 * 注释内容序列
		 * @returns {Number}
		 */
		static get COMMENT_CONTENT(){
			return this.OPENING_RESTRICTED_COMMENT + 1;
		};
		
		/**
		 * 解构赋值 "=" 符号序列
		 * @returns {Number}
		 */
		static get DESTRUCTURING_ASSIGNMENT(){
			return this.GREATER_BINARY;
		};

		/**
		 * 点属性访问器序列
		 * @returns {Number}
		 */
		static get DOT_ACCESSOR(){
			return this.ORDER_BASE + 1;
		};
		
		/**
		 * 环境常量序列
		 * @returns {Number}
		 */
		static get ENV_CONSTANT(){
			return this.IDENTIFIER;
		};
		
		/**
		 * 等于等于 "==" 符号序列
		 * @returns {Number}
		 */
		static get EQUALITY(){
			return this.ARROW + 1;
		};
		
		/**
		 * 幂 "**" 符号序列
		 * @returns {Number}
		 */
		static get EXPONENTIATION(){
			return this.GREATER_BINARY;
		};
		
		/**
		 * 表达式换行序列
		 * @returns {Number}
		 */
		static get EXPRESSION_BREAK(){
			return this.SPECIAL_LINE_TERMINATOR + 1;
		};
		
		/**
		 * 文件起始符序列
		 * @returns {Number}
		 */
		static get FILE_START(){
			return 600;
		};
		
		/**
		 * 函数变量名序列
		 * @returns {Number}
		 */
		static get FUNCTION_VARIABLE(){
			return this.VARIABLE + 1;
		};

		/**
		 * 较高级二元符号序列
		 * @returns {Number}
		 */
		static get GREATER_BINARY(){
			return this.BINARY + 1;
		};
		
		/**
		 * 大于等于 ">=" 符号序列
		 * @returns {Number}
		 */
		static get GREATER_THAN_OR_EQUAL(){
			return this.GREATER_BINARY;
		};
		
		/**
		 * 标识符序列
		 * @returns {Number}
		 */
		static get IDENTIFIER(){
			return 300;
		};
		
		/**
		 * 全等于号 "===" 符号序列
		 * @returns {Number}
		 */
		static get IDENTITY(){
			return this.EQUALITY + 1;
		};
		
		/**
		 * 非法的换行符序列
		 * @returns {Number}
		 */
		static get ILLEGAL_LINE_TERMINATOR(){
			return this.COMMENT_CONTENT + 1;
		};
		
		/**
		 * 不等于号 "!=" 符号序列
		 * @returns {Number}
		 */
		static get INEQUALITY(){
			return this.BINARY;
		};
		
		/**
		 * JSX 起始相邻元素 "<" 符号序列
		 * @returns {Number}
		 */
		static get JSX_ADJACENT_ELEMENT(){
			return this.GREATER_BINARY;
		};
		
		/**
		 * JSX 子节点中的换行符序列
		 * @returns {Number}
		 */
		static get JSX_LINE_TERMINATOR(){
			return this.JSX_TEXT + 1;
		};
		
		/**
		 * JSX 文本子节点序列
		 * @returns {Number}
		 */
		static get JSX_TEXT(){
			return this.TEMPLATE_CONTENT;
		};
		
		/**
		 * 左位移 "<<" 符号序列
		 * @returns {Number}
		 */
		static get LEFT_SHIFT(){
			return this.GREATER_BINARY;
		};
		
		/**
		 * 小于等于 "<=" 符号序列
		 * @returns {Number}
		 */
		static get LESS_THAN_OR_EQUAL(){
			return this.GREATER_BINARY;
		};
		
		/**
		 * 逻辑与 "&&" 符号序列
		 * @returns {Number}
		 */
		static get LOGICAL_AND(){
			return this.GREATER_BINARY;
		};
		
		/**
		 * 逻辑或 "||" 符号序列
		 * @returns {Number}
		 */
		static get LOGICAL_OR(){
			return this.GREATER_BINARY;
		};
		
		/**
		 * 算法数字序列
		 * @returns {Number}
		 */
		static get MATHEMATICAL_NUMBER(){
			return this.ORDER_BASE + 1;
		};

		/**
		 * 重复的负号 "--" 符号序列
		 * @returns {Number}
		 */
		static get NEGATION_SIBLING(){
			return this.BINARY;
		};
		
		/**
		 * 不全等于号 "!==" 符号序列
		 * @returns {Number}
		 */
		static get NONIDENTITY(){
			return this.INEQUALITY + 1;
		};

		/**
		 * 箭头函数主体的起始大括号序列
		 * @returns {Number}
		 */
		static get OPENING_ARROW_FUNCTION_BODY(){
			return this.ORDER_BASE;
		};
		
		/**
		 * 起始对象中括号访问器序列
		 * @returns {Number}
		 */
		static get OPENING_BRACKET_ACCESSOR(){
			return this.ORDER_BASE;
		};
		
		/**
		 * 起始函数调用序列
		 * @returns {Number}
		 */
		static get OPENING_CALL(){
			return this.ORDER_BASE;
		};
		
		/**
		 * 起始受限制的多行注释（一般使用在表达式上下文中）序列
		 * @returns {Number}
		 */
		static get OPENING_RESTRICTED_COMMENT(){
			return this.COMMENT + 1;
		};
		
		/**
		 * 父类调用序列
		 * @returns {Number}
		 */
		static get OPENING_SUPER_METHOD_CALL(){
			return this.OPENING_CALL + 1;
		};

		/**
		 * 基础序列
		 * @returns {Number}
		 */
		static get ORDER_BASE(){
			return 100;
		};
		
		/**
		 * 重复的加号 "++" 符号序列
		 * @returns {Number}
		 */
		static get PLUS_SIBLING(){
			return this.BINARY;
		};
		
		/**
		 * 后置一元赋值符号序列
		 * @returns {Number}
		 */
		static get POSTFIX_UNARY_ASSIGNMENT(){
			return this.UNARY_ASSIGNMENT + 1;
		};
		
		/**
		 * 对象属性名序列
		 * @returns {Number}
		 */
		static get PROPERTY_NAME(){
			return this.ACCESSOR_PROPERTY_NAME + 1;
		};
		
		/**
		 * 右位移 ">>" 符号序列
		 * @returns {Number}
		 */
		static get RIGHT_SHIFT(){
			return this.GREATER_BINARY;
		};
		
		/**
		 * 简写的二元赋值运算 ">>>="、"+=" 等等符号序列
		 * @returns {Number}
		 */
		static get SHORTHAND_ASSIGNMENT(){
			return this.UNSIGNED_RIGHT_SHIFT + 1;
		};
		
		/**
		 * 特殊的换行符序列
		 * @returns {Number}
		 */
		static get SPECIAL_LINE_TERMINATOR(){
			return this.ORDER_BASE;
		};
		
		/**
		 * 拓展符序列
		 * @returns {Number}
		 */
		static get SPREAD(){
			return this.DOT_ACCESSOR;
		};
		
		/**
		 * 语句结束序列
		 * @returns {Number}
		 */
		static get STATEMENT_END(){
			return this.ORDER_BASE;
		};
		
		/**
		 * 类静态关键字 "static" 序列
		 * @returns {Number}
		 */
		static get STATIC_MODIFIER(){
			return this.PROPERTY_NAME + 1;
		};
		
		/**
		 * 父类属性基础赋值 "=" 符号标签
		 * @returns {Number}
		 */
		static get SUPER_PROPERTY_ASSIGNMENT(){
			return this.GREATER_BINARY;
		};
		
		/**
		 * 父类属性一元后置运算 "++"、"--" 符号序列
		 * @returns {Number}
		 */
		static get SUPER_PROPERTY_POSTFIX_UNARY_ASSIGNMENT(){
			return this.POSTFIX_UNARY_ASSIGNMENT + 1;
		};
		
		/**
		 * 父类属性简写赋值 ">>>="、"+=" 等等符号序列
		 * @returns {Number}
		 */
		static get SUPER_PROPERTY_SHORTHAND_ASSIGNMENT(){
			return this.SHORTHAND_ASSIGNMENT + 1;
		};
		
		/**
		 * target 标识符序列
		 * @returns {Number}
		 */
		static get TARGET(){
			return this.VARIABLE;
		};
		
		/**
		 * 模板内容序列
		 * @returns {Number}
		 */
		static get TEMPLATE_CONTENT(){
			return 500;
		};
		
		/**
		 * 模板参数序列
		 * @returns {Number}
		 */
		static get TEMPLATE_PARAMETER(){
			return this.TEMPLATE_CONTENT + 1;
		};
		
		/**
		 * 模板特殊内容序列
		 * @returns {Number}
		 */
		static get TEMPLATE_SPECIAL_CONTENT(){
			return this.TEMPLATE_CONTENT + 1;
		};
		
		/**
		 * 前置一元赋值 "++"、"--" 符号序列
		 * @returns {Number}
		 */
		static get UNARY_ASSIGNMENT(){
			return this.GREATER_BINARY + 1;
		};
		
		/**
		 * 无符号右位移 ">>>" 符号序列
		 * @returns {Number}
		 */
		static get UNSIGNED_RIGHT_SHIFT(){
			return this.RIGHT_SHIFT + 1;
		};
		
		/**
		 * 变量名序列
		 * @returns {Number}
		 */
		static get VARIABLE(){
			return this.IDENTIFIER + 1;
		};
		
		/**
		 * 对象词组属性名序列
		 * @returns {Number}
		 */
		static get WORD_PROPERTY_NAME(){
			return this.VARIABLE;
		};
	};
}();