var Menu;
(function (Menu) {
    var AbstractItem = (function () {
        function AbstractItem(menu, role) {
            this.menu = menu;
            this.role = role;
        }
        AbstractItem.prototype.getMenu = function () {
            return this.menu;
        };
        AbstractItem.prototype.getRole = function () {
            return this.role;
        };
        return AbstractItem;
    })();
    Menu.AbstractItem = AbstractItem;
})(Menu || (Menu = {}));
var Menu;
(function (Menu) {
    (function (KEY) {
        KEY[KEY["RETURN"] = 13] = "RETURN";
        KEY[KEY["ESCAPE"] = 27] = "ESCAPE";
        KEY[KEY["SPACE"] = 32] = "SPACE";
        KEY[KEY["LEFT"] = 37] = "LEFT";
        KEY[KEY["UP"] = 38] = "UP";
        KEY[KEY["RIGHT"] = 39] = "RIGHT";
        KEY[KEY["DOWN"] = 40] = "DOWN";
    })(Menu.KEY || (Menu.KEY = {}));
    var KEY = Menu.KEY;
    ;
})(Menu || (Menu = {}));
var Menu;
(function (Menu) {
    var AbstractNavigatable = (function () {
        function AbstractNavigatable() {
        }
        AbstractNavigatable.prototype.keydown = function (event) {
            switch (event.keyCode) {
                case Menu.KEY.ESCAPE:
                    this.escape(event);
                    break;
                case Menu.KEY.RIGHT:
                    this.right(event);
                    break;
                case Menu.KEY.LEFT:
                    this.left(event);
                    break;
                case Menu.KEY.UP:
                    this.up(event);
                    break;
                case Menu.KEY.DOWN:
                    this.down(event);
                    break;
                case Menu.KEY.RETURN:
                case Menu.KEY.SPACE:
                    this.space(event);
                    break;
                default:
                    return;
                    break;
            }
            return this.stop(event);
        };
        ;
        AbstractNavigatable.prototype.escape = function (event) { };
        ;
        AbstractNavigatable.prototype.space = function (event) { };
        ;
        AbstractNavigatable.prototype.left = function (event) { };
        ;
        AbstractNavigatable.prototype.right = function (event) { };
        ;
        AbstractNavigatable.prototype.up = function (event) { };
        ;
        AbstractNavigatable.prototype.down = function (event) { };
        ;
        AbstractNavigatable.prototype.stop = function (event) {
            if (event) {
                event.stopPropagation();
                event.cancelBubble = true;
            }
        };
        ;
        return AbstractNavigatable;
    })();
    Menu.AbstractNavigatable = AbstractNavigatable;
})(Menu || (Menu = {}));
var Menu;
(function (Menu) {
    var ClassPrefix = (function () {
        function ClassPrefix() {
            this.prefix = '';
            if (ClassPrefix.instance) {
                throw new Error('Error: Can not instantiate a singleton class!');
            }
            ClassPrefix.instance = this;
        }
        ClassPrefix.getInstance = function () {
            return ClassPrefix.instance;
        };
        ClassPrefix.prototype.getPrefix = function () {
            return this.prefix;
        };
        ClassPrefix.prototype.setPrefix = function (prefix) {
            this.prefix = prefix;
        };
        ClassPrefix.addPrefix = function (className) {
            return ClassPrefix.getInstance().getPrefix() + '_' + className;
        };
        ClassPrefix.instance = new ClassPrefix();
        return ClassPrefix;
    })();
    Menu.ClassPrefix = ClassPrefix;
})(Menu || (Menu = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Menu;
(function (Menu) {
    var MenuElement = (function (_super) {
        __extends(MenuElement, _super);
        function MenuElement(className, role) {
            _super.call(this);
            this.html = document.createElement('div');
            this.html.classList.add(Menu.ClassPrefix.addPrefix(className));
            this.html.setAttribute('role', role);
        }
        MenuElement.prototype.addAttributes = function (attributes) {
            for (var attr in attributes) {
                this.html.setAttribute(attr, attributes[attr]);
            }
        };
        return MenuElement;
    })(Menu.AbstractNavigatable);
    Menu.MenuElement = MenuElement;
})(Menu || (Menu = {}));
var Menu;
(function (Menu) {
    var Rule = (function (_super) {
        __extends(Rule, _super);
        function Rule(menu) {
            _super.call(this, menu, 'separator');
        }
        return Rule;
    })(Menu.AbstractItem);
    Menu.Rule = Rule;
})(Menu || (Menu = {}));
