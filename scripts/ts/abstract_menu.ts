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

/// <reference path="abstract_postable.ts" />
/// <reference path="menu.ts" />
/// <reference path="menu_element.ts" />
/// <reference path="item.ts" />
/// <reference path="variable_pool.ts" />


namespace ContextMenu {

  export abstract class AbstractMenu extends AbstractPostable implements Menu {

    /**
     * @override
     */
    protected className = HtmlClasses['CONTEXTMENU'];

    /**
     * The variable pool of the context menu.
     * @type {VarialbePool<string | boolean>}
     */
    protected variablePool: VariablePool<string | boolean>;

    /**
     * @override
     */
    protected role = 'menu';

    private items: Item[] = [];
    private focused: Item;

    /**
     * @override
     */
    public getItems(): Item[] {
      return this.items;
    };

    /**
     * @override
     */
    public getPool(): VariablePool<string | boolean> {
      return this.variablePool;
    };

    /**
     * @override
     */
    public getFocused(): Item {
      return this.focused;
    }

    /**
     * @override
     */
    public setFocused(item: Item) {
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
    public up(event: KeyboardEvent): void {
      let items = this.getItems().filter(
        x => (x instanceof AbstractItem) && (!x.isHidden()));
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
    public down(event: KeyboardEvent): void {
      let items = this.getItems().filter(
        x => (x instanceof AbstractItem) && (!x.isHidden()));
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
    public generateHtml() {
      super.generateHtml();
      this.generateMenu();
    }

    /**
     * @override
     */
    public generateMenu() {
      let html = this.getHtml();
      html.classList.add(HtmlClasses['MENU']);
      for (let item of this.items) {
        if (!item.isHidden()) {
          html.appendChild(item.getHtml());
          continue;
        }
        let itemHtml = item.getHtml();
        if (itemHtml.parentNode) {
          itemHtml.parentNode.removeChild(itemHtml);
        }
      }
    }

    /**
     * @override
     */
    public post(x?: number, y?: number) {
      this.variablePool.update();
      super.post(x, y);
    }

    /**
     * @override
     */
    public unpostSubmenus(): void {
      let submenus =
        <Submenu[]>this.items.filter(x => x instanceof Submenu);
      for (let submenu of submenus) {
        submenu.getSubmenu().unpost();
        if (<Item>submenu !== this.getFocused()) {
          submenu.unfocus();
        }
      }
    }

    /**
     * @override
     */
    public unpost(): void {
      super.unpost();
      this.unpostSubmenus();
      this.setFocused(null);
    }

    /**
     * @override
     */
    public find(id: string): Item {
      for (let item of this.getItems()) {
        if (item.getType() === 'rule') {
          continue;
        }
        if (item.getId() === id) {
          return item;
        }
        if (item.getType() === 'submenu') {
          let result = (<Submenu>item).getSubmenu().find(id);
          if (result) {
            return result;
          }
        }
      }
      return null;
    }

    /**
     * Parses items in JSON formats and attaches them to the menu.
     * @param {Array.<JSON>} items List of JSON menu items.
     */
    protected parseItems(items: any[]) {
      let hidden = items.map(x => [this.parseItem.bind(this)(x), x.hidden]);
      hidden.forEach(x => x[1] && x[0].hide());
    }

    /**
     * Parses items in JSON formats and attaches them to the menu.
     * @param {Array.<JSON>} items List of JSON menu items.
     * @return {}
     */
    private parseItem(item: any): Item {
      const parseMapping_: { [id: string]: Function; } = {
        'checkbox': Checkbox.parse,
        'command': Command.parse,
        'label': Label.parse,
        'radio': Radio.parse,
        'rule': Rule.parse,
        'submenu': Submenu.parse
      };
      let func = parseMapping_[item['type']];
      if (func) {
        let menuItem = func(item, this);
        this.getItems().push(menuItem);
        if (item['disabled']) {
          menuItem.disable();
        }
        return menuItem;
      }
    }

  }

}
