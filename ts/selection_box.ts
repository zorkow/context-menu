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

import {ContextMenu} from './context_menu';
import {HtmlClasses} from './html_classes';
import {AbstractMenu} from './abstract_menu';
import {Info} from './info';


export class SelectionMenu extends AbstractMenu {

  /**
   * @override
   */
  protected className = HtmlClasses['SELECTION'];

  constructor(public anchor: SelectionBox) {
    super();
    this.variablePool = this.anchor.menu.pool;
    this.baseMenu = this.anchor.menu;
  }

  /**
   * @override
   */
  protected display() { }

  /**
   * @override
   */
  public right(event: KeyboardEvent) {
    this.anchor.right(event);
  }

  /**
   * @override
   */
  public left(event: KeyboardEvent) {
    this.anchor.left(event);
  }
}


export class SelectionBox extends Info {

  private _selections: SelectionMenu[] = [];
  private counter: number = 0;
  private prefix: string = 'ctxt-selection';

  /**
   * @constructor
   * @extends {Info}
   * @param {string} title The title of the selection box.
   * @param {string} signature The final line of the selection box.
   */
  constructor(title: string, signature: string) {
    super(title, null, signature);
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


  private rowDiv(sels: SelectionMenu[]): [HTMLElement, number] {
    let div = document.createElement('div');
    this.contentDiv.appendChild(div);
    let rects = sels.map(sel => {
      div.appendChild(sel.html);
      if (!sel.html.id) {
        sel.html.id = this.prefix + this.counter++;
      }
      return sel.html.getBoundingClientRect();
    });
    let width = rects.reduce((x, y) => x + y.width, 0);
    let height = rects.reduce((x, y) => Math.max(x, y.height), 0);
    div.setAttribute('style', 'clear: both; height: ' + height + 'px;');
    return [div, width];
  }

  /**
   * @override
   */
  protected display() {
    super.display();
    if (!this.selections.length) {
      return;
    }
    let outerDivs: HTMLElement[] = [];
    let chunks = 4;
    let maxWidth = 0;
    for (let i = 0; i < this.selections.length; i += chunks) {
      let sels = this.selections.slice(i, i + chunks);
      let [div, width] = this.rowDiv(sels);
      outerDivs.push(div);
      maxWidth = Math.max(maxWidth, width);
    }
    outerDivs.forEach(div => div.style.width = maxWidth + 'px');
  }

  /**
   * @override
   */
  public left(event: KeyboardEvent) {
    this.move(event, (index: number) =>
              (index === 0 ? this.selections.length : index) - 1);
  }

  /**
   * @override
   */
  public right(event: KeyboardEvent) {
    this.move(event, (index: number) =>
              index === this.selections.length - 1 ? 0 : index + 1);
  }

  /**
   * @override
   */
  protected generateContent(): HTMLElement {
    let div = super.generateContent();
    div.classList.add(HtmlClasses['SELECTIONBOX']);
    div.removeAttribute('tabindex');
    return div;
  }

  private findSelection(event: KeyboardEvent): SelectionMenu {
    let target = event.target as HTMLElement;
    let selection = null;
    if (target.id) {
      selection = this.selections.find(x => x.html.id === target.id);
    }
    if (!selection) {
      let id = target.parentElement.id;
      selection = this.selections.find(x => x.html.id === id);
    }
    return selection;
  }

  private move(event: KeyboardEvent,
               isNext: (x: number) => number) {
    let selection = this.findSelection(event);
    if (selection.focused) {
      selection.focused.unfocus();
    }
    let index = this.selections.indexOf(selection);
    let next = isNext(index);
    this.selections[next].focus();
  }

}
