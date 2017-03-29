var a = 1;
				
while((a = 2 + 3) > 100){ a += 99; };

if(
	a !== 5
){
	throw a;
}

while(
	a < 1000
){
	a += 100;
	continue;
	break;
}

while(
	(a += 300) < 600
)
	break;

if(
	a !== 1305
){
	throw a;
}