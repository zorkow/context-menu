/*************************************************************
 *
 *  Copyright (c) 2015-2016 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


/**
 * @fileoverview Utility functions for adding CSS styles.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

/// <reference path="html_classes.ts" />

namespace ContextMenu {

  export namespace CssStyles {

    function makeId_(name: string): string {
      return '#' + (HtmlIds[name] || name);
    }

    function makeClass_(name: string): string {
      return '.' + (HtmlClasses[name] || name);
    }

    let POPUP_STYLES: {[id: string]: string} = {};
    POPUP_STYLES[makeId_('POPUP')] = '{' +
      '  position:fixed; left:50%; width:auto; text-align:center;' +
      '  border:3px outset; padding:1em 2em; background-color:#DDDDDD;' +
      '  color:black;' +
      '  cursor:default; font-family:message-box; font-size:120%;' +
      '  font-style:normal; text-indent:0; text-transform:none;' +
      '  line-height:normal; letter-spacing:normal; word-spacing:normal;' +
      '  word-wrap:normal; white-space:nowrap; float:none; z-index:201;'  +
      '  border-radius: "15px;                     /* Opera 10.5 and IE9 */' +
      '  -webkit-border-radius:15px;               /* Safari and Chrome */' +
      '  -moz-border-radius:15px;                  /* Firefox */' +
      '  -khtml-border-radius:15px;                /* Konqueror */' +
      '  box-shadow:0px 10px 20px #808080;         /* Opera 10.5 and IE9 */' +
      '  -webkit-box-shadow:0px 10px 20px #808080; /* Safari 3 & Chrome */' +
      '  -moz-box-shadow:0px 10px 20px #808080;    /* Forefox 3.5 */' +
      '  -khtml-box-shadow:0px 10px 20px #808080;  /* Konqueror */' +
      '  filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=2,' +
      ' OffY=2, Color="gray", Positive="true"); /* IE */' +
      '}',
    POPUP_STYLES[makeId_('POPUP') + makeClass_('MOUSEPOST')] = '{' +
      'outline:none;' +
      '}',
    POPUP_STYLES[makeId_('POPUPCLOSE')] = '{' +
      'top:.2em; right:.2em' +
      '}';

    let MENU_STYLES: {[id: string]: string} = {};
    MENU_STYLES[makeClass_('MENU')] = '{' +
      '  position:absolute;' +
      '  background-color:white;' +
      '  color:black;' +
      '  width:auto; padding:5px 0px;' +
      '  border:1px solid #CCCCCC; margin:0; cursor:default;' +
      '  font: menu; text-align:left; text-indent:0; text-transform:none;' +
      '  line-height:normal; letter-spacing:normal; word-spacing:normal;' +
      '  word-wrap:normal; white-space:nowrap; float:none; z-index:201;' +
      '  border-radius: 5px;                     /* Opera 10.5 and IE9 */' +
      '  -webkit-border-radius: 5px;             /* Safari and Chrome */' +
      '  -moz-border-radius: 5px;                /* Firefox */' +
      '  -khtml-border-radius: 5px;              /* Konqueror */' +
      '  box-shadow:0px 10px 20px #808080;         /* Opera 10.5 and IE9 */' +
      '  -webkit-box-shadow:0px 10px 20px #808080; /* Safari 3 & Chrome */' +
      '  -moz-box-shadow:0px 10px 20px #808080;    /* Forefox 3.5 */' +
      '  -khtml-box-shadow:0px 10px 20px #808080;  /* Konqueror */' +
      '}',
    MENU_STYLES[makeClass_('MENUITEM')] = '{' +
      '  padding: 1px 2em;' +
      '  background:transparent;' +
      '}',
    MENU_STYLES[makeClass_('MENUARROW')] = '{' +
      '  position:absolute; right:.5em; padding-top:.25em; color:#666666;' +
      '  font-family: null; font-size: .75em' +
      '}',
    MENU_STYLES[makeClass_('MENUACTIVE') + ' ' + makeClass_('MENUARROW')] =
      '{color:white}',
    MENU_STYLES[makeClass_('MENUARROW') + makeClass_('RTL')] =
      '{left:.5em; right:auto}',
    MENU_STYLES[makeClass_('MENUCHECK')] = '{' +
      '  position:absolute; left:.7em;' +
      '  font-family: null' +
      '}',
    MENU_STYLES[makeClass_('MENUCHECK') + makeClass_('RTL')] =
      '{right:.7em; left:auto}',
    MENU_STYLES[makeClass_('MENURADIOCHECK')] = '{' +
      '  position:absolute; left: .7em;' +
      '}',
    MENU_STYLES[makeClass_('MENURADIOCHECK') + makeClass_('RTL')] = '{' +
      '  right: .7em; left:auto' +
      '}',
    MENU_STYLES[makeClass_('MENULABEL')] = '{' +
      '  padding: 1px 2em 3px 1.33em;' +
      '  font-style:italic' +
      '}',
    MENU_STYLES[makeClass_('MENURULE')] = '{' +
      '  border-top: 1px solid #DDDDDD;' +
      '  margin: 4px 3px;' +
      '}',
    MENU_STYLES[makeClass_('MENUDISABLED')] = '{' +
      '  color:GrayText' +
      '}',
    MENU_STYLES[makeClass_('MENUACTIVE')] = '{' +
      '  background-color: #606872;' +
      '  color: white;' +
      '}',
    MENU_STYLES[makeClass_('MENUDISABLED') + ':focus; ' +
                makeClass_('MENULABEL') + ':focus'] = '{' +
      '  background-color: #E8E8E8' +
      '}',
    MENU_STYLES[makeClass_('CONTEXTMENU') + ':focus'] = '{' +
      '  outline:none' +
      '}',
    MENU_STYLES[makeClass_('CONTEXTMENU') + ' ' +
                makeClass_('MENUITEM') + ':focus'] = '{' +
      '  outline:none' +
      '}',
    MENU_STYLES[makeClass_('MENU') + ' ' + makeClass_('MENUCLOSE')] = '{' +
      '  top:-10px; left:-10px' +
      '}';

    // Style of the little cross button to close a dialog or the mobile menu.
    let CLOSE_ICON_STYLES: {[id: string]: string} = {};
    CLOSE_ICON_STYLES[makeClass_('MENUCLOSE')] = '{' +
      '  position:absolute;' +
      '  cursor:pointer;' +
      '  display:inline-block;' +
      '  border:2px solid #AAA;' +
      '  border-radius:18px;' +
      '  -webkit-border-radius: 18px;             /* Safari and Chrome */' +
      '  -moz-border-radius: 18px;                /* Firefox */' +
      '  -khtml-border-radius: 18px;              /* Konqueror */' +
      '  font-family: "Courier New", Courier;' +
      '  font-size:24px;' +
      '  color:#F0F0F0' +
      '}',
    CLOSE_ICON_STYLES[makeClass_('MENUCLOSE') + ' span'] = '{' +
      '  display:block; background-color:#AAA; border:1.5px solid;' +
      '  border-radius:18px;' +
      '  -webkit-border-radius: 18px;             /* Safari and Chrome */' +
      '  -moz-border-radius: 18px;                /* Firefox */' +
      '  -khtml-border-radius: 18px;              /* Konqueror */' +
      '  line-height:0;' +
      '  padding:8px 0 6px     /* may need to be browser-specific */' +
      '}',
    CLOSE_ICON_STYLES[makeClass_('MENUCLOSE') + ':hover'] = '{' +
      '  color:white!important;' +
      '  border:2px solid #CCC!important' +
      '}',
    CLOSE_ICON_STYLES[makeClass_('MENUCLOSE') + ':hover span'] = '{' +
      '  background-color:#CCC!important' +
      '}',
    CLOSE_ICON_STYLES[makeClass_('MENUCLOSE') + ':hover:focus'] = '{' +
      '  outline:none' +
      '}';

    let POPUP_ADDED = false;
    let MENU_ADDED = false;
    let CLOSE_ICON_ADDED = false;


    /**
     * Adds the CSS styles for context menus.
     * @param {?HTMLDocument} opt_document The HTML document.
     */
    export function addMenuStyles(opt_document: HTMLDocument): void {
      if (MENU_ADDED) {
        return;
      }
      addStyles_(MENU_STYLES, opt_document);
      MENU_ADDED = true;
      addCloseIconStyles_(opt_document);
    }


    /**
     * Adds the CSS styles for popup widgets.
     * @param {?HTMLDocument} opt_document The HTML document.
     */
    export function addPopupStyles(opt_document: HTMLDocument): void {
      if (POPUP_ADDED) {
        return;
      }
      addStyles_(POPUP_STYLES, opt_document);
      POPUP_ADDED = true;
      addCloseIconStyles_(opt_document);
    }

    function addCloseIconStyles_(opt_document: HTMLDocument): void {
      if (CLOSE_ICON_ADDED) {
        return;
      }
      addStyles_(CLOSE_ICON_STYLES, opt_document);
      CLOSE_ICON_ADDED = true;
    }

    function addStyles_(styles: {[id: string]: string},
                        opt_document: HTMLDocument): void {
      let doc = opt_document || document;
      let element: HTMLStyleElement = doc.createElement('style');
      element.type = 'text/css';
      for (let style in styles) {
        element.innerHTML += style;
        element.innerHTML += ' ';
        element.innerHTML += styles[style];
        element.innerHTML += '\n';
      }
      doc.head.appendChild(element);
    }

  }
}
