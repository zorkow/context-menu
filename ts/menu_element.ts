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
 * @file Abstract class of menu elements.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { AbstractNavigatable } from './abstract_navigatable.js';
import { HtmlClass } from './html_classes.js';
import { Element } from './element.js';

export abstract class MenuElement
  extends AbstractNavigatable
  implements Element
{
  /**
   * @override
   */
  protected role: string;

  /**
   * @override
   */
  protected className: HtmlClass;

  private _html: HTMLElement;

  /**
   * Adds a attributes and values to the HTML element.
   * @param attributes A dictionary of attributes.
   */
  public addAttributes(attributes: { [attr: string]: string }): void {
    for (const attr in attributes) {
      this.html.setAttribute(attr, attributes[attr]);
    }
  }

  /**
   * @override
   */
  public get html() {
    if (!this._html) {
      this.generateHtml();
    }
    return this._html;
  }

  /**
   * @override
   */
  public set html(html: HTMLElement) {
    this._html = html;
    this.addEvents(html);
  }

  /**
   * @override
   */
  public generateHtml() {
    //// TODO: Make this DOM independent!
    const html = document.createElement('div');
    html.classList.add(this.className);
    html.setAttribute('role', this.role);
    this.html = html;
  }

  /**
   * @override
   */
  public focus() {
    const html = this.html;
    html.setAttribute('tabindex', '0');
    html.focus();
  }

  /**
   * @override
   */
  public unfocus() {
    const html = this.html;
    if (html.hasAttribute('tabindex')) {
      html.setAttribute('tabindex', '-1');
    }
    try {
      html.blur();
    } catch (e) {
      // This is for IE 11.
    }
    html.blur();
  }
}
