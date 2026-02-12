"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingToolbarButton = FloatingToolbarButton;
const context_1 = require("./context");
const native_1 = require("./native");
const primitives_1 = require("../primitives");
const children_1 = require("../utils/children");
/**
 * A button displayed inside a `FloatingToolbar`.
 *
 * @example
 * ```tsx
 * <FloatingToolbar.Button icon={{ drawable: 'star' }} onPress={() => {}} />
 * ```
 *
 * @example
 * ```tsx
 * <FloatingToolbar.Button onPress={() => {}}>
 *   <FloatingToolbar.Icon drawable="star" />
 *   <FloatingToolbar.Label>Star</FloatingToolbar.Label>
 * </FloatingToolbar.Button>
 * ```
 *
 * @platform android
 */
function FloatingToolbarButton(props) {
    const isInsideToolbar = (0, context_1.useFloatingToolbar)();
    if (process.env.NODE_ENV !== 'production' && !isInsideToolbar) {
        throw new Error('FloatingToolbar.Button must be used inside a FloatingToolbar');
    }
    const iconDrawable = resolveIconDrawable(props);
    const title = resolveLabel(props.children);
    return (<native_1.FloatingToolbarItem iconDrawable={iconDrawable} title={title} disabled={props.disabled} tintColor={props.tintColor} onSelected={props.onPress} accessibilityLabel={props.accessibilityLabel}/>);
}
function resolveIconDrawable(props) {
    if (props.icon) {
        return props.icon.drawable;
    }
    const iconChild = (0, children_1.getFirstChildOfType)(props.children, primitives_1.Icon);
    if (iconChild && typeof iconChild === 'object' && 'props' in iconChild) {
        return iconChild.props.drawable;
    }
    return undefined;
}
function resolveLabel(children) {
    if (typeof children === 'string') {
        return children;
    }
    const labelChild = (0, children_1.getFirstChildOfType)(children, primitives_1.Label);
    if (labelChild && typeof labelChild === 'object' && 'props' in labelChild) {
        const labelChildren = labelChild.props.children;
        if (typeof labelChildren === 'string') {
            return labelChildren;
        }
    }
    return undefined;
}
//# sourceMappingURL=FloatingToolbarButton.js.map