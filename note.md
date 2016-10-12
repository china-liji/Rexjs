开发笔记

~ 每个表达式必须结束

~ 每个语句必须安全才能离开，即 statements.statement = new Statement();

~ 不确定性及不完整的表达式，不应该先设置到 statement.expression 属性上，应该先设置到临时表达式 statement.$expression 属性上，
  待该不完整的表达式完整之后，再设置到 statement.expression 属性上

~ Statement.try 与 Statement.catch 的区别
   try 的诞生，是为了在子类中，不需要重写 catch，因为重写 catch 后，需要调用父类，每个地方都要使用 catch.call(this)，
   而分离出 try 方法，可以直接在 try 中调用 this.catch，而 try 本身被重写，则不应该使用 try.call(this) 调用父类的 try 方法，
   所以，目的就是为了避免以上所述，实质是一样的。

~ 设置 parser.statements 后，必须还原

~ 当一个 statements 的 length 不变（即没有新语句），而被多次设置 statements.statement，
   而这一举动，必须像单条流水线一样，一层层嵌套下去，不能有分支，以确保如果有异常，
   那么会从当前的 statement -> statment.target -> ... -> statements.target 逐一执行 try、catch，
   直到有一个被成功处理，就会认为，异常已经被正确处理，否则会将异常抛出，报错
   
~ 在设置了 expression.target 后，在跳出 PartnerExpression 时候，一定要恢复，因为 inner 与 target 就不属于同一根语句之下
   
~ ECMAScript 解析器中，SyntaxTag.TYPE_MISTAKABLE 只会在当前语句表达式结束后，
   即 expression.state = Expression.STATE_STATEMENT_ENDABLE 时，才会被重新利用，
   否则会报错，当然出现在空语句时（statement.expression = null）也会报错。
   
~ SyntaxTag.prototype.try 与 SyntaxTag.prototype.catch 两方法中为什么不提供 statement 与 statements，因为这两方法在使用时可能会改变 statement 与 statements，
  而且这两方法可能会被多次嵌套、迭代调用，所以不提供，而 visitor 方法只会单次执行一次，所以 visitor 提供了这 2 个参数。

~ ECMAScript 解析器中，
   1. 用标签确定语句结束时，require 方法中需返回 tagsMap.unexpectedTags（当结束标签"具有"分号性质）
       或 tagsMap.statementEndTags（当结束标签"不具有"分号性质），目的是让所有语句都进入 try、catch，
	   达到通知每个语句结束，毕竟 ECMAScript 没要求语句必须以分号结束，也防止没有分号但有换行符的情况被错误解析。
   2. ECMAScript 解析器中，所有用标签确定语句开始时，require 方法中需返回 tagsMap.statements，
       而不是 tagsMap.unexpectedTags 或 tagsMap.statementEndTags，
       目的是不要让语句因为 unexpectedTags 而错误的进入 try、catch，进而导致语句的错误解析。
	   
   总的来说就是，语句开始用 tagsMap.statementTags，结束时，当标签具有分号性质，使用 tagsMap.unexpectedTags，
   否则使用 tagsMap.statementEndTags。
   
~ ECMAScript 解析器中的 SyntaxTag.prototype.order 值使用说明
  order == 0，默认值
  order >= 100 && order < 200，供普通优先级的标签使用
  order >= 200 && order < 300，供变量名类型标签使用
  order >= 300 && order < 400，供运算符标签使用
  order >= 400 && order < 500，供注释类型标签使用
  order == Infinity，供文件位置标签使用


~ apply 在某些情况下比 call 性能更低，因为 apply 是使用的数组，如果参数不是数组，需要转化成数组才能使用

~ Array.prototype.forEach 比 for 循环要慢，特别是在每次 forEach 时候传入的都是新函数