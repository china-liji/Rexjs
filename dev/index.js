var generator = function*(){
	var { a: { y, z }, b:[ b, x ] } = { a: { y: 100 }, b: [ , 200 ] }

	yield x

	yield y

	yield z

	var i, m, n

	([i, { m, n: [n] }] = [,{ m: 3, n:[5] }])

	yield m + n
}