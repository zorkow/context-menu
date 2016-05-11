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
 * @fileoverview Singleton class for HTML class prefixes.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


namespace ContextMenu {

  export class ClassPrefix {

    private static instance: ClassPrefix = new ClassPrefix();
    private prefix: string = '';

    constructor() {
      if (ClassPrefix.instance) {
        throw new Error('Error: Can not instantiate a singleton class!');
      }
      ClassPrefix.instance = this;
    }

    static getInstance(): ClassPrefix {
      return ClassPrefix.instance;
    }

    getPrefix(): string {
      return this.prefix;
    }

    setPrefix(prefix: string): void {
      this.prefix = prefix;
    }

    static addPrefix(className: string): string {
      return ClassPrefix.getInstance().getPrefix() + '_' + className;
    }

  }
}
