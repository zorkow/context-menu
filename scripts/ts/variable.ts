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
 * @fileoverview Generic class for keeping menu variables together with callback
 *     functions to hook into third party libraries.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


namespace ContextMenu {

  export class Variable<T> {

    private name: string = '';
    private value: T;
    private callback: (x: T) => void;


    /**
     * @constructor
     * @param {string} name The variable name.
     * @param {T} value It's initial value.
     * @param {function(T)} callback Function to call when value is changed.
     */
    constructor(name: string, value: T, callback: (x: T) => void) {
      this.name = name;
      this.value = value;
      this.callback = callback;
    }


    /**
     * @return {string} The name of the variable.
     */
    getName() {
      return this.name;
    };


    /**
     * @return {T} The value of the variable.
     */
    getValue() {
      return this.value;
    };


    /**
     * Sets new variable value. If different from old one it will execute the
     * callback.
     * @param {T} value New value of the variable.
     */
    setValue(value: T) {
      if (value === this.value) {
        return;
      }
      this.value = value;
      this.callback(value);
    };

  }
}