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
 * @fileoverview Class of context menus.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {AbstractMenu} from './abstract_menu';
import {HtmlClasses} from './html_classes';
import {Item} from './item';
import {MenuStore} from './menu_store';
import {Variable} from './variable';
import {Postable} from './postable';
import {MenuUtil} from './menu_util';
import {VariablePool} from './variable_pool';


export class ContextMenu extends AbstractMenu {

  /**
   * Flag to avoid redoing taborder if we are between elements.
   * @type {boolean}
   */
  private moving = false;

  /**
   * The div that holds the entire menu.
   * @type {HTMLElement}
   */
  private frame: HTMLElement;

  /**
   * A store the menu belongs to.
   * @type {MenuStore}
   */
  private store_: MenuStore = new MenuStore(this);

  /**
   * The element the menu is anchored to.
   * @type {HTMLElement}
   */
  private anchor: HTMLElement;

  /**
   * Registry of currently open widgets.
   * @type {Array.<Postable>}
   */
  private widgets: Postable[] = [];


  /**
   * Parses a JSON respresentation of a variable pool.
   * @param {JSON} json The JSON object to parse.
   * @return {ContextMenu} The new context menu object.
   */
  public static parse({menu: menu}: {menu: {pool: Array<Object>,
                                            items: Array<Object>,
                                            id: string}}): ContextMenu {
    if (!menu) {
      MenuUtil.error(null, 'Wrong JSON format for menu.');
      return;
    }
    // The variable id is currently ignored!
    let {pool: pool, items: items, id: id} = menu;
    let ctxtMenu = new this();
    // TODO: Try and catch with error
    pool.forEach(ctxtMenu.parseVariable.bind(ctxtMenu));
    ctxtMenu.parseItems(items);
    return ctxtMenu;
  }

  /**
   * @constructor
   * @extends {AbstractMenu}
   */
  constructor() {
    super();
    this.variablePool = new VariablePool<string | boolean>();
  }

  /**
   * @override
   */
  public generateHtml() {
    if (this.isPosted()) {  // In case we are updating.
      this.unpost();
    }
    super.generateHtml();
    this.frame = document.createElement('div');
    this.frame.classList.add(HtmlClasses['MENUFRAME']);
    //// TODO: Adapt to other browsers.
    let styleString = 'left: 0px; top: 0px; z-index: 200; width: 100%; ' +
      'height: 100%; border: 0px; padding: 0px; margin: 0px;';
    this.frame.setAttribute('style', 'position: absolute; ' + styleString);
    let innerDiv = document.createElement('div');
    innerDiv.setAttribute('style', 'position: fixed; ' + styleString);
    this.frame.appendChild(innerDiv);
    innerDiv.addEventListener('mousedown',
                              function(event: Event) {
                                this.unpost();
                                this.unpostWidgets();
                                this.stop(event);
                              }.bind(this));
  }

  /**
   * @override
   */
  protected display() {
    document.body.appendChild(this.frame);
    this.frame.appendChild(this.getHtml());
    this.focus();
  }

  /**
   * @override
   */
  public escape(event: KeyboardEvent) {
    this.unpost();
    this.unpostWidgets();
  }

  /**
   * @override
   */
  public unpost() {
    super.unpost();
    if (this.widgets.length > 0) {
      return;
    }
    this.frame.parentNode.removeChild(this.frame);
    let store = this.getStore();
    if (!this.moving) {
      store.insertTaborder();
    }
    store.getActive().focus();
  }

  /**
   * @override
   */
  public left(event: KeyboardEvent) {
    this.move_(this.store_.previous());
  }

  /**
   * @override
   */
  public right(event: KeyboardEvent) {
    this.move_(this.store_.next());
  }

  /**
   * @return {HTMLElement} The frame element wrapping all the elements of the
   *     menu.
   */
  public getFrame(): HTMLElement {
    return this.frame;
  }

  /**
   * @return {MenuStore} The store of this menu.
   */
  public getStore(): MenuStore {
    return this.store_;
  }

  /**
   * @override
   */
  public post(): void;
  /**
   * @override
   */
  public post(x: number, y: number): void;
  /**
   * @param {Event} event The event that triggered posting the element.
   */
  public post(event: Event): void;
  /**
   * @param {HTMLElement} element The element for which the menu is posted.
   */
  public post(element: HTMLElement): void;
  /**
   * @param {Event|number|HTMLElement} numberOrEvent The overloaded first
   *     argument.
   * @param {number} isY The y coordinate.
   */
  public post(numberOrEvent?: any, isY?: number) {
    if (typeof(isY) !== 'undefined') {
      if (!this.moving) {
        this.getStore().removeTaborder();
      }
      super.post(numberOrEvent, isY);
      return;
    }
    let event = numberOrEvent;
    let node;
    if (event instanceof Event) {
      node = event.target;
      this.stop(event);
    } else {
      node = event;
    }
    let x: number;
    let y: number;
    let keydown: boolean = false;
    if (event instanceof MouseEvent) {
      x = event.pageX, y = event.pageY;
      if (!x && !y && event.clientX) {
        x = event.clientX + document.body.scrollLeft +
          document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop  +
          document.documentElement.scrollTop;
      }
    }
    if (!x && !y && node) {
      let offsetX = window.pageXOffset || document.documentElement.scrollLeft;
      let offsetY = window.pageYOffset || document.documentElement.scrollTop;
      let rect = node.getBoundingClientRect();
      x = (rect.right + rect.left) / 2 + offsetX;
      y = (rect.bottom + rect.top) / 2 + offsetY;
    }
    this.getStore().setActive(node);
    this.anchor = this.getStore().getActive();
    let menu = this.getHtml();
    let margin = 5;
    if (x + menu.offsetWidth > document.body.offsetWidth - margin) {
      x = document.body.offsetWidth - menu.offsetWidth - margin;
    }
    // Not sure what these do!
    //
    // // if (MENU.isMobile) {
    // //    x = Math.max(5,x-Math.floor(menu.offsetWidth/2)); y -= 20
    // // }
    // // MENU.skipUp = event.isContextMenu;

    this.post(x, y);
  }

  /**
   * Registers widgets that are opened by the menu.
   * @param {Postable} widget The open widget.
   */
  public registerWidget(widget: Postable) {
    this.widgets.push(widget);
  }

  /**
   * Removes an opened widgets.
   * @param {Postable} widget The closed widget.
   */
  public unregisterWidget(widget: Postable) {
    let index = this.widgets.indexOf(widget);
    if (index > -1) {
      this.widgets.splice(index, 1);
    }
    if (this.widgets.length === 0) {
      this.unpost();
    }
  }

  /**
   * Closes all widgets that were opened from this menu.
   */
  public unpostWidgets() {
    this.widgets.forEach(x => x.unpost());
  }

  /**
   * Moves to the given next element.
   * @param {HTMLELement} next The next element in the sequence.
   * @private
   */
  private move_(next: HTMLElement) {
    if (this.anchor && next !== this.anchor) {
      this.moving = true;
      this.unpost();
      this.post(next);
      this.moving = false;
    }
  }

  /**
   * Parses a JSON respresentation of a variable and inserts it into the
   * variable pool of the context menu.
   * @param {JSON} json The JSON object to parse.
   */
  private parseVariable(
    {name: name, getter: getter, setter: setter}:
    {name: string, getter: () => string | boolean,
     setter: (x: (string | boolean)) => void}): void {
    this.getPool().insert(new Variable(name, getter, setter));
  }

}
