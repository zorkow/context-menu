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
 * @fileoverview Interface specification for menu entries.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/// <reference path="menu.ts" />

namespace ContextMenu {

  export interface Entry {

    /**
     * @return {Menu} The menu the entry belongs to.
     */
    getMenu(): Menu;

    /**
     * Sets the parent menu for this entry.
     * @param {Menu} menu The menu the entry is attached to.
     */
    setMenu(menu: Menu): void;

    /**
     * @return {string} The type of the entry.
     */
    getType(): string;

    /**
     * Hide entry in the menu.
     */
    hide(): void;

    /**
     * Show entry in the menu.
     */
    show(): void;

    /**
     * @return {boolean} Indicates if item is hidden from display.
     */
    isHidden(): boolean;

  }

}
