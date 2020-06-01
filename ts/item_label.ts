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
 * @fileoverview Class of labelled separator items.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {AbstractItem} from './abstract_item.js';
import {Menu} from './menu.js';
import {HtmlClasses} from './html_classes.js';
import {ParserFactory} from './parser_factory.js';


export class Label extends AbstractItem {

  /**
   * Parses a JSON respresentation of a label item.
   * @param {JSON} json The JSON object to parse.
   * @param {Menu} menu The menu the item is attached to.
   * @return {Label} The new label object.
   */
  public static fromJson(
    _factory: ParserFactory,
    {content: content, id: id}: {content: string, id: string},
    menu: Menu): Label {
    return new this(menu, content, id);
  }

  /**
   * @constructor
   * @extends {AbstractItem}
   * @param {Menu} menu The context menu or sub-menu the item belongs to.
   * @param {string} content The content of the menu item.
   * @param {string=} id Optionally the id of the menu item.
   */
  constructor(menu: Menu, content: string, id?: string) {
    super(menu, 'label', content, id);
  }

  /**
   * @override
   */
  public generateHtml() {
    super.generateHtml();
    let html = this.html;
    html.classList.add(HtmlClasses['MENULABEL']);
  }

  /**
   * @return {JSON} The object in JSON.
   */
  public toJson() {
    return {type: ''
           };
  }

}
