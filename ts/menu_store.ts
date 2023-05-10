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
 * @file A store that maps HTML elements in a document to context menus.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import {ContextMenu} from './context_menu.js';
import {MenuUtil} from './menu_util.js';
import {HtmlClasses, HtmlAttrs} from './html_classes.js';
import {KEY} from './key_navigatable.js';



export class MenuStore {


  /**
   * The store of elements the menu belongs to.
   * @type {HTMLElement[]}
   */
  protected store: HTMLElement[] = [];

  private _active: HTMLElement = null;
  private counter = 0;
  private attachedClass: string = HtmlClasses['ATTACHED'] + '_' +
    MenuUtil.counter();
  private taborder = true;
  private attrMap: {[name: string]: EventListener} = {};

  /**
   * @class
   * @param menu The context menu the store belongs to.
   */
  constructor(private menu: ContextMenu) { }

  /**
   * Sets the new active store element if it exists in the store.
   * @param element Element to be activated.
   */
  public set active(element: HTMLElement) {
    do {
      if (this.store.indexOf(element) !== -1) {
        this._active = element;
        break;
      }
      element = <HTMLElement>element.parentNode;
    } while (element);
  }

  /**
   * @returns {HTMLElement} The currently active store element, if one exists.
   */
  public get active(): HTMLElement {
    return this._active;
  }

  /**
   * Returns next active element.
   * If store is empty returns null and also unsets active element.
   * If active is not set returns the first element of the store.
   * @returns {HTMLElement} The next element if it exists.
   */
  public next(): HTMLElement {
    const length = this.store.length;
    if (length === 0) {
      this.active = null;
      return null;
    }
    let index = this.store.indexOf(this.active);
    index = index === -1 ? 0 : (index < length - 1 ? index + 1 : 0);
    this.active = this.store[index];
    return this.active;
  }

  /**
   * Returns previous active element.
   * If store is empty returns null and also unsets active element.
   * If active is not set returns the last element of the store.
   * @returns {HTMLElement} The previous element if it exists.
   */
  public previous(): HTMLElement {
    const length = this.store.length;
    if (length === 0) {
      this.active = null;
      return null;
    }
    const last = length - 1;
    let index = this.store.indexOf(this.active);
    index = index === -1 ? last : (index === 0 ? last : index - 1);
    this.active = this.store[index];
    return this.active;
  }

  /**
   * Removes all elements in the store.
   */
  public clear() {
    this.remove(this.store);
  }

  /**
   * @param element Single element to insert.
   */
  public insert(element: HTMLElement): void;

  /**
   * @param elements List of elements to insert.
   */
  public insert(elements: HTMLElement[]): void;

  /**
   * @param elements List of elements to insert.
   */
  public insert(elements: NodeListOf<HTMLElement>): void;

  /**
   * Inserts DOM elements into the store.
   * @param elementOrList Elements
   *     to insert.
   */
  public insert(elementOrList: any) {
    const elements = elementOrList instanceof HTMLElement ?
      [elementOrList] : elementOrList;
    for (const element of elements) {
      this.insertElement(element);
    }
    this.sort();
  }

  /**
   * @param element Single element to remove.
   */
  public remove(element: HTMLElement): void;

  /**
   * @param elements List of elements to remove.
   */
  public remove(element: HTMLElement[]): void;

  /**
   * @param elements List of elements to remove.
   */
  public remove(element: NodeListOf<HTMLElement>): void;

  /**
   * Removes DOM elements from the store.
   * @param elementOrList Elements
   *     to remove.
   */
  public remove(elementOrList: any) {
    const elements = elementOrList instanceof HTMLElement ?
      [elementOrList] : elementOrList;
    for (const element of elements) {
      this.removeElement(element);
    }
    this.sort();
  }

  /**
   * Sets if elements of the store are included in the taborder or not.
   * @param flag If true elements are in taborder, o/w not.
   */
  public inTaborder(flag: boolean) {
    if (this.taborder && !flag) {
      this.removeTaborder();
    }
    if (!this.taborder && flag) {
      this.insertTaborder();
    }
    this.taborder = flag;
  }

  /**
   * Inserts all elements in the store into the tab order.
   */
  public insertTaborder() {
    if (this.taborder) {
      this.insertTaborder_();
    }
  }

  /**
   * Removes all elements in the store from the tab order.
   */
  public removeTaborder() {
    if (this.taborder) {
      this.removeTaborder_();
    }
  }

  /**
   * Adds a DOM element to the store.
   * @param element The DOM element.
   */
  private insertElement(element: HTMLElement) {
    if (element.classList.contains(this.attachedClass)) {
      return;
    }
    element.classList.add(this.attachedClass);
    if (this.taborder) {
      this.addTabindex(element);
    }
    this.addEvents(element);
  }


  /**
   * Removes a DOM element from the store.
   * @param element The DOM element.
   */
  private removeElement(element: HTMLElement) {
    if (!element.classList.contains(this.attachedClass)) {
      return;
    }
    element.classList.remove(this.attachedClass);
    if (this.taborder) {
      this.removeTabindex(element);
    }
    this.removeEvents(element);
  }

  /**
   * Sorts the elements in the store in DOM order.
   */
  private sort(): void {
    const nodes = document.getElementsByClassName(this.attachedClass);
    this.store = [].slice.call(nodes);
  }

  /**
   * Inserts all elements in the store into the tab order.
   */
  private insertTaborder_() {
    this.store.forEach(x => x.setAttribute('tabindex', '0'));
  }

  /**
   * Removes all elements in the store from the tab order.
   */
  private removeTaborder_() {
    this.store.forEach(x => x.setAttribute('tabindex', '-1'));
  }

  /**
   * Adds tabindex to an element and possibly safes an existing one.
   * @param element The DOM element.
   */
  private addTabindex(element: HTMLElement) {
    if (element.hasAttribute('tabindex')) {
      element.setAttribute(HtmlAttrs['OLDTAB'],
                           element.getAttribute('tabindex'));
    }
    element.setAttribute('tabindex', '0');
  }

  /**
   * Removes tabindex from element or restores an old one.
   * @param element The DOM element.
   */
  private removeTabindex(element: HTMLElement) {
    if (element.hasAttribute(HtmlAttrs['OLDTAB'])) {
      element.setAttribute('tabindex',
                           element.getAttribute(HtmlAttrs['OLDTAB']));
      element.removeAttribute(HtmlAttrs['OLDTAB']);
    } else {
      element.removeAttribute('tabindex');
    }
  }

  //// TODO: Need to add touch event.
  /**
   * Adds event listeners to activate the context menu to an element.
   *
   * To be able to remove event listeners we have to remember exactly which
   * listeners we have added. We safe them in the attribute mapping attrMap,
   * as a combination of event handler name and counter, which is unique for
   * each HTML element. The counter is stored on the HTML element in an
   * attribute.
   * @param element The DOM element.
   */
  private addEvents(element: HTMLElement) {
    if (element.hasAttribute(HtmlAttrs['COUNTER'])) {
      return;
    }
    this.addEvent(element, 'contextmenu', this.menu.post.bind(this.menu));
    this.addEvent(element, 'keydown', this.keydown.bind(this));
    element.setAttribute(HtmlAttrs['COUNTER'], this.counter.toString());
    this.counter++;
  }

  /**
   * Adds a single event listeners and stores them in the attribute mapping.
   * @param element The DOM element.
   * @param name The name of the event handler.
   * @param func The event listener.
   */
  private addEvent(element: HTMLElement, name: string, func: EventListener) {
    const attrName = HtmlAttrs[name.toUpperCase() + 'FUNC'];
    this.attrMap[attrName + this.counter] = func;
    element.addEventListener(name, func);
  }

  /**
   * Removes event listeners that activate the context menu from an element.
   * @param element The DOM element.
   */
  private removeEvents(element: HTMLElement) {
    if (!element.hasAttribute(HtmlAttrs['COUNTER'])) {
      return;
    }
    const counter = element.getAttribute(HtmlAttrs['COUNTER']);
    this.removeEvent(element, 'contextmenu', counter);
    this.removeEvent(element, 'keydown', counter);
    element.removeAttribute(HtmlAttrs['COUNTER']);
  }

  /**
   * Removes a single event listeners from an HTML element.
   * @param element The DOM element.
   * @param name The name of the event handler.
   * @param counter The unique counter to identify the handler in the
   *     attribute mappings.
   */
  private removeEvent(element: HTMLElement, name: string, counter: string) {
    const attrName = HtmlAttrs[name.toUpperCase() + 'FUNC'];
    const menuFunc = this.attrMap[attrName + counter];
    element.removeEventListener(name, menuFunc);
  }

  /**
   * Deals with key down keyboard events.
   * @param event The keyboard event.
   */
  private keydown(event: KeyboardEvent) {
    if (event.keyCode === KEY.SPACE) {
      this.menu.post(event);
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

}
