var a;
a = 1 + 2, 3 + 4, a = 5 + 6 + 8 / 10, a = 0;
				
if(
	a !== 0
){
	throw a;
}

a = (1 + 3, 5 + 6, null + 100, !true, !true - 0 * 100);

if(
	a !== 0
){
	throw a;
}