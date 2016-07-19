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
      if (this.focused === item) {
        return;
      }
      if (!this.focused) {
        this.unfocus();
      }
      // Order here is important for test in submenu.unfocus.
      let old = this.focused;
      this.focused = item;
      if (old) {
        old.unfocus();
      }
    }

    /**
     * @override
     */
    up(event: KeyboardEvent): void {
      let items = this.getItems().filter(x => x instanceof AbstractItem);
      if (items.length === 0) {
        return;
      }
      if (!this.focused) {
        items[items.length - 1].focus();
        return;
      }
      let index = items.indexOf(this.focused);
      if (index === -1) {
        return;
      }
      index = index ? --index : items.length - 1;
      items[index].focus();
    }

    /**
     * @override
     */
    down(event: KeyboardEvent): void {
      let items = this.getItems().filter(x => x instanceof AbstractItem);
      if (items.length === 0) {
        return;
      }
      if (!this.focused) {
        items[0].focus();
        return;
      }
      let index = items.indexOf(this.focused);
      if (index === -1) {
        return;
      }
      index++;
      index = (index === items.length) ? 0 : index;
      items[index].focus();
    }

    
    /**
     * @override
     */
    generateHtml() {
      super.generateHtml();
      let html = this.getHtml();
      html.classList.add(HtmlClasses['MENU']);
      for (let i = 0, item: Item; item = this.items[i]; i++) {
        html.appendChild(item.getHtml());
      }
    }

    /**
     * @override
     */
    isPosted() {
      return this.posted;
    }


    /**
     * @override
     */
    post(x: number, y: number) {
      if (this.posted) {
        return;
      }
      this.getHtml().setAttribute(
          'style', 'left: ' + x + 'px; top: ' + y + 'px;');
      this.display();
      this.posted = true;
    }

    protected abstract display(): void;

    /**
     * @override
     */
    unpostSubmenus(): void {
      let submenus =
        <Submenu[]>this.items.filter(x => x instanceof Submenu);
      for (let i = 0, submenu: Submenu; submenu = submenus[i]; i++) {
        submenu.getSubmenu().unpost();
        if (<Item>submenu !== this.getFocused()) {
          submenu.unfocus();
        }
      }
    }


    /**
     * @override
     */
    unpost(): void {
      if (!this.posted) {
        return;
      }
      this.setFocused(null);
      let html = this.getHtml();
      html.parentNode.removeChild(html);
      this.posted = false;
    }

  }
}
