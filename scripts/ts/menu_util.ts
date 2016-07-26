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
     * Makes menu from a JSON representation. 
     * @param {Object} json The JSON object.
     * @return {?Menu} The menu if it could be constructed.
     */
    export function parse(json: Object): Menu {
      let menu = new ContextMenu();
      return menu;
    }

    /**
     * Translates a menu into JSON representation.
     * @param {Menu} menu A menu object.
     * @return {Object} A JSON version of the menu.
     */
    export function jsonify(menu: Menu): Object {
      return {};
    }

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

    // error for debug mode.
    export function error(error: Error, msg: string): void {
      console.log('ContextMenu Error: ' + msg);
    }

    let count = 0;
    export function counter(): number {
      return count++;
    }

  }
}
