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

import {AbstractEntry} from './abstract_entry';
import {Item} from './item';
import {Menu} from './menu';
import {SubMenu} from './sub_menu';
import {MenuUtil} from './menu_util';
import {HtmlClasses} from './html_classes';
import {ContextMenu} from './context_menu';



export abstract class AbstractItem extends AbstractEntry implements Item {

  /**
   * Flag indicating if element is disabled.
   * @type {boolean}
   */
  protected disabled: boolean = false;

  private _id: string;
  private callbacks: Function[] = [];

  /**
   * @constructor
   * @implements {Item}
   * @extends {AbstractEntry}
   * @param {Menu} menu The context menu or sub-menu the item belongs to.
   * @param {string} type The type of the entry.
   * @param {string} _content The content of the menu item.
   * @param {string=} id Optionally the id of the menu item.
   */
  constructor(menu: Menu, type: string,
              private _content: string, id?: string) {
    super(menu, type);
    this._id = id ? id : _content;
  }

  /**
   * @override
   */
  public get content() {
    return this._content;
  }

  /**
   * @override
   */
  public set content(content: string) {
    this._content = content;
    this.generateHtml();
    if (this.getMenu()) {
      this.getMenu().generateHtml();
    }
  }

  /**
   * @override
   */
  public get id() {
    return this._id;
  }

  /**
   * @override
   */
  public press() {
    if (!this.disabled) {
      this.executeAction();
      this.executeCallbacks_();
    }
  }

  /**
   * Execute the item's action if it is not disabled.
   */
  protected executeAction() { }

  /**
   * Registers a callback function.
   * @param {Function} func Callback that does not take any arguments.
   * @final
   */
  public registerCallback(func: Function): void {
    if (this.callbacks.indexOf(func) === -1) {
      this.callbacks.push(func);
    }
  }

  /**
   * Removes a callback function.
   * @param {Function} func Callback that does not take any arguments.
   * @final
   */
  public unregisterCallback(func: Function): void {
    let index = this.callbacks.indexOf(func);
    if (index !== -1) {
      this.callbacks.splice(index, 1);
    }
  }

  /**
   * @override
   */
  public mousedown(event: MouseEvent) {
    this.press();
    this.stop(event);
  }

  /**
   * @override
   */
  public mouseover(event: MouseEvent) {
    this.focus();
    this.stop(event);
  }

  /**
   * @override
   */
  public mouseout(event: MouseEvent) {
    this.deactivate();
    this.stop(event);
  }

  /**
   * @override
   */
  public generateHtml() {
    super.generateHtml();
    let html = this.html;
    html.setAttribute('aria-disabled', 'false');
    html.textContent = this.content;
  }

  /**
   * Sets active style for item.
   */
  protected activate() {
    if (!this.disabled) {
      this.html.classList.add(HtmlClasses['MENUACTIVE']);
    }
  }

  /**
   * Removes active style from item.
   */
  protected deactivate() {
    this.html.classList.remove(HtmlClasses['MENUACTIVE']);
  }

  /**
   * @override
   */
  public focus() {
    this.getMenu().focused = this;
    super.focus();
    this.activate();
  }

  /**
   * @override
   */
  public unfocus() {
    this.deactivate();
    super.unfocus();
  }

  /**
   * @override
   */
  public escape(_event: KeyboardEvent) {
    MenuUtil.close(this);
  }

  /**
   * @override
   */
  public up(event: KeyboardEvent) {
    this.getMenu().up(event);
  }

  /**
   * @override
   */
  public down(event: KeyboardEvent) {
    this.getMenu().down(event);
  }

  //// TODO: RTL change of direction.
  /**
   * @override
   */
  public left(event: KeyboardEvent) {
    if (this.getMenu() instanceof ContextMenu) {
      this.getMenu().left(event);
      return;
    }
    let menu = this.getMenu() as SubMenu;
    menu.focused = null;
    menu.getAnchor().focus();
  }

  /**
   * @override
   */
  public right(event: KeyboardEvent) {
    this.getMenu().right(event);
  }

  /**
   * @override
   */
  public space(_event: KeyboardEvent) {
    this.press();
  }

  /**
   * @override
   */
  public disable() {
    this.disabled = true;
    let html = this.html;
    html.classList.add(HtmlClasses['MENUDISABLED']);
    html.setAttribute('aria-disabled', 'true');
  }

  /**
   * @override
   */
  public enable() {
    this.disabled = false;
    let html = this.html;
    html.classList.remove(HtmlClasses['MENUDISABLED']);
    html.removeAttribute('aria-disabled');
  }

  /**
   * Executes the additional callbacks registered with this menu item.
   */
  private executeCallbacks_() {
    for (let func of this.callbacks) {
      try {
        func(this);
      } catch (e) {
        MenuUtil.error(e, 'Callback for menu entry ' + this.id +
                       ' failed.');
      }
    }
  }

}

