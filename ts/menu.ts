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
 * @file Interface specification for context menus.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Item } from './item.js';
import { Postable } from './postable.js';
import { VariablePool } from './variable_pool.js';
import { KeyNavigatable } from './key_navigatable.js';
import { MouseNavigatable } from './mouse_navigatable.js';

export interface Menu extends Postable, KeyNavigatable, MouseNavigatable {
  /**
   * The base menu structure this menu belongs to.
   */
  baseMenu: Menu;

  /**
   * The items in that menu.
   */
  items: Item[];

  /**
   *  The variable pool associated to this menu.
   */
  pool: VariablePool<string | boolean>;

  /**
   */
  focused: Item;

  /**
   * Unposts all submenus of this menu.
   */
  unpostSubmenus(): void;

  /**
   * Retrieves a menu item via its id by depth-first search.
   * @param id The item id.
   * @returns The item if it exists.
   */
  find(id: string): Item;

  /**
   * Generates the HTML element containing the menu entries.
   */
  generateMenu(): void;
}
