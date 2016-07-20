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

/// <reference path="item.ts" />
/// <reference path="variable_pool.ts" />

namespace ContextMenu {

  export interface Menu {

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
     * The variable pool associated to this menu.
     * @return {VariablePool<string | boolean>};
     */
    getPool(): VariablePool<string | boolean>;

    /**
     * @return {boolean} True if menu is posted in the page.
     */
    isPosted(): boolean;

    /**
     * Posts the menu at the given coordinates.
     */
    post(x: number, y: number): void;

    /**
     * Unposts the menu.
     */
    unpost(): void;

    /**
     * Unposts all submenus of this menu.
     */
    unpostSubmenus(): void;
  }

}
