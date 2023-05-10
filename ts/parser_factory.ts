/*************************************************************
 *
 *  Copyright (c) 2020 The MathJax Consortium
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
 * @file Parser factory for menu elements.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


export type ParseMethod =
  (factory: ParserFactory, json: any, ...aux: any[]) => any;

export class ParserFactory {

  private _parser: Map<string, ParseMethod>;

  /**
   * @class
   * @param init Parse method mappings.
   */
  constructor(init: [string, ParseMethod][]) {
    this._parser = new Map<string, ParseMethod>(init);
  }

  /**
   * Gets a parse method by name.
   * @param name The type of parse method.
   * @returns The parse method if it exists.
   */
  public get(name: string): ParseMethod {
    return this._parser.get(name);
  }

  /**
   * Adds a parse method for a given type.
   * @param name The name of the type.
   * @param method The new method.
   */
  public add(name: string, method: ParseMethod) {
    this._parser.set(name, method);
  }

}
