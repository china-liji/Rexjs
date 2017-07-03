let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}