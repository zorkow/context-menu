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

/// <reference path="close_button.ts" />
/// <reference path="css_util.ts" />

namespace ContextMenu {

  export class Popup extends AbstractPostable {

    menu: ContextMenu;
    title: string = '';
    signature: string = '';
    content: Function = function() { return ''; };
    contentDiv: HTMLElement = this.generateContent();
    close: CloseButton = this.generateClose();
    className = HtmlClasses['POPUP'];
    role = 'dialog';

    constructor(menu: ContextMenu,
                title: string, content: Function, signature: string) {
      super();
      this.menu = menu;
      this.title = title;
      this.content = content;
      this.signature = signature;
    }


    getHtml() {
      let html = super.getHtml();
      this.contentDiv.innerHTML = this.content();
      return html;
    }

    generateHtml() {
      super.generateHtml();
      let html = this.getHtml();
      html.appendChild(this.generateTitle());
      html.appendChild(this.contentDiv);
      html.appendChild(this.generateSignature());
      html.appendChild(this.close.getHtml());
      html.setAttribute('tabindex', '0');
      this.setHtml(html);
    }

    private generateClose(): CloseButton {
      let close = new CloseButton(this);
      let html = close.getHtml();
      html.classList.add(HtmlClasses['POPUPCLOSE']);
       html.setAttribute('aria-label', 'Close Dialog Box');
      return close;
    }

    private generateTitle(): HTMLElement {
      let span = document.createElement('span');
      span.innerHTML = this.title;
      span.classList.add(HtmlClasses['POPUPTITLE']);
      return span;
    }

    private generateContent(): HTMLElement {
      let div = document.createElement('div');
      div.classList.add(HtmlClasses['POPUPCONTENT']);
      div.setAttribute('tabindex', '0');
      return div;
    }

    private generateSignature(): HTMLElement {
      let span = document.createElement('span');
      span.innerHTML = this.signature;
      span.classList.add(HtmlClasses['POPUPSIGNATURE']);
      return span;
    }

    /**
     * @override
     */
    post(x: number, y: number) {
      let doc = document.documentElement;
      let H = window.innerHeight || doc.clientHeight || doc.scrollHeight || 0;
      let W = window.innerWidth || doc.clientWidth || doc.scrollWidth || 0;

      //// TODO: There is potentially a bug in IE. Look into it.
      //  Look for MENU.prototype.msieAboutBug in MathMenu.js

      let html = this.getHtml();
      x = Math.floor((W - html.offsetWidth) / 4);
      y = Math.floor((H - html.offsetHeight) / 3);
      super.post(x, y);
    }

    display() {
      let html = this.menu.getHtml();
      html.parentNode.removeChild(html);

      this.menu.getFrame().appendChild(this.getHtml());
    }

    unpost() {
      super.unpost();
      this.menu.unpost();
    }

  }

}
