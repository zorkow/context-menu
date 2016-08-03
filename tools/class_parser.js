var ts = require('typescript');

classParser = {};

classParser.SyntaxKindLookup = {
  0 : 'Unknown',
  1 : 'EndOfFileToken',
  2 : 'SingleLineCommentTrivia',
  3 : 'MultiLineCommentTrivia',
  4 : 'NewLineTrivia',
  5 : 'WhitespaceTrivia',
  6 : 'ShebangTrivia',
  7 : 'ConflictMarkerTrivia',
  8 : 'NumericLiteral',
  9 : 'StringLiteral',
  10 : 'RegularExpressionLiteral',
  11 : 'NoSubstitutionTemplateLiteral',
  12 : 'TemplateHead',
  13 : 'TemplateMiddle',
  14 : 'TemplateTail',
  15 : 'OpenBraceToken',
  16 : 'CloseBraceToken',
  17 : 'OpenParenToken',
  18 : 'CloseParenToken',
  19 : 'OpenBracketToken',
  20 : 'CloseBracketToken',
  21 : 'DotToken',
  22 : 'DotDotDotToken',
  23 : 'SemicolonToken',
  24 : 'CommaToken',
  25 : 'LessThanToken',
  26 : 'LessThanSlashToken',
  27 : 'GreaterThanToken',
  28 : 'LessThanEqualsToken',
  29 : 'GreaterThanEqualsToken',
  30 : 'EqualsEqualsToken',
  31 : 'ExclamationEqualsToken',
  32 : 'EqualsEqualsEqualsToken',
  33 : 'ExclamationEqualsEqualsToken',
  34 : 'EqualsGreaterThanToken',
  35 : 'PlusToken',
  36 : 'MinusToken',
  37 : 'AsteriskToken',
  38 : 'AsteriskAsteriskToken',
  39 : 'SlashToken',
  40 : 'PercentToken',
  41 : 'PlusPlusToken',
  42 : 'MinusMinusToken',
  43 : 'LessThanLessThanToken',
  44 : 'GreaterThanGreaterThanToken',
  45 : 'GreaterThanGreaterThanGreaterThanToken',
  46 : 'AmpersandToken',
  47 : 'BarToken',
  48 : 'CaretToken',
  49 : 'ExclamationToken',
  50 : 'TildeToken',
  51 : 'AmpersandAmpersandToken',
  52 : 'BarBarToken',
  53 : 'QuestionToken',
  54 : 'ColonToken',
  55 : 'AtToken',
  56 : 'EqualsToken',
  57 : 'PlusEqualsToken',
  58 : 'MinusEqualsToken',
  59 : 'AsteriskEqualsToken',
  60 : 'AsteriskAsteriskEqualsToken',
  61 : 'SlashEqualsToken',
  62 : 'PercentEqualsToken',
  63 : 'LessThanLessThanEqualsToken',
  64 : 'GreaterThanGreaterThanEqualsToken',
  65 : 'GreaterThanGreaterThanGreaterThanEqualsToken',
  66 : 'AmpersandEqualsToken',
  67 : 'BarEqualsToken',
  68 : 'CaretEqualsToken',
  69 : 'Identifier',
  70 : 'BreakKeyword',
  71 : 'CaseKeyword',
  72 : 'CatchKeyword',
  73 : 'ClassKeyword',
  74 : 'ConstKeyword',
  75 : 'ContinueKeyword',
  76 : 'DebuggerKeyword',
  77 : 'DefaultKeyword',
  78 : 'DeleteKeyword',
  79 : 'DoKeyword',
  80 : 'ElseKeyword',
  81 : 'EnumKeyword',
  82 : 'ExportKeyword',
  83 : 'ExtendsKeyword',
  84 : 'FalseKeyword',
  85 : 'FinallyKeyword',
  86 : 'ForKeyword',
  87 : 'FunctionKeyword',
  88 : 'IfKeyword',
  89 : 'ImportKeyword',
  90 : 'InKeyword',
  91 : 'InstanceOfKeyword',
  92 : 'NewKeyword',
  93 : 'NullKeyword',
  94 : 'ReturnKeyword',
  95 : 'SuperKeyword',
  96 : 'SwitchKeyword',
  97 : 'ThisKeyword',
  98 : 'ThrowKeyword',
  99 : 'TrueKeyword',
  100 : 'TryKeyword',
  101 : 'TypeOfKeyword',
  102 : 'VarKeyword',
  103 : 'VoidKeyword',
  104 : 'WhileKeyword',
  105 : 'WithKeyword',
  106 : 'ImplementsKeyword',
  107 : 'InterfaceKeyword',
  108 : 'LetKeyword',
  109 : 'PackageKeyword',
  110 : 'PrivateKeyword',
  111 : 'ProtectedKeyword',
  112 : 'PublicKeyword',
  113 : 'StaticKeyword',
  114 : 'YieldKeyword',
  115 : 'AbstractKeyword',
  116 : 'AsKeyword',
  117 : 'AnyKeyword',
  118 : 'AsyncKeyword',
  119 : 'AwaitKeyword',
  120 : 'BooleanKeyword',
  121 : 'ConstructorKeyword',
  122 : 'DeclareKeyword',
  123 : 'GetKeyword',
  124 : 'IsKeyword',
  125 : 'ModuleKeyword',
  126 : 'NamespaceKeyword',
  127 : 'RequireKeyword',
  128 : 'NumberKeyword',
  129 : 'SetKeyword',
  130 : 'StringKeyword',
  131 : 'SymbolKeyword',
  132 : 'TypeKeyword',
  133 : 'FromKeyword',
  134 : 'GlobalKeyword',
  135 : 'OfKeyword',
  136 : 'QualifiedName',
  137 : 'ComputedPropertyName',
  138 : 'TypeParameter',
  139 : 'Parameter',
  140 : 'Decorator',
  141 : 'PropertySignature',
  142 : 'PropertyDeclaration',
  143 : 'MethodSignature',
  144 : 'MethodDeclaration',
  145 : 'Constructor',
  146 : 'GetAccessor',
  147 : 'SetAccessor',
  148 : 'CallSignature',
  149 : 'ConstructSignature',
  150 : 'IndexSignature',
  151 : 'TypePredicate',
  152 : 'TypeReference',
  153 : 'FunctionType',
  154 : 'ConstructorType',
  155 : 'TypeQuery',
  156 : 'TypeLiteral',
  157 : 'ArrayType',
  158 : 'TupleType',
  159 : 'UnionType',
  160 : 'IntersectionType',
  161 : 'ParenthesizedType',
  162 : 'ThisType',
  163 : 'StringLiteralType',
  164 : 'ObjectBindingPattern',
  165 : 'ArrayBindingPattern',
  166 : 'BindingElement',
  167 : 'ArrayLiteralExpression',
  168 : 'ObjectLiteralExpression',
  169 : 'PropertyAccessExpression',
  170 : 'ElementAccessExpression',
  171 : 'CallExpression',
  172 : 'NewExpression',
  173 : 'TaggedTemplateExpression',
  174 : 'TypeAssertionExpression',
  175 : 'ParenthesizedExpression',
  176 : 'FunctionExpression',
  177 : 'ArrowFunction',
  178 : 'DeleteExpression',
  179 : 'TypeOfExpression',
  180 : 'VoidExpression',
  181 : 'AwaitExpression',
  182 : 'PrefixUnaryExpression',
  183 : 'PostfixUnaryExpression',
  184 : 'BinaryExpression',
  185 : 'ConditionalExpression',
  186 : 'TemplateExpression',
  187 : 'YieldExpression',
  188 : 'SpreadElementExpression',
  189 : 'ClassExpression',
  190 : 'OmittedExpression',
  191 : 'ExpressionWithTypeArguments',
  192 : 'AsExpression',
  193 : 'TemplateSpan',
  194 : 'SemicolonClassElement',
  195 : 'Block',
  196 : 'VariableStatement',
  197 : 'EmptyStatement',
  198 : 'ExpressionStatement',
  199 : 'IfStatement',
  200 : 'DoStatement',
  201 : 'WhileStatement',
  202 : 'ForStatement',
  203 : 'ForInStatement',
  204 : 'ForOfStatement',
  205 : 'ContinueStatement',
  206 : 'BreakStatement',
  207 : 'ReturnStatement',
  208 : 'WithStatement',
  209 : 'SwitchStatement',
  210 : 'LabeledStatement',
  211 : 'ThrowStatement',
  212 : 'TryStatement',
  213 : 'DebuggerStatement',
  214 : 'VariableDeclaration',
  215 : 'VariableDeclarationList',
  216 : 'FunctionDeclaration',
  217 : 'ClassDeclaration',
  218 : 'InterfaceDeclaration',
  219 : 'TypeAliasDeclaration',
  220 : 'EnumDeclaration',
  221 : 'ModuleDeclaration',
  222 : 'ModuleBlock',
  223 : 'CaseBlock',
  224 : 'ImportEqualsDeclaration',
  225 : 'ImportDeclaration',
  226 : 'ImportClause',
  227 : 'NamespaceImport',
  228 : 'NamedImports',
  229 : 'ImportSpecifier',
  230 : 'ExportAssignment',
  231 : 'ExportDeclaration',
  232 : 'NamedExports',
  233 : 'ExportSpecifier',
  234 : 'MissingDeclaration',
  235 : 'ExternalModuleReference',
  236 : 'JsxElement',
  237 : 'JsxSelfClosingElement',
  238 : 'JsxOpeningElement',
  239 : 'JsxText',
  240 : 'JsxClosingElement',
  241 : 'JsxAttribute',
  242 : 'JsxSpreadAttribute',
  243 : 'JsxExpression',
  244 : 'CaseClause',
  245 : 'DefaultClause',
  246 : 'HeritageClause',
  247 : 'CatchClause',
  248 : 'PropertyAssignment',
  249 : 'ShorthandPropertyAssignment',
  250 : 'EnumMember',
  251 : 'SourceFile',
  252 : 'JSDocTypeExpression',
  253 : 'JSDocAllType',
  254 : 'JSDocUnknownType',
  255 : 'JSDocArrayType',
  256 : 'JSDocUnionType',
  257 : 'JSDocTupleType',
  258 : 'JSDocNullableType',
  259 : 'JSDocNonNullableType',
  260 : 'JSDocRecordType',
  261 : 'JSDocRecordMember',
  262 : 'JSDocTypeReference',
  263 : 'JSDocOptionalType',
  264 : 'JSDocFunctionType',
  265 : 'JSDocVariadicType',
  266 : 'JSDocConstructorType',
  267 : 'JSDocThisType',
  268 : 'JSDocComment',
  269 : 'JSDocTag',
  270 : 'JSDocParameterTag',
  271 : 'JSDocReturnTag',
  272 : 'JSDocTypeTag',
  273 : 'JSDocTemplateTag',
  274 : 'SyntaxList',
  275 : 'Count',
  56 : 'FirstAssignment',
  68 : 'LastAssignment',
  70 : 'FirstReservedWord',
  105 : 'LastReservedWord',
  70 : 'FirstKeyword',
  135 : 'LastKeyword',
  106 : 'FirstFutureReservedWord',
  114 : 'LastFutureReservedWord',
  151 : 'FirstTypeNode',
  163 : 'LastTypeNode',
  15 : 'FirstPunctuation',
  68 : 'LastPunctuation',
  0 : 'FirstToken',
  135 : 'LastToken',
  2 : 'FirstTriviaToken',
  7 : 'LastTriviaToken',
  8 : 'FirstLiteralToken',
  11 : 'LastLiteralToken',
  11 : 'FirstTemplateToken',
  14 : 'LastTemplateToken',
  25 : 'FirstBinaryOperator',
  68 : 'LastBinaryOperator',
  136 : 'FirstNode'
};

classParser.properties = function(expr) {
  for (var i in expr) {
    if (expr.hasOwnProperty(i)) {
      console.log(i);
    }
  }
};

classParser.ast = function(ast) {
  console.log(classParser.SyntaxKindLookup[ast.kind]);
  ast.statements.forEach(classParser.node, 0);
};

classParser.node = function(node, indentation) {
  var indent = new Array(indentation).join(' ');
  switch(node.kind) {
  case ts.SyntaxKind['InterfaceDeclaration']:
    classParser.interface(node);
    return;
  case ts.SyntaxKind['ClassDeclaration']:
    classParser.class(node);
    return;
  default:
  }
  console.log(indent + classParser.SyntaxKindLookup[node.kind]);
  if (node.name) {
    console.log(indent + 'Name: ');
    classParser.node(node.name, indentation + 1);
  }
  if (node.modifiers) {
    console.log(indent + 'Modifiers: ');
    node.modifiers.forEach(function(x) {
      classParser.node(x, indentation + 1);});
  }
  if (node.body) {
    console.log(indent + 'Body: ' +
                classParser.SyntaxKindLookup[node.body.kind]);
    node.body.statements.forEach(function(x) {
      classParser.node(x, indentation + 1);});
  }
  if (node.members) {
    console.log(indent + 'Members: ');
    node.members.forEach(function(x) {
      classParser.node(x, indentation + 1);});
  }
};

classParser.class = function(expr) {
  console.log('this is class ' + expr.name.text);
  classParser.heritageClauses(expr.heritageClauses);
  console.log(expr.modifiers);
};

classParser.interface = function(expr) {
  console.log('this is interface ' + expr.name.text);
  classParser.heritageClauses(expr.heritageClauses);
};


classParser.heritageClauses = function(clauses) {
  var value = {extends: [], implements: []};
  if (!clauses) {
    return value;
  }
  console.log('  extends');
  for (var i = 0, clause; clause = clauses[i]; i++) {
    if (ts.SyntaxKind['ImplementsKeyword'] === clause.token) {
      clause.types.forEach(function(type) {
        value.implements.push(type.expression.text);
      });
    }
    if (ts.SyntaxKind['ExtendsKeyword'] === clause.token) {
      clause.types.forEach(function(type) {
        value.extends.push(type.expression.text);
      });
    }
  }
  console.log(value);
  return value;
};
