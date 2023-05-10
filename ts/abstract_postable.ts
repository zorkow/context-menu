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
 * @file Abstract class of context menus.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { MenuElement } from './menu_element.js';
import { Postable } from './postable.js';

export abstract class AbstractPostable extends MenuElement implements Postable {
  private posted = false;

  /**
   * @override
   */
  public isPosted() {
    return this.posted;
  }

  /**
   * @override
   */
  public post(x?: number, y?: number) {
    if (this.posted) {
      return;
    }
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
      this.html.setAttribute('style', 'left: ' + x + 'px; top: ' + y + 'px;');
    }
    this.display();
    this.posted = true;
  }

  /**
   * @override
   */
  public unpost(): void {
    if (!this.posted) {
      return;
    }
    const html = this.html;
    if (html.parentNode) {
      html.parentNode.removeChild(html);
    }
    this.posted = false;
  }

  /**
   * Displays the element on screen.
   */
  protected abstract display(): void;
}
