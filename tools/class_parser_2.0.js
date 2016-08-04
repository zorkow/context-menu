// Typescript 2.0 stuff

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
  127 : 'NeverKeyword',
  128 : 'ReadonlyKeyword',
  129 : 'RequireKeyword',
  130 : 'NumberKeyword',
  131 : 'SetKeyword',
  132 : 'StringKeyword',
  133 : 'SymbolKeyword',
  134 : 'TypeKeyword',
  135 : 'UndefinedKeyword',
  136 : 'FromKeyword',
  137 : 'GlobalKeyword',
  138 : 'OfKeyword',
  139 : 'QualifiedName',
  140 : 'ComputedPropertyName',
  141 : 'TypeParameter',
  142 : 'Parameter',
  143 : 'Decorator',
  144 : 'PropertySignature',
  145 : 'PropertyDeclaration',
  146 : 'MethodSignature',
  147 : 'MethodDeclaration',
  148 : 'Constructor',
  149 : 'GetAccessor',
  150 : 'SetAccessor',
  151 : 'CallSignature',
  152 : 'ConstructSignature',
  153 : 'IndexSignature',
  154 : 'TypePredicate',
  155 : 'TypeReference',
  156 : 'FunctionType',
  157 : 'ConstructorType',
  158 : 'TypeQuery',
  159 : 'TypeLiteral',
  160 : 'ArrayType',
  161 : 'TupleType',
  162 : 'UnionType',
  163 : 'IntersectionType',
  164 : 'ParenthesizedType',
  165 : 'ThisType',
  166 : 'StringLiteralType',
  167 : 'ObjectBindingPattern',
  168 : 'ArrayBindingPattern',
  169 : 'BindingElement',
  170 : 'ArrayLiteralExpression',
  171 : 'ObjectLiteralExpression',
  172 : 'PropertyAccessExpression',
  173 : 'ElementAccessExpression',
  174 : 'CallExpression',
  175 : 'NewExpression',
  176 : 'TaggedTemplateExpression',
  177 : 'TypeAssertionExpression',
  178 : 'ParenthesizedExpression',
  179 : 'FunctionExpression',
  180 : 'ArrowFunction',
  181 : 'DeleteExpression',
  182 : 'TypeOfExpression',
  183 : 'VoidExpression',
  184 : 'AwaitExpression',
  185 : 'PrefixUnaryExpression',
  186 : 'PostfixUnaryExpression',
  187 : 'BinaryExpression',
  188 : 'ConditionalExpression',
  189 : 'TemplateExpression',
  190 : 'YieldExpression',
  191 : 'SpreadElementExpression',
  192 : 'ClassExpression',
  193 : 'OmittedExpression',
  194 : 'ExpressionWithTypeArguments',
  195 : 'AsExpression',
  196 : 'NonNullExpression',
  197 : 'TemplateSpan',
  198 : 'SemicolonClassElement',
  199 : 'Block',
  200 : 'VariableStatement',
  201 : 'EmptyStatement',
  202 : 'ExpressionStatement',
  203 : 'IfStatement',
  204 : 'DoStatement',
  205 : 'WhileStatement',
  206 : 'ForStatement',
  207 : 'ForInStatement',
  208 : 'ForOfStatement',
  209 : 'ContinueStatement',
  210 : 'BreakStatement',
  211 : 'ReturnStatement',
  212 : 'WithStatement',
  213 : 'SwitchStatement',
  214 : 'LabeledStatement',
  215 : 'ThrowStatement',
  216 : 'TryStatement',
  217 : 'DebuggerStatement',
  218 : 'VariableDeclaration',
  219 : 'VariableDeclarationList',
  220 : 'FunctionDeclaration',
  221 : 'ClassDeclaration',
  222 : 'InterfaceDeclaration',
  223 : 'TypeAliasDeclaration',
  224 : 'EnumDeclaration',
  225 : 'ModuleDeclaration',
  226 : 'ModuleBlock',
  227 : 'CaseBlock',
  228 : 'NamespaceExportDeclaration',
  229 : 'ImportEqualsDeclaration',
  230 : 'ImportDeclaration',
  231 : 'ImportClause',
  232 : 'NamespaceImport',
  233 : 'NamedImports',
  234 : 'ImportSpecifier',
  235 : 'ExportAssignment',
  236 : 'ExportDeclaration',
  237 : 'NamedExports',
  238 : 'ExportSpecifier',
  239 : 'MissingDeclaration',
  240 : 'ExternalModuleReference',
  241 : 'JsxElement',
  242 : 'JsxSelfClosingElement',
  243 : 'JsxOpeningElement',
  244 : 'JsxText',
  245 : 'JsxClosingElement',
  246 : 'JsxAttribute',
  247 : 'JsxSpreadAttribute',
  248 : 'JsxExpression',
  249 : 'CaseClause',
  250 : 'DefaultClause',
  251 : 'HeritageClause',
  252 : 'CatchClause',
  253 : 'PropertyAssignment',
  254 : 'ShorthandPropertyAssignment',
  255 : 'EnumMember',
  256 : 'SourceFile',
  257 : 'JSDocTypeExpression',
  258 : 'JSDocAllType',
  259 : 'JSDocUnknownType',
  260 : 'JSDocArrayType',
  261 : 'JSDocUnionType',
  262 : 'JSDocTupleType',
  263 : 'JSDocNullableType',
  264 : 'JSDocNonNullableType',
  265 : 'JSDocRecordType',
  266 : 'JSDocRecordMember',
  267 : 'JSDocTypeReference',
  268 : 'JSDocOptionalType',
  269 : 'JSDocFunctionType',
  270 : 'JSDocVariadicType',
  271 : 'JSDocConstructorType',
  272 : 'JSDocThisType',
  273 : 'JSDocComment',
  274 : 'JSDocTag',
  275 : 'JSDocParameterTag',
  276 : 'JSDocReturnTag',
  277 : 'JSDocTypeTag',
  278 : 'JSDocTemplateTag',
  279 : 'JSDocTypedefTag',
  280 : 'JSDocPropertyTag',
  281 : 'JSDocTypeLiteral',
  282 : 'SyntaxList',
  283 : 'Count',
  56 : 'FirstAssignment',
  68 : 'LastAssignment',
  70 : 'FirstReservedWord',
  105 : 'LastReservedWord',
  70 : 'FirstKeyword',
  138 : 'LastKeyword',
  106 : 'FirstFutureReservedWord',
  114 : 'LastFutureReservedWord',
  154 : 'FirstTypeNode',
  166 : 'LastTypeNode',
  15 : 'FirstPunctuation',
  68 : 'LastPunctuation',
  0 : 'FirstToken',
  138 : 'LastToken',
  2 : 'FirstTriviaToken',
  7 : 'LastTriviaToken',
  8 : 'FirstLiteralToken',
  11 : 'LastLiteralToken',
  11 : 'FirstTemplateToken',
  14 : 'LastTemplateToken',
  25 : 'FirstBinaryOperator',
  68 : 'LastBinaryOperator',
  139 : 'FirstNode',
  257 : 'FirstJSDocNode',
  281 : 'LastJSDocNode',
  273 : 'FirstJSDocTagNode',
  281 : 'LastJSDocTagNode'
};
