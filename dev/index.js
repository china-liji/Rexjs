// checkGenerator
	function checkGenerator(generator, values, error){
		for(var i = 0, result = generator.next();!result.done;i++){
			if(values[i] !== result.value){
				throw error + ": 第" + i + "项";
			}

			result = generator.next();
		}
	}

class A {
	static *generator(obj){
		var value = 100

		switch(obj.num){
			case 1:
				value += 1;
				yield value
				value += 5;

			case 1:
				yield value
				debugger

			case 2:
				yield 1;
				break;

			default:
				value += 10
				yield value++
				break;
				value += 200
		}

		yield value
	};
}

var x = 0;

checkGenerator(
	A.generator({
		get num(){
			x++;
			return 1;
		}
	}),
	[101, 106, 106],
	"生成器中的 switch case 1 解析不正确"
);