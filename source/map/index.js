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
import * as UnaryOperator from "./unary-operator";
import * as ExecOperator from "./exec-operator";
import * as Call from "./call";
import * as PlusOperator from "./plus-operator";
import * as NegationOperator from "./negation-operator";
import * as BinaryOperator from "./binary-operator";
import * as AssigmentOperator from "./assignment-operator";
import * as BitwiseOperator from "./bitwise-operator";
import * as LogicalOperator from "./logical-operator";
import * as RelationalOperator from "./relational-operator";
import * as ArithmeticOperator from "./arithmetic-operator";

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
define(UnaryOperator);
define(ExecOperator);
define(Call);
define(PlusOperator);
define(NegationOperator);
define(BinaryOperator);
define(AssigmentOperator);
define(BitwiseOperator);
define(LogicalOperator);
define(RelationalOperator);
define(ArithmeticOperator);

window.globalThis = globalThis;