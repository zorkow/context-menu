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
 * @file Class of info widgets.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import {CloseButton} from './close_button.js';
import {ContextMenu} from './context_menu.js';
import {HtmlClasses} from './html_classes.js';
import {AbstractPostable} from './abstract_postable.js';


export class Info extends AbstractPostable {

  /**
   * @override
   */
  protected className = HtmlClasses['INFO'];

  /**
   * @override
   */
  protected role = 'dialog';

  protected contentDiv: HTMLElement = this.generateContent();

  public menu: ContextMenu;
  private close: CloseButton = this.generateClose();
  private content: Function;

  /**
   * Parses a JSON respresentation of the .
   * @param json The JSON object to parse.
   */
  // public static fromJson() {
  // }

  /**
   * @class
   * @augments {AbstractPostable}
   * @param title The title of the info box.
   * @param content Function generating the content of the box.
   * @param signature The final line of the info box.
   */
  constructor(private title: string, content: Function,
              private signature: string) {
    super();
    this.content = content || function() { return ''; };
  }

  /**
   * Attaches the widget to a context menu.
   * @param menu The parent menu.
   */
  public attachMenu(menu: ContextMenu): void {
    this.menu = menu;
  }

  /**
   * @override
   */
  public generateHtml() {
    super.generateHtml();
    const html = this.html;
    html.appendChild(this.generateTitle());
    html.appendChild(this.contentDiv);
    html.appendChild(this.generateSignature());
    html.appendChild(this.close.html);
    html.setAttribute('tabindex', '0');
  }

  /**
   * @override
   */
  public post() {
    super.post();
    //// TODO: There is potentially a bug in IE. Look into it.
    //  Look for MENU.prototype.msieAboutBug in MathMenu.js
    const doc = document.documentElement;
    const html = this.html;
    const H = window.innerHeight || doc.clientHeight || doc.scrollHeight || 0;
    const x = Math.floor((- html.offsetWidth) / 2);
    const y = Math.floor((H - html.offsetHeight) / 3);
    html.setAttribute(
      'style', 'margin-left: ' + x + 'px; top: ' + y + 'px;');
    if (window.event instanceof MouseEvent) {
      html.classList.add(HtmlClasses['MOUSEPOST']);
    }
    html.focus();
  }

  /**
   * @override
   */
  protected display() {
    this.menu.registerWidget(this);
    this.contentDiv.innerHTML = this.content();
    const html = this.menu.html;
    if (html.parentNode) {
      html.parentNode.removeChild(html);
    }
    this.menu.frame.appendChild(this.html);
  }

  /**
   * @override
   */
  public click(_event: MouseEvent): void { }

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
  public escape(_event: KeyboardEvent): void {
    this.unpost();
  }

  /**
   * @override
   */
  public unpost() {
    super.unpost();
    this.html.classList.remove(HtmlClasses['MOUSEPOST']);
    this.menu.unregisterWidget(this);
  }

  /**
   * @returns The close button for the widget.
   */
  private generateClose(): CloseButton {
    const close = new CloseButton(this);
    const html = close.html;
    html.classList.add(HtmlClasses['INFOCLOSE']);
    html.setAttribute('aria-label', 'Close Dialog Box');
    return close;
  }

  /**
   * @returns The title element of the widget.
   */
  private generateTitle(): HTMLElement {
    const span = document.createElement('span');
    span.innerHTML = this.title;
    span.classList.add(HtmlClasses['INFOTITLE']);
    return span;
  }

  /**
   * @returns The basic content element of the widget. The actual
   *     content is regenerated and attached during posting.
   */
  protected generateContent(): HTMLElement {
    const div = document.createElement('div');
    div.classList.add(HtmlClasses['INFOCONTENT']);
    div.setAttribute('tabindex', '0');
    return div;
  }

  /**
   * @returns The signature element of the widget.
   */
  private generateSignature(): HTMLElement {
    const span = document.createElement('span');
    span.innerHTML = this.signature;
    span.classList.add(HtmlClasses['INFOSIGNATURE']);
    return span;
  }

  /**
   * @returns The object in JSON.
   */
  public toJson() {
    return {type: ''
           };
  }

}
