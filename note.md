开发笔记

~ 设置 parser.statements 后，必须还原
   
~ SyntaxTag.prototype.try 与 SyntaxTag.prototype.catch 两方法中为什么不提供 statement 与 statements，
  因为这两方法在使用时可能会改变 statement 与 statements，
  而且这两方法可能会被多次嵌套、迭代调用，所以不提供，
  而 visitor 方法只会单次执行一次，所以 visitor 提供了这 2 个参数。

~ ECMAScript 解析器中，
   1. 用标签确定语句结束时，require 方法中需返回 tagsMap.unexpectedTags（当表达式"具有"分号性质）
       或 tagsMap.statementEndTags（当表达式"不具有"分号性质），目的是让所有语句都进入 try、catch，
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


~ apply 在某些情况下比 call 性能更低，因为 apply 是使用的数组，如果参数不是数组，底层代码可能会转换数据类型，导致性能消耗

~ 多次使用 Array.prototype.forEach 比 多次使用 for 循环要慢，因为每次 forEach 时候传入的都是新函数，新函数生成比较耗性能

~ 独立的表达式，一定要有可用的 context 供给报错机制使用
  如：ArrowFunctionExpression 是个独立的表达式，一定要有 context，
  但，ArrowFunctionHeadExpression 作为 ArrowFunctionExpression 的子表达式，context 可以为 null，
  因为 ArrowFunctionHeadExpression 如何报错，怎么报错，是由且只能由 ArrowFunctionExpression 决定

~ 一些复杂的独立的表达式，一定要创建一个新的表达式，
  不要直接使用 Expression、ListExpression、PartnerExpression 等等，
  因为，后续的二次开发及拓展，如果要确认某个表达式，就麻烦了，
  如：数组表达式，可以直接由 PartnerExpression 与 ListExpression 组成，
  但，如果后面某个表达式需要确认之前的表达式是否为数组表达式，就无法判断了，
  如果创建了 ArrayExpression 类，那么就可以用 expression instanceof ArrayExpression 来判断