"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingToolbarSpacer = FloatingToolbarSpacer;
const context_1 = require("./context");
const native_1 = require("./native");
/**
 * A spacer element inside a `FloatingToolbar` to create gaps between buttons.
 *
 * @example
 * ```tsx
 * <FloatingToolbar>
 *   <FloatingToolbar.Button icon={{ drawable: 'star' }} onPress={() => {}} />
 *   <FloatingToolbar.Spacer />
 *   <FloatingToolbar.Button icon={{ drawable: 'delete' }} onPress={() => {}} />
 * </FloatingToolbar>
 * ```
 *
 * @platform android
 */
function FloatingToolbarSpacer(props) {
    const isInsideToolbar = (0, context_1.useFloatingToolbar)();
    if (process.env.NODE_ENV !== 'production' && !isInsideToolbar) {
        throw new Error('FloatingToolbar.Spacer must be used inside a FloatingToolbar');
    }
    return <native_1.FloatingToolbarItem isSpacer spacerWidth={props.width}/>;
}
//# sourceMappingURL=FloatingToolbarSpacer.js.map