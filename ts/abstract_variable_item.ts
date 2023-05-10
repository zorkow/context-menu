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
 * @file Class of radio buttons.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {AbstractItem} from './abstract_item.js';
import {VariableItem} from './variable_item.js';
import {Variable} from './variable.js';


export abstract class AbstractVariableItem<T> extends AbstractItem
implements VariableItem {

  /**
   * Additional span element.
   * @type {Node}
   */
  protected span: HTMLElement;

  /**
   * The state variable. Initially set false.
   * @type {Variable}
   */
  protected variable: Variable<T>;

  /**
   * @override
   */
  protected abstract generateSpan(): void;

  /**
   * @override
   */
  public generateHtml() {
    super.generateHtml();
    const html = this.html;
    if (!this.span) {
      this.generateSpan();
    }
    html.appendChild(this.span);
    this.update();
  }

  /**
   * @override
   */
  public register() {
    this.variable.register(this);
  }

  /**
   * @override
   */
  public unregister() {
    this.variable.unregister(this);
  }

  /**
   * @override
   */
  public update() {
    this.updateAria();
    if (this.span) {
      this.updateSpan();
    }
  }

  /**
   * Toggles the aria checked attribute.
   */
  protected abstract updateAria(): void;

  /**
   * Toggles the checked tick.
   */
  protected abstract updateSpan(): void;

}
