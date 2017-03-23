test.unit(
	[],
	function(){
		this.group("正则表达式测试");

		this.true("无标识的正则表达式", "/./");
		this.true("全局正则表达式", "/./g");
		this.true("大小正则写表达式", "/./i");
		this.true("多行正则表达式", "/./m");
		this.true("Unicode 正则表达式", "/./u");
		this.true("粘性正则表达式", "/./y");
		this.true("多个标识正则表达式1", "/./img");
		this.true("多个标识正则表达式2", "/./imguy");
		this.true("复杂的表达式", "/^01234567890[0-9A-z]+?(?:)''$/imguy");
		this.true("带反斜杠的正则表达式", "/123\\/abc\\\\\\/*?\\\\/");

		function callback1(parser, err){
			return err.context.tag instanceof Rexjs.RegExpTag ? "" : "未解析到正则表达式";
		};

		function callback2(parser, err){
			return err.context.content === err.file.source ? "" : "正则表达式匹配不正确";
		}

		this.false("带有错误标识的正则表达式", "/./G", callback1, callback2);
		this.false("连续重复标识的正则表达式", "/./ii", callback1, callback2);
		this.false("间断重复标识的正则表达式", "/./imgi", callback1, callback2);

		this.false(
			"已换行的正则表达式",
			"/\n/",
			function(parser, err){
				return err.context.tag instanceof Rexjs.DivisionTag ? "" : "未捕获换行后的除号";
			}
		);

		this.groupEnd();
	}
);