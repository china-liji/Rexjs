export let ECMAScriptErrors = function(REGEXP){
	/**
	 * ECMAScript 错误信息
	 */
	return class ECMAScriptErrors {
		/**
		 * 赋值错误信息
		 * @returns {String}
		 */
		static get ASSIGNMENT(){
			return "Invalid left-hand side in assignment";
		};

		/**
		 * 函数调用错误信息
		 * @returns {String}
		 */
		static get CALL(){
			return "Missing ) after argument list";
		};

		/**
		 * 常量赋值错误信息
		 * @returns {String}
		 */
		static get CONST(){
			return "Assignment to constant variable";
		};

		/**
		 * 类的构造函数错误信息
		 * @returns {String}
		 */
		static get CONSTRUCTOR(){
			return "Class constructor may not be ${1}";
		};

		/**
		 * switch 语句中多个 default 条件错误信息
		 * @returns {String}
		 */
		static get DEFAULT_CLAUSE(){
			return "More than one default clause in switch statement";
		};

		/**
		 * 多个同名函数参数名错误信息
		 * @returns {String}
		 */
		static get DUPLICATE_PARAMETER_NAME(){
			return "Duplicate parameter name not allowed in this context";
		};

		/**
		 * 模块多次默认输出错误信息
		 * @returns {String}
		 */
		static get EXPORT_DEFAULT(){
			return "Default member has already been exported";
		};

		/**
		 * 非法 for 循环条件
		 * @returns {String}
		 */
		static get FOR(){
			return "Invalid left-hand side in for-loop";
		};

		/**
		 * 非法 for in 循环条件
		 * @returns {String}
		 */
		static get FOR_IN(){
			return "Invalid left-hand side in for-in loop: Must have a single binding";
		};

		/**
		 * get 访问器参数错误信息
		 * @returns {String}
		 */
		static get GETTER(){
			return "Getter must not have any formal parameters";
		};

		/**
		 * JSX 嵌套元素语法错误信息
		 * @returns {String}
		 */
		static get JSX_ADJACENT_ELEMENT(){
			return "Adjacent JSX elements must be wrapped in an enclosing tag";
		};

		/**
		 * JSX 闭合标记错误
		 * @returns {String}
		 */
		static get JSX_CLOSING_TAG(){
			return "Expected corresponding JSX closing tag for <${1}>";
		};

		/**
		 * 非法语句错误信息
		 * @returns {String}
		 */
		static get ILLEGAL_STATEMENT(){
			return "Illegal ${1} statement";
		};

		/**
		 * 未捕获的关键字错误信息
		 * @returns {String}
		 */
		static get KEYWORD(){
			return '"${1}" keyword unexpected here';
		};

		/**
		 * break label 时，没有对应 label 错误信息
		 * @returns {String}
		 */
		static get LABEL(){
			return 'Undefined ${1} label "${2}"';
		};

		/**
		 * const 申明中，缺少初始化赋值运算错误信息
		 * @returns {String}
		 */
		static get MISSING_INITIALIZER(){
			return "Missing initializer in const declaration";
		};

		/**
		 * 非法换行错误信息
		 * @returns {String}
		 */
		static get NEWLINE(){
			return "Illegal newline";
		};

		/**
		 * throw 后面接换行的错误信息
		 * @returns {String}
		 */
		static get NEWLINE_AFTER_THROW(){
			return "Illegal newline after throw";
		};

		/**
		 * 箭头函数中，在箭头之前换行的错误信息
		 * @returns {String}
		 */
		static get NEWLINE_BEFORE_ARROW(){
			return "Illegal newline before arrow";
		};

		/**
		 * 前置运算符错误信息
		 * @returns {String}
		 */
		static get PREFIX_OPERATION(){
			return "Invalid left-hand side expression in prefix operation";
		};

		/**
		 * 后置运算符错误信息
		 * @returns {String}
		 */
		static get POSTFIX_OPERATION(){
			return "Invalid left-hand side expression in postfix operation";
		};

		/**
		 * 变量重复声明错误信息
		 * @returns {String}
		 */
		static get REDECLARATION(){
			return 'Identifier "${1}" has already been declared';
		};

		/**
		 * 正则非法标识错误信息
		 * @returns {String}
		 */
		static get REGEXP_FLAGS(){
			return "Invalid regular expression flags";
		};

		/**
		 * 省略项必须是最后一项的错误信息
		 * @returns {String}
		 */
		static get REST_ELEMENT(){
			return "Rest element must be last element";
		};

		/**
		 * 省略参数必须为普通参数错误信息
		 * @returns {String}
		 */
		static get REST_PARAMETER(){
			return "Rest parameter must be last formal parameter";
		};

		/**
		 * set 访问器中，必须有一个普通参数的错误信息
		 * @returns {String}
		 */
		static get SETTER(){
			return "Setter must have exactly one formal parameter";
		};

		/**
		 * 父类调用错误信息
		 * @returns {String}
		 */
		static get SUPER_CALL(){
			return "Super call may not in class constructor";
		};

		/**
		 * super 在传递 this 或 return 之后调用
		 * @returns {String}
		 */
		static get SUPER_AFTER_ACCESSING_THIS_OR_RETURNING(){
			return 'Must call super constructor in derived class before accessing "this" or returning from derived constructor';
		};

		/**
		 * 无继承性质的类中使用 super 错误信息
		 * @returns {String}
		 */
		static get SUPER_CALL_UNEXTEND(){
			return "No any super to call";
		};

		/**
		 * super 重复调用错误信息
		 * @returns {String}
		 */
		static get SUPER_RECALL(){
			return "Super may be called in this class constructor";
		};

		/**
		 * new.target 调用错误信息
		 * @returns {String}
		 */
		static get TARGET(){
			return "new.target expression is not allowed here";
		};

		/**
		 * 字符串模板错误信息
		 * @returns {String}
		 */
		static get TEMPLATE(){
			return "Unterminated template literal";
		};

		/**
		 * try catch 语句错误信息
		 * @returns {String}
		 */
		static get TRY(){
			return "Missing catch or finally after try";
		};

		/**
		 * with 语句错误信息
		 * @returns {String}
		 */
		static get WITH(){
			return "The code may not include a with statement";
		};

		/**
		 * 子类构造函数中没有调用 super 的错误信息
		 * @returns {String}
		 */
		static get WITHOUT_SUPER_CALL(){
			return "Missing super call in this class constructor";
		};

		/**
		 * 将错误信息模板里的参数进行替换，并返回结果
		 * @param {String} type - 错误信息类型
		 * @param {String} _args - 需要替换的参数
		 * @returns {String}
		 */
		static template(type){
			return this[type].replace(
				REGEXP,
				(result, index) => {
					return arguments[index];
				}
			);
		};
	};
}(
	// REGEXP
	/\$\{(\d+)\}/g
);