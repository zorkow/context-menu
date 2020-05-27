/*************************************************************
 *
 *  Copyright (c) 2020 The MathJax Consortium
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
 * @fileoverview Class of selection boxes with multiple radio buttons.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import {CloseButton} from './close_button';
import {ContextMenu} from './context_menu';
import {HtmlClasses} from './html_classes';
// import {Postable} from './postable';
import {AbstractPostable} from './abstract_postable';
import {AbstractMenu} from './abstract_menu';

export class SelectionMenu extends AbstractMenu {

  protected className = HtmlClasses['SELECTION'];

  constructor(public anchor: SelectionBox) {
    super();
    this.variablePool = this.anchor.menu.pool;
    this.baseMenu = this.anchor.menu;
  }

  // public post() {
  //   console.log('This');
  //   super.post();
  // }

  /**
   * @override
   */
  protected display() {
    console.log('When?');
  }
  
  public generateMenu() {
    super.generateMenu();
    // this.html.classList.remove(HtmlClasses['MENU']);
  }

}


export class SelectionBox extends AbstractPostable {

  /**
   * @override
   */
  protected className = HtmlClasses['INFO'];

  /**
   * @override
   */
  protected role = 'dialog';

  public menu: ContextMenu;
  private contentDiv: HTMLElement = this.generateContent();
  private close: CloseButton = this.generateClose();
  // private content: Function;
  private _selections: SelectionMenu[] = [];
  
  /**
   * @constructor
   * @extends {AbstractPostable}
   * @param {string} title The title of the selection box.
   * @param {string} signature The final line of the selection box.
   */
  constructor(private title: string, private signature: string) {
    super();
  }

  /**
   * Attaches the widget to a context menu.
   * @param {ContextMenu} menu The parent menu.
   */
  public attachMenu(menu: ContextMenu): void {
    this.menu = menu;
  }

  public get selections(): SelectionMenu[] {
    return this._selections;
  }

  public set selections(selections: SelectionMenu[]) {
    this._selections = [];
    selections.forEach(x => this.addSelection(x));
  }

  public addSelection(selection: SelectionMenu) {
    selection.anchor = this;
    this._selections.push(selection);
  }
  
  
  /**
   * @override
   */
  public generateHtml() {
    super.generateHtml();
    let html = this.html;
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
    let doc = document.documentElement;
    let html = this.html;
    let H = window.innerHeight || doc.clientHeight || doc.scrollHeight || 0;
    let x = Math.floor((- html.offsetWidth) / 2);
    let y = Math.floor((H - html.offsetHeight) / 3);
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
    // let count = 0;
    // let span = document.createElement('p');
    // this.contentDiv.appendChild(span);
    this.selections.forEach(x => {
      // if (count > 2) return;
      // x.post(100 * count, 0);
      // count++;
      // let span = document.createElement('span');
      // this.contentDiv.appendChild(span);
      this.contentDiv.appendChild(x.html);
    });
    let html = this.menu.html;
    console.log(html.parentNode);
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
   * @return {CloseButton} The close button for the widget.
   */
  private generateClose(): CloseButton {
    let close = new CloseButton(this);
    let html = close.html;
    html.classList.add(HtmlClasses['INFOCLOSE']);
    html.setAttribute('aria-label', 'Close Dialog Box');
    return close;
  }

  /**
   * @return {HTMLElement} The title element of the widget.
   */
  private generateTitle(): HTMLElement {
    let span = document.createElement('span');
    span.innerHTML = this.title;
    span.classList.add(HtmlClasses['INFOTITLE']);
    return span;
  }

  /**
   * @return {HTMLElement} The basic content element of the widget. The actual
   *     content is regenerated and attached during posting.
   */
  private generateContent(): HTMLElement {
    let div = document.createElement('div');
    div.classList.add(HtmlClasses['INFOCONTENT']);
    div.setAttribute('tabindex', '0');
    return div;
  }

  /**
   * @return {HTMLElement} The signature element of the widget.
   */
  private generateSignature(): HTMLElement {
    let span = document.createElement('span');
    span.innerHTML = this.signature;
    span.classList.add(HtmlClasses['INFOSIGNATURE']);
    return span;
  }

}
