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

import {AbstractPostable} from './abstract_postable';
import {AbstractItem} from './abstract_item';
import {Menu} from './menu';
import {Item} from './item';
import {VariablePool} from './variable_pool';
import {HtmlClasses} from './html_classes';
import {Submenu} from './item_submenu';


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

  private _baseMenu: Menu = null;
  private _items: Item[] = [];
  private _focused: Item;

  /**
   * @override
   */
  public set baseMenu(menu: Menu) {
    this._baseMenu = menu;
  }

  /**
   * @override
   */
  public get baseMenu(): Menu {
    return this._baseMenu;
  }

  /**
   * @override
   */
  public get items(): Item[] {
    return this._items;
  }

  /**
   * @override
   */
  public set items(items: Item[]) {
    this._items = items;
  }

  /**
   * @override
   */
  public get pool(): VariablePool<string | boolean> {
    return this.variablePool;
  }

  /**
   * @override
   */
  public get focused(): Item {
    return this._focused;
  }

  /**
   * @override
   */
  public set focused(item: Item) {
    if (this._focused === item) {
      return;
    }
    if (!this._focused) {
      this.unfocus();
    }
    // Order here is important for test in submenu.unfocus.
    let old = this._focused;
    this._focused = item;
    if (old) {
      old.unfocus();
    }
  }

  /**
   * @override
   */
  public up(_event: KeyboardEvent): void {
    let items = this.items.filter(
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
  public down(_event: KeyboardEvent): void {
    let items = this.items.filter(
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
    let html = this.html;
    html.classList.add(HtmlClasses['MENU']);
    for (let item of this.items) {
      if (!item.isHidden()) {
        html.appendChild(item.html);
        continue;
      }
      let itemHtml = item.html;
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
      this.items.filter(x => x instanceof Submenu) as Submenu[];
    for (let submenu of submenus) {
      submenu.submenu.unpost();
      if (submenu !== this.focused) {
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
    this.focused = null;
  }

  /**
   * @override
   */
  public find(id: string): Item {
    for (let item of this.items) {
      if (item.type === 'rule') {
        continue;
      }
      if (item.id === id) {
        return item;
      }
      if (item.type === 'submenu') {
        let result = (item as Submenu).submenu.find(id);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

}
