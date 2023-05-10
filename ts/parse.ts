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
 * @file Parser for menu items.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {Command} from './item_command.js';
import {Menu} from './menu.js';
import {ContextMenu} from './context_menu.js';
import {Variable} from './variable.js';
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
    ['selectionMenu', SelectionMenu.fromJson.bind(SelectionMenu)],
    ['selectionBox', SelectionBox.fromJson.bind(SelectionBox)]
  ];


  /**
   * The parser factory holding the from Json parse methods for all the
   * components.
   * @type {ParserFactory}
   */
  private readonly _factory: ParserFactory = new ParserFactory(this._initList);

  /**
   * Creates new constructor method.
   * @class
   * @param init Extra init mappings for the parser's
   *     factory.
   */
  constructor(init: [string, ParseMethod][] = []) {
    init.forEach(([x, y]) => this.factory.add(x, y));
  }

  /**
   * @returns {ParserFactory} The parser factory.
   */
  public get factory(): ParserFactory {
    return this._factory;
  }

  /**
   * Parses items in JSON formats and attaches them to the menu.
   * @param items List of JSON menu items.
   * @param _factory
   * @param its
   * @param ctxt
   */
  public items(_factory: ParserFactory, its: any[], ctxt: Menu): Item[] {
    const hidden = [];
    for (const item of its) {
      const entry = this.parse(item, ctxt);
      if (!entry) {
        continue;
      }
      ctxt.items.push(entry);
      if (item.disabled) {
        entry.disable();
      }
      if (item.hidden) {
        hidden.push(entry);
      }
    }
    hidden.forEach(x => x.hide());
    return ctxt.items;
  }

  /**
   * General parse method.
   * @param json The JSON element to parse.
   * @param rest Optional rest arguments.
   * @returns {any} The parsed item.
   */
  public parse({type: kind, ...json}:
               {type: string, [k: string]: any}, ...rest: any[]): any {
    const func = this.factory.get(kind);
    return func ? func(this.factory, json, ...rest) : null;
  }

}
