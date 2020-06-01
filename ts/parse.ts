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
import {ParserFactory} from './parser_factory.js';


export namespace Parse {

  ParserFactory.add('command', Command.fromJson.bind(Command));
  ParserFactory.add('checkbox', Checkbox.fromJson.bind(Checkbox));
  ParserFactory.add('combo', Combo.fromJson.bind(Combo));
  ParserFactory.add('slider', Slider.fromJson.bind(Slider));
  ParserFactory.add('label', Label.fromJson.bind(Label));
  ParserFactory.add('radio', Radio.fromJson.bind(Radio));
  ParserFactory.add('rule', Rule.fromJson.bind(Rule));
  ParserFactory.add('submenu', Submenu.fromJson.bind(Submenu));

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
    return ParserFactory.get('contextMenu')({menu: menu});
  };
  ParserFactory.add('contextMenu', ContextMenu.fromJson.bind(ContextMenu));
  ParserFactory.add('subMenu', SubMenu.fromJson.bind(SubMenu));
  ParserFactory.add('variable', Variable.fromJson.bind(Variable));

  /**
   * Parses items in JSON formats and attaches them to the menu.
   * @param {Array.<JSON>} items List of JSON menu items.
   */
  const items = function(its: any[], ctxt: Menu): Item[] {
    const hidden = its.map(x => [item(x, ctxt), x.hidden]);
    hidden.forEach(x => x[1] && x[0].hide());
    return hidden.map(x => x[0]);
  };
  ParserFactory.add('items', items);

  /**
   * Parses items in JSON formats and attaches them to the menu.
   * @param {Array.<JSON>} items List of JSON menu items.
   * @param {Menu} ctxt The context menu for the items.
   * @return {Item} The list of parsed items.
   */
  const item = function(item: any, ctxt: Menu): Item {
    const func = ParserFactory.get(item['type']);
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

  ParserFactory.add('selectionMenu',
                    SelectionMenu.fromJson.bind(SelectionMenu));
  ParserFactory.add('selectionBox', SelectionBox.fromJson.bind(SelectionBox));

  export const selectionBox = function(
    json: JSON, ctxt: ContextMenu): SelectionBox {
    return ParserFactory.get('selectionBox')(json, ctxt);
  };

}
