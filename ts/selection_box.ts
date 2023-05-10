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
 * @file Class of selection boxes with multiple radio buttons.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import {ContextMenu} from './context_menu.js';
import {MenuUtil} from './menu_util.js';
import {HtmlClasses} from './html_classes.js';
import {AbstractMenu} from './abstract_menu.js';
import {Info} from './info.js';
import {Item} from './item.js';
import {ParserFactory} from './parser_factory.js';


declare type selection = {title: string, values: string[], variable: string};

export class SelectionMenu extends AbstractMenu {

  /**
   * @override
   */
  protected className = HtmlClasses['SELECTIONMENU'];

  /**
   * Parses a JSON respresentation of a selection menu.
   * @param {JSON} json The JSON object to parse.
   * @param factory
   * @param factory.title
   * @param factory.values
   * @param {SelectionBox} sb The selection box to attach to.
   * @param factory.variable
   * @returns {SelectionMenu} The new selection menu.
   */
  public static fromJson(
    factory: ParserFactory,
    {title: title, values: values, variable: variable}: selection,
    sb: SelectionBox): SelectionMenu {
    const selection = new this(sb);
    const tit = factory.get('label')(
      factory, {content: title || '', id: title || 'id'}, selection);
    const rul = factory.get('rule')(factory, {}, selection);
    const radios = values.map(
      x => factory.get('radio')(
        factory, {content: x, variable: variable, id: x}, selection));
    const items = [tit, rul].concat(radios) as Item[];
    selection.items = items;
    return selection;
  }

  /**
   * @class
   * @param anchor
   * @param{SelectionBox} anchor The anchor element.
   */
  constructor(public anchor: SelectionBox) {
    super();
    this.variablePool = this.anchor.menu.pool;
    this.baseMenu = this.anchor.menu;
  }

  /**
   * @override
   */
  public generateHtml() {
    super.generateHtml();
    this.items.forEach(item => item.html.classList.add(HtmlClasses['SELECTIONITEM']));
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


export const enum SelectionOrder {
  NONE = 'none',
  ALPHABETICAL = 'alphabetical',
  INCREASING = 'increasing',
  DECREASING = 'decreasing'
}

export const enum SelectionGrid {
  SQUARE = 'square',
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export class SelectionBox extends Info {

  private _selections: SelectionMenu[] = [];
  private prefix = 'ctxt-selection';
  private _balanced = true;
  public static chunkSize = 4;

  /**
   * Parses a JSON respresentation of a selection box.
   * @param {JSON} json The JSON object to parse.
   * @param factory
   * @param root0
   * @param root0.title
   * @param root0.signature
   * @param root0.selections
   * @param root0.order
   * @param root0.grid
   * @param factory.title
   * @param factory.signature
   * @param ctxt
   * @param factory.selections
   * @param factory.order
   * @param factory.grid
   */
  public static fromJson(
    factory: ParserFactory,
    {title: title, signature: signature, selections: selections, order: order, grid: grid}:
    {title: string, signature: string, selections: selection[],
     order?: SelectionOrder, grid?: SelectionGrid},
    ctxt: ContextMenu): SelectionBox {
      const sb = new this(title, signature, order, grid);
      sb.attachMenu(ctxt);
      const sels = selections.map(
        x => factory.get('selectionMenu')(factory, x, sb));
      sb.selections = sels;
      return sb;
    }

  /**
   * @class
   * @augments {Info}
   * @param {string} title The title of the selection box.
   * @param grid
   * @param {string} signature The final line of the selection box.
   * @param {string=} style The style component.
   */
  constructor(title: string, signature: string,
              public style: SelectionOrder = SelectionOrder.NONE,
              public grid: SelectionGrid = SelectionGrid.VERTICAL) {
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


  private rowDiv(sels: SelectionMenu[]): [HTMLElement, number, number, number[]] {
    const div = document.createElement('div');
    this.contentDiv.appendChild(div);
    const rects = sels.map(sel => {
      div.appendChild(sel.html);
      if (!sel.html.id) {
        sel.html.id = this.prefix + MenuUtil.counter();
      }
      return sel.html.getBoundingClientRect();
    });
    const column = rects.map(x => x.width);
    const width = column.reduce((x, y) => x + y, 0);
    const height = rects.reduce((x, y) => Math.max(x, y.height), 0);
    div.classList.add(HtmlClasses['SELECTIONDIVIDER']);
    div.setAttribute('style', 'height: ' + height + 'px;');
    return [div, width, height, column];
  }

  /**
   * @override
   */
  protected display() {
    super.display();
    this.order();
    if (!this.selections.length) {
      return;
    }
    const outerDivs: HTMLElement[] = [];
    let maxWidth = 0;
    let balancedColumn: number[] = [];
    const chunks = this.getChunkSize(this.selections.length);
    for (let i = 0; i < this.selections.length; i += chunks) {
      const sels = this.selections.slice(i, i + chunks);
      const [div, width, height, column] = this.rowDiv(sels);
      outerDivs.push(div);
      maxWidth = Math.max(maxWidth, width);
      sels.forEach(sel => sel.html.style.height = height + 'px');
      balancedColumn = this.combineColumn(balancedColumn, column);
    }
    if (this._balanced) {
      this.balanceColumn(outerDivs, balancedColumn);
      maxWidth = balancedColumn.reduce((x, y) => x + y, 20);
    }
    outerDivs.forEach(div => div.style.width = maxWidth + 'px');
  }

  private getChunkSize(size: number) {
    switch (this.grid) {
    case SelectionGrid.SQUARE:
      return Math.floor(Math.sqrt(size));
    case SelectionGrid.HORIZONTAL:
      return Math.floor(size / SelectionBox.chunkSize);
    case SelectionGrid.VERTICAL:
    default:
      return SelectionBox.chunkSize;

    }
  }

  private balanceColumn(divs: HTMLElement[], column: number[]) {
    divs.forEach(div => {
      const children = Array.from(div.children) as HTMLElement[];
      for (let i = 0, child: HTMLElement; child = children[i]; i++) {
        child.style.width = column[i] + 'px';
      }
    });
  }

  private combineColumn(col1: number[], col2: number[]): number[] {
    let result: number[] = [];
    let i = 0;
    while (col1[i] || col2[i]) {
      if (!col1[i]) {
        result = result.concat(col2.slice(i));
        break;
      }
      if (!col2[i]) {
        result = result.concat(col1.slice(i));
        break;
      }
      result.push(Math.max(col1[i], col2[i]));
      i++
    };
    return result;
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
  public generateHtml() {
    super.generateHtml();
    this.html.classList.add(HtmlClasses['SELECTION']);
  }

  /**
   * @override
   */
  protected generateContent(): HTMLElement {
    const div = super.generateContent();
    div.classList.add(HtmlClasses['SELECTIONBOX']);
    div.removeAttribute('tabindex');
    return div;
  }

  private findSelection(event: KeyboardEvent): SelectionMenu {
    const target = event.target as HTMLElement;
    let selection = null;
    if (target.id) {
      selection = this.selections.find(x => x.html.id === target.id);
    }
    if (!selection) {
      const id = target.parentElement.id;
      selection = this.selections.find(x => x.html.id === id);
    }
    return selection;
  }

  private move(event: KeyboardEvent,
               isNext: (x: number) => number) {
    const selection = this.findSelection(event);
    if (selection.focused) {
      selection.focused.unfocus();
    }
    const index = this.selections.indexOf(selection);
    const next = isNext(index);
    this.selections[next].focus();
  }

  static orderMethod = new Map<SelectionOrder, (x: SelectionMenu, y: SelectionMenu) => number>([
    [SelectionOrder.ALPHABETICAL, (x, y) => x.items[0].content.localeCompare(y.items[0].content)],
    [SelectionOrder.NONE, (_x, _y) => 1],
    [SelectionOrder.DECREASING, (x, y) => {
      const xl = x.items.length;
      const yl = y.items.length;
      return (xl < yl) ? 1 : ((yl < xl) ? -1 : 0);
    }],
    [SelectionOrder.INCREASING, (x, y) => {
      const xl = x.items.length;
      const yl = y.items.length;
      return (xl < yl) ? -1 : ((yl < xl) ? 1 : 0);
    }],
  ]);

  /**
   * Orders the selections.
   */
  private order() {
    this.selections.sort(SelectionBox.orderMethod.get(this.style));
  }

  /**
   * @returns {JSON} The object in JSON.
   */
  public toJson() {
    return {type: ''
           };
  }

}
