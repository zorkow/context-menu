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
 * @fileoverview Class of sub menus.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {AbstractMenu} from './abstract_menu.js';
import {ContextMenu} from './context_menu.js';
import {Submenu} from './item_submenu.js';
import {ParserFactory} from './parser_factory.js';



export class SubMenu extends AbstractMenu {


  /**
   * Parses a JSON respresentation of a submenu.
   * @param {JSON} json The JSON object to parse.
   * @param {Submenu} anchor The anchor item the submenu is attached to.
   * @return {SubMenu} The new submenu object.
   */
  public static fromJson(
    factory: ParserFactory,
    {items: its}: {items: any[], id: string},
    anchor: Submenu): SubMenu {
    const submenu = new this(anchor);
    const itemList = factory.get('items')(factory, its, submenu);
    submenu.items = itemList;
    return submenu;
  }

  /**
   * @constructor
   * @extends {AbstractMenu}
   * @param {Submenu} anchor The item in the parent menu triggering this
   *     submenu.
   */
  constructor(private _anchor: Submenu) {
    super();
    this.variablePool = this.anchor.menu.pool;
    this.setBaseMenu();
  }

  /**
   * @return {Submenu} The submenu item that anchors this popdown submenu to
   *     its parent.
   */
  public get anchor(): Submenu {
    return this._anchor;
  }

  /**
   * @override
   */
  public post() {
    if (!this.anchor.menu.isPosted()) {
      return;
    }
    //// TODO: These are currently ignored!
    let mobileFlag = false;
    let rtlFlag = false;

    let margin = 5;
    let parent = this.anchor.html;
    let menu = this.html;
    let base = (this.baseMenu as ContextMenu).frame;
    // // let side = 'left';
    let mw = parent.offsetWidth;
    let x = (mobileFlag ? 30 : mw - 2);
    let y = 0;
    while (parent && parent !== base) {
      x += parent.offsetLeft;
      y += parent.offsetTop;
      parent = <HTMLElement>parent.parentNode;
    }
    if (!mobileFlag) {
      if ((rtlFlag && x - mw - menu.offsetWidth > margin) ||
          (!rtlFlag && x + menu.offsetWidth >
           document.body.offsetWidth - margin)) {
        // // side = 'right';
        x = Math.max(margin, x - mw - menu.offsetWidth + 6);
      }
    }

    // Is the following useful?
    //
    // // if (!isPC) {
    // //   // in case these ever get implemented
    // //   menu.style["borderRadiusTop"+side] = 0;       // Opera 10.5
    // //   menu.style["WebkitBorderRadiusTop"+side] = 0; // Safari and Chrome
    // //   menu.style["MozBorderRadiusTop"+side] = 0;    // Firefox
    // //   menu.style["KhtmlBorderRadiusTop"+side] = 0;  // Konqueror
    // // }

    super.post(x, y);
  }

  /**
   * @override
   */
  protected display() {
    (this.baseMenu as ContextMenu).frame.appendChild(this.html);
  }

  /**
   * Computes the topmost menu this submenu belongs to.
   */
  private setBaseMenu() {
    //// TODO: Make this type safer!
    let menu: any = this;
    do {
      menu = menu.anchor.menu;
    } while (menu instanceof SubMenu);
    this.baseMenu = menu;
  }

  public left(_event: KeyboardEvent) {
    this.focused = null;
    this.anchor.focus();
  }

  /**
   * @return {JSON} The object in JSON.
   */
  public toJson() {
    return {type: ''
           };
  }

}
