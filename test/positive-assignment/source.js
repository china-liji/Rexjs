var b = 100;

[
	void 0,
	null,
	0,
	"",
	false
].forEach(function(value){
	b ??= value;

	if(b !== 100){
		throw "不应该被赋值：" + value;
	}
});

var obj = { c: 100 }

var a = window.a ??= obj.c;

if(a !== 100){
	throw "连续赋值：a 的值错误";
}

if(window.a !== 100){
	throw "连续赋值：window.a 的值错误";
}

b = 100;

var c = b ??= "";

if(c !== void 0){
	throw "有效值赋值不能影响其他赋值结果，即只对自己有效";
}

var d = 5;

d ??= b ??= null;

if(d !== 5){
	throw "连续赋值：d 的值错误";
}