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
 * @fileoverview Class of popup widgets.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

/// <reference path="abstract_postable.ts" />
/// <reference path="css_util.ts" />
/// <reference path="menu_element.ts" />

namespace ContextMenu {

  export class CloseButton extends AbstractPostable {

    private element: Postable;
    className = HtmlClasses['MENUCLOSE'];
    role = 'button';

    constructor(element: Postable) {
      super();
      this.element = element;
    }

    /**
     * @override
     */
    generateHtml() {
      let html = document.createElement('span');
      html.classList.add(this.className);
      html.setAttribute('role', this.role);
      html.setAttribute('tabindex', '0');
      let content = document.createElement('span');
      content.textContent = '\u00D7';
      html.appendChild(content);
      this.setHtml(html);
    }

    /**
     * @override
     */
    display() { };

    /**
     * @override
     */
    unpost() {
      super.unpost();
      this.element.unpost();
    }

    /**
     * @override
     */
    keydown(event: KeyboardEvent) {
      this.bubbleKey();
      super.keydown(event);
    }

    /**
     * @override
     */
    space(event: KeyboardEvent) {
      this.unpost();
      this.stop(event);
    }

    /**
     * @override
     */
    mousedown(event: MouseEvent) {
      this.unpost();
      this.stop(event);
    }

  }

}
