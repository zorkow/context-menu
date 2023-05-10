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
 * @file Class of context menus.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {AbstractMenu} from './abstract_menu.js';
import {HtmlClasses} from './html_classes.js';
import {MenuStore} from './menu_store.js';
import {Postable} from './postable.js';
import {VariablePool} from './variable_pool.js';
import {ParserFactory} from './parser_factory.js';


export class ContextMenu extends AbstractMenu {

  /**
   * Id of the context menu.
   * @type {string}
   */
  public id = '';

  /**
   * Flag to avoid redoing taborder if we are between elements.
   * @type {boolean}
   */
  private moving = false;

  /**
   * The div that holds the entire menu.
   * @type {HTMLElement}
   */
  private _frame: HTMLElement;

  /**
   * A store the menu belongs to.
   * @type {MenuStore}
   */
  private _store: MenuStore = new MenuStore(this);

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
   * Parses a JSON respresentation of a context menu.
   * @param json The JSON object to parse.
   * @param factory
   * @param root0
   * @param root0.pool
   * @param root0.items
   * @param root0.id
   * @param factory.pool
   * @param factory.items
   * @param factory.id
   * @returns {ContextMenu} The new context menu object.
   */
  public static fromJson(
    factory: ParserFactory,
    {pool: pool, items: items, id: id = ''}: {pool: Array<Object>,
                                              items: Array<Object>,
                                              id: string}): ContextMenu {
    // The variable id is currently ignored!
    const ctxtMenu = new this(factory);
    ctxtMenu.id = id;
    const varParser = factory.get('variable'); // Allow different parser.
    pool.forEach(x => varParser(factory, x as any, ctxtMenu.pool));
    const itemList = factory.get('items')(factory, items, ctxtMenu);
    ctxtMenu.items = itemList;
    return ctxtMenu;
  }

  /**
   * @param factory
   * @class
   * @augments {AbstractMenu}
   */
  constructor(public factory: ParserFactory) {
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
    this._frame = document.createElement('div');
    this._frame.classList.add(HtmlClasses['MENUFRAME']);
    //// TODO: Adapt to other browsers.
    const styleString = 'left: 0px; top: 0px; z-index: 200; width: 100%; ' +
      'height: 100%; border: 0px; padding: 0px; margin: 0px;';
    this._frame.setAttribute('style', 'position: absolute; ' + styleString);
    const innerDiv = document.createElement('div');
    innerDiv.setAttribute('style', 'position: fixed; ' + styleString);
    this._frame.appendChild(innerDiv);
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
    this.frame.appendChild(this.html);
    this.focus();
  }

  /**
   * @override
   */
  public escape(_event: KeyboardEvent) {
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
    const store = this.store;
    if (!this.moving) {
      store.insertTaborder();
    }
    store.active.focus();
  }

  /**
   * @override
   */
  public left(_event: KeyboardEvent) {
    this.move_(this.store.previous());
  }

  /**
   * @override
   */
  public right(_event: KeyboardEvent) {
    this.move_(this.store.next());
  }

  /**
   * @returns {HTMLElement} The frame element wrapping all the elements of the
   *     menu.
   */
  public get frame(): HTMLElement {
    return this._frame;
  }

  /**
   * @returns {MenuStore} The store of this menu.
   */
  public get store(): MenuStore {
    return this._store;
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
   * @param event The event that triggered posting the element.
   */
  public post(event: Event): void;
  /**
   * @param element The element for which the menu is posted.
   */
  public post(element: HTMLElement): void;
  /**
   * @param numberOrEvent The overloaded first
   *     argument.
   * @param isY The y coordinate.
   */
  public post(numberOrEvent?: any, isY?: number) {
    if (typeof(isY) !== 'undefined') {
      if (!this.moving) {
        this.store.removeTaborder();
      }
      super.post(numberOrEvent, isY);
      return;
    }
    const event = numberOrEvent;
    let node;
    if (event instanceof Event) {
      node = event.target;
      this.stop(event);
    } else {
      node = event;
    }
    let x: number;
    let y: number;
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
      const offsetX = window.pageXOffset || document.documentElement.scrollLeft;
      const offsetY = window.pageYOffset || document.documentElement.scrollTop;
      const rect = node.getBoundingClientRect();
      x = (rect.right + rect.left) / 2 + offsetX;
      y = (rect.bottom + rect.top) / 2 + offsetY;
    }
    this.store.active = node;
    this.anchor = this.store.active;
    const menu = this.html;
    const margin = 5;
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
   * @param widget The open widget.
   */
  public registerWidget(widget: Postable) {
    this.widgets.push(widget);
  }

  /**
   * Removes an opened widgets.
   * @param widget The closed widget.
   */
  public unregisterWidget(widget: Postable) {
    const index = this.widgets.indexOf(widget);
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
   * @returns {JSON} The object in JSON.
   */
  public toJson() {
    return {type: ''};
  }

  /**
   * Moves to the given next element.
   * @param next The next element in the sequence.
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

}
