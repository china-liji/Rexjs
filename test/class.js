void function(SimpleTest, test){

test.group("类测试");

test.true("最简单的类", "class a{}");
test.true("带很多分号的空属性类", "class a{;;;;;;;;;;;;;;;;;}");
test.true("带构造函数的类", "class a { constructor(){} }");
test.true("带方法的类", "class a { a(){} }");
test.true("带静态方法的类", "class a { static constructor(){} }");
test.true("带多种方法的类", "class a { a(){} b(){};;static c(){};; static d(){} e(){};;;.12(){};[1+2](){} static get 0b101(){} }");
test.true("类表达式", "var a = class {}");
test.true("带名称的类表达式", "var a = class a {}");
test.true("直接继承另外一个类", "class A extends class B {} {}");
test.true("继承的是父类是某个对象的属性1", "class A extends Rexjs.List {}");
test.true("继承的是父类是某个对象的属性2", 'class A extends Rexjs["List"] {}');
test.true("继承的是父类是某个方法的返回值", 'class A extends Rexjs["List"].constructor.a() {}');
test.true("继承的是父类是某个模板方法的返回值", 'class A extends Rexjs["List"].constructor`a`() {}');
test.true("继承的是父类是某个实例的返回值", 'class A extends new Rexjs["List"].constructor`a`() {}');

test.true(
	"类的属性验证",
	SimpleTest.innerContentOf(function(){
		var h = 1, i = 2, bn = parseInt("1010", 2)

		class A {
			.1(){
				return 0.1;
			};;
			"string"(){
				return "string"
			}
			a(){};;
			b(){ return 1 }
			c(){

			};
			d(x, y = 100, ...z){
				return x + y + z[1]
			};
			[("e" + "").toString()](){  }
			["f"](){}
			["g"](x, y = 100, ...z){
				return x + y + z[1]
			};
			get(){ return "get" }
			set(){ return "set" }
			get h(){
				return h
			};
			set h(value){
				h = value + 1
			};
			get ["i"](){
				return i
			}
			set ["i"](value = 88){
				i = value + 2
			}
			get 0b1010(){
				return bn
			}
			set 0b1010(value){
				bn = value
			}
			get 0O1010(){
				return 0O1010
			}
			0b11(){ return "0b11" }
			get8888(){
				return 8888
			}

			static constructor(){
				this.x = 1000
			};

			static get 0b1010(){
				return 0b1010
			}

			static 0O1010(){
				return 0O1010
			}

			constructor(){
				this.x = 2000
			}

			static get get(){
				return this[0b1010]
			}
		}

		var names = [
			"0.1",
			"string",
			"a",
			"b",
			"c",
			"d",
			"e",
			"f",
			"g",
			"h",
			"i",
			"get",
			"set",
			parseInt(1010, 2),
			parseInt(1010, 8),
			parseInt(11, 2),
			"get8888",
			"constructor"
		]

		if(
			Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
		){
			throw "没有正确解析出类的每一个属性"
		}

		var staticNames = [
			"prototype",
			"get",
			"constructor",
			parseInt(1010, 2),
			parseInt(1010, 8),
			"name",
			"length"
		];

		var sns = Object.getOwnPropertyNames(A);

		// IE 不支持 name，为了兼容 IE，有则继续，无则添加
		if(
			sns.indexOf("name") === -1
		){
			sns.push("name");
		}

		if(
			staticNames.sort().join(";") !== sns.sort().join(";")
		){
			throw "没有正确解析出类的每一个静态属性"
		}

		var a = new A()

		if(
			a["0.1"]() !== 0.1
		){
			throw "小数属性错误"
		}

		if(
			a.d(1, void 0, 2, 3) !== 104
		){
			throw "d方法运算结果有误"
		}

		if(
			a.g(1, void 0, 2, 3) !== 104
		){
			throw "g方法运算结果有误"
		}

		a.h = 999

		if(
			a.h !== 1000
		){
			throw "h值获取错误:" + h
		}

		a.i = void 0

		if(
			a.i !== 90
		){
			throw "i值获取错误:" + i
		}

		if(
			a[parseInt(1010, 2)] !== parseInt(1010, 2)
		){
			throw "二进制属性获取有误"
		}

		a[parseInt(1010, 2)] = 1000

		if(
			bn !== 1000
		){
			throw "二进制属性设置失效"
		}

		if(
			!A.prototype.hasOwnProperty(parseInt(11, 2))
		){
			throw "没有指定二进制属性"
		}

		if(
			a[parseInt(1010, 8)] !== parseInt(1010, 8)
		){
			throw "八进制属性有误"
		}

		if(
			typeof a["get8888"] !== "function"
		){
			throw "带访问器的属性名解析不正确"
		}

		if(
			a["get8888"]() !== 8888
		){
			throw "带访问器的属性返回值不正确"
		}

		if(
			a.x !== 2000
		){
			throw "构造函数运行不正确"
		}

		A.constructor()

		if(
			A.x !== 1000
		){
			throw "类的静态方法没有运行"
		}

		if(
			A[parseInt(1010, 2)] !== parseInt(1010, 2)
		){
			throw "二进制静态属性不正确";
		}

		if(
			A[parseInt(1010, 8)]() !== parseInt(1010, 8)
		){
			throw "八进制静态属性不正确";
		}

		if(
			A.get !== parseInt(1010, 2)
		){
			throw "get 静态属性获取不正确"
		}
	}),
	true
);

test.true(
	"类的属性验证",
	SimpleTest.innerContentOf(function(){
		class Car {
			// 构造函数默认值
			constructor(name, height = 1.5, width = 1.8){
				this.name = name
				this.height = height
				this.width = width
			}

			// 换行的静态属性
			static
			isCar(car){
				return car instanceof Car
			}
			;
			
			;
			
			;
			// 普通静态属性
			static isToy(car){
				return car.height < 0.5 && car.width < 0.5
			}
			
			;
			
			;
			
			;
			// 类的属性
			getHeight(){
				return this.height
			}
			;
			;
			;
			// 静态 constructor 属性
			static constructor(car){
				return car.constructor
			}
		}

		var car = new Car("汽车", 0.2, 0.3)

		switch(
			false
		){
			case Car.isCar(car):
				throw "实例化结果有误"
			
			case Car.constructor(car) === car.constructor:
				throw "类的构造函数与实例的构造函数不一致"
				
			case Car.isToy(car):
				throw "属性运算错误"
				
			case car.getHeight() === 0.2:
				throw "高度不正确";
		}

		class Audi extends Car {
			constructor(){
				// 检测函数内部的 this 是否会报错
				function a(){
					this
				}
				
				// 检测类内部的 this 是否会报错
				class Inside {
					constructor(){
						this
					}
					
					// 如果这里取消注释，则会报错
					// audi = this
				}
				
				// 如果这里取消注释，则会报错
				// { ( [this] ) }
				
				// 检测语句块内是否能调用 super
				{
					super("汽车")
				}
				
				// 检测 super 之后的 this 是否会报错
				this.height += 0.1
			}
			
			// 重写静态属性
			static
			
			isCar(audi){
				return audi instanceof Audi;
			}
			
			// 被覆盖的属性
			getHeight(height = 0.1){
				return this.height + height
			}
		}

		var audi = new Audi("A4")

		switch(
			false
		){
			case Car.isCar(audi):
				throw "继承后的实例类型不正确"

			case Audi.isCar(audi):
				throw "audi 不是 Audi 的实例";

			case !Audi.isCar(car):
				throw "audi 不是 Car 的实例"

			case audi.getHeight() === audi.height + 0.1:
				throw "高度获取不一致"
			
			case audi.name === "汽车" :
				throw "实例属性获取不一致"
		}
	}),
	true
);

test.true(
	"继承的类没有构造函数",
	SimpleTest.innerContentOf(function(){
		class Car {
			constructor(name = "Audi A4", height = 1.5, width = 1.8){
				this.name = name
				this.height = height
				this.width = width
			}
		}

		class Audi extends Car {}

		let audi = new Audi()

		if(
			audi instanceof Car === false
		){
			throw "audi 没有继承至 Car 类"
		}

		if(
			audi.name !== "Audi A4"
		){
			throw "没有自动调用父类的构造函数"
		}
	}),
	true
);

test.false(
	"类声明缺少类名称",
	"class {}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.OpenBlockTag ? "" : "没有找到错误的起始语句块";
	}
);

test.false(
	// 因为这一对大括号已被认为是对象，即该类继承至某个对象
	"缺少类主体",
	"class A extends {}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.StatementEndTag ? "" : "没有找到错误的语句结束标签";
	}
);

test.false(
	"继承的表达式带逗号",
	"class A extends Rexjs.List, Rexjs.SyntaxElement {}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有找到错误的逗号标签";
	}
);

test.false(
	"继承的表达式带三元表达式",
	"class A extends Rexjs.List? Rexjs.SyntaxElement : Rexjs.Expression {}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.QuestionTag ? "" : "没有找到错误的问号标签";
	}
);

test.false(
	"继承的表达式带非 new 的一元表达式",
	"class A extends !Rexjs.List {}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.UnaryTag ? "" : "没有找到错误的一元标签";
	}
);

test.false(
	"类声明后面接小括号",
	"class A {}()",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseParenTag ? "" : "没有识别出异常的结束分组小括号";
	}
);

test.groupEnd();
}(
	Rexjs.SimpleTest,
	test
);