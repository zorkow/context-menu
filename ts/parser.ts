/*************************************************************
 *
 *  Copyright (c) 2015-2020 The MathJax Consortium
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
 * @fileoverview Parser for menu items.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {Command} from './item_command';
import {Menu} from './menu';
import {MenuUtil} from './menu_util';
import {ContextMenu} from './context_menu';
import {Variable} from './variable';
import {VariablePool} from './variable_pool';
import {Checkbox} from './item_checkbox';
import {Combo} from './item_combo';
import {Label} from './item_label';
import {Radio} from './item_radio';
import {Submenu} from './item_submenu';
import {Rule} from './item_rule';
import {Item} from './item';
import {SubMenu} from './sub_menu';


namespace Parser {

  /**
   * Parses a JSON respresentation of a command item.
   * @param {JSON} json The JSON object to parse.
   * @param {Menu} menu The menu the item is attached to.
   * @return {Command} The new command object.
   */
  const parseCommand = function(
    {content: content, action: action, id: id}:
    {content: string, action: Function, id: string}, menu: Menu): Command {
    return new Command(menu, content, action, id);
  };

  /**
   * Parses a JSON respresentation of a checkbox item.
   * @param {JSON} json The JSON object to parse.
   * @param {Menu} menu The menu the item is attached to.
   * @return {Checkbox} The new checkbox object.
   */
  const parseCheckbox = function(
    {content: content, variable: variable, id: id}:
    {content: string, variable: string, id: string}, menu: Menu): Checkbox {
    return new Checkbox(menu, content, variable, id);
  };

  /**
   * Parses a JSON respresentation of a combo item.
   * @param {JSON} json The JSON object to parse.
   * @param {Menu} menu The menu the item is attached to.
   * @return {Combo} The new combo object.
   */
  const parseCombo = function(
    {content: content, variable: variable, id: id}:
    {content: string, variable: string, id: string}, menu: Menu): Combo {
    return new Combo(menu, content, variable, id);
  };

  /**
   * Parses a JSON respresentation of a label item.
   * @param {JSON} json The JSON object to parse.
   * @param {Menu} menu The menu the item is attached to.
   * @return {Label} The new label object.
   */
  const parseLabel = function(
    {content: content, id: id}: {content: string, id: string},
    menu: Menu): Label {
    return new Label(menu, content, id);
  };

  /**
   * Parses a JSON respresentation of a radio item.
   * @param {JSON} json The JSON object to parse.
   * @param {Menu} menu The menu the item is attached to.
   * @return {Radio} The new radio object.
   */
  const parseRadio = function(
    {content: content, variable: variable, id: id}:
    {content: string, variable: string, id: string}, menu: Menu): Radio {
    return new Radio(menu, content, variable, id);
  };

  /**
   * Parses a JSON respresentation of a rule item.
   * @param {JSON} json The empty JSON object.
   * @param {Menu} menu The menu the item is attached to.
   * @return {Rule} The new rule object.
   */
  const parseRule = function({}: {}, menu: Menu): Rule {
    return new Rule(menu);
  };

  /**
   * Parses a JSON respresentation of a submenu item.
   * @param {JSON} json The JSON object to parse.
   * @param {Menu} menu The menu the item is attached to.
   * @return {Submenu} The new submenu object.
   */
  const parseSubmenu = function(
    {content: content, menu: submenu, id: id}:
    {content: string, menu: any, id: string}, menu: Menu): Submenu {
    const item = new Submenu(menu, content, id);
    const subMenu = parseSubMenu(submenu, item);
    item.setSubmenu(subMenu);
    return item;
  };

  /**
   * Parses a JSON respresentation of a variable pool.
   * @param {JSON} json The JSON object to parse.
   * @return {ContextMenu} The new context menu object.
   */
  export const parseContextMenu = function(
    {menu: menu}: {menu: {pool: Array<Object>,
                          items: Array<Object>,
                          id: string}}): ContextMenu {
    if (!menu) {
      MenuUtil.error(null, 'Wrong JSON format for menu.');
      return;
    }
    // The variable id is currently ignored!
    let {pool: pool, items: items, id: id} = menu;
    const ctxtMenu = new ContextMenu();
    const variables = pool.map(
      x => parseVariable(x as any, ctxtMenu.getPool()));
    const itemList = parseItems(items, ctxtMenu);
    ctxtMenu.items = itemList;
    return ctxtMenu;
  };

  /**
   * Parses a JSON respresentation of a submenu.
   * @param {JSON} json The JSON object to parse.
   * @param {Submenu} anchor The anchor item the submenu is attached to.
   * @return {SubMenu} The new submenu object.
   */
  const parseSubMenu = function(
    {items: items, id: id}: {items: any[], id: string},
    anchor: Submenu): SubMenu {
    const submenu = new SubMenu(anchor);
    const itemList = parseItems(items, submenu);
    submenu.items = itemList;
    return submenu;
  };

  /**
   * Parses a JSON respresentation of a variable and inserts it into the
   * variable pool of the context menu.
   * @param {JSON} json The JSON object to parse.
   */
  const parseVariable = function(
    {name: name, getter: getter, setter: setter}:
    {name: string, getter: () => string | boolean,
     setter: (x: (string | boolean)) => void},
    pool: VariablePool<string|boolean>) {
    const variable = new Variable(name, getter, setter);
    pool.insert(variable);
  };

  /**
   * Parses items in JSON formats and attaches them to the menu.
   * @param {Array.<JSON>} items List of JSON menu items.
   */
  const parseItems = function(items: any[], ctxt: Menu): Item[] {
    const hidden = items.map(x => [parseItem(x, ctxt), x.hidden]);
    hidden.forEach(x => x[1] && x[0].hide());
    return hidden.map(x => x[0]);
  };

  /**
   * Parses items in JSON formats and attaches them to the menu.
   * @param {Array.<JSON>} items List of JSON menu items.
   * @param {Menu} ctxt The context menu for the items.
   * @return {Item} The list of parsed items.
   */
  const parseItem = function(item: any, ctxt: Menu): Item {
    const func = parseMapping[item['type']];
    if (func) {
      const menuItem = func(item, ctxt);
      ctxt.items.push(menuItem);
      if (item['disabled']) {
        menuItem.disable();
      }
      return menuItem;
    }
  };

  /**
   * @type{Object.<Function>}
   */
  const parseMapping: { [id: string]: Function } = {
    'checkbox': parseCheckbox,
    'combo': parseCombo,
    'command': parseCommand,
    'label': parseLabel,
    'radio': parseRadio,
    'rule': parseRule,
    'submenu': parseSubmenu
  };
}

let parse = Parser.parseContextMenu;
export default parse;
