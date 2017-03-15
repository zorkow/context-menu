MathJax.Hub.Register.StartupHook('Sre Ready', function() {
  console.log('loading');

  let aboutContent = function() {
    return 'using<br>MathJax v' + MathJax.version +
    '<br>Speech Rule Engine v' + sre.System.getInstance().version;
  };

  let about = new ContextMenu.Info(
    '<b style="font-size:120%;">Annotation Tool</b>',
    aboutContent,
    '<a href="http://www.mathjax.org">MathJax.org</a>');
  // var about = new ContextMenu.Info(
  //   '<b style="font-size:120%;">MathJax Annotation Tool</b> v' +
  //     MathJax.version +
  //     '<br>using Speech Rule Engine v' + sre.System.getInstance().version,
  //   '',
  //   '<a href="http://www.mathjax.org">MathJax.org</a>');

  let Annotation = {};

  Annotation.aboutPost = function() {
    about.post(0, 0);
  };

  Annotation.getSemanticType = function(node) {
    return node.getAttribute('data-semantic-type');
  };
  Annotation.setSemanticType = function(value, node) {
    node.setAttribute('data-semantic-type', value);
  };
  Annotation.getSemanticRole = function(node) {
    return node.getAttribute('data-semantic-role');
  };
  Annotation.setSemanticRole = function(value, node) {
    node.setAttribute('data-semantic-role', value);
  };
  Annotation.getSemanticFont = function(node) {
    return node.getAttribute('data-semantic-font');
  };
  Annotation.setSemanticFont = function(value, node) {
    node.setAttribute('data-semantic-font', value);
  };

  var cm_json =
        {"menu":
         {"pool": [
           { "name": "type",
             "getter": Annotation.getSemanticType,
             "setter": Annotation.setSemanticType
           },
           { "name": "role",
             "getter": Annotation.getSemanticRole,
             "setter": Annotation.setSemanticRole
           },
           { "name": "font",
             "getter": Annotation.getSemanticFont,
             "setter": Annotation.setSemanticFont
           }
         ],
          "items":
          [
            {"type": "combo",
             "id": "type",
            "content": "Type",
            "variable": "type"
            },
            {"type": "combo",
             "id": "role",
            "content": "Role",
            "variable": "role"
            },
            {"type": "combo",
             "id": "font",
            "content": "Font",
            "variable": "font"
            },
            {"type": "rule"},
            {"type": "command",
             "id": "About",
             "content": "About",
             "action": Annotation.aboutPost
            },
          ]
         }
        };


  ContextMenu.CssStyles.addInfoStyles();
  ContextMenu.CssStyles.addMenuStyles();
  contextmenu = ContextMenu.ContextMenu.parse(cm_json);
  about.attachMenu(contextmenu);

  MathJax.Hub.Register.MessageHook(
    'New Math', function(message) {
      var newid = message[1] + '-Frame';
      var math = document.getElementById(newid);
      var spans = math.querySelectorAll('[data-semantic-type]');
      if (math) {
        // remove already set tabindex.
        math.removeAttribute('tabindex');
      }
      for (var span of spans) {
        span.removeAttribute('tabindex');
        contextmenu.getStore().insert(span);
      }
    });


  cc = contextmenu;
});
