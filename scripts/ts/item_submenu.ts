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
 * @fileoverview Class of separator items.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/// <reference path="abstract_item.ts" />

namespace ContextMenu {

  export class Submenu extends AbstractItem {

    /**
     * The state variable. Initially set false.
     * @type {Menu}
     */
    //// TODO: This is probably the name of a variable held by the menu
    //// globally.
    private submenu: Menu = null;

    /**
     * @constructor
     * @extends {AbstractItem}
     * @param {Menu} menu The context menu or sub-menu the item belongs to.
     * @param {string} content The content of the menu item.
     * @param {boolean} variable The variable that is changed.
     * @param {string=} id Optionally the id of the menu item.
     */
    constructor(menu: Menu, content: string, id?: string) {
      super(menu, 'submenu', content, id);
    }

    /**
     * Sets the submenu.
     * @param {Menu} A menu.
     */
    setSubmenu(menu: Menu) {
      this.submenu = menu;
    }

    /**
     * Returns the submenu element.
     * @return {Menu} The submenu.
     */
    getSubmenu(): Menu {
      return this.submenu;
    }

    /**
     * @override
     */
    press() {
      // Open submenu.
    }

  }
}
