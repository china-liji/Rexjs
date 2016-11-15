------
功能缺失
------
class
const
enum
export
extends
function
import
let
static
super
with
yield
new.target
super.xx
fn`te${}`
++
--
三元运算符
模板
拓展符（...）
解构赋值
箭头函数
函数默认值
对象
可省略 super
可选参数
目录别名、文件别名
TDD
反斜杠转义符
前置递增、递减运算符没有做操作对象检测
break continue 只在允许返回内出现
await
async
100% 可能执行、调用的函数变量 - 2016.09.14
	- 如：fn = null, 当 fn() 代码被执行的时候，就算 fn 为 null 也不会报错
	- 可能解析前的代码，会加一个一元操作符，如：try fn()、?fn()、>>fn()、@fn()、exec fn() 等等
	- 可能解析后的代码如： (fn || Function.prototype)()
	- 原因：很多时候，callback 可以不被提供，但是每次都要判断是否存在，再去执行，很麻烦，这样做能大大简化
	- 优先级较后

解构赋值 增加“可绑定的函数”功能 - 2016.09.21
	- 如：var { ::warn, @changeStatus } = this.refs.box，当 warn()、changeStatus() 被执行时，相当于 this.refs.box.warn()、this.refs.box.changeStatus()
	- 具体符号暂定，可能使用 "@"(比较好看)、"::"(比较符合 react 习惯)
	- 原因：当一个对象的函数多次被使用，这样能大大的简化
	- 警告：不适用普通赋值，如：var ::warn = box; 这只是重命名，不是取对象属性
	- 优先级较后

类的二进制属性 - 2016.09.26
	- 如：
		class SyntaxTag {
			binary CLASS_NONE; // 0b0
			binary CLASS_STATEMENT; // 0b10
			binary CLASS_EXPRESSION | CLASS_STATEMENT; // 0b110
			binary CLASS_EXPRESSION_CONTEXT; // 0b1000
		}

	  2个二进制的连接符可以为 "|"、"&"、"^" 的任意一个

	- 原因：
	  1. 由于个人习惯上喜欢使用二进制属性
		当一个类的同一种二进制数据过多（例如事件的 type，类型很多，但某些却相互关联，如 click 与 dblclick），
		如果每次都是手动写，可能会出现失误，如： 0b1000000000 这么长，下一个就是 0b10000000000，稍微不注意，就出错了，
	  
	  2. 关系看起来更明了

	  3. 假设后续维护在中间插入一个值，不用修改后面的属性值，如，你在 100 个属性中，插入到了第二个，那么你会想要修改后面 99 个属性的值吗...

	- 区分不同种类的二进制属性，需要加区分，可以考虑如下形式：
		class SyntaxTag {
			binary class CLASS_NONE; // 0b0
			binary class CLASS_STATEMENT; // 0b10
			binary class CLASS_EXPRESSION | CLASS_STATEMENT; // 0b110
			binary class CLASS_EXPRESSION_CONTEXT; // 0b1000
			binary type TYPE_NONE; // 0b0
			binary type TYPE_MATCHABLE; // 0b10
			binary type TYPE_UNEXPECTED; // 0b100
			binary type TYPE_MISTAKABLE | TYPE_UNEXPECTED; // 0b1100
		}

	  即：binary 类型 属性名称，类型可以为任何标识符（与对象属性名一直），而且类型可以不提供

	- 注：如果并不想提供值为 0 的二进制属性，可以考虑如下形式：
		class SyntaxTag {
			binary type; // 0b0，但该属性没有名称，并不可以通过属性看得见
			binary type TYPE_MATCHABLE; // 0b10
			binary type TYPE_UNEXPECTED; // 0b100
			binary type TYPE_MISTAKABLE | TYPE_UNEXPECTED; // 0b1100
		}

	  也就是说，你的第一个二进制属性的值，是从 0b10 开始

	- 注：二进制运算，最大 32 位，而且第 32 位是判断正负，其实有效 31，不过算上 0，总共也是 32 位

	- 解析后：
		class SyntaxTag {
			get TYPE_MATCHABLE(){
				return 0b10;
			};

			get TYPE_UNEXPECTED(){
				return 0b100;
			};

			get TYPE_MISTAKABLE(){
				return 0b1100;
			};
		}

	- 同理，可以用在静态属性上，即 static binary type TYPE_MATCHABLE;

	- 优先级较后

对象属性的连续简写方式 - 2016.10.12
	- 如：
		源码：
			function getElements(){
				return jQuery(".class") <- css("color", "red"), timeStr = Date.now(), ["+1"] = 1, attr("data-key", 0);
			};

		解析后（大概意思如下）：
			function getElements(){
				var $els = jQuery(".class");

				$els.("color", "red");

				$els.timeStr = Date.now();
				$els["+1"] = 1;

				$els.attr("data-key", 0);
				return $els;
			};
		
	- 原因：
		1. 有时候，一个函数，我就想让读代码和维护代码的人一看，就知道我要返回的是什么，而不是我中间做了哪些无关紧要的事情，
		简单的说，让他人关注的是结果，而不是过程
		
		2. 如果你需要别人关注过程，那么可以不这么写，可以采取解析后的代码方式写，以上只不过提供了一种选择

	- 优先级较后

压缩打包前的开发环境不需要引用 Rexjs 等相关文件 - 2016.11.10
	- 利用 Electron 封装一个浏览器，使其内部加载 Rexjs（但不能影响当前运行环境）并利用 Rexjs 编译所有 js 文件，包括 new Function("try fn()");
	- 这样，可以使代码不用每次写完都 watch 编译，尽量使得开发环境简单

--------
已完成功能
--------
函数调用解析完成 - 2016.11.14
	- 基本功能
	- 测试代码

try、catch、finally 语句重构完成 - 2016.11.14

中断流语句重构完成 - 2016.11.14
	- break 语句
	- continue 语句
	- return 语句
	- throw 语句

for 语句 - 2016.11.10
	- for 循环
	- for in
	- for of

重构 - 2016.09.13 ~ 2016.11.05
	- 移除临时表达式机制，即 statement.$expression
	- 完善语句的 try、catch 机制，并增加 finally 机制
	- 优化 SyntaxTag.prototype.type、SyntaxTag.prototype.class 两属性
	- 其他语句、表达式的重构

var 语句 - 2016.09.13
	- 基本功能
	- 测试代码

case 测试代码 - 2016.09.12
case 基本功能 - 2016.09.07

switch - 2016.09.06
	- 基本功能

中括号属性访问器 - 2016.09.05
	- 基本功能
	- 测试代码

点属性访问器 - 2016.08.31
	- 基本功能
	- 测试代码

数组 - 2016.08.30
	- 基本功能
	- 测试代码

完善 do while 语句 - 2016.08.29
	- do while 条件语句中禁止出现分号

完善 while 语句 - 2016.08.29
	- while 条件语句中禁止出现分号
	- 增加测试代码

完善 if 语句 - 2016.08.29
	- if 条件语句中禁止出现分号
	- 增加测试代码

重写 native 正则，但无果 - 2016.08.26
	- 由于现有的 js native 正则没有完美的满足需求（当正则中使用了小括号，性能会变慢很多很多），打算重写，但发现智商严重不够，2星期无果...
	- 后续有头绪再继续
	- 问题所在 /a{2,8}a{3,7}?a{4,5}a/

do while 语句测试代码 - 2016.08.12
do while 语句 - 2016.08.11

完善逗号 - 2016.08.10
	- 测试代码
	- 修复bug，二元表达式的支持不完善

完善二元表达式 - 2016.08.10
	- 测试代码
	- 逻辑

逗号 - 2016.08.01
	- 基本

label 标签 - 2016.07.26
	- 基本
	- 测试代码

分组小括号运算符 - 2016.07.24
	- 基本
	- 测试代码

一元运算符 - 2016.07.23
	- 增加一元运算符测试代码
	- 前置递增运算符 ++
	- 前置递减运算符 --
	- 遗留 bug，前置递增、递减运算符没有做操作对象检测

增加变量解析测试 - 2016-07.21
增加字符串解析测试 - 2016.07.21
增加正则表达式解析测试 - 2016.07.21

完善数字解析 - 2016.07.20
	- 增加测试代码，并根据测试代码修复以下 bug
	- 修复 bug1 不支持带点的整数
	- 修复 bug2 不支持省略加号的整数正指数幂
	- 修复 bug3 不支持整数指数幂
	- 修复 bug4 不支持带点的整数指数幂

简单测试 - 2016.07.20
	- 结果为真的测试
	- 结果为假的测试

一元运算符 - 2016.07.19
	- +
	- -
	- !
	- ~
	- delete
	- new
	- typeof
	- void

重构逻辑 - 2016.07.19
	- 增加 statement.$expression 记录临时的表达式，主要供不确定性及不完整的表达式使用，待表达式完整后，再设置到 statement.expression 属性上
	- 去掉 expression.end 方法与 expression.endWith 方法

return - 2016.07.14
try、catch、finally - 2016.07.13
	- try

对文件起始（FileStartTag）、文件结束（FileEndTag）进行处理 - 2016.07.09
	- FileStartTag 标签作用于添加 "void function(){" 头部代码
	- FileEndTag 标签作用于添加 "}();" 尾部代码

增加 sourceURL 及 sourceMappingURL 功能 - 2016.07.08

修复字符串bug - 2016.07.04
	- 修复 bug1 不支持多反斜杠
	- 修复 bug2 支持反斜杠加换行符进行换行

报错功能 - 2016.07.04
	- 能定位到指定文件指定行数

增加行数和列数 - 2016.07.03

未捕获的行结束符标签 - 2016.07.02
	- 某些语句不支持换行而且也不支持带换行的注释，如 throw 语句等

拆分注释 - 2016.07.02
	- 拆分为 3 部分：起始 - 内容 - 结束，
	- 目的是捕获其中的换行符。

continue - 2016.06.30
break - 2016.06.30
while - 2016.06.29
debugger - 2016.06.27
throw - 2016.06.27
if - 2016.06.26
false - 2016.06.26
else - 2016.06.26
in - 2016.06.26
instanceof - 2016.06.26
null - 2016.06.26
this - 2016.06.26
true - 2016.06.26
语句块 - 2016.06.26
分号 - 2016.06.26
换行符 - 2016.06.26
注释 - 2016.06.26
正则表达式 - 2016.06.26
数字 - 2016.06.26
变量 - 2016.06.26
字符串 - 2016.06.26
二元运算符 - 2016.06.26