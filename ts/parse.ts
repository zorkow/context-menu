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


import {Command} from './item_command.js';
import {Menu} from './menu.js';
import {MenuUtil} from './menu_util.js';
import {ContextMenu} from './context_menu.js';
import {Variable} from './variable.js';
import {VariablePool} from './variable_pool.js';
import {Checkbox} from './item_checkbox.js';
import {Combo} from './item_combo.js';
import {Label} from './item_label.js';
import {Radio} from './item_radio.js';
import {Submenu} from './item_submenu.js';
import {Rule} from './item_rule.js';
import {Item} from './item.js';
import {Slider} from './item_slider.js';
import {SubMenu} from './sub_menu.js';
import {SelectionMenu, SelectionBox, SelectionOrder} from './selection_box.js';

import {ParserFactory} from './parser_factory.js';

export namespace Parse {

  /**
   * Parses a JSON respresentation of a command item.
   * @param {JSON} json The JSON object to parse.
   * @param {Menu} menu The menu the item is attached to.
   * @return {Command} The new command object.
   */
  const command = function(
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
  const checkbox = function(
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
  const combo = function(
    {content: content, variable: variable, id: id}:
    {content: string, variable: string, id: string}, menu: Menu): Combo {
    return new Combo(menu, content, variable, id);
  };

  /**
   * Parses a JSON respresentation of a combo item.
   * @param {JSON} json The JSON object to parse.
   * @param {Menu} menu The menu the item is attached to.
   * @return {Slider} The new combo object.
   */
  const slider = function(
    {content: content, variable: variable, id: id}:
    {content: string, variable: string, id: string}, menu: Menu): Slider {
    return new Slider(menu, content, variable, id);
  };

  /**
   * Parses a JSON respresentation of a label item.
   * @param {JSON} json The JSON object to parse.
   * @param {Menu} menu The menu the item is attached to.
   * @return {Label} The new label object.
   */
  const label = function(
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
  export const radio = function(
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
  const rule = function({}: {}, menu: Menu): Rule {
    return new Rule(menu);
  };

  /**
   * Parses a JSON respresentation of a submenu item.
   * @param {JSON} json The JSON object to parse.
   * @param {Menu} menu The menu the item is attached to.
   * @return {Submenu} The new submenu object.
   */
  const submenu = function(
    {content: content, menu: submenu, id: id}:
    {content: string, menu: any, id: string}, menu: Menu): Submenu {
    const item = new Submenu(menu, content, id);
    const sm = subMenu(submenu, item);
    item.submenu = sm;
    return item;
  };

  /**
   * Parses a JSON respresentation of a variable pool.
   * @param {JSON} json The JSON object to parse.
   * @return {ContextMenu} The new context menu object.
   */
  export const contextMenu = function(
    {menu: menu}: {menu: {pool: Array<Object>,
                          items: Array<Object>,
                          id: string}}): ContextMenu {
    if (!menu) {
      MenuUtil.error(null, 'Wrong JSON format for menu.');
      return null;
    }
    // The variable id is currently ignored!
    let {pool: pool, items: its} = menu;
    const ctxtMenu = new ContextMenu();
    let varParser = ParserFactory.get('variable');
    pool.forEach(x => varParser(x as any, ctxtMenu.pool));
    const itemList = items(its, ctxtMenu);
    ctxtMenu.items = itemList;
    return ctxtMenu;
  };

  /**
   * Parses a JSON respresentation of a submenu.
   * @param {JSON} json The JSON object to parse.
   * @param {Submenu} anchor The anchor item the submenu is attached to.
   * @return {SubMenu} The new submenu object.
   */
  export const subMenu = function(
    {items: its}: {items: any[], id: string},
    anchor: Submenu): SubMenu {
    const submenu = new SubMenu(anchor);
    const itemList = items(its, submenu);
    submenu.items = itemList;
    return submenu;
  };

  /**
   * Parses a JSON respresentation of a variable and inserts it into the
   * variable pool of the context menu.
   * @param {JSON} json The JSON object to parse.
   */
  export const variable = function(
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
  const items = function(its: any[], ctxt: Menu): Item[] {
    const hidden = its.map(x => [item(x, ctxt), x.hidden]);
    hidden.forEach(x => x[1] && x[0].hide());
    return hidden.map(x => x[0]);
  };

  /**
   * Parses items in JSON formats and attaches them to the menu.
   * @param {Array.<JSON>} items List of JSON menu items.
   * @param {Menu} ctxt The context menu for the items.
   * @return {Item} The list of parsed items.
   */
  const item = function(item: any, ctxt: Menu): Item {
    const func = mapping[item['type']];
    if (func) {
      const menuItem = func(item, ctxt);
      ctxt.items.push(menuItem);
      if (item['disabled']) {
        menuItem.disable();
      }
      return menuItem;
    }
    return null;
  };

  /**
   * @type{Object.<Function>}
   */
  const mapping: { [id: string]: Function } = {
    'checkbox': checkbox,
    'combo': combo,
    'command': command,
    'label': label,
    'radio': radio,
    'rule': rule,
    'slider': slider,
    'submenu': submenu
  };


  declare type selection = {title: string, values: string[], variable: string};
  
  const selectionMenu = function(
    {title: title, values: values, variable: variable}: selection,
    sb: SelectionBox): SelectionMenu {
    let selection = new SelectionMenu(sb);
    let tit = label({content: title || '', id: title || 'id'}, selection);
    let rul = rule({}, selection);
    let radios = values.map(x => radio({content: x, variable: variable, id: x}, selection));
    let items = [tit, rul].concat(radios) as Item[];
    selection.items = items;
    return selection;
  };
  
  export const selectionBox = function(
    {title: title, signature: signature, selections: selections, order: order}:
    {title: string, signature: string, selections: selection[], order?: SelectionOrder},
    ctxt: ContextMenu): SelectionBox {
    let sb = new SelectionBox(title, signature, order);
    sb.attachMenu(ctxt);
    let sels = selections.map(x => selectionMenu(x, sb));
    sb.selections = sels;
    return sb;
  };
}

