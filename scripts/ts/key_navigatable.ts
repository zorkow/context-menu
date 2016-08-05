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
 * @fileoverview Interface definition for key navigatable menu elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

namespace ContextMenu {

  /**
   * Key codes.
   * @enum {number} 
   */
  export enum KEY {
    RETURN = 13,
    ESCAPE = 27,
    SPACE = 32,
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40
  };


  export interface KeyNavigatable {

    /**
     * Navigation selection on keyboard events.
     * @param {KeyboardEvent} event The keyboard event that fired.
     */
    keydown(event: KeyboardEvent): void;

    /**
     * Navigation on escape key pressed.
     * @param {KeyboardEvent} event The keyboard event that fired.
     */
    escape(event: KeyboardEvent): void;

    /**
     * Navigation on space key pressed.
     * @param {KeyboardEvent} event The keyboard event that fired.
     */
    space(event: KeyboardEvent): void;

    /**
     * Navigation on left arrow key pressed.
     * @param {KeyboardEvent} event The keyboard event that fired.
     */
    left(event: KeyboardEvent): void;

    /**
     * Navigation on right arrow key pressed.
     * @param {KeyboardEvent} event The keyboard event that fired.
     */
    right(event: KeyboardEvent): void;

    /**
     * Navigation on upwards arrow key pressed.
     * @param {KeyboardEvent} event The keyboard event that fired.
     */
    up(event: KeyboardEvent): void;

    /**
     * Navigation on downwards arrow key pressed.
     * @param {KeyboardEvent} event The keyboard event that fired.
     */
    down(event: KeyboardEvent): void;

  }

}
