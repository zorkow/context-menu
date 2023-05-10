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
 * @file Class of kill buttons to close menus and widgets.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import {AbstractPostable} from './abstract_postable.js';
import {HtmlClasses} from './html_classes.js';
import {Postable} from './postable.js';


export class CloseButton extends AbstractPostable {

  /**
   * @override
   */
  protected className = HtmlClasses['MENUCLOSE'];

  /**
   * @override
   */
  protected role = 'button';

  /**
   * @class
   * @augments {AbstractPostable}
   * @param {Postable} element The postable element the close button is
   *     attached to.
   */
  constructor(private element: Postable) {
    super();
  }

  /**
   * @override
   */
  public generateHtml() {
    const html = document.createElement('span');
    html.classList.add(this.className);
    html.setAttribute('role', this.role);
    html.setAttribute('tabindex', '0');
    const content = document.createElement('span');
    content.textContent = '\u00D7';
    html.appendChild(content);
    this.html = html;
  }

  /**
   * @override
   */
  protected display() { }

  /**
   * @override
   */
  public unpost() {
    super.unpost();
    this.element.unpost();
  }

  /**
   * @override
   */
  public keydown(event: KeyboardEvent) {
    this.bubbleKey();
    super.keydown(event);
  }

  /**
   * @override
   */
  public space(event: KeyboardEvent) {
    this.unpost();
    this.stop(event);
  }

  /**
   * @override
   */
  public mousedown(event: MouseEvent) {
    this.unpost();
    this.stop(event);
  }

}
