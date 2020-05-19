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
 * @fileoverview Class of checkbox items.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {AbstractVariableItem} from './abstract_variable_item';
import {Menu} from './menu';
import {MenuUtil} from './menu_util';
import {Variable} from './variable';
import {HtmlClasses} from './html_classes';


export class Checkbox extends AbstractVariableItem<boolean> {

  /**
   * @override
   */
  protected role = 'menuitemcheckbox';

  /**
   * @constructor
   * @extends {AbstractItem}
   * @param {Menu} menu The context menu or sub-menu the item belongs to.
   * @param {string} content The content of the menu item.
   * @param {string} variable The variable that is changed.
   * @param {string=} id Optionally the id of the menu item.
   */
  constructor(menu: Menu, content: string, variable: string, id?: string) {
    super(menu, 'checkbox', content, id);
    this.variable = <Variable<boolean>>menu.getPool().lookup(variable);
    this.register();
  }

  /**
   * @override
   */
  public executeAction() {
    this.variable.setValue(!this.variable.getValue());
    MenuUtil.close(this);
  }

  /**
   * @override
   */
  public generateSpan() {
    this.span = document.createElement('span');
    this.span.textContent = '\u2713';
    this.span.classList.add(HtmlClasses['MENUCHECK']);
  }

  /**
   * @override
   * Toggles the aria checked attribute.
   */
  protected updateAria() {
    this.getHtml().setAttribute(
      'aria-checked',
      this.variable.getValue() ? 'true' : 'false'
    );
  }

  /**
   * @override
   */
  public updateSpan() {
    this.span.style.display = this.variable.getValue() ? '' : 'none';
  }

}

