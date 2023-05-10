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
 * @file Class of combo boxes.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { AbstractVariableItem } from './abstract_variable_item.js';
import { Menu } from './menu.js';
import { MenuUtil } from './menu_util.js';
import { Variable } from './variable.js';
import { HtmlClasses } from './html_classes.js';
import { KEY } from './key_navigatable.js';
import { ParserFactory } from './parser_factory.js';

export class Combo extends AbstractVariableItem<string> {
  /**
   * @override
   */
  protected role = 'combobox';

  private input: HTMLInputElement;

  private inputEvent = false;

  /**
   * Parses a JSON respresentation of a combo item.
   * @param _factory The parser factory.
   * @param json The JSON object to parse.
   * @param json.content The content of the combo box.
   * @param json.variable The variable for the combo box.
   * @param json.id The id of the item.
   * @param menu The menu the item is attached to.
   * @returns The new combo object.
   */
  public static fromJson(
    _factory: ParserFactory,
    {
      content: content,
      variable: variable,
      id: id
    }: { content: string; variable: string; id: string },
    menu: Menu
  ): Combo {
    return new this(menu, content, variable, id);
  }

  /**
   * @class
   * @augments {AbstractVariableItem}
   * @param menu The context menu or sub-menu the item belongs to.
   * @param content The content of the menu item.
   * @param variable The variable that is changed.
   * @param id Optionally the id of the menu item.
   */
  constructor(menu: Menu, content: string, variable: string, id?: string) {
    super(menu, 'combobox', content, id);
    this.variable = menu.pool.lookup(variable) as Variable<string>;
    this.register();
  }

  /**
   * @override
   */
  public executeAction() {
    this.variable.setValue(this.input.value, MenuUtil.getActiveElement(this));
  }

  /**
   * @override
   */
  public space(event: KeyboardEvent) {
    super.space(event);
    MenuUtil.close(this);
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
  public unfocus() {
    super.unfocus();
    this.updateSpan();
  }

  /**
   * @override
   */
  public generateHtml() {
    super.generateHtml();
    const html = this.html;
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
   * @param _event A key event.
   */
  public inputKey(_event: KeyboardEvent) {
    this.bubbleKey();
    this.inputEvent = true;
  }

  /**
   * Specification of the keydown event.
   * @param event The input event.
   */
  public keydown(event: KeyboardEvent) {
    if (
      this.inputEvent &&
      event.keyCode !== KEY.ESCAPE &&
      event.keyCode !== KEY.RETURN
    ) {
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
  protected updateAria() {}

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

  /**
   * @returns The object in JSON.
   */
  public toJson() {
    return { type: '' };
  }
}
