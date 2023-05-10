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
 * @file Utility class for menu handling.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {ContextMenu} from './context_menu.js';
import {Item} from './item.js';



/**
 * @namespace
 */
export namespace MenuUtil {

  /**
   * Closes the entire context menu.
   * @param item The item on which the menu close is called.
   */
  export function close(item: Item): void {
    const menu = item.menu;
    // TODO: Have baseMenu point to itself and simplify unposting.
    if (menu.baseMenu) {
      menu.baseMenu.unpost();
    } else {
      menu.unpost();
    }
  }

  /**
   * Retrieves the currently active element of the overall context menu.
   * @param item The item on which the last call was made.
   * @returns The currently active element.
   */
  export function getActiveElement(item: Item): HTMLElement {
    const menu = item.menu;
    const baseMenu = (menu.baseMenu ? menu.baseMenu : menu) as ContextMenu;
    return baseMenu.store.active;
  }

  /**
   * Error function for controlled exceptions.
   * @param error The thrown error, containing the stack trace.
   * @param _error
   * @param msg The message to be signalled.
   */
  export function error(_error: Error, msg: string): void {
    console.error('ContextMenu Error: ' + msg);
  }

  /**
   * @returns A global, increasing unique counter.
   */
  export function counter(): number {
    return count++;
  }
  let count = 0;

}
