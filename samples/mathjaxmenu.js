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
  MathJax.testCombo = 'hello';
  MathJax.testSlider = 50;
  MENU.id = function(value) { };
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
  MENU.getALT = function() {
    return SETTINGS.ALT;
  };
  MENU.setALT = function(value) {
    SETTINGS.ALT = value;
  };
  MENU.getCTRL = function() {
    return SETTINGS.CTRL;
  };
  MENU.setCTRL = function(value) {
    SETTINGS.CTRL = value;
  };
  MENU.getCMD = function() {
    return SETTINGS.CMD;
  };
  MENU.setCMD = function(value) {
    SETTINGS.CMD = value;
  };
  MENU.getShift = function() {
    return SETTINGS.Shift;
  };
  MENU.setShift = function(value) {
    SETTINGS.Shift = value;
  };
  MENU.setZoomTrigger = function(value) {
    SETTINGS.zoom = value;
  };
  MENU.getZoomTrigger = function(value) {
    return SETTINGS.zoom;
  };
  MENU.getZoomScale = function() {
    return SETTINGS.zscale;
  };
  MENU.setZoomScale = function(value) {
    SETTINGS.zscale = value;
  };
  MENU.getTexHints = function() {
    return SETTINGS.texHints;
  };
  MENU.setTexHints = function(value) {
    SETTINGS.texHints = value;
  };
  MENU.getSemantics = function() {
    return SETTINGS.semantics;
  };
  MENU.setSemantics = function(value) {
    SETTINGS.semantics = value;
  };
  MENU.getRenderer = function() {
    return SETTINGS.renderer;
  };
  MENU.setRenderer = function(value) {
    SETTINGS.renderer = value;
    MathJax.Menu.Renderer();
  };
  MENU.getAssistiveMML = function() {
    return SETTINGS.assistiveMML;
  };
  MENU.setAssistiveMML = function(value) {
    SETTINGS.assistiveMML = value;
    MathJax.Menu.AssistiveMML();
  };
  MENU.getFastPreview = function() {
    return SETTINGS.FastPreview;
  };
  MENU.setFastPreview = function(value) {
    SETTINGS.FastPreview = value;
  };
  MENU.getInTabOrder = function() {
    return SETTINGS.inTabOrder;
  };
  MENU.setInTabOrder = function(value) {
    SETTINGS.inTabOrder = value;
    contextmenu.getStore().inTaborder(value);
  };
  MENU.getFont = function() {
    return SETTINGS.font;
  };
  MENU.setFont = function(value) {
    SETTINGS.font = value;
    // Question: Does this need to be saved in the cookie as otherwise we will
    // always get "Auto".
    MathJax.Menu.Font();
  };
  MENU.getCombo = function() {
    return MathJax.testCombo;
  };
  MENU.setCombo = function(value) {
    MathJax.testCombo = value;
  };
  MENU.getSlider = function() {
    return MathJax.testSlider;
  };
  MENU.setSlider = function(value) {
    MathJax.testSlider = value;
  };
  MENU.postSelection = function() {
    box.post(0, 0);
  };
  MENU.postCsprefs = function() {
    prefs.post(0, 0);
  };


  var cm_json =
        {"menu":
         {"pool": [
           {
             "name": "zoom",
             "getter": MENU.getZoomTrigger,
             "setter": MENU.setZoomTrigger
           },
           {
             "name": "zscale",
             "getter": MENU.getZoomScale,
             "setter": MENU.setZoomScale
           },
           {
             "name": "texHints",
             "getter": MENU.getTexHints,
             "setter": MENU.setTexHints
           },
           {
             "name": "semantics",
             "getter": MENU.getSemantics,
             "setter": MENU.setSemantics
           },
           {
             "name": "ALT",
             "getter": MENU.getALT,
             "setter": MENU.setALT
           },
           {
             "name": "CMD",
             "getter": MENU.getCMD,
             "setter": MENU.setCMD
           },
           {
             "name": "CTRL",
             "getter": MENU.getCTRL,
             "setter": MENU.setCTRL
           },
           {
             "name": "Shift",
             "getter": MENU.getShift,
             "setter": MENU.setShift
           },
           { "name": "renderer",
             "getter": MENU.getRenderer,
             "setter": MENU.setRenderer
           },
           { "name": "fastPreview",
             "getter": MENU.getFastPreview,
             "setter": MENU.setFastPreview
           },
           { "name": "assistiveMML",
             "getter": MENU.getAssistiveMML,
             "setter": MENU.setAssistiveMML
           },
           { "name": "inTabOrder",
             "getter": MENU.getInTabOrder,
             "setter": MENU.setInTabOrder
           },
           { "name": "font",
             "getter": MENU.getFont,
             "setter": MENU.setFont
           },
           { "name": "comboTest",
             "getter": MENU.getCombo,
             "setter": MENU.setCombo
           },
           { "name": "sliderTest",
             "getter": MENU.getSlider,
             "setter": MENU.setSlider
           }
         ],
          "items":
          [ {"type": "command",
             "id": "ClearspeakPreferences",
             "content": "Clearspeak Preferences",
             "action": MENU.postCsprefs
            },
            {"type": "command",
             "id": "ZoomSelection",
             "content": "Zoom Selection",
             "action": MENU.postSelection
            },
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
                     "hidden": !MENU.isMac
                    },
                    {"type": "checkbox",
                     "id": "Control",
                     "content": "Control",
                     "variable": "CTRL",
                     "hidden":  MENU.isMac
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
            {"type": "slider",
             "variable": "sliderTest",
             "content": "Slider: "
            },
            {"type": "command",
             "id": "About",
             "content": "About MathJax",
             "action": MENU.About
            },
            {"type": "command",
             "id": "Help",
             "content": "MathJax Help",
             "action": MENU.Help
            },
            {"type": "combo",
             "variable": "comboTest",
             "content": "Combo: "
            }

          ]
         }
        };

  ContextMenu.CssStyles.addInfoStyles();
  ContextMenu.CssStyles.addMenuStyles();
  contextmenu = ContextMenu.Parse.contextMenu(cm_json);
  about.attachMenu(contextmenu);
  help.attachMenu(contextmenu);
  mathmlSource.attachMenu(contextmenu);
  originalText.attachMenu(contextmenu);

  var box = ContextMenu.Parse.selectionBox(
    {
      "title": 'Selection Test',
      "signature": 'End of selection',
      "selections": [{"title": "zoom",
                      "values": ["100%", "125%", "133%", "150%", "175%", "200%", "250%", "300%", "400%"],
                      "variable": "zscale"}]
    },
    contextmenu
  );

  var cspref_Values = { };
  
  var creator = function(pref) {
    let set = MENU['set' + pref] = function(value) {
      cspref_Values[pref] = value;
    };
    let get = MENU['get' + pref] = function() {
      return cspref_Values[pref] || 'Auto';
    };
    let variable = new ContextMenu.Variable('cspref_' + pref, get, set);
    contextmenu.pool.insert(variable);
  };

  ["AbsoluteValue", "Bar", "Caps", "CombinationPermutation", "Currency", "Ellipses", "Exponent", "Fraction", "Functions", "ImpliedTimes", "Log", "Matrix", "MultiLineLabel", "MultiLineOverview", "MultiLinePausesBetweenColumns", "MultsymbolDot", "MultsymbolX", "Paren", "Prime", "Roots", "SetMemberSymbol", "Sets", "TriangleSymbol", "Trig", "VerticalLine"].forEach(creator);

  var prefs = ContextMenu.Parse.selectionBox(
    {
      "title": "Clearspeak Preferences",
      "signature": '',
      "order": 'decreasing',
      "selections": [
        {"title": "AbsoluteValue",
         "values": ['Auto', 'AbsEnd', 'Cardinality', 'Determinant'],
         "variable": "cspref_AbsoluteValue"},
        {"title": "Bar",
         "values": ['Auto', 'Conjugate'],
         "variable": "cspref_Bar"},
        {"title": "Caps",
         "values": ['Auto', 'SayCaps'],
         "variable": "cspref_Caps"},
        {"title": "CombinationPermutation",
         "values": ['Auto', 'ChoosePermute'],
         "variable": "cspref_CombinationPermutation"},
        {"title": "Ellipses",
         "values": ['Auto', 'AndSoOn'],
         "variable": "cspref_Ellipses"},
        {"title": "Currency",
         "values": ['Auto', 'Position', 'Prefix'],
         "variable": "cspref_Currency"},
        {"title": "Exponent",
         "values": ['Auto', 'AfterPower', 'Ordinal', 'OrdinalPower'],
         "variable": "cspref_Exponent"},
        {"title": "Fraction",
         "values": ['Auto', 'EndFrac', 'FracOver', 'General', 'GeneralEndFrac',
                      'Ordinal', 'Over', 'OverEndFrac', 'Per'],
         "variable": "cspref_Fraction"},
        {"title": "Functions",
         "values": ['Auto', 'None', 'Reciprocal'],
         "variable": "cspref_Functions"},
         {"title": "ImpliedTimes",
          "values": ['Auto', 'MoreImpliedTimes', 'None'],
          "variable": "cspref_ImpliedTimes"},
         {"title": "Log",
          "values": ['Auto', 'LnAsNaturalLog'],
          "variable": "cspref_Log"},
         {"title": "Matrix",
          "values": ['Auto', 'Combinatoric', 'EndMatrix', 'EndVector', 'SilentColNum',
                       'SpeakColNum', 'Vector'],
          "variable": "cspref_Matrix"},
         {"title": "MultiLineLabel",
          "values": ['Auto', 'Case', 'Constraint', 'Equation', 'Line', 'None',
                       'Row', 'Step'],
          "variable": "cspref_MultiLineLabel"},
         {"title": "MultiLineOverview",
          "values": ['Auto', 'None'],
          "variable": "cspref_MultiLineOverview"},
         {"title": "MultiLinePausesBetweenColumns",
          "values": ['Auto', 'Long', 'Short'],
          "variable": "cspref_MultiLinePausesBetweenColumns"},
         {"title": "MultsymbolDot",
          "values": ['Auto', 'Dot'],
          "variable": "cspref_MultsymbolDot"},
         {"title": "MultsymbolX",
          "values": ['Auto', 'By', 'Cross'],
          "variable": "cspref_MultsymbolX"},
         {"title": "Paren",
          "values": ['Auto', 'CoordPoint', 'Interval', 'Silent', 'Speak',
                       'SpeakNestingLevel'],
          "variable": "cspref_Paren"},
         {"title": "Prime",
          "values": ['Auto', 'Angle', 'Length'],
          "variable": "cspref_Prime"},
         {"title": "Roots",
          "values": ['Auto', 'PosNegSqRoot', 'PosNegSqRootEnd', 'RootEnd'],
          "variable": "cspref_Roots"},
         {"title": "SetMemberSymbol",
          "values": ['Auto', 'Belongs', 'Element', 'Member'],
          "variable": "cspref_SetMemberSymbol"},
         {"title": "Sets",
          "values": ['Auto', 'SilentBracket', 'woall', 'woAll'],
          "variable": "cspref_Sets"},
         {"title": "TriangleSymbol",
          "values": ['Auto', 'Delta'],
          "variable": "cspref_TriangleSymbol"},
         {"title": "Trig",
          "values": ['Auto', 'ArcTrig', 'TrigInverse', 'Reciprocal'],
          "variable": "cspref_Trig"},
          {"title": "VerticalLine",
           "values": ['Auto', 'Divides', 'Given', 'SuchThat'],
           "variable": "cspref_VerticalLine"}
        ]
    },
    contextmenu);
  
  
  MathJax.Hub.Register.MessageHook(
    'New Math', function(message) {
      var newid = message[1] + '-Frame';
      var math = document.getElementById(newid);
      if (math) {
        // remove already set tabindex.
        math.removeAttribute('tabindex');
        contextmenu.store.insert(math);
      }
    });
  // Unfold zoom menu:
  //cc.post(50,50);

  // Into init function:
  contextmenu.store.inTaborder(SETTINGS.inTabOrder);

  cc = contextmenu;
});
