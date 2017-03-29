var t1 = `hello ${"world"}`

if(
	t1 !== "hello world"
){
	throw "模板解析结果错误";
}

var template = `
${
function(){ return "hello world" }()
}
"string"
var a = '100'
${1}${2}${3}
${4}
`

var string = '\
hello world\
"string"\
var a = \'100\'\
123\
4\
'

if(
	template.split("\n").length !== 7
){
	throw "行数错误" + template.split("\n").length
}

if(template.split(/\r?\n/g).join("") !== string){
	throw "内容不匹配";
}

if(
	template.indexOf("123") === -1
){
	throw "检测不到字符串 123"
}

var fn = function(texts, x, y, z){
	if(
		texts[0].match(/^[\r\n\u2028\u2029]+$/) === null
	){
		throw "没有检测到换行符"
	}

	if(
		texts[1] !== ""
	){
		throw "参数分隔有误"
	}

	return texts[2].charCodeAt(0) + z;
}

if(fn`
${0}${1}abc
${2}de` !== 99){
	throw "模板参数结果不正确";
} 