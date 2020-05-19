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
import {MenuElement} from './menu_element';
import {Item} from './item';
import {VariablePool} from './variable_pool';
import {HtmlClasses} from './html_classes';

import {Checkbox} from './item_checkbox';
import {Combo} from './item_combo';
import {Command} from './item_command';
import {Label} from './item_label';
import {Radio} from './item_radio';
import {Rule} from './item_rule';
import {Submenu} from './item_submenu';


export abstract class AbstractMenu extends AbstractPostable implements Menu {

  private _baseMenu: Menu = null;

  public set baseMenu(menu: Menu) {
    this._baseMenu = menu;
  }

  public get baseMenu(): Menu {
    return this._baseMenu;
  }

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
  }

  /**
   * @override
   */
  public setItems(items: Item[]) {
    return this.items = items;
  }

  /**
   * @override
   */
  public getPool(): VariablePool<string | boolean> {
    return this.variablePool;
  }

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

}

