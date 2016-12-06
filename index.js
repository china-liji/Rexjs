var a, get, set, e = "e", f = "f", h, i

		var obj = {
			.1: 0.1,
			"string": "stirng",
			a,
			b: 1,
			c(){

			},
			d(x, y = 100, ...z){
				return x + y + z[1]
			},
			[(e + "").toString()]: e,
			[f](){

			},
			["g"](x, y = 100, ...z){
				return x + y + z[1]
			},
			get,
			set,
			get: "get",
			set: "set",
			get h(){
				return h
			},
			set h(value){
				h = value + 1
			},
			get ["i"](){
				return i
			},
			set ["i"](value = 88){
				i = value + 2
			},
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
			"set"
		]

		if(
			Object.getOwnPropertyNames(obj).sort().join("") !== names.sort().join("")
		){
			throw "没有正确解析出对象的每一个项"
		}

		if(
			obj.d(1, void 0, 2, 3) !== 104
		){
			throw "d方法运算结果有误"
		}

		if(
			obj.g(1, void 0, 2, 3) !== 104
		){
			throw "g方法运算结果有误"
		}

		obj.h = 999

		if(
			obj.h !== 1000
		){
			throw "h值获取错误:" + h
		}

		obj.i = void 0

		if(
			obj.i !== 90
		){
			throw "i值获取错误:" + i
		}