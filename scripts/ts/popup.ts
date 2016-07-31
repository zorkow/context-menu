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
/// <reference path="context_menu.ts" />
/// <reference path="html_classes.ts" />

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

    constructor(title: string, content: Function, signature: string) {
      super();
      this.title = title;
      this.content = content;
      this.signature = signature;
    }

    /**
     * Attaches the widget to a context menu.
     * @param {ContextMenu} menu The parent menu.
     */
    attachMenu(menu: ContextMenu): void {
      this.menu = menu;
    }

    /**
     * @override
     */
    getHtml() {
      let html = super.getHtml();
      this.contentDiv.innerHTML = this.content();
      return html;
    }

    /**
     * @override
     */
    generateHtml() {
      super.generateHtml();
      let html = this.getHtml();
      html.appendChild(this.generateTitle());
      html.appendChild(this.contentDiv);
      html.appendChild(this.generateSignature());
      html.appendChild(this.close.getHtml());
      html.setAttribute('tabindex', '0');
    }

    /**
     * @return {CloseButton} The close button for the widget.
     */
    private generateClose(): CloseButton {
      let close = new CloseButton(this);
      let html = close.getHtml();
      html.classList.add(HtmlClasses['POPUPCLOSE']);
       html.setAttribute('aria-label', 'Close Dialog Box');
      return close;
    }

    /**
     * @return {HTMLElement} The title element of the widget.
     */
    private generateTitle(): HTMLElement {
      let span = document.createElement('span');
      span.innerHTML = this.title;
      span.classList.add(HtmlClasses['POPUPTITLE']);
      return span;
    }

    /**
     * @return {HTMLElement} The basic content element of the widget. The actual
     *     content is regenerated and attached during posting.
     */
    private generateContent(): HTMLElement {
      let div = document.createElement('div');
      div.classList.add(HtmlClasses['POPUPCONTENT']);
      div.setAttribute('tabindex', '0');
      return div;
    }

    /**
     * @return {HTMLElement} The signature element of the widget.
     */
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
      super.post(0, 0);
      //// TODO: There is potentially a bug in IE. Look into it.
      //  Look for MENU.prototype.msieAboutBug in MathMenu.js
      let doc = document.documentElement;
      let html = this.getHtml();
      let H = window.innerHeight || doc.clientHeight || doc.scrollHeight || 0;
      x = Math.floor((- html.offsetWidth) / 2);
      y = Math.floor((H - html.offsetHeight) / 3);
      this.getHtml().setAttribute(
          'style', 'margin-left: ' + x + 'px; top: ' + y + 'px;');
      html.focus();
    }

    /**
     * @override
     */
    display() {
      this.menu.registerWidget(this);
      let html = this.menu.getHtml();
      html.parentNode.removeChild(html);
      this.menu.getFrame().appendChild(this.getHtml());
    }

    /**
     * @override
     */
    click(event: MouseEvent): void { }

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
    escape(event: KeyboardEvent): void {
      this.unpost();
    }

    /**
     * @override
     */
    unpost() {
      super.unpost();
      this.getHtml().classList.remove(HtmlClasses['MOUSEPOST']);
      this.menu.unregisterWidget(this);
    }

    /**
     * @override
     */
    mouseup(event: MouseEvent) {
      this.getHtml().classList.add(HtmlClasses['MOUSEPOST']);
      super.mouseup(event);
    }

  }

}
