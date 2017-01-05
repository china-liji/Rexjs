var cn = { "定义" : "var", "等于" : "=", "加" : "+", "减" : "-", "乘" : "*", "除以" : "/", "除" : "/" };

function ChineseParser(syntaxTree){
	var names = [];
	
	for(var name in cn){
		names.push(name);
	}
	
	syntaxTree.add(
		new Rexjs.SyntaxTag(
			"chinese",
			new RegExp(names.join("|"))
		)
	);
};

ChineseParser = new Rexjs.Class(ChineseParser, Rexjs.ECMAScript6Parser);

ChineseParser.props({
	parse : function(){
		this.syntaxListener.listen(
			"chinese",
			function(element){
				element.textContent = cn[element.textContent];
			}) 
		}
	});

function ChineseScript(filename){};

ChineseScript = new Rexjs.Class(ChineseScript, Rexjs.ECMAScript6);

ChineseScript.props({
	parsers : Rexjs.ECMAScript6.prototype.parsers.concat([ChineseParser])
});