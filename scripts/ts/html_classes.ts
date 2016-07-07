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
 * @fileoverview Pseudo enum structures for HTML classes and ids.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


namespace ContextMenu {

  let PREFIX: string = 'CtxtMenu';

  function prefix_(name: string): string {
    return PREFIX + '_' + name;
  };

  // This is in lieu of a proper enum type.
  export let HtmlClasses: {[id: string]: string} = {
    CONTEXTMENU: prefix_('ContextMenu'),
    MENU: prefix_('Menu'),
    MENUARROW: prefix_('MenuArrow'),
    MENUACTIVE: prefix_('MenuActive'),
    MENUCHECK: prefix_('MenuCheck'),
    MENUCLOSE: prefix_('MenuClose'),
    MENUDISABLED: prefix_('MenuDisabled'),
    MENUITEM: prefix_('MenuItem'),
    MENULABEL: prefix_('MenuLabel'),
    MENURADIOCHECK: prefix_('MenuRadioCheck'),
    MENURULE: prefix_('MenuRule'),
    MOUSEPOST: prefix_('MousePost'),
    PREFIX: PREFIX,
    RTL: prefix_('RTL')
  };

  export let HtmlIds: {[id: string]: string} = {
    MENUFRAME: prefix_('MenuFrame'),
    PREFIX: PREFIX,
    POPUP: prefix_('Popup'),
    POPUPCLOSE: prefix_('PopupClose')
  };

}


