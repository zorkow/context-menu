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
 * @fileoverview Abstract class of menu entries.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {Entry} from './entry';
import {MenuElement} from './menu_element';
import {Menu} from './menu';
import {HtmlClasses} from './html_classes';



export abstract class AbstractEntry extends MenuElement implements Entry {


  /**
   * Class name.
   * @type {HtmlClass}
   */
  protected className = HtmlClasses['MENUITEM'];

  /**
   * Aria role element.
   * @type {string}
   */
  protected role = 'menuitem';

  private menu: Menu;
  private type: string = 'entry';
  private hidden: boolean = false;

  /**
   * @constructor
   * @implements {Entry}
   * @extends {MenuElement}
   * @param {Menu} menu The context menu or sub-menu the entry belongs to.
   * @param {string} type The type of the entry.
   */
  constructor(menu: Menu, type: string) {
    super();
    this.menu = menu;
    this.type = type;
  }

  /**
   * @return {Menu} The context menu or sub-menu the entry belongs to.
   */
  public getMenu() {
    return this.menu;
  }

  /**
   * @param {Menu} menu Sets the menu.
   */
  public setMenu(menu: Menu) {
    this.menu = menu;
  }

  /**
   * @return {string} The type of the menu entry, used for jsonification.
   */
  public getType() {
    return this.type;
  }

  /**
   * @override
   */
  public hide() {
    this.hidden = true;
    this.menu.generateMenu();
  }

  /**
   * @override
   */
  public show() {
    this.hidden = false;
    this.menu.generateMenu();
  }

  /**
   * @override
   */
  public isHidden() {
    return this.hidden;
  }

}

