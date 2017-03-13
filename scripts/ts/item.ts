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
 * @fileoverview Interface specification for menu entries that have content and
 *     that are navigatable.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/// <reference path="element.ts" />
/// <reference path="entry.ts" />

namespace ContextMenu {

  export interface Item extends Entry, Element {

    /**
     * @return {string} The content message of this item.
     */
    getContent(): string;

    /**
     * @return {string} The id of this item.
     */
    getId(): string;

    /**
     * Pressing the menu item.
     */
    press(): void;

    /**
     * Setting focus to the menu item.
     */
    focus(): void;

    /**
     * Unfocusing the menu item.
     */
    unfocus(): void;

    /**
     * Disable item by greying it out.
     */
    disable(): void;

    /**
     * Enable item.
     */
    enable(): void;

  }

}
