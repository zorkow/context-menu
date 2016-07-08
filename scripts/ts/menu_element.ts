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
 * @fileoverview Abstract class of menu elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/// <reference path="abstract_navigatable.ts" />
/// <reference path="html_classes.ts" />


namespace ContextMenu {

  export class MenuElement extends AbstractNavigatable {

    private html: HTMLElement;
    protected role: string;
    protected className: HtmlClass;

    constructor() {
      super();
    }

    addAttributes(attributes: {[attr: string]: string}): void {
      for (let attr in attributes) {
        this.html.setAttribute(attr, attributes[attr]);
      }
    }

    /**
     * @override
     */
    getHtml() {
      if (!this.html) {
        this.generateHtml();
      }
      return this.html;
    }

    /**
     * @override
     */
    setHtml(html: HTMLElement) {
      this.html = html;
    }

    /**
     * @override
     */
    generateHtml() {
      //// TODO: Make this DOM independent!
      this.html = document.createElement('div');
      this.html.classList.add(this.className);
      this.html.setAttribute('role', this.role);
    }

  }

}
