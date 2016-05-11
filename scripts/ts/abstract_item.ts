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
 * @fileoverview Abstract class of menu items.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/// <reference path="item.ts" />


namespace ContextMenu {

  export class AbstractItem implements Item {
    private menu: Menu;
    private role: string;
    private html: Element;

    /**
     * @constructor
     * @implements {Item}
     * @param {Menu} menu The context menu or sub-menu the item belongs to.
     * @param {string} role The ARIA role of the menu item.
     */
    constructor(menu: Menu, role: string) {
      this.menu = menu;
      this.role = role;
    }

    /**
     * @return {Menu} The context menu or sub-menu the item belongs to.
     */
    getMenu() {
      return this.menu;
    }

    /**
     * @return {string} The ARIA role of the menu item.
     */
    getRole() {
      return this.role;
    }
  }

}
