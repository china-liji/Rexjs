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
import * as FilePosition from "./file-position";
import * as Literal from "./literal";
import * as MethematicalNumber from "./mathematical-number";
import * as Identifier from "./identifier";
import * as EnvConstant from "./env-constant";
import * as Variable from "./variable";
import * as Semicolon from "./semicolon";
import * as LineTerminator from "./line-terminator";
import * as Accessor from "./accessor";
import * as Comma from "./comma";
import * as Unary from "./unary";
import * as Exec from "./exec";
import * as Call from "./call";
import * as Plus from "./plus";
import * as Negation from "./negation";
import * as Not from "./not";

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
define(FilePosition);
define(Literal);
define(MethematicalNumber);
define(Identifier);
define(EnvConstant);
define(Variable);
define(Semicolon);
define(LineTerminator);
define(Accessor);
define(Comma);
define(Unary);
define(Exec);
define(Call);
define(Plus);
define(Negation);
define(Not);

window.globalThis = globalThis;