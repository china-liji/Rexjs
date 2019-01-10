test.unit(
	[ "jsx/source.js" ],
	function(source){
		this.group("jsx 表达式测试");

		// 自闭合语句测试
		this.true("最简单 jsx 自闭合语句", "<a/>");
		this.true("带关键字属性名的 jsx 自闭合语句", "<a var/>");
		this.true("带关键字属性名且带值的 jsx 自闭合语句", "<a var='true' />");
		this.true("关键字类型名称的 jsx 自闭合语句", "<var />");
		this.true("最简单带空格的 jsx 自闭合语句", "< \n   a \n  /  \n  >");
		this.true("带单个连接符的 jsx 自闭合语句", "<a-b />");
		this.true("带多个连接符的 jsx 自闭合语句", "<a-b-c />");
		this.true("带访问器的 jsx 自闭合语句", "<a.b.c />");
		this.true("大写元素名的 jsx 自闭合语句", "<A />");
		this.true("$起始元素名的 jsx 自闭合语句", "<$A />");
		this.true("_起始元素名的 jsx 自闭合语句", "<_A />");
		this.true("组合元素名的 jsx 自闭合语句", "<$A_b-x_ii-d$d />");
		this.true("关键字类型名称的 jsx 闭合语句", "<var></var>");
		this.true("带单个连接符的 jsx 闭合语句", "<a-b></a-b>");
		this.true("带多个连接符的 jsx 闭合语句", "<a-b-c></a-b-c>");
		this.true("带访问器的 jsx 闭合语句", "<a.b.c></a.b.c>");
		this.true("大写元素名的 jsx 闭合语句", "<A></A>");
		this.true("$起始元素名的 jsx 闭合语句", "<$A></$A>");
		this.true("_起始元素名的 jsx 闭合语句", "<_A></_A>");
		this.true("组合元素名的 jsx 闭合语句", "<$A_b-x_ii-d$d></$A_b-x_ii-d$d>");
		this.true("带单个属性的 jsx 自闭合语句", '<a title />');
		this.true("带单个字符串属性的 jsx 自闭合语句", '<a title="hello" />');
		this.true("带单个参数属性的 jsx 自闭合语句", '<a title={window.document.title + "hello"} />');
		this.true("带单个拓展属性的 jsx 自闭合语句", '<a {...window.location} />');
		this.true("带多个属性的 jsx 自闭合语句", '<a var title  = \n "hello" \n this="true" \n href\n =  \'world\' target =  {"blank"} {\n...window.location\n} {...window.location} className="link" />');
		
		// 自闭合表达式测试
		this.true("最简单 jsx 自闭合表达式", "let a = <a/>");
		this.true("带关键字属性名的 jsx 自闭合表达式", "let a = <a var/>");
		this.true("关键字类型名称的 jsx 自闭合表达式", "let a = <var />");
		this.true("带关键字属性名且带值的 jsx 自闭合表达式", "let a = <a var='true' />");
		this.true("最简单带空格的 jsx 自闭合表达式", "let a = \n< \n   a \n  /  \n  >");
		this.true("带单个连接符的 jsx 自闭合表达式", "let a = <a-b />");
		this.true("带多个连接符的 jsx 自闭合表达式", "let a = <a-b-c />");
		this.true("带访问器的 jsx 自闭合表达式", "let a = <a.b.c />");
		this.true("大写元素名的 jsx 自闭合表达式", "let a = <A />");
		this.true("$起始元素名的 jsx 自闭合表达式", "let a = <$A />");
		this.true("_起始元素名的 jsx 自闭合表达式", "let a = <_A />");
		this.true("组合元素名的 jsx 自闭合表达式", "let a = <$A_b-x_ii-d$d />");
		this.true("关键字类型名称的 jsx 闭合表达式", "let a = <var></var>");
		this.true("带单个连接符的 jsx 闭合表达式", "let a = <a-b></a-b>");
		this.true("带多个连接符的 jsx 闭合表达式", "let a = <a-b-c></a-b-c>");
		this.true("带访问器的 jsx 闭合表达式", "let a = <a.b.c></a.b.c>");
		this.true("大写元素名的 jsx 闭合表达式", "let a = <A></A>");
		this.true("$起始元素名的 jsx 闭合表达式", "let a = <$A></$A>");
		this.true("_起始元素名的 jsx 闭合表达式", "let a = <_A></_A>");
		this.true("组合元素名的 jsx 闭合表达式", "let a = <$A_b-x_ii-d$d></$A_b-x_ii-d$d>");
		this.true("带单个属性的 jsx 自闭合表达式", 'let a = <a title />');
		this.true("带单个字符串属性的 jsx 自闭合表达式", 'let a = <a title="hello" />');
		this.true("带单个参数属性的 jsx 自闭合表达式", 'let a = <a title={window.document.title + "hello"} />');
		this.true("带单个拓展属性的 jsx 自闭合表达式", 'let a = <a {...window.location} />');
		this.true("带多个属性的 jsx 自闭合表达式", 'let a = <a var title  = \n "hello" \n this="true" \n href\n =  \'world\' target =  {"blank"} {\n...window.location\n} {...window.location} className="link" />');

		// 带子节点的语句
		this.true("最简单带文本子节点的 jsx 语句", "<a>hello</a>");
		this.true("最简单带自闭合元素子节点的 jsx 语句", "<a><b/></a>");
		this.true("最简单带闭合元素子节点的 jsx 语句", "<a><b></b></a>");
		this.true("最简单带参数子节点的 jsx 语句", "<a>{window.document.title}</a>");
		this.true("带两个文本子节点的 jsx 语句", "<a>hello\nworld</a>");
		this.true("带两个自闭合元素子节点的 jsx 语句", "<a><b/><b/></a>");
		this.true("带两个闭合元素子节点的 jsx 语句", "<a><b></b><c></c></a>");
		this.true("带两个参数子节点的 jsx 语句", "<a>{window.document.title}{document.title}</a>");
		this.true("带文本与自闭合元素的子节点的 jsx 语句", "<a>hello<b/>world</a>");
		this.true("带文本与闭合元素的子节点的 jsx 语句", "<a>hello<b></b>world</a>");
		this.true("带文本与参数的子节点的 jsx 语句", "<a>hello{document.title}world</a>");
		this.true("带自闭合元素与文本子节点的 jsx 语句", "<a><b />hello<b/></a>");
		this.true("带自闭合元素与闭合元素子节点的 jsx 语句", "<a><b /><c></c><b/></a>");
		this.true("带自闭合元素与参数子节点的 jsx 语句", "<a><b />{document.title}<b/></a>");
		this.true("带闭合元素与文本子节点的 jsx 语句", "<a><b></b>hello<b></b></a>");
		this.true("带闭合元素与闭合元素子节点的 jsx 语句", "<a><b></b><c></c><b></b></a>");
		this.true("带闭合元素与参数子节点的 jsx 语句", "<a><b></b>{document.title}<b></b></a>");
		this.true("带参数与文本子节点的 jsx 语句", "<a>{document.title}hello{location.href}</a>");
		this.true("带参数与闭合元素子节点的 jsx 语句", "<a>{document.title}<c></c>{location.href}</a>");
		this.true("带参数与自闭合元素子节点的 jsx 语句", "<a>{document.title}<b />{location.href}</a>");
		
		this.true(
			"带子节点的复杂 jsx 语句",
			[
				"<a",
					'title="hello"',
					"herf='world'",
					"data-link={location.href}",
					"{...location.href}",
					"{...{}}",
					"target='_blank'",
				">",
					"hello",
					"<b>",
						"<C />",
						"{document.title}",
					"</b>",
					"{location.href}",
					"<D.E />",
					"<a-b>",
						"<$F_F />",
					"</a-b>",
				"</a>"
			].join("\n")
		);

		this.true("运算结果测试", source, true);

		this.false(
			"空标签",
			"<>",
			function(parser, err){
				return err.context.content !== ">";
			}
		);

		this.false(
			"非法名称 - 以连接符开头",
			"<-s />",
			function(parser, err){
				return err.context.content !== "-";
			}
		);

		this.false(
			"非法名称 - 带连接符的访问器",
			"<s-s.window />",
			function(parser, err){
				return err.context.content !== ".";
			}
		);

		this.false(
			"非法名称 - 不全的访问器",
			"<window.location. />",
			function(parser, err){
				return err.context.content !== "/";
			}
		);

		this.false(
			"缺少闭合",
			"<a>",
			function(parser, err){
				return !(err.context.tag instanceof Rexjs.FileEndTag);
			}
		);

		this.false(
			"缺少闭合 - 子元素",
			"<a><b></a>",
			function(parser, err){
				return err.context.content !== "<" || err.context.position.column !== 6;
			}
		);

		this.false(
			"闭合元素名称不一致",
			"<a></b>",
			function(parser, err){
				return err.context.content !== "<" || err.context.position.column !== 3;
			}
		);

		this.false(
			"闭合元素的访问器名称不一致",
			"<window.a.c></b>",
			function(parser, err){
				return err.context.content !== "<" || err.context.position.column !== 12;
			}
		);

		this.false(
			"拓展属性中带逗号",
			"<a {...1,2} />",
			function(parser, err){
				return err.context.content !== ",";
			}
		);

		this.false(
			"参数属性缺少结束符",
			"<a title={document.title />",
			function(parser, err){
				return err.context.content !== ">";
			}
		);

		this.false(
			"参数属性带拓展符",
			"<a title={...location} />",
			function(parser, err){
				return err.context.content !== "...";
			}
		);

		this.false(
			"参数模板缺少结束符",
			"<a>{document.title</a>",
			function(parser, err){
				return err.context.content !== "/";
			}
		);

		this.false(
			"相邻的同级外层元素",
			"<a /><b/>",
			function(parser, err){
				return err.context.content !== "<" || err.context.position.column !== 5;
			}
		);

		this.groupEnd();
	}
);