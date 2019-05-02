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
 * @fileoverview Abstract class of menu elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {AbstractNavigatable} from './abstract_navigatable';
import {HtmlClass} from './html_classes';
import {Element} from './element';



export abstract class MenuElement extends AbstractNavigatable implements
Element {

  /**
   * @override
   */
  protected role: string;

  /**
   * @override
   */
  protected className: HtmlClass;

  private html: HTMLElement;

  /**
   * Adds a attributes and values to the HTML element.
   * @param {Object.<string, string>} attributes A dictionary of attributes.
   */
  public addAttributes(attributes: {[attr: string]: string}): void {
    for (let attr in attributes) {
      this.html.setAttribute(attr, attributes[attr]);
    }
  }

  /**
   * @override
   */
  public getHtml() {
    if (!this.html) {
      this.generateHtml();
    }
    return this.html;
  }

  /**
   * @override
   */
  public setHtml(html: HTMLElement) {
    this.html = html;
    this.addEvents(html);
  }

  /**
   * @override
   */
  public generateHtml() {
    //// TODO: Make this DOM independent!
    let html = document.createElement('div');
    html.classList.add(this.className);
    html.setAttribute('role', this.role);
    this.setHtml(html);
  }

  /**
   * @override
   */
  public focus() {
    let html = this.getHtml();
    html.setAttribute('tabindex', '0');
    html.focus();
  }

  /**
   * @override
   */
  public unfocus() {
    let html = this.getHtml();
    if (html.hasAttribute('tabindex')) {
      html.setAttribute('tabindex', '-1');
    }
    html.blur();
  }

}

