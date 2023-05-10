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
 * @file Class of separator items.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {AbstractEntry} from './abstract_entry.js';
import {Menu} from './menu.js';
import {HtmlClasses} from './html_classes.js';
import {ParserFactory} from './parser_factory.js';


export class Rule extends AbstractEntry {

  /**
   * @override
   */
  protected className = HtmlClasses['MENUITEM'];

  /**
   * @override
   */
  protected role = 'separator';

  /**
   * Parses a JSON respresentation of the .
   * @param {JSON} json The JSON object to parse.
   * @param _factory
   * @param {Menu} menu The menu for the rule.
   * @returns {Rule} The new rule.
   */
  public static fromJson(_factory: ParserFactory, {}: {}, menu: Menu) {
    return new this(menu);
  }

  /**
   * @class
   * @augments {AbstractItem}
   * @param {Menu} menu The context menu or sub-menu the item belongs to.
   */
  constructor(menu: Menu) {
    super(menu, 'rule');
  }

  /**
   * @override
   */
  public generateHtml() {
    super.generateHtml();
    const html = this.html;
    html.classList.add(HtmlClasses['MENURULE']);
    html.setAttribute('aria-orientation', 'vertical');
  }

  /**
   * @override
   */
  public addEvents(_element: HTMLElement) { }

  /**
   * @returns {JSON} The object in JSON.
   */
  public toJson() {
    return {type: 'rule'};
  }

}
