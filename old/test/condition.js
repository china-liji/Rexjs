// if else 表达式
new function(){

var x = 1;

// if 表达式
if
(
	true
)
{
	x = 5
	x++
}

// 单语句 if 表达式
if(
	false
)
	x++
	++x

// else 表达式
if(
	true
){
	x
}
else
{
	x--
}

// 连续的 if else 表达式
if(
	false
){
	x
}
else
if(false)
	x--
// 不带大括号的 if else 表达式
else
	x--

// 如果 x 等于 8
if(
	x === 6
)
	// 返回
	return

// 报错
throw "if else 表达式解析错误"
}()


// do while 表达式
new function(){

var x = 1

// 常规 do while 表达式
do
{
	x++
}
while
(
	x < 10
)

// 不带大括号的 do while 表达式
do
x++
while
(
	x < 20
)

if(
	x === 20
)
	return
	
throw "do while 表达式解析错误";
}()

// while 表达式
new function(){

var x = 1

// 带大括号的 while 表达式
while
(
	x < 10
)
{
	x++
}

// 不带大括号的单语句 while 表达式
while
(
	x < 20
)
	x++
	x--

if(
	x === 19
)
	return

throw "while 表达式解析错误";
}()


// for 表达式
new function(){

var x = 0

// 常规的 for 表达式
for
(
	;x < 10;
)
{
	x += 2
}

// 不带大括号的单语句 for 表达式
for
(
	;x < 20;
)
	x += 2
	x--
	
if(
	x === 19
)
	return
	
throw "for 表达式解析错误"
}()


// with 表达式解析
new function(){

var x, y = 1;

// 常规的 with 表达式
with
(
	{ a : 1 }
)
{
	x = a
}

// 不带大括号的单语句 with 表达式
with
(
	{ a : 5, y : 2 }
)
	x += a
	x -= y
	
if(
	x === 5
)
	return
	
throw "with 表达式解析错误"
}()


// switch case 表达式
new function(){

var x = 1

// 常规的 switch 表达式
switch
(
	true
)
{
	// 常规的 case 表达式
	case
		true
		:
		x++

	case
		x === 2
		:
		x += 6
	
	// 带有三元运算符的 case 表达式
	case
		x > 100 ? true :
		false
		:
		x--
		x += 2
		return
	
	// 空语句 case 表达式
	case x > 50 :
	
	// 连续的空语句 case 表达式
	case true :

	default
	:
		break
}

if(
	x === 8
)
	return

throw "switch case 表达式解析错误"
}()