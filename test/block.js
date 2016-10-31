void function(SimpleTest, test){

test.group("语句块测试");

test.true("空语句块", "{}");
test.true("带换行的空语句块", "{\n\n\n}");
test.true("带内容的语句块", "{ window.a + window.b }");

test.true(
	"复杂的测试",
	SimpleTest.innerContentOf(function(){
		a = 1

		{
			a = 10
		
			a = a -= window instanceof Window && 1 + 9 ^ 6 | 5 || 3 & 6 > 7 / 12 === 3;
			
			if(
				a !== -3
			){
				throw a;
			}
			
			a = a+= a *= 2 + 3 * 6 | 7 ^ 0 % 4 / 10 & 1;
			
			if(
				a !== -72
			){
				throw a;
			}
		}
	}),
	true
);

test.groupEnd();

}(
	Rexjs.SimpleTest,
	test
);