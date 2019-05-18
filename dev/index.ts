// import { GlobalStatements } from "rexjs:source/map/base-statements/global.stmts";
// import { ECMAScriptStatement } from "rexjs:source/map/ecmascript/ecmascript.stmt";
// import { FunctionDeclarationExpression } from "rexjs:source/map/function-declaration/function-declaration.expr";
// import { FunctionTag } from "rexjs:source/map/function/function.tag";
// import { GeneratorTag } from "rexjs:source/map/generator/generator.tag";
// import { FunctionNameTag } from "rexjs:source/map/function/function-name.tag";
// import { ArgumentsExpression } from "rexjs:source/map/arguments/arguments.expr";
// import { OpeningArgumentsTag } from "rexjs:source/map/arguments/arguments.opening";
// import { ListExpression } from "rexjs:source/map/core/index";
// import { ArgumentExpression } from "rexjs:source/map/argument/argument.expr";
// import { ArgumentDefaultValueExpression } from "rexjs:source/map/argument/argument-default-value.expr";
// import { ArgumentRestValueExpression } from "rexjs:source/map/argument/argument-rest-value.expr";
// import { ClosingArgumentsTag } from "rexjs:source/map/arguments/arguments.closing";
// import { FunctionBodyExpression } from "rexjs:source/map/function/function-body.expr";
import { SyntaxTree } from "./tree.ts";
import { RexScript } from "../src";

var a= RexScript;

new RexScript()

debugger

new SyntaxTree(
	// <GlobalStatements>
	// 	<ECMAScriptStatement></ECMAScriptStatement>
	// 	<ECMAScriptStatement>
	// 		<FunctionDeclarationExpression>
	// 			<FunctionTag />
	// 			<GeneratorTag optional />
	// 			<FunctionNameTag />
	// 			<ArgumentsExpression>
	// 				<OpeningArgumentsTag />
	// 				<ListExpression>
	// 					<case>
	// 						<ArgumentExpression />
	// 						<ArgumentDefaultValueExpression />
	// 						<ArgumentRestValueExpression />
	// 					</case>
	// 				</ListExpression>
	// 				<ClosingArgumentsTag />
	// 			</ArgumentsExpression>
	// 			<FunctionBodyExpression />
	// 		</FunctionDeclarationExpression>
	// 	</ECMAScriptStatement>
	// </GlobalStatements>
);