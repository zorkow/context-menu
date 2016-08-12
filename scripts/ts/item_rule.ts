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
 * @fileoverview Class of separator items.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/// <reference path="abstract_entry.ts" />

namespace ContextMenu {

  export class Rule extends AbstractEntry {

    className = HtmlClasses['MENUITEM'];
    role = 'separator';

    /**
     * @constructor
     * @extends {AbstractItem}
     * @param {Menu} menu The context menu or sub-menu the item belongs to.
     */
    constructor(menu: Menu) {
      super(menu, 'rule');
    }

    /**
     * @override
     */
    generateHtml() {
      super.generateHtml();
      let html = this.getHtml();
      html.classList.add(HtmlClasses['MENURULE']);
      html.setAttribute('aria-orientation', 'vertical');
    }

    /**
     * @override
     */
    addEvents(element: HTMLElement) { }

    /**
     * Parses a JSON respresentation of a rule item.
     * @param {JSON} json The empty JSON object.
     * @param {Menu} menu The menu the item is attached to.
     * @return {Rule} The new rule object.
     */
    static parse({}, menu: Menu): Rule {
      return new Rule(menu);
    }
    
  }

}
