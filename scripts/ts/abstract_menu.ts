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
 * @fileoverview Abstract class of context menus.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/// <reference path="menu_element.ts" />
/// <reference path="item.ts" />
/// <reference path="variable_pool.ts" />


namespace ContextMenu {

  export abstract class AbstractMenu extends MenuElement implements Menu {

    private items: Item[] = [];
    private focused: Item;
    protected variablePool: VariablePool<string | boolean>;
    className = HtmlClasses['CONTEXTMENU'];
    role = 'menu';
    private posted = false;

    constructor() {
      super();
    }

    /**
     * @override
     */
    getItems(): Item[] {
      return this.items;
    };

    /**
     * @override
     */
    getPool(): VariablePool<string | boolean> {
      return this.variablePool;
    };

    /**
     * @override
     */
    getFocused(): Item {
      return this.focused;
    }

    /**
     * @override
     */
    setFocused(item: Item) {
      this.focused = item;
    }

    /**
     * @override
     */
    up(event: KeyboardEvent): void {
      if (!this.focused) {
        this.focused = this.items[this.items.length - 1];
      }
      let index = this.items.indexOf(this.focused);
    }

    /**
     * @override
     */
    down(event: KeyboardEvent): void {
      if (!this.focused) {
        this.focused = this.items[0];
      }
    }

    /**
     * @override
     */
    generateHtml() {
      super.generateHtml();
      let html = this.getHtml();
      html.classList.add(HtmlClasses['MENU']);
      for (let i = 0, item: Item; item = this.items[i]; i++) {
        console.log('adding item');
        html.appendChild(item.getHtml());
      }
    }

    /**
     * @override
     */
    isPosted() {
      return this.posted;
    }

    public post(x: number, y: number): void {
      if (this.posted) {
        return;
      }
      this.getHtml().setAttribute(
          'style', 'left: ' + x + 'px; top: ' + y + 'px;');
      this.display();
      this.posted = true;
    }

    protected abstract display(): void;

    public unpost(): void {
      if (!this.posted) {
        return;
      }
      let submenus =
        <Submenu[]>this.items.filter(x => x instanceof Submenu);
      for (let i = 0, submenu: Submenu; submenu = submenus[i]; i++) {
        submenu.getSubmenu().unpost();
      }
      let html = this.getHtml();
      html.parentNode.removeChild(html);
      this.posted = false;
    }

  }
}
