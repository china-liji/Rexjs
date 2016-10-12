

// if 表达式主体相关标签
void function(ClauseStatements, closeIfBodyTag, closeElseBodyTag, elseTag){

this.IfBodyStatements = function(newStatement){
	function IfBodyStatements(mainStatements){
		ClauseStatements.call(this, mainStatements);
	};
	IfBodyStatements = new Rexjs(IfBodyStatements, ClauseStatements);
	
	IfBodyStatements.props({
		block : false,
		catch : function(context, tree){
			var tag, mainStatements = this.mainStatements, ifExpression = mainStatements.statement.expression;
			
			switch(
				true
			){
				case this.block :
					ifExpression.body.statements = this;
					tag = context.content === "}" ? closeIfBodyTag : null;
					break;
					
				case context.content === "else" :
					tag = (ifExpression.body = this.statement).expression.hasStatementJoin ? elseTag : null;
					break;
					
				default :
					ifExpression.body = this.statement;
					tag = tree.catch(context, tree);
					break;
			}
			
			ifExpression.end();
		
			tree.statements = mainStatements;
			return tag;
		},
		newStatement : function(){
			switch(
				true
			){
				case this.length === 0 :
					break;
				
				case this.block :
					break;
					
				default :
					return this.mainStatements.newStatement();
			}
			
			return newStatement.call(this);
		}
	});
	
	return IfBodyStatements;
}(
	ClauseStatements.prototype.newStatement
);

this.IfBodyExpression = function(PartnerExpression){
	function IfBodyExpression(open, ifBodyStatements){
		PartnerExpression.call(this, open, ifBodyStatements);
	};
	IfBodyExpression = new Rexjs(IfBodyExpression, PartnerExpression);
	
	IfBodyExpression.props({
		extractTo : function(contents){
			contents.append(
				this.open.content
			);
			
			this.innerStatements.extractTo(contents);
			
			contents.append(
				this.close.content
			);
		}
	});
	
	return IfBodyExpression;
}(
	this.PartnerExpression
);

this.OpenIfBodyTag = function(OpenCurlyTag, IfBodyStatements, IfBodyExpression, Statements){
	function OpenIfBodyTag(){
		OpenCurlyTag.call(this);
	};
	OpenIfBodyTag = new Rexjs(OpenIfBodyTag, OpenCurlyTag);
	
	OpenIfBodyTag.props({
		require : function(tagsMap){
			return tagsMap.statementTags;
		},
		transformer : function(statement, context, tree){
			var statements = tree.statements;
			
			statements.block = true;
			statements.mainStatements.statement.expression.current.body = new IfBodyExpression(context, statements);
		}
	});
	
	return OpenIfBodyTag;
}(
	this.OpenCurlyTag,
	this.IfBodyStatements,
	this.IfBodyExpression,
	this.Statements
);
	
this.CloseIfBodyTag = function(CloseCurlyTag){
	function CloseIfBodyTag(){
		CloseCurlyTag.call(this);
	};
	CloseIfBodyTag = new Rexjs(CloseIfBodyTag, CloseCurlyTag);
	
	CloseIfBodyTag.props({
		require : function(tagsMap){
			return tagsMap.closeIfBodyContextTags;
		},
		transformer : function(statement, context, tree){
			var bodyExpression = statement.expression.current.body;
			
			bodyExpression.close = context;
			
			bodyExpression.end();
		}
	});
	
	return CloseIfBodyTag;
}(
	this.CloseCurlyTag
);

this.ElseClauseExpression = function(Expression){
	function ElseClauseExpression(context){
		Expression.call(this, context);
	};
	ElseClauseExpression = new Rexjs(ElseClauseExpression, Expression);
	
	ElseClauseExpression.props({
		body : null,
		extractTo : function(contents){
			this.body.extractTo(contents);
		}
	});
	
	return ElseClauseExpression;
}(
	this.Expression
);

this.ElseBodyStatements = function(IfBodyStatements, ElseClauseExpression, CloseIfBodyTag, catchMethod){
	function ElseBodyStatements(mainStatements){
		IfBodyStatements.call(this, mainStatements);
	};
	ElseBodyStatements = new Rexjs(ElseBodyStatements, IfBodyStatements);
	
	ElseBodyStatements.props({
		catch : function(context, tree){
			var tag;
			
			if(
				!this.block
			){
				var ifExpression = this.mainStatements.statement.expression;
			
				ifExpression.add(
					new ElseClauseExpression(ifExpression.current.else)	
				);
			}
			
			tag = catchMethod.call(this, context, tree);
			
			return tag instanceof CloseIfBodyTag ? closeElseBodyTag : tag;
		}
	});
	
	return ElseBodyStatements;
}(
	this.IfBodyStatements,
	this.ElseClauseExpression,
	this.CloseIfBodyTag,
	this.IfBodyStatements.prototype.catch
);

this.OpenElseBodyTag = function(OpenIfBodyTag, ElseClauseExpression, ElseBodyStatements, transformer){
	function OpenElseBodyTag(){
		OpenIfBodyTag.call(this);
	};
	OpenElseBodyTag = new Rexjs(OpenElseBodyTag, OpenIfBodyTag);
	
	OpenElseBodyTag.props({
		transformer : function(statement, context, tree){
			var ifExpression = tree.statements.mainStatements.statement.expression;
			
			ifExpression.add(
				new ElseClauseExpression(ifExpression.current.else)	
			);
			
			transformer.call(this, statement, context, tree);
		}
	});
	
	return OpenElseBodyTag;
}(
	this.OpenIfBodyTag,
	this.ElseClauseExpression,
	this.ElseBodyStatements,
	this.OpenIfBodyTag.prototype.transformer
);

this.CloseElseBodyTag = function(CloseIfBodyTag){
	function CloseElseBodyTag(){
		CloseIfBodyTag.call(this);
	};
	CloseElseBodyTag = new Rexjs(CloseElseBodyTag, CloseIfBodyTag);
	
	CloseElseBodyTag.props({
		require : function(tagsMap){
			return tagsMap.unexpectedTags;
		}
	});
	
	return CloseElseBodyTag;
}(
	this.CloseIfBodyTag
);

this.ElseTag = function(KeywordTag, ElseBodyStatements){
	function ElseTag(_order){
		KeywordTag.call(this, _order);
	};
	ElseTag = new Rexjs(ElseTag, KeywordTag);
	
	ElseTag.props({
		regexp : /else/,
		require : function(tagsMap){
			return tagsMap.elseContextTags;
		},
		transformer : function(statement, context, tree){
			statement.expression.current.else = context;
			tree.statements = new ElseBodyStatements(tree.statements);
		}
	});
	
	return ElseTag;
}(
	this.KeywordTag,
	this.ElseBodyStatements
);

closeIfBodyTag = new this.CloseIfBodyTag();
closeElseBodyTag = new this.CloseElseBodyTag();
elseTag = new this.ElseTag();

}.call(
	this,
	this.ClauseStatements,
	// closeIfBodyTag
	null,
	// closeElseBodyTag
	null,
	// elseTag
	null
);