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


namespace ContextMenu {

  class MenuUtil {

    /**
     * Makes menu from a JSON representation. 
     * @param {Object} json The JSON object.
     * @return {?Menu} The menu if it could be constructed.
     */
    parser(json: Object): Menu {
      let menu = new ContextMenu();
      console.log('Parsing Menu');
      return menu;
    }

    /**
     * Translates a menu into JSON representation.
     * @param {Menu} menu A menu object.
     * @return {Object} A JSON version of the menu.
     */
    jsonify(menu: Menu): Object {
      console.log('Parsing Menu');
      return {};
    }
  }
}


