"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingToolbarContext = void 0;
exports.useFloatingToolbar = useFloatingToolbar;
const react_1 = require("react");
const FloatingToolbarContext = (0, react_1.createContext)(false);
exports.FloatingToolbarContext = FloatingToolbarContext;
/**
 * Returns `true` when the component is rendered inside a `FloatingToolbar`.
 */
function useFloatingToolbar() {
    return (0, react_1.useContext)(FloatingToolbarContext);
}
//# sourceMappingURL=context.js.map