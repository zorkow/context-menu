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
 * @fileoverview A store that
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

/// <reference path="context_menu.ts" />


namespace ContextMenu {

  export class MenuStore {

    private store: HTMLElement[] = [];
    private active: HTMLElement = null;
    private menu: ContextMenu;
    private attrMap: {[name: string]: EventListener} = {};
    private counter: number = 0;
    private attachedClass: string = HtmlClasses['ATTACHED'] + '_' +
      MenuUtil.counter();


    /**
     * @constructor
     * @param {ContextMenu} menu The context menu the store belongs to.
     */
    constructor(menu: ContextMenu) {
      this.menu = menu;
    }

    /**
     * Sets the new active store element if it exists in the store.
     * @param {HTMLElement} element Element to be activated.
     */
    setActive(element: HTMLElement): void {
      do {
        if (this.store.indexOf(element) !== -1) {
          this.active = element;
          break;
        }
        element = <HTMLElement>element.parentNode;
      } while (element);
    }

    /**
     * @return {HTMLElement} The currently active store element, if one exists.
     */
    getActive(): HTMLElement {
      return this.active;
    }

    /**
     * Returns next active element.
     * If store is empty returns null and also unsets active element.
     * If active is not set returns the first element of the store.
     * @return {HTMLElement} The next element if it exists.
     */
    next(): HTMLElement {
      let length = this.store.length;
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
     * Returns next active element.
     * If store is empty returns null and also unsets active element.
     * If active is not set returns the first element of the store.
     * @return {HTMLElement} The next element if it exists.
     */
    previous(): HTMLElement {
      let length = this.store.length;
      if (length === 0) {
        this.active = null;
        return null;
      }
      let last = length - 1;
      let index = this.store.indexOf(this.active);
      index = index === -1 ? last : (index === 0 ? last : index - 1);
      this.active = this.store[index];
      return this.active;
    }

    clear() {
      this.remove(this.store);
    }

    private sort(): void {
      let nodes = document.getElementsByClassName(this.attachedClass);
      this.store = [].slice.call(nodes);
    }

    insert(element: HTMLElement): void;
    insert(element: HTMLElement[]): void;
    insert(element: NodeListOf<HTMLElement>): void;

    insert(elementOrList: any) {
      let elements = elementOrList instanceof HTMLElement ?
        [elementOrList] : elementOrList;
      for (let i = 0, element: HTMLElement; element = elements[i]; i++) {
        this.insertElement(element);
      }
      this.sort();
    }

    private insertElement(element: HTMLElement) {
      if (element.classList.contains(this.attachedClass)) {
        return;
      }
      element.classList.add(this.attachedClass);
      this.addTabindex(element);
      this.addEvents(element);
    }

    remove(element: HTMLElement): void;
    remove(element: HTMLElement[]): void;
    remove(element: NodeListOf<HTMLElement>): void;

    remove(elementOrList: any) {
      let elements = elementOrList instanceof HTMLElement ?
        [elementOrList] : elementOrList;
      for (let i = 0, element: HTMLElement; element = elements[i]; i++) {
        this.removeElement(element);
      }
      this.sort();
    }

    private removeElement(element: HTMLElement) {
      if (!element.classList.contains(this.attachedClass)) {
        return;
      }
      element.classList.remove(this.attachedClass);
      this.removeTabindex(element);
      this.removeEvents(element);
    }

    /**
     * Inserts all elements in the store into the tab order.
     */
    insertTaborder() {
      this.store.forEach(x => x.setAttribute('tabindex', '0'));
    }

    /**
     * Removes all elements in the store from the tab order.
     */
    removeTaborder() {
      this.store.forEach(x => x.setAttribute('tabindex', '-1'));
    }

    private addTabindex(element: HTMLElement) {
      if (element.hasAttribute('tabindex')) {
        element.setAttribute(HtmlAttrs['OLDTAB'],
                             element.getAttribute('tabindex'));
      }
      element.setAttribute('tabindex', '0');
    }

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
    private addEvents(element: HTMLElement) {
      if (element.hasAttribute(HtmlAttrs['COUNTER'])) {
        return;
      }
      this.addEvent(element, 'contextmenu', this.menu.post.bind(this.menu));
      this.addEvent(element, 'keydown', this.keydown.bind(this));
      element.setAttribute(HtmlAttrs['COUNTER'], this.counter.toString());
      this.counter++;
    }

    private addEvent(element: HTMLElement, name: string, func: EventListener) {
      let attrName = HtmlAttrs[name.toUpperCase() + 'FUNC'];
      this.attrMap[attrName + this.counter] = func;
      element.addEventListener(name, func);
    }

    private removeEvents(element: HTMLElement) {
      if (!element.hasAttribute(HtmlAttrs['COUNTER'])) {
        return;
      }
      let counter = element.getAttribute(HtmlAttrs['COUNTER']);
      this.removeEvent(element, 'contextmenu', counter);
      this.removeEvent(element, 'keydown', counter);
      element.removeAttribute(HtmlAttrs['COUNTER']);
    }

    private removeEvent(element: HTMLElement, name: string, counter: string) {
      let attrName = HtmlAttrs[name.toUpperCase() + 'FUNC'];
      let menuFunc = this.attrMap[attrName + counter];
      element.removeEventListener(name, menuFunc);
    }

    private keydown(event: KeyboardEvent) {
      if (event.keyCode === KEY.SPACE) {
        this.menu.post(event);
      }
    }

  }

}
