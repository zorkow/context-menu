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
 * @fileoverview Abstract class of menu items.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

/// <reference path="abstract_entry.ts" />
/// <reference path="abstract_menu.ts" />
/// <reference path="item.ts" />
/// <reference path="menu.ts" />
/// <reference path="menu_util.ts" />


namespace ContextMenu {

  export abstract class AbstractItem extends AbstractEntry implements Item {
    private content: string;
    private id: string;
    protected disabled: boolean = false;

    /**
     * @constructor
     * @implements {Item}
     * @param {Menu} menu The context menu or sub-menu the item belongs to.
     * @param {string} type The type of the entry.
     * @param {string} content The content of the menu item.
     * @param {string=} id Optionally the id of the menu item.
     */
    constructor(menu: Menu, type: string, content: string, id?: string) {
      super(menu, type);
      this.content = content;
      this.id = id ? id : content;
    }

    /**
     * @return {string} The content of the item.
     */
    getContent() {
      return this.content;
    }

    /**
     * @return {string} The id of the item.
     */
    getId() {
      return this.id;
    }

   /**
    * @override
    */
    press() {
      if (!this.disabled) {
        this.executeAction();
      }
    }

    /**
     * Execute the item's action if it is not disabled.
     */
    protected executeAction() { }

    /**
     * @override
     */
    mousedown(event: MouseEvent) {
      this.press();
      this.stop(event);
    }

    /**
     * @override
     */
    mouseover(event: MouseEvent) {
      this.focus();
      this.stop(event);
    }

    /**
     * @override
     */
    mouseout(event: MouseEvent) {
      this.deactivate();
      this.stop(event);
    }

   /**
    * @override
    */
    generateHtml() {
      super.generateHtml();
      let html = this.getHtml();
      html.setAttribute('aria-disabled', 'false');
      html.textContent = this.content;
    }

    /**
     * Sets active style for item.
     */
    protected activate() {
      if (!this.disabled) {
        this.getHtml().classList.add(HtmlClasses['MENUACTIVE']);
      }
    }

    /**
     * Removes active style from item.
     */
    protected deactivate() {
      this.getHtml().classList.remove(HtmlClasses['MENUACTIVE']);
    }

    /**
     * @override
     */
    focus() {
      this.getMenu().setFocused(this);
      super.focus();
      this.activate();
    }

    /**
     * @override
     */
    unfocus() {
      this.deactivate();
      super.unfocus();
    }

    /**
     * @override
     */
    escape(event: KeyboardEvent) {
      MenuUtil.close(this);
    }

    /**
     * @override
     */
    up(event: KeyboardEvent) {
      (<AbstractMenu>this.getMenu()).up(event);
    }

    /**
     * @override
     */
    down(event: KeyboardEvent) {
      (<AbstractMenu>this.getMenu()).down(event);
    }

    //// TODO: RTL change of direction.
    /**
     * @override
     */
    left(event: KeyboardEvent) {
      if (this.getMenu() instanceof ContextMenu) {
        return;
      }
      let menu = <SubMenu>this.getMenu();
      menu.setFocused(null);
      menu.getAnchor().focus();
    }

    /**
     * @override
     */
    right(event: KeyboardEvent) {
      (<AbstractMenu>this.getMenu()).right(event);
    }

    /**
     * @override
     */
    space(event: KeyboardEvent): void {
      this.press();
    }

    /**
     * @override
     */
    disable(): void {
      this.disabled = true;
      let html = this.getHtml();
      html.classList.add(HtmlClasses['MENUDISABLED']);
      html.setAttribute('aria-disabled', 'true');
    }

    /**
     * @override
     */
    enable(): void {
      this.disabled = false;
      let html = this.getHtml();
      html.classList.remove(HtmlClasses['MENUDISABLED']);
      html.removeAttribute('aria-disabled');
    }

  }

}
