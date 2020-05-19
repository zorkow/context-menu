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

import {AbstractItem} from './abstract_item';
import {Menu} from './menu';
import {HtmlClasses} from './html_classes';


export class Submenu extends AbstractItem {

  /**
   * The span with the little arrow.
   * @type {HTMLElement}
   */
  private span: HTMLElement;

  /**
   * The sub menu object.
   * @type {SubMenu}
   */
  private _submenu: Menu = null;

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
   * @param {Menu} menu A menu.
   */
  public set submenu(menu: Menu) {
    this._submenu = menu;
  }

  /**
   * Returns the submenu element.
   * @return {Menu} The submenu.
   */
  public get submenu(): Menu {
    return this._submenu;
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
    this.stop(event);
  }

  /**
   * @override
   */
  public unfocus() {
    if (!this.submenu.isPosted()) {
      super.unfocus();
      return;
    }
    if (this.getMenu().focused !== this) {
      super.unfocus();
      this.getMenu().unpostSubmenus();
      return;
    }
    this.html.setAttribute('tabindex', '-1');
    this.html.blur();
  }

  /**
   * @override
   */
  public focus() {
    super.focus();
    if (!this.submenu.isPosted() && !this.disabled) {
      this.submenu.post();
    }

  }

  /**
   * @override
   */
  public executeAction() {
    this.submenu.isPosted() ? this.submenu.unpost() : this.submenu.post();
  }

  /**
   * @override
   */
  public generateHtml() {
    super.generateHtml();
    let html = this.html;
    this.span = document.createElement('span');
    this.span.textContent = '\u25BA';
    this.span.classList.add(HtmlClasses['MENUARROW']);
    html.appendChild(this.span);
    html.setAttribute('aria-haspopup', 'true');
  }

  /**
   * @override
   */
  public left(event: KeyboardEvent) {
    if (this.submenu.isPosted()) {
      this.submenu.unpost();
    } else {
      super.left(event);
    }
  }

  /**
   * @override
   */
  public right(event: KeyboardEvent) {
    if (!this.submenu.isPosted()) {
      this.submenu.post();
    } else {
      this.submenu.down(event);
    }
  }

}

