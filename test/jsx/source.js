let a = <a />;

if(a.type !== "a"){
	throw "字符串元素名解析错误";
}

let b = <window.self.window.atob></window.self.window.atob>;

if(b.type !== window.self.window.atob){
	throw "访问器元素名称解析错误";
}

class C {};

let c = <C></C>;

if(c.type !== C){
	throw "大写元素名称解析错误";
}

let obj = {
	a: 1,
	b: 2
};

let d = <d {...obj}></d>;

if(d.props.a + d.props.b !== 3){
	throw "拓展属性错误";
}

let e = <e title={document.title + "999", "888"}></e>

if(e.props.title !== "888"){
	throw "参数属性错误";
}

let f = (
	<f ref="r" key="ok" >
		<x>
			<y>
				<C />
				{<p></p>}
			</y>
		</x>
	</f>
);

let { children } = f.props;

if(children.type !== "x" || children.props.children.type !== "y" || children.props.children.props.children[0].type !== C){
	throw "嵌套的元素解析不正确";
}

if(f.ref !== "r" || f.key !== "ok" || f.props.ref !== void 0 || f.props.key !== void 0){
	throw "ref或key解析错误";
}