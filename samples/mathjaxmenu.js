MathJax.Hub.Register.StartupHook("MathEvents Ready", function () {

  let contextmenu;

  let aboutFont = function() {
    var jax = MathJax.Hub.outputJax['jax/mml'][0] || {};
    var font = {
      SVG: 'web SVG',
      CommonHTML: 'web TeX',
      'HTML-CSS': (jax.imgFonts ? 'image' : (jax.webFonts ? 'web' : 'local') +
                   ' ' + jax.fontInUse)
    }[jax.id] || 'generic';
    return font + ' fonts';
  };

  let aboutInfo = function(component, type, format, noTypeCheck) {
    let info = [];
    for (var id in component) {
      if (component.hasOwnProperty(id) && component[id]) {
        if ((noTypeCheck && component[id].version) ||
            (component[id].isa && component[id].isa(component))) {
          info.push((component[id].id || id) + format + component[id].version);
        }
      }}
    info.sort();
    return info;
  };

  let aboutContent = function() {
    var rule = '<div style="border-top:groove 2px; margin: .25em 0;"/>';
    var input = aboutInfo(MathJax.InputJax, 'InputJax', ' Input Jax v');
    var output = aboutInfo(MathJax.OutputJax, 'OutputJax', ' Output Jax v');
    var element = aboutInfo(MathJax.ElementJax, 'ElementJax', ' Element Jax v');
    var extensions = aboutInfo(MathJax.Extension, 'Extension', ' Extension v',
                               true);
    var browser = '<center>' + MathJax.Hub.Browser.concat() + ' v' +
          MathJax.Hub.Browser.version + '</center>';
    var content = 'MathJax.js v' + MathJax.fileversion + '<br>' + rule +
          input.join('<br> ') + '<br>' +
          output.join('<br> ') + '<br>' +
          element.join('<br> ') + '<br>' + rule +
          extensions.join('<br> ') + '<br>' + rule +
          browser;
    return content;
  };

  var about = new ContextMenu.Info(
    '<b style="font-size:120%;">MathJax</b> v' + MathJax.version +
      '<br>using ' + aboutFont(),
    aboutContent,
    '<a href="http://www.mathjax.org">MathJax.org</a>');

  ////TODO: Needs to be rewritten to allow for localisation.
  var help = new ContextMenu.Info('<b>MathJax Help</b>', function() {
    return '<p><b>MathJax</b> is a JavaScript library that allows page' +
      ' authors to include mathematics within their web pages.' +
      ' As a reader, you don\'t need to do anything to make that happen.</p>' +
      '<p><b>Browsers</b>: MathJax works with all modern browsers including' +
      ' IE6+, Firefox 3+, Chrome 0.2+, Safari 2+, Opera 9.6+' +
      ' and most mobile browsers.</p>' +
      '<p><b>Math Menu</b>: MathJax adds a contextual menu to equations.' +
      ' Right-click or CTRL-click on any mathematics to access the menu.</p>' +
      '<div style="margin-left: 1em;">' +
      '<p><b>Show Math As</b> allows you to view the formula\'s source markup' +
      ' for copy &amp; paste (as MathML or in its original format).</p>' +
      '<p><b>Settings</b> gives you control over features of MathJax, such as' +
      ' the size of the mathematics, and the mechanism used' +
      ' to display equations.</p>' +
      '<p><b>Language</b> lets you select the language used by MathJax for' +
      ' its menus and warning messages.</p>' +
      '</div><p><b>Math Zoom</b>: If you are having difficulty reading an' +
      ' equation, MathJax can enlarge it to help you see it better.</p>' +
      '<p><b>Accessibility</b>: MathJax will automatically work with screen' +
      ' readers to make mathematics accessible to the visually impaired.</p>' +
      '<p><b>Fonts</b>: MathJax will use certain math fonts if they are' +
      ' installed on your computer; otherwise, it will use web-based fonts.' +
      ' Although not required, locally installed fonts will speed up' +
      ' typesetting. We suggest installing the' +
      ' <a href="http://www.stixfonts.org/" target="_blank">STIX fonts</a>.' +
      '</p></div>';
  }, '<a href="http://www.mathjax.org">MathJax.org</a>');


  ////TODO: Needs to be embedded into a queuing function.
  let mathmlSource = new ContextMenu.Popup(
    'MathJax MathML Equation', function(element) {
      var jax = MathJax.Hub.getJaxFor(element);
      if (!element) {
        return '';
      }
      var MML = MathJax.ElementJax.mml;
      if (MML && typeof(MML.mbase.prototype.toMathML) !== 'undefined') {
        // toMathML() can call MathJax.Hub.RestartAfter,
        // so trap errors and check
        return formatSource(jax.root.toMathML('', jax));
      }
      return '';
    });

  let originalText = new ContextMenu.Popup(
    'MathJax Original Source', function(element) {
      var jax = MathJax.Hub.getJaxFor(element);
      if (!element) {
        return '';
      }
      return formatSource(jax.originalText);
    });

  // MENU.ShowSource.Text(MENU.jax.root.toMathML("",MENU.jax),event)} catch (err) {
  //   if (!err.restart) {throw err}
  //   CALLBACK.After([this,MENU.ShowSource,EVENT],err.restart);
  //   }
  // } else if (!AJAX.loadingToMathML) {
  //   AJAX.loadingToMathML = true;
  //   MENU.ShowSource.Window(event); // WeBKit needs to open window on click event
  //   CALLBACK.Queue(
  //     AJAX.Require("[MathJax]/extensions/toMathML.js"),
  //     function () {
  //       delete AJAX.loadingToMathML;
  //       if (!MML.mbase.prototype.toMathML) {MML.mbase.prototype.toMathML = function () {}}
  //     },
  //     [this,MENU.ShowSource,EVENT]  // call this function again
  //   );
  //   return '';
  // }

  var formatSource = function(text) {
    text = text.replace(/^\s*/, '').replace(/\s*$/, '');
    text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return text;
  };

  var MENU = {};
  var SETTINGS = MathJax.Hub.config.menuSettings;
  MENU.id = function(value) { };
  MENU.ALT = function(value) {
    SETTINGS.ALT = value;
  };
  MENU.CTRL = function(value) {
    SETTINGS.CTRL = value;
  };
  MENU.CMD = function(value) {
    SETTINGS.CMD = value;
  };
  MENU.Shift = function(value) {
    SETTINGS.Shift = value;
  };
  MENU.About = function() {
    about.post(0, 0);
  };
  MENU.Help = function() {
    help.post(0, 0);
  };
  MENU.ShowSource = function() {
    mathmlSource.post();
  };
  MENU.ShowOriginal = function() {
    originalText.post();
  };
  MENU.ZoomTrigger = function(value) {
    SETTINGS.zoom = value;
  };
  MENU.ZoomScale = function(value) {
    SETTINGS.zscale = value;
  };
  MENU.TexHints = function(value) {
    SETTINGS.texHints = value;
  };
  MENU.Semantics = function(value) {
    SETTINGS.semantics = value;
  };
  MENU.Renderer = function(value) {
    SETTINGS.renderer = value;
    MathJax.Menu.Renderer();
  };
  MENU.AssistiveMML = function(value) {
    SETTINGS.assistiveMML = value;
    MathJax.Menu.AssistiveMML();
  };
  MENU.FastPreview = function(value) {
    SETTINGS.FastPreview = value;
  };
  MENU.InTabOrder = function(value) {
    SETTINGS.inTabOrder = value;
    contextmenu.getStore().inTaborder(value);
  };
  MENU.Font = function(value) {
    SETTINGS.font = value;
    // Question: Does this need to be saved in the cookie as otherwise we will
    // always get "Auto".
    MathJax.Menu.Font();
  };

  var cm_json =
        {"menu":
         {"pool": [
           {
             "name": "zoom",
             "value": SETTINGS.zoom,
             "action": MENU.ZoomTrigger
           },
           {
             "name": "zscale",
             "value": SETTINGS.zscale,
             "action": MENU.ZoomScale
           },
           {
             "name": "texHints",
             "value": SETTINGS.texHints,
             "action": MENU.TexHints
           },
           {
             "name": "semantics",
             "value": SETTINGS.Semantics,
             "action": MENU.Semantics
           },
           {
             "name": "ALT",
             "value": SETTINGS.ALT,
             "action": MENU.ALT
           },
           {
             "name": "CMD",
             "value": SETTINGS.CMD,
             "action": MENU.CMD
           },
           {
             "name": "CTRL",
             "value": SETTINGS.CTRL,
             "action": MENU.CTRL
           },
           {
             "name": "Shift",
             "value": SETTINGS.Shift,
             "action": MENU.Shift
           },
           { "name": "renderer",
             "value": "HTML-CSS",
             "action": MENU.Renderer
           },
           { "name": "fastPreview",
             "value": SETTINGS.FastPreview,
             "action": MENU.FastPreview
           },
           { "name": "assistiveMML",
             "value": SETTINGS.assistiveMML,
             "action": MENU.AssistiveMML
           },
           { "name": "inTabOrder",
             "value": SETTINGS.inTabOrder,
             "action": MENU.InTabOrder
           },
           { "name": "font",
             "value": SETTINGS.font,
             "action": MENU.Font
           }
         ],
          "items":
          [
            {"type": "submenu",
             "id": "Show",
             "content": "Show Math As",
             "menu": {
               "items" : [
                 {"type": "command",
                  "id": "MathMLcode",
                  "content": "MathML Code",
                  "action": MENU.ShowSource
                 },
                 {"type": "command",
                  "id": "Original",
                  "content": "Original Form",
                  "action": MENU.ShowOriginal
                 },
                 {"type": "submenu",
                  "id": "Annotation",
                  "content": "Annotation",
                  "disabled": true,
                  "menu": {
                    "items": []}
                 },
                 {"type": "rule"},
                 {"type": "checkbox",
                  "id": "texHints",
                  "content": "Show TeX hints in MathML",
                  "variable": "texHints"
                 },
                 {"type": "checkbox",
                  "id": "semantics",
                  "content": "Add original form as annotation",
                  "variable": "semantics"
                 }
               ]
             }
            },
            {"type": "rule"},
            {"type": "submenu",
             "id": "Settings",
             "content": "Math Settings",
             "menu":
             {"items" : [
               {"type": "submenu",
                "id": "ZoomTrigger",
                "content": "Zoom Trigger",
                "menu": {
                  "items": [
                    {"type": "radio",
                     "id": "Hover",
                     "content": "Hover",
                     "variable": "zoom"
                    },
                    {"type": "radio",
                     "id": "Click",
                     "content": "Click",
                     "variable": "zoom"
                    },
                    {"type": "radio",
                     "id": "DoubleClick",
                     "content": "Double-Click",
                     "variable": "zoom"
                    },
                    {"type": "radio",
                     "id": "NoZoom",
                     "content": "No Zoom",
                     "variable": "zoom",
                     "value": "None"
                    },
                    {"type": "rule"},
                    {"type": "label",
                     "id": "TriggerRequires",
                     "content": "Trigger Requires:"
                    },
                    {"type": "checkbox",
                     "id": (MathJax.Hub.Browser.isMac ? "Option" : "Alt"),
                     "content": (MathJax.Hub.Browser.isMac ? "Option" : "Alt"),
                     "variable": "ALT"
                    },
                    {"type": "checkbox",
                     "id": "Command",
                     "content": "Command",
                     "variable": "CMD",
                     "disabled": !MENU.isMac
                    },
                    {"type": "checkbox",
                     "id": "Control",
                     "content": "Control",
                     "variable": "CTRL",
                     "disabled":  MENU.isMac
                    },
                    {"type": "checkbox",
                     "id": "Shift",
                     "content": "Shift",
                     "variable": "Shift"
                    }
                  ]
                }
               },
               {"type": "submenu",
                "id": "ZoomFactor",
                "content": "Zoom Factor",
                "menu": {
                  "items": [
                    {"type": "radio",
                     "content": "100%",
                     "variable": "zscale"
                    },
                    {"type": "radio",
                     "content": "125%",
                     "variable": "zscale"
                    },
                    {"type": "radio",
                     "content": "133%",
                     "variable": "zscale"
                    },
                    {"type": "radio",
                     "content": "150%",
                     "variable": "zscale"
                    },
                    {"type": "radio",
                     "content": "175%",
                     "variable": "zscale"
                    },
                    {"type": "radio",
                     "content": "200%",
                     "variable": "zscale"
                    },
                    {"type": "radio",
                     "content": "250%",
                     "variable": "zscale"
                    },
                    {"type": "radio",
                     "content": "300%",
                     "variable": "zscale"
                    },
                    {"type": "radio",
                     "content": "400%",
                     "variable": "zscale"
                    }
                  ]
                }
               },
               {"type": "rule"},
               {"type": "submenu",
                "id": "Renderer",
                "content": "Math Renderer",
                "menu": {
                  "items" : [
                    {"type": "radio",
                     "id": "HTML-CSS",
                     "content": "HTML-CSS",
                     "variable": "renderer"
                    },
                    {"type": "radio",
                     "id": "CommonHTML",
                     "content": "Common HTML",
                     "variable": "renderer"
                    },
                    {"type": "radio",
                     "id": "PreviewHTML",
                     "content": "Preview HTML",
                     "variable": "renderer"
                    },
                    {"type": "radio",
                     "id": "MathML",
                     "content": "MathML",
                     "variable": "renderer"
                    },
                    {"type": "radio",
                     "id": "SVG",
                     "content": "SVG",
                     "variable": "renderer"
                    },
                    {"type": "radio",
                     "id": "PlainSource",
                     "content": "Plain Source",
                     "variable": "renderer"
                    },
                    {"type": "rule"},
                    {"type": "checkbox",
                     "id": "FastPreview",
                     "content": "Fast Preview",
                     "variable": "fastPreview"
                    },
                    {"type": "checkbox",
                     "id": "AssistiveMML",
                     "content": "Assistive MathML",
                     "variable": "assistiveMML"
                    },
                    {"type": "checkbox",
                     "id": "InTabOrder",
                     "content": "Include in Tab Order",
                     "variable": "inTabOrder"
                    }
                  ]
                }
               },
               {"type": "submenu",
                "id": "FontPrefs",
                "content": "Font Preference",
                "hidden": !MathJax.Hub.config.MathMenu.showFontMenu,
                "menu": {
                  "items": [
                    {"type": "label",
                     "id": "ForHTMLCSS",
                     "content": "For HTML-CSS:"
                    },                                        
                    {"type": "radio",
                     "id": "Auto",
                     "content": "Auto",
	             "variable": "font"
                    },
                    {"type": "rule"},
                    {"type": "radio",
                     "id": "TeXLocal",
                     "content": "TeX (local)",   
	             "variable": "font"
                    },
                    {"type": "radio",
                     "id": "TeXWeb",
                     "content": "TeX (web)",       
	             "variable": "font"
                    },
                    {"type": "radio",
                     "id": "TeXImage",
                     "content": "TeX (image)",   
	             "variable": "font"
                    },
                    {"type": "rule"},
                    {"type": "radio",
                     "id": "STIXLocal",
                     "content": "STIX (local)", 
	             "variable": "font"
                    },
                    {"type": "radio",
                     "id": "STIXWeb",
                     "content": "STIX (web)", 
	             "variable": "font"
                    },
                    {"type": "rule"},
                    {"type": "radio",
                     "id": "AsanaMathWeb",
                     "content": "Asana Math (web)", 
	             "variable": "font"
                    },
                    {"type": "radio",
                     "id": "GyrePagellaWeb",
                     "content": "Gyre Pagella (web)", 
	             "variable": "font"
                    },
                    {"type": "radio",
                     "id": "GyreTermesWeb",
                     "content": "Gyre Termes (web)", 
	             "variable": "font"
                    },
                    {"type": "radio",
                     "id": "LatinModernWeb",
                     "content": "Latin Modern (web)", 
	             "variable": "font"
                    },
                    {"type": "radio",
                     "id": "NeoEulerWeb",
                     "content": "Neo Euler (web)", 
	             "variable": "font"
                    },
                  ]
                }
               },
               {"type": "command",
                "id": "Scale",
                "content": "Scale All Math ...",
                "action": MathJax.Menu.Scale
               }
             ]
             }
            },
            {"type": "rule"},
            {"type": "command",
             "id": "About",
             "content": "About MathJax",
             "action": MENU.About
            },
            {"type": "command",
             "id": "Help",
             "content": "MathJax Help",
             "action": MENU.Help
            }
          ]
         }
        };

  ContextMenu.CssStyles.addInfoStyles();
  ContextMenu.CssStyles.addMenuStyles();
  contextmenu = ContextMenu.parse(cm_json);
  about.attachMenu(contextmenu);
  help.attachMenu(contextmenu);
  mathmlSource.attachMenu(contextmenu);
  originalText.attachMenu(contextmenu);

  MathJax.Hub.Register.MessageHook(
    'New Math', function(message) {
      var newid = message[1] + '-Frame';
      var math = document.getElementById(newid);
      if (math) {
        // remove already set tabindex.
        math.removeAttribute('tabindex');
        contextmenu.getStore().insert(math);
      }
    });
  // Unfold zoom menu:
  //cc.post(50,50);

  // Into init function:
  contextmenu.getStore().inTaborder(SETTINGS.inTabOrder);

  cc = contextmenu;
});
