var a = 1;

label:
if(true){
	a = 100;

	xx:
	for(;a < 200;){
		++a;

		switch(a){
			case 105:
				a += 3;
				break label;

			case 106:
				a += 2
				break xx;
		}
	}

	a = 1000;
}

if(a !== 108){
	throw "运算错误：" + a;
}