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

  /**
   * Prefixes a html class name.
   * @param {string} name The base name.
   * @return {string} The prefixed name.
   * @private
   */
  function prefix_(name: string): string {
    return <string>(PREFIX + '_' + name);
  };

  /**
   * Prefixes a html class name.
   * @param {string} name The base name.
   * @return {HtmlClass} The prefixed name.
   * @private
   */
  function prefixClass_(name: string): HtmlClass {
    return <HtmlClass>prefix_(name);
  };

  /**
   * Prefixes a html class name.
   * @param {string} name The base name.
   * @return {HtmlId} The prefixed name.
   * @private
   */
  function prefixId_(name: string): HtmlId {
    return <HtmlId>prefix_(name);
  };

  // This is in lieu of a proper enum type.
  /**
   * HTML classes.
   * @enum {string} 
   */
  export let HtmlClasses: {[id: string]: HtmlClass} = {
    CONTEXTMENU: prefixClass_('ContextMenu'),
    MENU: prefixClass_('Menu'),
    MENUARROW: prefixClass_('MenuArrow'),
    MENUACTIVE: prefixClass_('MenuActive'),
    MENUCHECK: prefixClass_('MenuCheck'),
    MENUCLOSE: prefixClass_('MenuClose'),
    MENUDISABLED: prefixClass_('MenuDisabled'),
    MENUITEM: prefixClass_('MenuItem'),
    MENULABEL: prefixClass_('MenuLabel'),
    MENURADIOCHECK: prefixClass_('MenuRadioCheck'),
    MENURULE: prefixClass_('MenuRule'),
    MOUSEPOST: prefixClass_('MousePost'),
    RTL: prefixClass_('RTL')
  };

  // This is an awkward type construction!
  export type HtmlClass = 'CtxtMenu_ContextMenu' | 'CtxtMenu_Menu' |
    'CtxtMenu_MenuArrow' | 'CtxtMenu_MenuActive' | 'CtxtMenu_MenuCheck' |
    'CtxtMenu_MenuClose' | 'CtxtMenu_MenuDisabled' | 'CtxtMenu_MenuItem' |
    'CtxtMenu_MenuLabel' | 'CtxtMenu_MenuRadioCheck' | 'CtxtMenu_MenuRule' |
    'CtxtMenu_MousePost' | 'CtxtMenu_RTL';

  /**
   * HTML ids.
   * @enum {string} 
   */
  export let HtmlIds: {[id: string]: HtmlId} = {
    MENUFRAME: prefixId_('MenuFrame'),
    POPUP: prefixId_('Popup'),
    POPUPCLOSE: prefixId_('PopupClose')
  };

  export type HtmlId = 'CtxtMenu_MenuFrame' | 'CtxtMenu_Popup' |
    'CtxtMenu_PopupClose';

}


