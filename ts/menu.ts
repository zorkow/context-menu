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
 * @fileoverview Interface specification for context menus.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {Item} from './item';
import {Postable} from './postable';
import {VariablePool} from './variable_pool';
import {KeyNavigatable} from './key_navigatable';
import {MouseNavigatable} from './mouse_navigatable';

export interface Menu extends Postable, KeyNavigatable, MouseNavigatable  {

  /**
   * The base menu structure this menu belongs to.
   * @type {Menu}
   */
  baseMenu: Menu;

  /**
   * The items in that menu.
   * @type {Item[]}
   */
  items: Item[];

  /**
   * @type {VariablePool<string | boolean>} The variable pool associated to
   *     this menu.
   */
  pool: VariablePool<string | boolean>;

  /**
   * @type {Item} The currently focused Item.
   */
  focused: Item;

  /**
   * Unposts all submenus of this menu.
   */
  unpostSubmenus(): void;

  /**
   * Retrieves a menu item via its id by depth-first search.
   * @param {string} id The item id.
   * @return {?Item} The item if it exists.
   */
  find(id: string): Item;

  /**
   * Generates the HTML element containing the menu entries.
   */
  generateMenu(): void;

}

