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

/// <reference path="abstract_menu.ts" />
/// <reference path="html_classes.ts" />
/// <reference path="item.ts" />
/// <reference path="menu_store.ts" />


namespace ContextMenu {

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
    generateHtml() {
      super.generateHtml();
      this.frame = document.createElement('div');
      this.frame.id = HtmlIds['MENUFRAME'];
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
    display() {
      document.body.appendChild(this.frame);
      this.frame.appendChild(this.getHtml());
      this.focus();
    }

    /**
     * @override
     */
    escape(event: KeyboardEvent) {
      this.unpost();
      this.unpostWidgets();
    }

    /**
     * @override
     */
    unpost() {
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
    left(event: KeyboardEvent) {
      this.move_(this.store_.previous());
    }

    /**
     * @override
     */
    right(event: KeyboardEvent) {
      this.move_(this.store_.next());
    }


    /**
     * Moves to the given next element.
     * @param {HTMLELement} next The next element in the sequence.
     */
    move_(next: HTMLElement) {
      if (this.anchor && next !== this.anchor) {
        this.moving = true;
        this.unpost();
        this.post(next);
        this.moving = false;
      }
    }

    /**
     * @return {HTMLElement} The frame element wrapping all the elements of the
     *     menu.
     */
    getFrame(): HTMLElement {
      return this.frame;
    }

    /**
     * @return {MenuStore} The store of this menu.
     */
    getStore(): MenuStore {
      return this.store_;
    }

    // Overloading
    post(): void;
    post(x: number, y: number): void;
    post(event: Event): void;
    post(event: HTMLElement): void;

    post(numberOrEvent?: any, isY?: number) {
      if (typeof(isY) !== 'undefined') {
        if (!this.moving) {
          this.getStore().removeTaborder();
        }
        super.post(numberOrEvent, isY);
        return;
      }
      let node: HTMLElement;
      let x: number;
      let y: number;
      let keydown: boolean = false;
      if (numberOrEvent instanceof Event) {
        let event = numberOrEvent;
        x = event['pageX'], y = event['pageY'];
        if (!x && !y && event['clientX']) {
          x = event.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
          y = event.clientY + document.body.scrollTop  +
            document.documentElement.scrollTop;
        }
        node = event.target;
        keydown = event.type === 'keydown';
        this.stop(event);
      } else {
        node = numberOrEvent;
      }
      this.getStore().setActive(node);
      this.anchor = this.getStore().getActive();
      if ((keydown || (!x && !y)) && node) {
        let offsetX = window.pageXOffset || document.documentElement.scrollLeft;
        let offsetY = window.pageYOffset || document.documentElement.scrollTop;
        let rect = node.getBoundingClientRect();
        x = (rect.right + rect.left) / 2 + offsetX;
        y = (rect.bottom + rect.top) / 2 + offsetY;
      }
      let rect = node.getBoundingClientRect();
      let menu = this.getHtml();
      let margin = 5;
      if (x + menu.offsetWidth > document.body.offsetWidth - margin) {
        x = document.body.offsetWidth - menu.offsetWidth - margin;
      }

      // Not sure what these do!
      // 
      // if (MENU.isMobile) {
      //    x = Math.max(5,x-Math.floor(menu.offsetWidth/2)); y -= 20
      // }
      // MENU.skipUp = event.isContextMenu;

      this.post(x, y);
    }

    registerWidget(widget: Postable) {
      this.widgets.push(widget);
    }

    unregisterWidget(widget: Postable) {
      let index = this.widgets.indexOf(widget);
      if (index > -1) {
        this.widgets.splice(index, 1);
      }
      if (this.widgets.length === 0) {
        this.unpost();
      }
    }

    unpostWidgets() {
      this.widgets.forEach(x => x.unpost());
    }

  }

}
