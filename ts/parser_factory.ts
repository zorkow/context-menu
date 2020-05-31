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
 * @fileoverview Parser factory for menu elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


export type ParseMethod = (json: any, ...aux: any[]) => any;

export namespace ParserFactory {

  const parser = new Map<string, ParseMethod>();

  export function get(name: string) {
    return parser.get(name);
  }

  export function add(name: string, method: ParseMethod) {
    parser.set(name, method);
  }

}
