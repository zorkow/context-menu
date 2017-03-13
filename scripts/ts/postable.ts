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
 * @fileoverview Interface specification for elements that are postable.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

namespace ContextMenu {

  export interface Postable {

    /**
     * @return {boolean} True if element is posted in the page.
     */
    isPosted(): boolean;

    /**
     * Posts the element.
     */
    post(): void;

    /**
     * Posts the element at the given coordinates.
     * @param {?number} x The x coordinate.
     * @param {?number} y The y coordinate.
     */
    post(x?: number, y?: number): void;

    /**
     * Removes element from page.
     */
    unpost(): void;

  }

}
