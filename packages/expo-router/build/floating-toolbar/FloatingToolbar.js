"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingToolbar = void 0;
const FloatingToolbarButton_1 = require("./FloatingToolbarButton");
const FloatingToolbarSpacer_1 = require("./FloatingToolbarSpacer");
const FloatingToolbarView_1 = require("./FloatingToolbarView");
const primitives_1 = require("./primitives");
/**
 * A standalone floating toolbar container for contextual actions on Android.
 *
 * Uses the Material Design `FloatingToolbarLayout` under the hood.
 *
 * @example
 * ```tsx
 * import { FloatingToolbar } from 'expo-router/unstable-floating-toolbar';
 *
 * export default function Page() {
 *   return (
 *     <View style={{ flex: 1 }}>
 *       <ScrollView>...</ScrollView>
 *       <FloatingToolbar position="bottom" variant="vibrant">
 *         <FloatingToolbar.Button icon={{ drawable: 'star' }} onPress={() => {}} />
 *         <FloatingToolbar.Button icon={{ drawable: 'edit' }} onPress={() => {}} />
 *         <FloatingToolbar.Spacer />
 *         <FloatingToolbar.Button icon={{ drawable: 'delete' }} onPress={() => {}} />
 *       </FloatingToolbar>
 *     </View>
 *   );
 * }
 * ```
 *
 * @platform android
 */
exports.FloatingToolbar = Object.assign(function FloatingToolbar(props) {
    return <FloatingToolbarView_1.FloatingToolbarView {...props}/>;
}, { Button: FloatingToolbarButton_1.FloatingToolbarButton, Spacer: FloatingToolbarSpacer_1.FloatingToolbarSpacer, Icon: primitives_1.Icon, Label: primitives_1.Label });
//# sourceMappingURL=FloatingToolbar.js.map