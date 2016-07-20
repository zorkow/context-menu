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
 * @fileoverview Class of context menus.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/// <reference path="abstract_menu.ts" />
/// <reference path="html_classes.ts" />
/// <reference path="item.ts" />


namespace ContextMenu {

  export class ContextMenu extends AbstractMenu {

    /**
     * The div that holds the entire menu.
     * @type {HTMLElement}
     */
    private frame: HTMLElement;

    constructor() {
      super();
      this.variablePool = new VariablePool<string | boolean>();
    }

    /**
     * @override
     */
    generateHtml() {
      super.generateHtml();
      this.frame = document.createElement('div');
      this.frame.id = HtmlIds['MENUFRAME'];
      //// TODO: Adapt to other browsers.
      let styleString = 'left: 0px; top: 0px; z-index: 200; width: 100%; ' +
        'height: 100%; border: 0px; padding: 0px; margin: 0px;';
      this.frame.setAttribute('style', 'position: absolute; ' + styleString);
      let innerDiv = document.createElement('div');
      innerDiv.setAttribute('style', 'position: fixed; ' + styleString);
      this.frame.appendChild(innerDiv);
      innerDiv.addEventListener('mousedown', this.unpost.bind(this));
    }

    public getFrame(): HTMLElement {
      return this.frame;
    }

    display() {
      document.body.appendChild(this.frame);
      this.frame.appendChild(this.getHtml());
      this.focus();
    }

    escape(event: KeyboardEvent) {
      this.unpost();
    }

    unpost() {
      if (!this.isPosted()) {
        return;
      }
      super.unpost();
      this.frame.parentNode.removeChild(this.frame);
    }

  }

}
