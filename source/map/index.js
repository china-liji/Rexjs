let a = 1;
let globalThis = {};

let define = (exports) => {
	for(let name in exports){
		globalThis[name] = exports[name];
	}
};

import * as EcmaScript from "./ecmascript";
import * as BaseExpression from "./base-expression";
import * as BaseStatement from "./base-statement";
import * as BaseStatements from "./base-statements";
import * as Brace from "./brace";
import * as Bracket from "./bracket";
import * as Paren from "./paren";
import * as BaseTag from "./base-tag";
import * as Keyword from "./keyword";
import * as Comment from "./comment";
import * as Env from "./env";
import * as FilePosition from "./file-position";
import * as Literal from "./literal";

define(EcmaScript);
define(BaseExpression);
define(BaseStatement);
define(BaseStatements);
define(Brace);
define(Bracket);
define(Paren);
define(BaseTag);
define(Keyword);
define(Comment);
define(Env);
define(FilePosition);
define(Literal);

window.globalThis = globalThis;