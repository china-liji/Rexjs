var a = 1;

a += parseInt(10, 2);
a += parseInt(110, 2);

a += (1,2,3,3,4, parseInt(parseInt(10000, 2), 2));

if(
	a !== 10
){
	throw "错误的运算结果";
}