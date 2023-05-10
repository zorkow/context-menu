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
 * @file Class of popup windows. Each object can actually spawn multiple
 *      windows.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import {ContextMenu} from './context_menu.js';
import {AbstractPostable} from './abstract_postable.js';


export class Popup extends AbstractPostable {

  private static popupSettings: {[id: string]: (string | number)} = {
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
  };
  private menu: ContextMenu;
  private content: Function;

  /**
   * The last opened window.
   * @type {Window}
   */
  private window: Window = null;

  private localSettings: {[id: string]: (string | number)} = {
    left: Math.round((screen.width - 400) / 2),
    top:  Math.round((screen.height - 300) / 3)
  };

  /**
   * The list of all windows opened by this object.
   * @type {Array.<Window>}
   */
  private windowList: Window[] = [];

  private mobileFlag = false;
  private active: HTMLElement = null;

  /**
   * Parses a JSON respresentation of the .
   * @param json The JSON object to parse.
   */
  public static fromJson() {
  }

  /**
   * @class
   * @augments {AbstractPostable}
   * @param title The title of the popup window.
   * @param content Function generating the content.
   */
  constructor(private title: string, content: Function) {
    super();
    this.content = content || function() { return ''; };
  }

  /**
   * Attaches the widget to a context menu.
   * @param menu The parent menu.
   */
  public attachMenu(menu: ContextMenu): void {
    this.menu = menu;
  }

  /**
   * @override
   */
  public post() {
    this.display();
  }

  /**
   * @override
   */
  protected display() {
    this.active = this.menu.store.active;
    const settings: string[] = [];
    for (const setting in Popup.popupSettings) {
      settings.push(setting + '=' + Popup.popupSettings[setting]);
    }
    for (const setting in this.localSettings) {
      settings.push(setting + '=' + this.localSettings[setting]);
    }
    this.window = window.open('', '_blank', settings.join(','));
    this.windowList.push(this.window);
    const doc = this.window.document;
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

  /**
   * @override
   */
  public unpost() {
    this.windowList.forEach(x => x.close());
    this.window = null;
  }

  /**
   * Generates the content of the window.
   * @returns {string} The generated content.
   */
  private generateContent(): string {
    return this.content(this.active);
  }

  /**
   * Resizes the window so it fits snuggly around the content.
   * @private
   */
  private resize(): void {
    const table = this.window.document.body.firstChild as HTMLElement;
    let H = (this.window.outerHeight - this.window.innerHeight) || 30;
    let W = (this.window.outerWidth - this.window.innerWidth) || 30;
    W = Math.max(140, Math.min(Math.floor(.5 * this.window.screen.width),
                               table.offsetWidth + W + 25));
    H = Math.max(40, Math.min(Math.floor(.5 * this.window.screen.height),
                              table.offsetHeight + H + 25));
    this.window.resizeTo(W, H);
    const bb = this.active.getBoundingClientRect();
    if (bb) {
      const x = Math.max(0, Math.min(bb.right - Math.floor(W / 2),
                                   this.window.screen.width - W - 20));
      const y = Math.max(0, Math.min(bb.bottom - Math.floor(H / 2),
                                   this.window.screen.height - H - 20));
      this.window.moveTo(x, y);
    }
    this.active = null;
  }

  /**
   * @returns {JSON} The object in JSON.
   */
  public toJson() {
    return {type: ''
           };
  }

}
