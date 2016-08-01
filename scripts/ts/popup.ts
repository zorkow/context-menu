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
 * @fileoverview Class of popup windows.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

/// <reference path="context_menu.ts" />
/// <reference path="menu_util.ts" />

namespace ContextMenu {

  export class Popup {

    static popupSettings: {[id: string]: (string | number)} = {
        status: 'no',
        toolbar: 'no',
        locationbar: 'no',
        menubar: 'no',
        directories: 'no',
        personalbar: 'no',
        resizable: 'yes',
        scrollbars: 'yes',
        width: 400,
        height: 300,
        left: Math.round((screen.width - 400) / 2),
        top:  Math.round((screen.height - 300) / 3)
      };
    private menu: ContextMenu;
    private title: string = '';
    private content: Function = function() { return ''; };
    private window: Window = null;
    mobileFlag = false;
    private active: HTMLElement = null;

    constructor(title: string, content: Function) {
      this.title = title;
      this.content = content;
    }

    /**
     * Attaches the widget to a context menu.
     * @param {ContextMenu} menu The parent menu.
     */
    attachMenu(menu: ContextMenu): void {
      this.menu = menu;
    }

    post(): void {
      this.active = this.menu.getStore().getActive();
      let settings: string[] = [];
      for (let setting in Popup.popupSettings) {
        settings.push(setting + '=' + Popup.popupSettings[setting]);
      }
      this.window = window.open('', '_blank', settings.join(','));
      let doc = this.window.document;
      //// TODO: Work on mobile windows.
      if (this.mobileFlag) {
        doc.open();
        doc.write('<html><head><meta name="viewport" ' +
                  'content="width=device-width, initial-scale=1.0" /><title>' +
                  this.title +
                  '</title></head><body style="font-size:85%">');
        doc.write('<pre>' + this.generateContent() + '</pre>');
        doc.write('<hr><input type="button" value="' +
                  //// TODO: Localise
                  'Close' + '" onclick="window.close()" />');
        doc.write('</body></html>');
        doc.close();
      } else {
        doc.open();
        doc.write('<html><head><title>' + this.title +
                  '</title></head><body style="font-size:85%">');
        doc.write('<table><tr><td><pre>' + this.generateContent() +
                  '</pre></td></tr></table>');
        doc.write('</body></html>');
        doc.close();
        setTimeout(this.resize.bind(this), 50);
      }
    }

    generateContent(): string {
      return this.content(this.active);
    }

    resize() {
      let table = <HTMLElement>this.window.document.body.firstChild;
      let H = (this.window.outerHeight - this.window.innerHeight) || 30;
      let W = (this.window.outerWidth - this.window.innerWidth) || 30;
      W = Math.max(140, Math.min(Math.floor(.5 * screen.width),
                                 table.offsetWidth + W + 25));
      H = Math.max(40, Math.min(Math.floor(.5 * screen.height),
                                table.offsetHeight + H + 25));
      this.window.resizeTo(W, H);
      let bb = this.active.getBoundingClientRect();
      if (bb) {
        let x = Math.max(0, Math.min(bb.right - Math.floor(W / 2),
                                 screen.width - W - 20));
        let y = Math.max(0, Math.min(bb.bottom - Math.floor(H / 2),
                                 screen.height - H - 20));
        this.window.moveTo(x, y);
      }
      this.active = null;
    }

  }

}
