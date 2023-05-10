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
 * @file Interface definition for touch navigatable menu elements.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */


/**
 * Touch events.
 * @enum {string}
 */
export const TOUCH = {
  START: 'touchstart',
  MOVE: 'touchmove',
  END: 'touchend',
  CANCEL: 'touchcancel'
};


export interface TouchNavigatable {

  /**
   * Navigation selection on keyboard events.
   * @param event The keyboard event that fired.
   */
  touchstart(event: TouchEvent): void;

  /**
   * Navigation on escape key pressed.
   * @param event The keyboard event that fired.
   */
  touchmove(event: TouchEvent): void;

  /**
   * Navigation on space key pressed.
   * @param event The keyboard event that fired.
   */
  touchend(event: TouchEvent): void;

  /**
   * Navigation on left arrow key pressed.
   * @param event The keyboard event that fired.
   */
  touchcancel(event: TouchEvent): void;

}
