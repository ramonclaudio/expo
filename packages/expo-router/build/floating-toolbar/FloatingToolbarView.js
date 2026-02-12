"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingToolbarView = FloatingToolbarView;
const react_native_1 = require("react-native");
const context_1 = require("./context");
const native_1 = require("./native");
/**
 * A floating toolbar container for contextual actions.
 *
 * @platform android
 */
function FloatingToolbarView(props) {
    const { children, position = 'bottom', variant = 'standard', backgroundColor, elevation, borderRadius = 28, alignment = 'center', hidden = false, style, } = props;
    return (<react_native_1.View style={[styles.container, position === 'top' ? styles.top : styles.bottom, style]} pointerEvents="box-none">
      <native_1.FloatingToolbarHost style={styles.host} variant={variant} backgroundTint={backgroundColor} elevation={elevation} shapeAppearance={borderRadius} hidden={hidden} alignment={alignment}>
        <context_1.FloatingToolbarContext.Provider value>{children}</context_1.FloatingToolbarContext.Provider>
      </native_1.FloatingToolbarHost>
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        paddingHorizontal: 16,
    },
    top: {
        top: 16,
    },
    bottom: {
        bottom: 16,
    },
    host: {
        minHeight: 64,
    },
});
//# sourceMappingURL=FloatingToolbarView.js.map