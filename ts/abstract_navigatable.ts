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
 * @file Abstract class of navigatable menu elements.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {KEY, KeyNavigatable} from './key_navigatable.js';
import {MOUSE, MouseNavigatable} from './mouse_navigatable.js';


export abstract class AbstractNavigatable implements
KeyNavigatable, MouseNavigatable {

  private bubble = false;

  /**
   * Bubble this key event.
   */
  public bubbleKey(): void {
    this.bubble = true;
  }

  /**
   * @override
   */
  public keydown(event: KeyboardEvent): void {
    switch (event.keyCode) {
    case KEY.ESCAPE:
      this.escape(event);
      break;
    case KEY.RIGHT:
      this.right(event);
      break;
    case KEY.LEFT:
      this.left(event);
      break;
    case KEY.UP:
      this.up(event);
      break;
    case KEY.DOWN:
      this.down(event);
      break;
    case KEY.RETURN:
    case KEY.SPACE:
      this.space(event);
      break;
    default:
      return;
    }
    this.bubble ? this.bubble = false : this.stop(event);
  }

  /**
   * @override
   */
  public escape(_event: KeyboardEvent): void {}

  /**
   * @override
   */
  public space(_event: KeyboardEvent): void {}

  /**
   * @override
   */
  public left(_event: KeyboardEvent): void {}

  /**
   * @override
   */
  public right(_event: KeyboardEvent): void {}

  /**
   * @override
   */
  public up(_event: KeyboardEvent): void {}

  /**
   * @override
   */
  public down(_event: KeyboardEvent): void {}

  /**
   * Stops event propagation and bubbling.
   * @param {Event} event The keyboard event that fired.
   */
  protected stop(event: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
      event.cancelBubble = true;
    }
  }

  /**
   * @override
   */
  public mousedown(event: MouseEvent): void {
    return this.stop(event);
  }

  /**
   * @override
   */
  public mouseup(event: MouseEvent): void {
    return this.stop(event);
  }

  /**
   * @override
   */
  public mouseover(event: MouseEvent): void {
    return this.stop(event);
  }

  /**
   * @override
   */
  public mouseout(event: MouseEvent): void {
    return this.stop(event);
  }

  /**
   * @override
   */
  public click(event: MouseEvent): void {
    return this.stop(event);
  }

  /**
   * Adds navigation events to an HTML element.
   * @param {HTMLElement} element The HTML element for navigation.
   */
  public addEvents(element: HTMLElement): void {
    element.addEventListener(MOUSE.DOWN, this.mousedown.bind(this));
    element.addEventListener(MOUSE.UP, this.mouseup.bind(this));
    element.addEventListener(MOUSE.OVER, this.mouseover.bind(this));
    element.addEventListener(MOUSE.OUT, this.mouseout.bind(this));
    element.addEventListener(MOUSE.CLICK, this.click.bind(this));
    element.addEventListener('keydown', this.keydown.bind(this));
    element.addEventListener('dragstart', this.stop.bind(this));
    element.addEventListener(MOUSE.SELECTSTART, this.stop.bind(this));
    element.addEventListener('contextmenu', this.stop.bind(this));
    element.addEventListener(MOUSE.DBLCLICK, this.stop.bind(this));
  }
}
