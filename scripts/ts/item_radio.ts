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
 * @fileoverview Class of separator items.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


/// <reference path="abstract_item.ts" />
/// <reference path="variable_item.ts" />

namespace ContextMenu {

  export class Radio extends AbstractItem implements VariableItem {

    role = 'menuitemradio';

    /**
     * The state variable. Initially set false.
     * @type {Variable}
     */
    private variable: Variable<string>;
    private span: HTMLElement;

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
      this.variable = <Variable<string>>menu.getPool().lookup(variable);
      this.register();
    }

    /**
     * @override
     */
    press() {
      let oldValue = this.variable.getValue();
      console.log(oldValue);
      console.log(this.getId());
      if (oldValue === this.getId()) {
        return;
      }
      this.variable.setValue(this.getId());
    }

   /**
    * @override
    */
    generateHtml() {
      super.generateHtml();
      let html = this.getHtml();
      this.span = document.createElement('span');
      this.span.textContent = '\u2713';
      this.span.classList.add(HtmlClasses['MENURADIOCHECK']);
      html.appendChild(this.span);
      this.update();
    }

    /**
     * @override
     */
    register() {
      this.variable.register(this);
    }

    /**
     * @override
     */
    unregister() {
      this.variable.unregister(this);
    }

    /**
     * @override
     */
    update() {
      this.updateAria();
      this.updateSpan();
    }

    updateAria() {
      this.getHtml().setAttribute(
        'aria-checked',
        this.variable.getValue() === this.getId() ? 'true' : 'false'
      );
    }

    updateSpan() {
      console.log(this.getId());
      this.span.style.display =
        this.variable.getValue() === this.getId() ? '' : 'none';
    }

  }
}
