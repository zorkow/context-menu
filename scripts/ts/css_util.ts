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

namespace ContextMenu {

  export namespace CssStyles {

    let POPUP_STYLES: {[id: string]: string} = {
      '#CtxtMenu_Popup': '{' +
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
    '#CtxtMenu_Popup.CtxtMenu_MousePost': '{' +
        'outline:none;' +
        '}',
      '#CtxtMenu_PopupClose' :  '{' +
        'top:.2em; right:.2em' +
        '}',
    };

    let MENU_STYLES: {[id: string]: string} = {
      '.CtxtMenu_Menu' : '{' +
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
      '.CtxtMenu_MenuItem' : '{' +
        '  padding: 1px 2em;' +
        '  background:transparent;' +
        '}',
      '.CtxtMenu_MenuArrow' : '{' +
        '  position:absolute; right:.5em; padding-top:.25em; color:#666666;' +
        '  font-family: null; font-size: .75em' +
        '}',
      '.CtxtMenu_MenuActive .CtxtMenu_MenuArrow' : '{color:white}',
      '.CtxtMenu_MenuArrow.RTL' : '{left:.5em; right:auto}',
      '.CtxtMenu_MenuCheck' : '{' +
        '  position:absolute; left:.7em;' +
        '  font-family: null' +
        '}',
      '.CtxtMenu_MenuCheck.RTL' : '{right:.7em; left:auto}',
      '.CtxtMenu_MenuRadioCheck' : '{' +
        '  position:absolute; left: .7em;' +
        '}',
      '.CtxtMenu_MenuRadioCheck.RTL' : '{' +
        '  right: .7em; left:auto' +
        '}',

      '.CtxtMenu_MenuLabel' : '{' +
        '  padding: 1px 2em 3px 1.33em;' +
        '  font-style:italic' +
        '}',
      '.CtxtMenu_MenuRule' : '{' +
        '  border-top: 1px solid #DDDDDD;' +
        '  margin: 4px 3px;' +
        '}',
      '.CtxtMenu_MenuDisabled' : '{' +
        '  color:GrayText' +
        '}',
      '.CtxtMenu_MenuActive' : '{' +
        '  background-color: #606872;' +
        '  color: white;' +
        '}',
      '.CtxtMenu_MenuDisabled:focus; .CtxtMenu_MenuLabel:focus' : '{' +
        '  background-color: #E8E8E8' +
        '}',
      '.CtxtMenu_ContextMenu:focus' : '{' +
        '  outline:none' +
        '}',
      '.CtxtMenu_ContextMenu .CtxtMenu_MenuItem:focus' : '{' +
        '  outline:none' +
        '}',
      '.CtxtMenu_Menu .CtxtMenu_MenuClose' : '{' +
        '  top:-10px; left:-10px' +
        '}'
    };

    // Style of the little cross button to close a dialog or the mobile menu.
    let CLOSE_ICON_STYLES: {[id: string]: string} = {
      '.CtxtMenu_MenuClose' : '{' +
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
      '.CtxtMenu_MenuClose span' : '{' +
        '  display:block; background-color:#AAA; border:1.5px solid;' +
        '  border-radius:18px;' +
        '  -webkit-border-radius: 18px;             /* Safari and Chrome */' +
        '  -moz-border-radius: 18px;                /* Firefox */' +
        '  -khtml-border-radius: 18px;              /* Konqueror */' +
        '  line-height:0;' +
        '  padding:8px 0 6px     /* may need to be browser-specific */' +
        '}',
      '.CtxtMenu_MenuClose:hover' : '{' +
        '  color:white!important;' +
        '  border:2px solid #CCC!important' +
        '}',
      '.CtxtMenu_MenuClose:hover span' : '{' +
        '  background-color:#CCC!important' +
        '}',
      '.CtxtMenu_MenuClose:hover:focus' : '{' +
        '  outline:none' +
        '}'
    };

    let POPUP_ADDED = false;
    let MENU_ADDED = false;
    let CLOSE_ICON_ADDED = false;

    export function addMenuStyles(opt_document: HTMLDocument): void {
      if (MENU_ADDED) {
        return;
      }
      addStyles_(MENU_STYLES, opt_document);
      MENU_ADDED = true;
      addCloseIconStyles_(opt_document);
    }

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
