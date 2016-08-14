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
 * @fileoverview Utility class for menu handling.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/// <reference path="context_menu.ts" />
/// <reference path="item.ts" />
/// <reference path="menu.ts" />
/// <reference path="sub_menu.ts" />


namespace ContextMenu {

  export namespace MenuUtil {

    /**
     * Closes the entire context menu.
     * @param {Item} item The item on which the menu close is called.
     */
    export function close(item: Item): void {
      let menu = item.getMenu();
      if (menu instanceof SubMenu) {
        menu.baseMenu.unpost();
      } else {
        menu.unpost();
      }
    }

    /**
     * Retrieves the currently active element of the overall context menu.
     * @param {Item} item The item on which the last call was made.
     * @return {HtmlElement} The currently active element.
     */
    export function getActiveElement(item: Item): HTMLElement {
      let menu = item.getMenu();
      let baseMenu = menu instanceof SubMenu ?
        menu.baseMenu : <ContextMenu>menu;
      return baseMenu.getStore().getActive();
    }

    /**
     * Error function for controlled exceptions.
     * @param {Error} error The thrown error, containing the stack trace.
     * @param {string} msg The message to be signalled.
     */
    export function error(error: Error, msg: string): void {
      console.log('ContextMenu Error: ' + msg);
    }

    /**
     * @return {number} A global, increasing unique counter.
     */
    export function counter(): number {
      return count++;
    }
    let count = 0;

  }

}
