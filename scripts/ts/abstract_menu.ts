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
 * @fileoverview Abstract class of context menus.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/// <reference path="menu_element.ts" />


namespace ContextMenu {

  export class AbstractMenu implements Menu {

    private items: Item[] = [];
    private focused: Item;

    /**
     * @override
     */
    getItems(): Item[] {
      return this.items;
    };

    /**
     * @override
     */
    getFocused(): Item {
      return this.focused;
    }

    /**
     * @override
     */
    setFocused(item: Item) {
      this.focused = item;
    }

    /**
     * @override
     */
    up(event: KeyboardEvent): void {
      if (!this.focused) {
        this.focused = this.items[this.items.length - 1];
      }
      let index = this.items.indexOf(this.focused);
      
    };

    /**
     * @override
     */
    down(event: KeyboardEvent): void {
      if (!this.focused) {
        this.focused = this.items[0];
      }
    };

  }
}
