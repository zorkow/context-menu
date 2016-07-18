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
 * @fileoverview Interface definition for mouse navigatable menu elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

namespace ContextMenu {

  /**
   * Mouse events.
   * @enum {string} 
   */
  export let MOUSE = {
    CLICK: 'click',
    DBLCLICK: 'dblclick',
    DOWN: 'mousedown',
    UP: 'mouseup',
    OVER: 'mouseover',
    OUT: 'mouseout',
    MOVE: 'mousemove',
    SELECTSTART: 'selectstart', // IE, Safari, Chrome
    SELECTEND: 'selectend', // IE, Safari, Chrome
  };


  export interface MouseNavigatable {


    /**
     * Navigation selection on mouse down events.
     * @param {MouseEvent} event The mouse event that fired.
     */
    mousedown(event: MouseEvent): void;

    /**
     * Navigation selection on mouse up events.
     * @param {MouseEvent} event The mouse event that fired.
     */
    mouseup(event: MouseEvent): void;

    /**
     * Navigation selection on mouse over events.
     * @param {MouseEvent} event The mouse event that fired.
     */
    mouseover(event: MouseEvent): void;
    
    /**
     * Navigation selection on mouse out events.
     * @param {MouseEvent} event The mouse event that fired.
     */
    mouseout(event: MouseEvent): void;

    /**
     * Navigation on mouse click events.
     * @param {MouseEvent} event The mouse event that fired.
     */
    click(event: MouseEvent): void;

  }

}
