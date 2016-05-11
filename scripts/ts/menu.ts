/// <reference path="item.ts" />

namespace ContextMenu {

  export interface Menu {

    /**
     * Returns the items in that menu.
     * @return {Array.<Item>} The array of items.
     */
    getItems(): Item[];

    /**
     * Returns the currently focused Item.
     * @return {Item} The focused Item.
     */
    getFocused(): Item;

    /**
     * Sets the currently focused Item.
     * @param {Item} item The new focused Item.
     */
    setFocused(item: Item): void;

  }

}
