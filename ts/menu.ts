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

export interface Menu extends Postable {

  /**
   * Returns the items in that menu.
   * @return {Array.<Item>} The array of items.
   */
  getItems(): Item[];

  /**
   * Returns the currently focused Item.
   * @return {Item} The focused Item.
   */
  getFocused(): Item;

  /**
   * Sets the currently focused Item.
   * @param {Item} item The new focused Item.
   */
  setFocused(item?: Item): void;

  /**
   * @return {VariablePool<string | boolean>} The variable pool associated to
   *     this menu.
   */
  getPool(): VariablePool<string | boolean>;

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

  baseMenu: Menu;

}

