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
 * @fileoverview Abstract class of menu elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/// <reference path="abstract_navigatable.ts" />
/// <reference path="class_prefix.ts" />


namespace ContextMenu {

  export class MenuElement extends AbstractNavigatable {

    private html: HTMLElement;

    constructor(className: string, role: string) {
      super();
      //// TODO: Make this DOM independent!
      this.html = document.createElement('div');
      this.html.classList.add(ClassPrefix.addPrefix(className));
      this.html.setAttribute('role', role);
    }

    addAttributes(attributes: {[attr: string]: string}): void {
      for (let attr in attributes) {
        this.html.setAttribute(attr, attributes[attr]);
      }
    }

  }
}

