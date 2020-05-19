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
 * @fileoverview Class of combo boxes.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {AbstractVariableItem} from './abstract_variable_item';
import {Menu} from './menu';
import {MenuUtil} from './menu_util';
import {Variable} from './variable';
import {HtmlClasses} from './html_classes';
import {KEY} from './key_navigatable';


export class Combo extends AbstractVariableItem<string> {

  /**
   * @override
   */
  protected role = 'combobox';

  /**
   * The state variable. Initially set false.
   * @type {Variable}
   */
  private initial: Function;

  private input: HTMLInputElement;

  private inputEvent: boolean = false;

  /**
   * @constructor
   * @extends {AbstractItem}
   * @param {Menu} menu The context menu or sub-menu the item belongs to.
   * @param {string} content The content of the menu item.
   * @param {string} variable The variable that is changed.
   * @param {string=} id Optionally the id of the menu item.
   */
  constructor(menu: Menu, content: string, variable: string, id?: string) {
    super(menu, 'radio', content, id);
    this.variable = menu.getPool().lookup(variable) as Variable<string>;
    this.register();
  }

  /**
   * @override
   */
  public executeAction() {
    this.variable.setValue(
      this.input.value, MenuUtil.getActiveElement(this));
  }

  /**
   * @override
   */
  public space(event: KeyboardEvent) {
    super.space(event);
    this.down(null);
  }

  /**
   * @override
   */
  public focus() {
    super.focus();
    this.input.focus();
  }

  /**
   * @override
   */
  public generateHtml() {
    super.generateHtml();
    let html = this.getHtml();
    html.classList.add(HtmlClasses['MENUCOMBOBOX']); // ???
  }

  /**
   * @override
   */
  public generateSpan() {
    this.span = document.createElement('span');
    this.span.classList.add(HtmlClasses['MENUINPUTBOX']); // ???
    this.input = document.createElement('input');
    this.input.addEventListener('keydown', this.inputKey.bind(this));
    this.input.setAttribute('size', '10em');
    this.input.setAttribute('type', 'text');
    this.input.setAttribute('tabindex', '-1');
    this.span.appendChild(this.input);
  }


  /**
   * Executes the key event of the combobox.
   * @param {KeyboardEvent} event The input event.
   */
  public inputKey(event: KeyboardEvent) {
    this.bubbleKey();
    this.inputEvent = true;
  }


  /**
   * Specification of the keydown event.
   * @param {KeyboardEvent} event The input event.
   */
  public keydown(event: KeyboardEvent) {
    if (this.inputEvent &&
        event.keyCode !== KEY.ESCAPE &&
        event.keyCode !== KEY.RETURN) {
      this.inputEvent = false;
      event.stopPropagation();
      return;
    }
    super.keydown(event);
    event.stopPropagation();
  }

  /**
   * Toggles the aria checked attribute.
   */
  protected updateAria() { }

  /**
   * Toggles the checked tick.
   */
  protected updateSpan() {
    let initValue;
    try {
      initValue = this.variable.getValue(MenuUtil.getActiveElement(this));
    } catch (e) {
      initValue = '';
    }
    this.input.value = initValue;
  }

}

