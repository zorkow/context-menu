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
 * @file Class of labelled separator items.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { AbstractItem } from './abstract_item.js';
import { Menu } from './menu.js';
import { HtmlClasses } from './html_classes.js';
import { ParserFactory } from './parser_factory.js';

export class Label extends AbstractItem {
  /**
   * Parses a JSON respresentation of a label item.
   * @param _factory The parser factory.
   * @param json The JSON object to parse.
   * @param json.content The content of the label.
   * @param json.id The id of the item.
   * @param menu The menu the item is attached to.
   * @returns The new label object.
   */
  public static fromJson(
    _factory: ParserFactory,
    { content: content, id: id }: { content: string; id: string },
    menu: Menu
  ): Label {
    return new this(menu, content, id);
  }

  /**
   * @class
   * @augments {AbstractItem}
   * @param menu The context menu or sub-menu the item belongs to.
   * @param content The content of the menu item.
   * @param id Optionally the id of the menu item.
   */
  constructor(menu: Menu, content: string, id?: string) {
    super(menu, 'label', content, id);
  }

  /**
   * @override
   */
  public generateHtml() {
    super.generateHtml();
    const html = this.html;
    html.classList.add(HtmlClasses['MENULABEL']);
  }

  /**
   * @returns The object in JSON.
   */
  public toJson() {
    return { type: '' };
  }
}
