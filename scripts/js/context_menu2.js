var Menu;
(function (Menu) {
    class AbstractItem {
        constructor(menu, role) {
            this.menu = menu;
            this.role = role;
        }
        getMenu() {
            return this.menu;
        }
        getRole() {
            return this.role;
        }
    }
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
    class AbstractNavigatable {
        keydown(event) {
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
        }
        ;
        escape(event) { }
        ;
        space(event) { }
        ;
        left(event) { }
        ;
        right(event) { }
        ;
        up(event) { }
        ;
        down(event) { }
        ;
        stop(event) {
            if (event) {
                event.stopPropagation();
                event.cancelBubble = true;
            }
        }
        ;
    }
    Menu.AbstractNavigatable = AbstractNavigatable;
})(Menu || (Menu = {}));
var Menu;
(function (Menu) {
    class ClassPrefix {
        constructor() {
            this.prefix = '';
            if (ClassPrefix.instance) {
                throw new Error('Error: Can not instantiate a singleton class!');
            }
            ClassPrefix.instance = this;
        }
        static getInstance() {
            return ClassPrefix.instance;
        }
        getPrefix() {
            return this.prefix;
        }
        setPrefix(prefix) {
            this.prefix = prefix;
        }
        static addPrefix(className) {
            return ClassPrefix.getInstance().getPrefix() + '_' + className;
        }
    }
    ClassPrefix.instance = new ClassPrefix();
    Menu.ClassPrefix = ClassPrefix;
})(Menu || (Menu = {}));
var Menu;
(function (Menu) {
    class MenuElement extends Menu.AbstractNavigatable {
        constructor(className, role) {
            super();
            this.html = document.createElement('div');
            this.html.classList.add(Menu.ClassPrefix.addPrefix(className));
            this.html.setAttribute('role', role);
        }
        addAttributes(attributes) {
            for (let attr in attributes) {
                this.html.setAttribute(attr, attributes[attr]);
            }
        }
    }
    Menu.MenuElement = MenuElement;
})(Menu || (Menu = {}));
var Menu;
(function (Menu) {
    class Rule extends Menu.AbstractItem {
        constructor(menu) {
            super(menu, 'separator');
        }
    }
    Menu.Rule = Rule;
})(Menu || (Menu = {}));
