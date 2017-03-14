MathJax.Hub.Register.StartupHook('Sre Ready', function() {

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
  Annotation.setSemanticType = function(node, value) {
    node.setAttribute('data-semantic-type', value);
  };

  var cm_json =
        {"menu":
         {"pool": [
           { "name": "type",
             "getter": Annotation.getSemanticType,
             "setter": Annotation.setSemanticType
           }
         ],
          "items":
          [
            {"type": "combo",
             "id": "type",
            "content": "Type",
            "variable": "type"
            },
            {"type": "rule"},
            {"type": "command",
             "id": "About",
             "content": "About MathJax Annotation",
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
