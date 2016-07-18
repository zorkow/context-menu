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
 * @fileoverview Abstract class of menu entries.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/// <reference path="entry.ts" />
/// <reference path="menu_element.ts" />


namespace ContextMenu {

  export class AbstractEntry extends MenuElement implements Entry {
    private menu: Menu;
    private type: string = 'entry';

    className = HtmlClasses['MENUITEM'];
    role = 'menuitem';

    /**
     * @constructor
     * @implements {Entry}
     * @param {Menu} menu The context menu or sub-menu the entry belongs to.
     * @param {string} type The type of the entry.
     */
    constructor(menu: Menu, type: string) {
      super();
      this.menu = menu;
      this.type = type;
    }

    /**
     * @return {Menu} The context menu or sub-menu the entry belongs to.
     */
    getMenu() {
      return this.menu;
    }

    /**
     * @param {Menu} Sets the menu.
     */
    setMenu(menu: Menu) {
      this.menu = menu;
    }

    /**
     * @return {string} The ARIA role of the menu entry.
     */
    getRole() {
      return this.role;
    }

    /**
     * @param {string} role The ARIA role of the menu entry.
     */
    setRole(role: string) {
      this.role = role;
    }

    /**
     * @return {string} The type of the menu entry, used for jsonification.
     */
    getType() {
      return this.type;
    }

  }

}
