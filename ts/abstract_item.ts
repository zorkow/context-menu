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
 * @file Abstract class of menu items.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {AbstractEntry} from './abstract_entry.js';
import {AbstractMenu} from './abstract_menu.js';
import {Item} from './item.js';
import {Menu} from './menu.js';
import {MenuUtil} from './menu_util.js';
import {HtmlClasses} from './html_classes.js';



export abstract class AbstractItem extends AbstractEntry implements Item {

  /**
   * Flag indicating if element is disabled.
   */
  protected disabled = false;

  private _id;
  private callbacks: ((item: Item) => void)[] = [];

  /**
   * @class
   * @implements {Item}
   * @augments {AbstractEntry}
   * @param menu The context menu or sub-menu the item belongs to.
   * @param type The type of the entry.
   * @param _content The content of the menu item.
   * @param id Optionally the id of the menu item.
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
    if (this.menu) {
      (this.menu as AbstractMenu).generateHtml();
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
   * @param func Callback that does not take any arguments.
   */
  public registerCallback(func: (value: Item) => void): void {
    if (this.callbacks.indexOf(func) === -1) {
      this.callbacks.push(func);
    }
  }

  /**
   * Removes a callback function.
   * @param func Callback that does not take any arguments.
   */
  public unregisterCallback(func: (value: Item) => void): void {
    const index = this.callbacks.indexOf(func);
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
    const html = this.html;
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
    this.menu.focused = this;
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
    this.menu.up(event);
  }

  /**
   * @override
   */
  public down(event: KeyboardEvent) {
    this.menu.down(event);
  }

  //// TODO: RTL change of direction.
  /**
   * @override
   */
  public left(event: KeyboardEvent) {
    this.menu.left(event);
  }

  /**
   * @override
   */
  public right(event: KeyboardEvent) {
    this.menu.right(event);
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
    const html = this.html;
    html.classList.add(HtmlClasses['MENUDISABLED']);
    html.setAttribute('aria-disabled', 'true');
  }

  /**
   * @override
   */
  public enable() {
    this.disabled = false;
    const html = this.html;
    html.classList.remove(HtmlClasses['MENUDISABLED']);
    html.removeAttribute('aria-disabled');
  }

  /**
   * Executes the additional callbacks registered with this menu item.
   */
  private executeCallbacks_() {
    for (const func of this.callbacks) {
      try {
        func(this);
      } catch (e) {
        MenuUtil.error(e, 'Callback for menu entry ' + this.id +
                       ' failed.');
      }
    }
  }

}
