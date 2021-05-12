import React, { createContext, useState } from "react";
import classNames from "classnames";
export var MenuContext = createContext({ index: '0' });
var Menu = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, mode = props.mode, style = props.style, children = props.children, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect)
            onSelect(index);
    };
    var passedContext = {
        index: currentActive || '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            // 类型断言，转成FunctionComponentElement
            var childElement = child;
            // childElement.type.displayName
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // return child
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.error('Warning:Menu has a child which is not a MenuItem component');
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
};
export default Menu;
