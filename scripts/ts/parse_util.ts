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
 * @fileoverview Utility functions of parse a menu from JSON representation.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/// <reference path="context_menu.ts" />
/// <reference path="entry.ts" />
/// <reference path="item_command.ts" />
/// <reference path="item_checkbox.ts" />
/// <reference path="item_label.ts" />
/// <reference path="item_radio.ts" />
/// <reference path="item_rule.ts" />
/// <reference path="item_submenu.ts" />

// TODO: 
// All this uses any type. This is too broad.
// 
// Parsing of the JSON should probably be reflected directly in the interface
// specification of the menu entries.
//
// Devolve json parse and stringify functions to single classes.
// Maybe have a json visitor.
//
namespace ContextMenu {

  let MENU: Menu;
  let MENU_STACK: Menu[] = [];

  export function parse(json: any): Menu {
    // Assume we have one menu at the moment.
    if (!json['menu']) {
      return;
    }
    MENU = new ContextMenu();
    parseMenu_(json);
    return MENU;
  }

  function parseMenu_(json: any) {
    parseVariables_(json.menu.pool);
    let items: any  = json.menu.items;
    if (items) {
      parseItems_(MENU.getItems(), items);
    }
    return MENU;
  }

  function parseCheckboxEntry_(item: any): Checkbox {
    return new Checkbox(MENU, item.content, item.variable, item.id);
  }

  function parseCommandEntry_(item: any): Command {
    return new Command(MENU, item.content, item.action, item.id);
  }

  function parseLabelEntry_(item: any): Label {
    return new Label(MENU, item.content, item.id);
  }

  function parseRadioEntry_(item: any): Radio {
    return new Radio(MENU, item.content, item.variable, item.id);
  }

  function parseRuleEntry_(item: any): Rule {
    return new Rule(MENU);
  }

  function parseSubmenuEntry_(item: any): Rule {
    let submenu = new Submenu(MENU, item.content, item.id);
    MENU_STACK.unshift(MENU);
    MENU = new SubMenu(submenu);
    submenu.setSubmenu(<SubMenu>parseMenu_(item));
    MENU = MENU_STACK.shift();
    return submenu;
  }

  let parseMapping_: { [id: string]: Function; } = {
    'checkbox': parseCheckboxEntry_,
    'command': parseCommandEntry_,
    'label': parseLabelEntry_,
    'radio': parseRadioEntry_,
    'rule': parseRuleEntry_,
    'submenu': parseSubmenuEntry_
  };

  function parseVariables_(variables: {name: string,
                                       value: boolean|string,
                                       action: string}[]):
  VariablePool<boolean|string> {
    if (!variables) {
      return;
    }
    let pool = MENU.getPool();
    for (let i = 0, variable: any; variable = variables[i]; i++) {
      pool.insert(new Variable(variable.name, variable.value, variable.action));
    }
    return pool;
  }

  function parseItems_(menu: Entry[], items: any[]) {
    let hidden: Entry[] = [];
    for (let i = 0, item: any; item = items[i]; i++) {
      console.log(item.content);
      let func = parseMapping_[item['type']];
      if (func) {
        let menuItem = func(item);
        menu.push(menuItem);
        if (item['disabled']) {
          menuItem.disable();
        }
        if (item['hidden']) {
          hidden.push(menuItem);
        }
      }
    }
    hidden.forEach(x => x.hide());
  }

}
