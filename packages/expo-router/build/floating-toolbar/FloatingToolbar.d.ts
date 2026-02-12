import { FloatingToolbarButton } from './FloatingToolbarButton';
import { FloatingToolbarSpacer } from './FloatingToolbarSpacer';
import { Icon, Label } from './primitives';
import type { FloatingToolbarProps } from './types';
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
export declare const FloatingToolbar: ((props: FloatingToolbarProps) => import("react").JSX.Element) & {
    Button: typeof FloatingToolbarButton;
    Spacer: typeof FloatingToolbarSpacer;
    Icon: typeof Icon;
    Label: typeof Label;
};
//# sourceMappingURL=FloatingToolbar.d.ts.map