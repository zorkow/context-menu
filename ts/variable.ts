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
 * @file Generic class for keeping menu variables together with callback
 *     functions to hook into third party libraries.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Item } from './item.js';
import { VariableItem } from './variable_item.js';
import { MenuUtil } from './menu_util.js';
import { Checkbox } from './item_checkbox.js';
import { Radio } from './item_radio.js';
import { VariablePool } from './variable_pool.js';
import { ParserFactory } from './parser_factory.js';

export class Variable<T> {
  private items: VariableItem[] = [];

  /**
   * Parses a JSON respresentation of a variable and inserts it into the
   * variable pool of the context menu.
   * @param _factory The parser factory.
   * @param variable The variable definition.
   * @param variable.name The name of the variable.
   * @param variable.getter The getter function for the variable.
   * @param variable.setter The setter function for the variable.
   * @param pool The variable pool to insert.
   */
  public static fromJson(
    _factory: ParserFactory,
    {
      name,
      getter,
      setter
    }: {
      name: string;
      getter: () => string | boolean;
      setter: (x: string | boolean) => void;
    },
    pool: VariablePool<string | boolean>
  ) {
    const variable = new this(name, getter, setter);
    pool.insert(variable);
  }

  /**
   * @class
   * @template T
   * @param _name The variable name.
   * @param getter The getter function for the variable.
   * @param setter The setter function for the variable.
   */
  constructor(
    private _name: string,
    private getter: (node?: HTMLElement) => T,
    private setter: (x: T, node?: HTMLElement) => void
  ) {}

  /**
   * @returns The name of the variable.
   */
  public get name() {
    return this._name;
  }

  /**
   * Execute getter callback to retrieve the current value of the variable.
   * @param node The item node if there is one.
   * @returns The value of the variable.
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
   * @param value New value of the variable.
   * @param node The item node if there is one.
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
   * @param item The new variable item.
   */
  public register(item: VariableItem): void {
    if (this.items.indexOf(item) === -1) {
      this.items.push(item);
    }
  }

  /**
   * Unregisters an item for this variable.
   * @param item The old variable item.
   */
  public unregister(item: VariableItem): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  /**
   * Updates the items belonging to the variable.
   */
  public update(): void {
    this.items.forEach((x) => x.update());
  }

  /**
   * Registers a callback function with all items associated to this variable.
   * @param func Callback that does not take any arguments.
   */
  public registerCallback(func: (value: Item) => void) {
    this.items.forEach((x) => (x as Radio | Checkbox).registerCallback(func));
  }

  /**
   * Removes a callback function from all items associated to this variable.
   * @param func Callback that does not take any arguments.
   */
  public unregisterCallback(func: (value: Item) => void) {
    this.items.forEach((x) => (x as Radio | Checkbox).unregisterCallback(func));
  }

  /**
   * The variable object in JSON. Note, that the getter and setter methods will
   * be strings.
   * @returns The JSON object.
   */
  public toJson() {
    return {
      type: 'variable',
      name: this.name,
      getter: this.getter.toString(),
      setter: this.setter.toString()
    };
  }
}
