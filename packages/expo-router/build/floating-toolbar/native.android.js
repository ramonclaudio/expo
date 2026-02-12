"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingToolbarHost = FloatingToolbarHost;
exports.FloatingToolbarItem = FloatingToolbarItem;
const expo_1 = require("expo");
const FloatingToolbarHostView = (0, expo_1.requireNativeView)('ExpoFloatingToolbarModule', 'FloatingToolbarContainerView');
function FloatingToolbarHost(props) {
    return <FloatingToolbarHostView {...props}/>;
}
const FloatingToolbarItemView = (0, expo_1.requireNativeView)('ExpoFloatingToolbarModule', 'FloatingToolbarItemView');
function FloatingToolbarItem(props) {
    return <FloatingToolbarItemView {...props}/>;
}
//# sourceMappingURL=native.android.js.map