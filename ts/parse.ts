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
// import {VariablePool} from './variable_pool.js';
import {Checkbox} from './item_checkbox.js';
import {Combo} from './item_combo.js';
import {Label} from './item_label.js';
import {Radio} from './item_radio.js';
import {Submenu} from './item_submenu.js';
import {Rule} from './item_rule.js';
import {Item} from './item.js';
import {Slider} from './item_slider.js';
import {SubMenu} from './sub_menu.js';
import {SelectionMenu, SelectionBox} from './selection_box.js';
import {ParserFactory, ParseMethod} from './parser_factory.js';


export class Parser {

  private _initList: [string, ParseMethod][] = [
    ['command', Command.fromJson.bind(Command)],
    ['checkbox', Checkbox.fromJson.bind(Checkbox)],
    ['combo', Combo.fromJson.bind(Combo)],
    ['slider', Slider.fromJson.bind(Slider)],
    ['label', Label.fromJson.bind(Label)],
    ['radio', Radio.fromJson.bind(Radio)],
    ['rule', Rule.fromJson.bind(Rule)],
    ['submenu', Submenu.fromJson.bind(Submenu)],
    ['contextMenu', ContextMenu.fromJson.bind(ContextMenu)],
    ['subMenu', SubMenu.fromJson.bind(SubMenu)],
    ['variable', Variable.fromJson.bind(Variable)],
    ['items', this.items.bind(this)],
    ['item', this.item.bind(this)],
    ['selectionMenu', SelectionMenu.fromJson.bind(SelectionMenu)],
    ['selectionBox', SelectionBox.fromJson.bind(SelectionBox)]
  ]

  public factory: ParserFactory = new ParserFactory(this._initList);
  
  constructor(init: [string, ParseMethod][] = []) {
    init.forEach(([x, y]) => this.factory.add(x, y));
  }


  /**
   * Parses a JSON respresentation of a variable pool.
   * @param {JSON} json The JSON object to parse.
   * @return {ContextMenu} The new context menu object.
   */
  public contextMenu(
    {menu: menu}: {menu: {pool: Array<Object>,
                          items: Array<Object>,
                          id: string}}): ContextMenu {
    if (!menu) {
      MenuUtil.error(null, 'Wrong JSON format for menu.');
      return null;
    }
    return this.factory.get('contextMenu')(this.factory, {menu: menu});
  }

  /**
   * Parses items in JSON formats and attaches them to the menu.
   * @param {Array.<JSON>} items List of JSON menu items.
   */
  public items(factory: ParserFactory, its: any[], ctxt: Menu): Item[] {
    const hidden = its.map(x => [this.item(factory, x, ctxt), x.hidden]);
    hidden.forEach(x => x[1] && x[0].hide());
    return hidden.map(x => x[0]);
  }

  /**
   * Parses items in JSON formats and attaches them to the menu.
   * @param {Array.<JSON>} items List of JSON menu items.
   * @param {Menu} ctxt The context menu for the items.
   * @return {Item} The list of parsed items.
   */
  public item(factory: ParserFactory, item: any, ctxt: Menu): Item {
    const func = this.factory.get(item['type']);
    if (func) {
      const menuItem = func(factory, item, ctxt);
      ctxt.items.push(menuItem);
      if (item['disabled']) {
        menuItem.disable();
      }
      return menuItem;
    }
    return null;
  }

  public selectionBox(
    json: JSON, ctxt: ContextMenu): SelectionBox {
    return this.factory.get('selectionBox')(this.factory, json, ctxt);
  }

}
