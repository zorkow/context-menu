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
 * @file Pseudo enum structures for HTML classes and ids.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */



const PREFIX = 'CtxtMenu';

/**
 * Prefixes a html class name.
 * @param {string} name The base name.
 * @returns {string} The prefixed name.
 * @private
 */
function prefix_(name: string): string {
  return PREFIX + '_' + name;
}

/**
 * Prefixes a html id.
 * @param {string} name The base name.
 * @returns {HtmlClass} The prefixed name.
 * @private
 */
function prefixClass_(name: string): HtmlClass {
  return prefix_(name) as HtmlClass;
}

/**
 * Prefixes a html class name.
 * @param {string} name The base name.
 * @returns {HtmlAttr} The prefixed name.
 * @private
 */
function prefixAttr_(name: string): HtmlAttr {
  return prefix_(name) as HtmlAttr;
}

// This is in lieu of a proper enum type.
// TODO: Rewrite into new enum
/**
 * HTML classes.
 * @enum {string}
 */
export const HtmlClasses: {[id: string]: HtmlClass} = {
  ATTACHED: prefixClass_('Attached'),
  CONTEXTMENU: prefixClass_('ContextMenu'),
  MENU: prefixClass_('Menu'),
  MENUARROW: prefixClass_('MenuArrow'),
  MENUACTIVE: prefixClass_('MenuActive'),
  MENUCHECK: prefixClass_('MenuCheck'),
  MENUCLOSE: prefixClass_('MenuClose'),
  MENUCOMBOBOX: prefixClass_('MenuComboBox'),
  MENUDISABLED: prefixClass_('MenuDisabled'),
  MENUFRAME: prefixClass_('MenuFrame'),
  MENUITEM: prefixClass_('MenuItem'),
  MENULABEL: prefixClass_('MenuLabel'),
  MENURADIOCHECK: prefixClass_('MenuRadioCheck'),
  MENUINPUTBOX: prefixClass_('MenuInputBox'),
  MENURULE: prefixClass_('MenuRule'),
  MENUSLIDER: prefixClass_('MenuSlider'),
  MOUSEPOST: prefixClass_('MousePost'),
  RTL: prefixClass_('RTL'),
  INFO: prefixClass_('Info'),
  INFOCLOSE: prefixClass_('InfoClose'),
  INFOCONTENT: prefixClass_('InfoContent'),
  INFOSIGNATURE: prefixClass_('InfoSignature'),
  INFOTITLE: prefixClass_('InfoTitle'),
  SLIDERVALUE: prefixClass_('SliderValue'),
  SLIDERBAR: prefixClass_('SliderBar'),
  SELECTION: prefixClass_('Selection'),
  SELECTIONBOX: prefixClass_('SelectionBox'),
  SELECTIONMENU: prefixClass_('SelectionMenu'),
  SELECTIONDIVIDER: prefixClass_('SelectionDivider'),
  SELECTIONITEM: prefixClass_('SelectionItem')
};

// This is an awkward type construction!
export type HtmlClass = 'CtxtMenu_ContextMenu' | 'CtxtMenu_Menu' |
  'CtxtMenu_MenuArrow' | 'CtxtMenu_MenuActive' | 'CtxtMenu_MenuCheck' |
  'CtxtMenu_MenuClose' | 'CtxtMenu_MenuDisabled' | 'CtxtMenu_MenuItem' |
  'CtxtMenu_MenuLabel' | 'CtxtMenu_MenuRadioCheck' | 'CtxtMenu_MenuRule' |
  'CtxtMenu_MousePost' | 'CtxtMenu_RTL' | 'CtxtMenu_Attached' |
  'CtxtMenu_Info' | 'CtxtMenu_InfoClose' | 'CtxtMenu_InfoContent' |
  'CtxtMenu_InfoSignature' | 'CtxtMenu_InfoTitle' | 'CtxtMenu_MenuFrame' |
  'CtxtMenu_MenuInputBox' | 'CtxtMenu_MenuSlider' |
  'CtxtMenu_Selection' | 'CtxtMenu_SelectionBox' | 'CtxtMenu_SelectionItem' |
  'CtxtMenu_SelectionDivider' | 'CtxtMenu_SelectionMenu'
  ;

/**
 * HTML attributes.
 * @enum {string}
 */
export const HtmlAttrs: {[id: string]: HtmlAttr} = {
  COUNTER: prefixAttr_('Counter'),
  KEYDOWNFUNC: prefixAttr_('keydownFunc'),
  CONTEXTMENUFUNC: prefixAttr_('contextmenuFunc'),
  OLDTAB: prefixAttr_('Oldtabindex'),
  TOUCHFUNC: prefixAttr_('TouchFunc'),
};

export type HtmlAttr = 'CtxtMenu_Counter' | 'CtxtMenu_keydownFunc' |
  'CtxtMenu_contextmenuFunc' | 'CtxtMenu_touchstartFunc' |
  'CtxtMenu_Oldtabindex';
