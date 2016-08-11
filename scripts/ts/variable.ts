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


/// <reference path="variable_item.ts" />

namespace ContextMenu {

  export class Variable<T> {

    private name: string = '';
    private value: T;
    private callback: (x: T) => void;
    private items: VariableItem[] = [];


    /**
     * @constructor
     * @template T
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


    //// TODO: Add accessors for callback.
    // Possibly put in some messaging service for menu item selected.
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
      try {
        this.callback(value);
      } catch (e) {
        MenuUtil.error(e, 'Command of variable ' + this.name + ' failed.');
      }
      this.update();
    }

    /**
     * Registers a new item that has this variable.
     * @param {VariableItem} item The new variable item.
     */
    register(item: VariableItem): void {
      if (this.items.indexOf(item) === -1) {
        this.items.push(item);
      }
    }

    /**
     * Unregisters an item for this variable.
     * @param {VariableItem} item The old variable item.
     */
    unregister(item: VariableItem): void {
      let index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }

    /**
     * Updates the items belonging to the variable.
     */
    update(): void {
      this.items.forEach(x => x.update());
    }

    /**
     * Registers a callback function with all items associated to this variable.
     * @param {Function} func Callback that does not take any arguments.
     * @final
     */
    registerCallback(func: Function) {
      this.items.forEach(x => (<Radio | Checkbox>x).registerCallback(func));
    }

    /**
     * Removes a callback function from all items associated to this variable.
     * @param {Function} func Callback that does not take any arguments.
     * @final
     */
    unregisterCallback(func: Function) {
      this.items.forEach(x => (<Radio | Checkbox>x).unregisterCallback(func));
    }


  }
}
