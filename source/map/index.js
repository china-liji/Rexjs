let a = 1;
let globalThis = {};

let define = (exports) => {
	for(let name in exports){
		globalThis[name] = exports[name];
	}
};

import * as EcmaScript from "./ecmascript/index";
import * as BaseExpression from "./base-expression/index";
import * as BaseStatement from "./base-statement/index";
import * as BaseStatements from "./base-statements/index";
import * as Brace from "./brace/index";
import * as Bracket from "./bracket/index";
import * as Paren from "./paren/index";
import * as BaseTag from "./base-tag/index";
import * as Comment from "./comment/index";
import * as Env from "./env/index";
import * as FilePosition from "./file-position/index";
import * as Literal from "./literal/index";

define(EcmaScript);
define(BaseExpression);
define(BaseStatement);
define(BaseStatements);
define(Brace);
define(Bracket);
define(Paren);
define(BaseTag);
define(Comment);
define(Env);
define(FilePosition);
define(Literal);

window.globalThis = globalThis;