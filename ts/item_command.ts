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
 * @file Class of items that execute a command.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {AbstractItem} from './abstract_item.js';
import {MenuUtil} from './menu_util.js';
import {Menu} from './menu.js';
import {ParserFactory} from './parser_factory.js';


export class Command extends AbstractItem {

  /**
   * Parses a JSON respresentation of a command item.
   * @param _factory The parser factory.
   * @param json The JSON object to parse.
   * @param json.content The content of the command.
   * @param json.action The action the command performs.
   * @param json.id The id of the item.
   * @param menu The menu the item is attached to.
   * @returns The new command object.
   */
  public static fromJson(
    _factory: ParserFactory,
    {content: content, action: action, id: id}:
    {content: string, action: (node: HTMLElement) => void, id: string}, menu: Menu): Command {
    return new this(menu, content, action, id);
  }

  /**
   * @class
   * @augments {AbstractItem}
   * @param menu The context menu or sub-menu the item belongs to.
   * @param content The content of the menu item.
   * @param command The command to be executed on
   *     triggering the menu item.
   * @param id Optionally the id of the menu item.
   */
  constructor(menu: Menu, content: string, private command: (node: HTMLElement) => void,
              id?: string) {
    super(menu, 'command', content, id);
  }

  /**
   * @override
   */
  public executeAction() {
    try {
      this.command(MenuUtil.getActiveElement(this));
    } catch (e) {
      MenuUtil.error(e, 'Illegal command callback.');
    }
    MenuUtil.close(this);
  }

  /**
   * @returns The object in JSON.
   */
  public toJson() {
    return {type: ''
           };
  }

}
