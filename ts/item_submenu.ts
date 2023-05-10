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
 * @file Class of separator items.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {AbstractItem} from './abstract_item.js';
import {Menu} from './menu.js';
import {HtmlClasses} from './html_classes.js';
import {ParserFactory} from './parser_factory.js';


export class Submenu extends AbstractItem {

  /**
   * The span with the little arrow.
   */
  private span: HTMLElement;

  /**
   * The sub menu object.
   */
  private _submenu: Menu = null;

  /**
   * Parses a JSON respresentation of a submenu item.
   * @param factory The parser factory.
   * @param json The JSON object to parse.
   * @param json.content The content of the submenu.
   * @param json.menu The submenu definition.
   * @param json.id The id of the item.
   * @param menu The menu the item is attached to.
   * @returns The new submenu object.
   */
  public static fromJson(
    factory: ParserFactory,
    {content: content, menu: submenu, id: id}:
    {content: string, menu: any, id: string}, menu: Menu): Submenu {
    const item = new this(menu, content, id);
    const sm = factory.get('subMenu')(factory, submenu, item);
    item.submenu = sm;
    return item;
  }

  /**
   * @class
   * @augments {AbstractItem}
   * @param menu The context menu or sub-menu the item belongs to.
   * @param content The content of the menu item.
   * @param id Optionally the id of the menu item.
   */
  constructor(menu: Menu, content: string, id?: string) {
    super(menu, 'submenu', content, id);
  }

  /**
   * Sets the submenu.
   * @param menu A menu.
   */
  public set submenu(menu: Menu) {
    this._submenu = menu;
  }

  /**
   * Returns the submenu element.
   * @returns The submenu.
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
    if (this.menu.focused !== this) {
      super.unfocus();
      this.menu.unpostSubmenus();
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
    const html = this.html;
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

  /**
   * @returns The object in JSON.
   */
  public toJson() {
    return {type: ''
           };
  }

}
