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
 * @fileoverview Class of slider.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {AbstractVariableItem} from './abstract_variable_item.js';
import {Menu} from './menu.js';
import {MenuUtil} from './menu_util.js';
import {Variable} from './variable.js';
import {HtmlClasses} from './html_classes.js';
import {KEY} from './key_navigatable.js';
import {ParserFactory} from './parser_factory.js';


export class Slider extends AbstractVariableItem<string> {

  /**
   * @override
   */
  protected role = 'slider';
  private labelSpan: HTMLElement;
  private valueSpan: HTMLElement;
  private labelId = 'ctx_slideLabel' + MenuUtil.counter();
  private valueId = 'ctx_slideValue' + MenuUtil.counter();

  private input: HTMLInputElement;

  private inputEvent: boolean = false;

  /**
   * Parses a JSON respresentation of a combo item.
   * @param {JSON} json The JSON object to parse.
   * @param {Menu} menu The menu the item is attached to.
   * @return {Slider} The new slider object.
   */
  public static fromJson(
    _factory: ParserFactory,
    {content: content, variable: variable, id: id}:
    {content: string, variable: string, id: string}, menu: Menu): Slider {
    return new this(menu, content, variable, id);
  }

  /**
   * @constructor
   * @extends {AbstractItem}
   * @param {Menu} menu The context menu or sub-menu the item belongs to.
   * @param {string} content The content of the menu item.
   * @param {string} variable The variable that is changed.
   * @param {string=} id Optionally the id of the menu item.
   */
  constructor(menu: Menu, content: string, variable: string, id?: string) {
    super(menu, 'slider', content, id);
    this.variable = menu.pool.lookup(variable) as Variable<string>;
    this.register();
  }

  /**
   * @override
   */
  public executeAction() {
    this.variable.setValue(
      this.input.value, MenuUtil.getActiveElement(this));
    this.update();
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
    let html = this.html;
    html.classList.add(HtmlClasses['MENUSLIDER']); // ???
    this.valueSpan = document.createElement('span');
    this.valueSpan.setAttribute('id', this.valueId);
    this.valueSpan.classList.add(HtmlClasses['SLIDERVALUE']);
    this.html.appendChild(this.valueSpan);
  }

  /**
   * @override
   */
  public generateSpan() {
    this.span = document.createElement('span');
    this.labelSpan = document.createElement('span');
    this.labelSpan.setAttribute('id', this.labelId);
    this.labelSpan.appendChild(this.html.childNodes[0]);
    this.html.appendChild(this.labelSpan);
    this.input = document.createElement('input');
    this.input.setAttribute('type', 'range');
    this.input.setAttribute('min', '0');
    this.input.setAttribute('max', '100');
    this.input.setAttribute('aria-valuemin', '0');
    this.input.setAttribute('aria-valuemax', '100');
    this.input.setAttribute('aria-labelledby', this.labelId);
    this.input.addEventListener('keydown', this.inputKey.bind(this));
    this.input.addEventListener('input', this.executeAction.bind(this));
    this.input.classList.add(HtmlClasses['SLIDERBAR']);
    this.span.appendChild(this.input);
  }


  /**
   * Executes the key event of the sliderbox.
   * @param {KeyboardEvent} event The input event.
   */
  public inputKey(_event: KeyboardEvent) {
    this.inputEvent = true;
  }


  /**
   * @override
   */
  public mousedown(event: MouseEvent) {
    event.stopPropagation();
  }


  /**
   * @override
   */
  public mouseup(_event: MouseEvent) {
    // Needed for Firefox
    event.stopPropagation();
  }

  /**
   * Specification of the keydown event.
   * @param {KeyboardEvent} event The input event.
   */
  public keydown(event: KeyboardEvent) {
    let code = event.keyCode;
    if (code === KEY.UP || code === KEY.DOWN) {
      event.preventDefault();
      super.keydown(event);
      return;
    }
    if (this.inputEvent &&
        code !== KEY.ESCAPE && code !== KEY.RETURN) {
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
  protected updateAria() {
    let value = this.variable.getValue();
    this.input.setAttribute('aria-valuenow', value);
    this.input.setAttribute('aria-valuetext', value + '%');
  }

  /**
   * Toggles the checked tick.
   */
  protected updateSpan() {
    let initValue;
    try {
      initValue = this.variable.getValue(MenuUtil.getActiveElement(this));
      this.valueSpan.innerHTML = initValue + '%';
    } catch (e) {
      initValue = '';
    }
    this.input.value = initValue;
  }

  /**
   * @return {JSON} The object in JSON.
   */
  public toJson() {
    return {type: ''
           };
  }

}
