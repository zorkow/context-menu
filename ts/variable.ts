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


import {VariableItem} from './variable_item.js';
import {MenuUtil} from './menu_util.js';
import {Checkbox} from './item_checkbox.js';
import {Radio} from './item_radio.js';
import {VariablePool} from './variable_pool.js';
import {ParserFactory} from './parser_factory.js';


export class Variable<T> {

  private items: VariableItem[] = [];

  /**
   * Parses a JSON respresentation of a variable and inserts it into the
   * variable pool of the context menu.
   * @param {JSON} json The JSON object to parse.
   * @param {VariablePool<string|boolean>} pool The variable pool to insert.
   */
  public static fromJson(
    _factory: ParserFactory,
    {name: name, getter: getter, setter: setter}:
    {name: string, getter: () => string | boolean,
     setter: (x: (string | boolean)) => void},
    pool: VariablePool<string|boolean>) {
    const variable = new this(name, getter, setter);
    pool.insert(variable);
  }

  /**
   * @constructor
   * @template T
   * @param {string} name The variable name.
   * @param {function(T)} getter It's initial value.
   * @param {function(T)} callback Function to call when value is changed.
   */
  constructor(private _name: string,
              private getter: (node?: HTMLElement) => T,
              private setter: (x: T, node?: HTMLElement) => void) { }

  /**
   * @return {string} The name of the variable.
   */
  public get name() {
    return this._name;
  }

  /**
   * Execute getter callback to retrieve the current value of the variable.
   * @return {T} The value of the variable.
   */
  public getValue(node?: HTMLElement) {
    try {
      return this.getter(node);
    } catch (e) {
      MenuUtil.error(e, 'Command of variable ' + this.name + ' failed.');
      return null;
    }
  }

  //// TODO: Add accessors for callback.
  // Possibly put in some messaging service for menu item selected.
  /**
   * Sets new variable value. If different from old one it will execute the
   * callback.
   * @param {T} value New value of the variable.
   */
  public setValue(value: T, node?: HTMLElement) {
    try {
      this.setter(value, node);
    } catch (e) {
      MenuUtil.error(e, 'Command of variable ' + this.name + ' failed.');
    }
    this.update();
  }

  /**
   * Registers a new item that has this variable.
   * @param {VariableItem} item The new variable item.
   */
  public register(item: VariableItem): void {
    if (this.items.indexOf(item) === -1) {
      this.items.push(item);
    }
  }

  /**
   * Unregisters an item for this variable.
   * @param {VariableItem} item The old variable item.
   */
  public unregister(item: VariableItem): void {
    let index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  /**
   * Updates the items belonging to the variable.
   */
  public update(): void {
    this.items.forEach(x => x.update());
  }

  /**
   * Registers a callback function with all items associated to this variable.
   * @param {Function} func Callback that does not take any arguments.
   * @final
   */
  public registerCallback(func: Function) {
    this.items.forEach(x => (x as Radio|Checkbox).registerCallback(func));
  }

  /**
   * Removes a callback function from all items associated to this variable.
   * @param {Function} func Callback that does not take any arguments.
   * @final
   */
  public unregisterCallback(func: Function) {
    this.items.forEach(x => (x as Radio|Checkbox).unregisterCallback(func));
  }

  /**
   * The variable object in JSON. Note, that the getter and setter methods will
   * be strings.
   * @return {JSON} The JSON object.
   */
  public toJson() {
    return {type: 'variable',
            name: this.name,
            getter: this.getter.toString(),
            setter: this.setter.toString()};
  }

}
