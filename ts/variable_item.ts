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
 * @file Interface for menu items with variable attachment.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

export interface VariableItem {
  //// TODO: Add level of abstraction for items with variable dependency.
  /**
   * Registers item with variable.
   */
  register(): void;

  /**
   * Unregisters item from variable.
   */
  unregister(): void;

  /**
   * Updates the item on variable change.
   */
  update(): void;
}
