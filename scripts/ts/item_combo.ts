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


/// <reference path="abstract_item.ts" />
/// <reference path="menu_util.ts" />
/// <reference path="variable_item.ts" />

namespace ContextMenu {

  export class Combo extends AbstractItem implements VariableItem {

    /**
     * @override
     */
    protected role = 'combobox';

    /**
     * The state variable. Initially set false.
     * @type {Variable}
     */
    private initial: Function;
    private span: HTMLElement;

    /**
     * Parses a JSON respresentation of a combo item.
     * @param {JSON} json The JSON object to parse.
     * @param {Menu} menu The menu the item is attached to.
     * @return {Combo} The new combo object.
     */
    public static parse(
      {content: content, initial: initial, id: id}:
      {content: string, initial: Function, id: string}, menu: Menu): Combo {
        return new Combo(menu, content, initial, id);
      }

    /**
     * @constructor
     * @extends {AbstractItem}
     * @param {Menu} menu The context menu or sub-menu the item belongs to.
     * @param {string} content The content of the menu item.
     * @param {string} variable The variable that is changed.
     * @param {string=} id Optionally the id of the menu item.
     */
    constructor(menu: Menu, content: string, initial: Function, id?: string) {
      super(menu, 'combo', content, id);
      this.initial = initial;
      // this.register();
    }

    /**
     * @override
     */
    public executeAction() {
      // let oldValue = this.variable.getValue();
      // if (oldValue === this.getId()) {
      //   return;
      // }
      // this.variable.setValue(this.getId());
      console.log('here');
      MenuUtil.close(this);
    }

   /**
    * @override
    */
    public generateHtml() {
      super.generateHtml();
      let html = this.getHtml();
      html.classList.add(HtmlClasses['MENUCOMBOBOX']); // ???
      this.span = document.createElement('input');
      this.span.setAttribute('type', 'text');
      this.span.setAttribute('size', '10em');
      this.span.classList.add(HtmlClasses['MENUINPUTBOX']); // ???
      html.appendChild(this.span);
      this.update();
    }

    /**
     * @override
     */
    public register() { }

    /**
     * @override
     */
    public unregister() { }

    /**
     * @override
     */
    public update() {
      let initValue;
      try {
        initValue = this.initial(MenuUtil.getActiveElement(this));
      } catch (e) {
        initValue = '';
      };
      this.span.setAttribute('value', initValue);
    }

    // /**
    //  * Toggles the aria checked attribute.
    //  */
    // private updateAria() {
    //   this.getHtml().setAttribute(
    //     'aria-checked',
    //     this.variable.getValue() === this.getId() ? 'true' : 'false'
    //   );
    // }

    // /**
    //  * Toggles the checked tick.
    //  */
    // private updateSpan() {
    //   this.span.style.display =
    //     this.variable.getValue() === this.getId() ? '' : 'none';
    // }

  }

}
